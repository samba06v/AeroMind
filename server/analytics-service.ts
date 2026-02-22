// Advanced Analytics and Data Processing Service

export class TimeSeriesAnalyzer {
  // Calculate moving average
  movingAverage(data: number[], window: number): number[] {
    const result: number[] = [];
    for (let i = 0; i < data.length; i++) {
      const start = Math.max(0, i - window + 1);
      const slice = data.slice(start, i + 1);
      const avg = slice.reduce((a, b) => a + b, 0) / slice.length;
      result.push(avg);
    }
    return result;
  }

  // Exponential smoothing
  exponentialSmoothing(data: number[], alpha: number = 0.3): number[] {
    const result: number[] = [data[0]];
    for (let i = 1; i < data.length; i++) {
      result.push(alpha * data[i] + (1 - alpha) * result[i - 1]);
    }
    return result;
  }

  // Detect anomalies using Z-score
  detectAnomalies(data: number[], threshold: number = 3): Array<{index: number, value: number, zscore: number}> {
    const mean = data.reduce((a, b) => a + b, 0) / data.length;
    const variance = data.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / data.length;
    const stdDev = Math.sqrt(variance);

    const anomalies: Array<{index: number, value: number, zscore: number}> = [];
    
    data.forEach((value, index) => {
      const zscore = (value - mean) / stdDev;
      if (Math.abs(zscore) > threshold) {
        anomalies.push({index, value, zscore});
      }
    });

    return anomalies;
  }

  // Seasonal decomposition
  seasonalDecompose(data: number[], period: number = 24): {
    trend: number[];
    seasonal: number[];
    residual: number[];
  } {
    const trend = this.movingAverage(data, period);
    const detrended = data.map((val, idx) => val - trend[idx]);
    
    // Calculate seasonal component
    const seasonal: number[] = [];
    for (let i = 0; i < period; i++) {
      const seasonalValues = detrended.filter((_, idx) => idx % period === i);
      const avgSeasonal = seasonalValues.reduce((a, b) => a + b, 0) / seasonalValues.length;
      seasonal.push(avgSeasonal);
    }

    const fullSeasonal = data.map((_, idx) => seasonal[idx % period]);
    const residual = data.map((val, idx) => val - trend[idx] - fullSeasonal[idx]);

    return {trend, seasonal: fullSeasonal, residual};
  }

  // Autocorrelation function
  autocorrelation(data: number[], lag: number): number {
    const mean = data.reduce((a, b) => a + b, 0) / data.length;
    const n = data.length - lag;
    
    let numerator = 0;
    let denominator = 0;

    for (let i = 0; i < n; i++) {
      numerator += (data[i] - mean) * (data[i + lag] - mean);
    }

    for (let i = 0; i < data.length; i++) {
      denominator += Math.pow(data[i] - mean, 2);
    }

    return numerator / denominator;
  }
}

export class NetworkAnalyzer {
  // Calculate network centrality metrics
  calculateCentrality(adjacencyMatrix: number[][]): {
    degree: number[];
    betweenness: number[];
    closeness: number[];
  } {
    const n = adjacencyMatrix.length;
    
    // Degree centrality
    const degree = adjacencyMatrix.map(row => 
      row.reduce((sum, val) => sum + (val > 0 ? 1 : 0), 0)
    );

    // Simplified betweenness (full calculation is O(n^3))
    const betweenness = Array(n).fill(0).map((_, i) => {
      let score = 0;
      for (let j = 0; j < n; j++) {
        for (let k = 0; k < n; k++) {
          if (i !== j && i !== k && j !== k) {
            if (adjacencyMatrix[j][i] > 0 && adjacencyMatrix[i][k] > 0) {
              score += 1;
            }
          }
        }
      }
      return score;
    });

    // Closeness centrality
    const closeness = Array(n).fill(0).map((_, i) => {
      const distances = this.dijkstra(adjacencyMatrix, i);
      const sumDistances = distances.reduce((a, b) => a + b, 0);
      return sumDistances > 0 ? (n - 1) / sumDistances : 0;
    });

    return {degree, betweenness, closeness};
  }

  // Dijkstra's shortest path algorithm
  private dijkstra(adjacencyMatrix: number[][], start: number): number[] {
    const n = adjacencyMatrix.length;
    const distances = Array(n).fill(Infinity);
    const visited = Array(n).fill(false);
    distances[start] = 0;

    for (let i = 0; i < n; i++) {
      let minDist = Infinity;
      let minIdx = -1;

      for (let j = 0; j < n; j++) {
        if (!visited[j] && distances[j] < minDist) {
          minDist = distances[j];
          minIdx = j;
        }
      }

      if (minIdx === -1) break;
      visited[minIdx] = true;

      for (let j = 0; j < n; j++) {
        if (adjacencyMatrix[minIdx][j] > 0) {
          const newDist = distances[minIdx] + adjacencyMatrix[minIdx][j];
          if (newDist < distances[j]) {
            distances[j] = newDist;
          }
        }
      }
    }

    return distances;
  }

  // Community detection using modularity
  detectCommunities(adjacencyMatrix: number[][]): number[] {
    const n = adjacencyMatrix.length;
    const communities = Array(n).fill(0).map((_, i) => i);
    
    // Simplified Louvain algorithm
    let improved = true;
    let iteration = 0;
    
    while (improved && iteration < 10) {
      improved = false;
      iteration++;

      for (let i = 0; i < n; i++) {
        let bestCommunity = communities[i];
        let bestModularity = this.calculateModularity(adjacencyMatrix, communities);

        // Try moving node to each neighbor's community
        const neighbors = adjacencyMatrix[i]
          .map((val, idx) => val > 0 ? idx : -1)
          .filter(idx => idx !== -1);

        for (const neighbor of neighbors) {
          const testCommunities = [...communities];
          testCommunities[i] = communities[neighbor];
          const modularity = this.calculateModularity(adjacencyMatrix, testCommunities);

          if (modularity > bestModularity) {
            bestModularity = modularity;
            bestCommunity = communities[neighbor];
            improved = true;
          }
        }

        communities[i] = bestCommunity;
      }
    }

    return communities;
  }

  private calculateModularity(adjacencyMatrix: number[][], communities: number[]): number {
    const n = adjacencyMatrix.length;
    const m = adjacencyMatrix.reduce((sum, row) => 
      sum + row.reduce((s, val) => s + val, 0), 0
    ) / 2;

    let modularity = 0;

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (communities[i] === communities[j]) {
          const ki = adjacencyMatrix[i].reduce((s, v) => s + v, 0);
          const kj = adjacencyMatrix[j].reduce((s, v) => s + v, 0);
          modularity += adjacencyMatrix[i][j] - (ki * kj) / (2 * m);
        }
      }
    }

    return modularity / (2 * m);
  }
}

export class PredictiveAnalytics {
  // Linear regression
  linearRegression(x: number[], y: number[]): {slope: number, intercept: number, r2: number} {
    const n = x.length;
    const sumX = x.reduce((a, b) => a + b, 0);
    const sumY = y.reduce((a, b) => a + b, 0);
    const sumXY = x.reduce((sum, xi, i) => sum + xi * y[i], 0);
    const sumX2 = x.reduce((sum, xi) => sum + xi * xi, 0);

    const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;

    // Calculate R²
    const yMean = sumY / n;
    const ssTotal = y.reduce((sum, yi) => sum + Math.pow(yi - yMean, 2), 0);
    const ssResidual = y.reduce((sum, yi, i) => {
      const predicted = slope * x[i] + intercept;
      return sum + Math.pow(yi - predicted, 2);
    }, 0);
    const r2 = 1 - (ssResidual / ssTotal);

    return {slope, intercept, r2};
  }

  // Polynomial regression
  polynomialRegression(x: number[], y: number[], degree: number = 2): {
    coefficients: number[];
    r2: number;
  } {
    // Create design matrix
    const X: number[][] = x.map(xi => 
      Array(degree + 1).fill(0).map((_, d) => Math.pow(xi, d))
    );

    // Solve using normal equations (simplified)
    const coefficients = this.solveNormalEquations(X, y);

    // Calculate R²
    const yMean = y.reduce((a, b) => a + b, 0) / y.length;
    const ssTotal = y.reduce((sum, yi) => sum + Math.pow(yi - yMean, 2), 0);
    const ssResidual = y.reduce((sum, yi, i) => {
      const predicted = coefficients.reduce((pred, coef, d) => 
        pred + coef * Math.pow(x[i], d), 0
      );
      return sum + Math.pow(yi - predicted, 2);
    }, 0);
    const r2 = 1 - (ssResidual / ssTotal);

    return {coefficients, r2};
  }

  private solveNormalEquations(X: number[][], y: number[]): number[] {
    // Simplified solution (in production, use proper matrix operations)
    const n = X[0].length;
    const coefficients = Array(n).fill(0);

    // Use gradient descent for simplicity
    const learningRate = 0.01;
    const iterations = 1000;

    for (let iter = 0; iter < iterations; iter++) {
      const gradients = Array(n).fill(0);

      for (let i = 0; i < X.length; i++) {
        const predicted = X[i].reduce((sum, xi, j) => sum + xi * coefficients[j], 0);
        const error = predicted - y[i];

        for (let j = 0; j < n; j++) {
          gradients[j] += error * X[i][j];
        }
      }

      for (let j = 0; j < n; j++) {
        coefficients[j] -= learningRate * gradients[j] / X.length;
      }
    }

    return coefficients;
  }

  // Time series forecasting with confidence intervals
  forecastWithConfidence(
    data: number[],
    horizon: number,
    confidenceLevel: number = 0.95
  ): Array<{value: number, lower: number, upper: number}> {
    const x = data.map((_, i) => i);
    const {slope, intercept} = this.linearRegression(x, data);

    // Calculate residual standard error
    const residuals = data.map((yi, i) => yi - (slope * i + intercept));
    const mse = residuals.reduce((sum, r) => sum + r * r, 0) / (data.length - 2);
    const se = Math.sqrt(mse);

    // Z-score for confidence level
    const z = confidenceLevel === 0.95 ? 1.96 : 2.576;

    const forecasts: Array<{value: number, lower: number, upper: number}> = [];

    for (let i = 0; i < horizon; i++) {
      const t = data.length + i;
      const value = slope * t + intercept;
      const margin = z * se * Math.sqrt(1 + 1/data.length + Math.pow(t - x.reduce((a,b) => a+b)/x.length, 2) / x.reduce((sum, xi) => sum + Math.pow(xi - x.reduce((a,b) => a+b)/x.length, 2), 0));

      forecasts.push({
        value,
        lower: value - margin,
        upper: value + margin
      });
    }

    return forecasts;
  }
}

// Export singleton instances
export const timeSeriesAnalyzer = new TimeSeriesAnalyzer();
export const networkAnalyzer = new NetworkAnalyzer();
export const predictiveAnalytics = new PredictiveAnalytics();
