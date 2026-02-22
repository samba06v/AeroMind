// Simulated ML/AI Service for Aviation Disruption Prediction

export interface FlightData {
  flightId: string;
  origin: string;
  destination: string;
  scheduledDeparture: Date;
  currentDelay: number;
  weather: number;
  aircraftType: string;
}

export interface PredictionResult {
  flightId: string;
  predictedDelay: number;
  confidence: number;
  cascadeRisk: number;
  affectedFlights: string[];
  recommendations: string[];
}

export interface NetworkStatus {
  airport: string;
  status: "normal" | "warning" | "critical";
  activeFlights: number;
  avgDelay: number;
  capacity: number;
}

export class DelayPredictionModel {
  private networkGraph: Map<string, string[]> = new Map();

  constructor() {
    this.networkGraph.set("JFK", ["LAX", "ORD", "ATL"]);
    this.networkGraph.set("LAX", ["JFK", "DFW", "ORD"]);
    this.networkGraph.set("ORD", ["JFK", "LAX", "DEN", "ATL"]);
    this.networkGraph.set("ATL", ["JFK", "ORD", "DFW"]);
    this.networkGraph.set("DFW", ["LAX", "ATL", "DEN"]);
    this.networkGraph.set("DEN", ["ORD", "DFW", "LAX"]);
  }

  async predictDelay(flight: FlightData): Promise<PredictionResult> {
    await new Promise(resolve => setTimeout(resolve, 100));

    const baseDelay = flight.currentDelay;
    const weatherImpact = flight.weather * 30;
    const networkCongestion = Math.random() * 20;
    
    const predictedDelay = Math.round(baseDelay + weatherImpact + networkCongestion);
    const confidence = 0.85 + Math.random() * 0.1;
    
    const connectedAirports = this.networkGraph.get(flight.origin) || [];
    const cascadeRisk = Math.min(predictedDelay / 60, 1) * (connectedAirports.length / 5);
    
    const affectedFlights = this.generateAffectedFlights(flight, predictedDelay);
    const recommendations = this.generateRecommendations(flight, predictedDelay);

    return {
      flightId: flight.flightId,
      predictedDelay,
      confidence,
      cascadeRisk,
      affectedFlights,
      recommendations
    };
  }

  private generateAffectedFlights(flight: FlightData, delay: number): string[] {
    if (delay < 15) return [];
    const count = Math.min(Math.floor(delay / 15), 5);
    return Array.from({ length: count }, (_, i) => 
      `${flight.destination}${Math.floor(Math.random() * 900 + 100)}`
    );
  }

  private generateRecommendations(flight: FlightData, delay: number): string[] {
    const recs: string[] = [];
    
    if (delay > 30) {
      recs.push("Consider gate swap to reduce turnaround time");
      recs.push("Alert connecting passengers for rebooking");
    }
    
    if (delay > 60) {
      recs.push("Evaluate aircraft rotation swap");
      recs.push("Notify crew scheduling for legality check");
    }
    
    if (flight.weather > 0.5) {
      recs.push("Monitor weather updates for alternate routing");
    }
    
    return recs;
  }

  async getNetworkStatus(): Promise<NetworkStatus[]> {
    const airports = ["JFK", "LAX", "ORD", "ATL", "DFW", "DEN"];
    
    return airports.map(airport => {
      const avgDelay = Math.random() * 30;
      const capacity = 0.7 + Math.random() * 0.3;
      
      let status: "normal" | "warning" | "critical" = "normal";
      if (avgDelay > 20 || capacity > 0.9) status = "warning";
      if (avgDelay > 40 || capacity > 0.95) status = "critical";
      
      return {
        airport,
        status,
        activeFlights: Math.floor(Math.random() * 100 + 50),
        avgDelay: Math.round(avgDelay),
        capacity: Math.round(capacity * 100) / 100
      };
    });
  }
}

export class DamageDetectionModel {
  async detectDamage(imageData: string): Promise<{
    hasDamage: boolean;
    confidence: number;
    damageType: string | null;
    severity: "low" | "medium" | "high" | null;
    location: string | null;
  }> {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const hasDamage = Math.random() > 0.7;
    
    if (!hasDamage) {
      return {
        hasDamage: false,
        confidence: 0.95 + Math.random() * 0.04,
        damageType: null,
        severity: null,
        location: null
      };
    }
    
    const damageTypes = ["dent", "crack", "corrosion", "paint_damage", "tire_wear"];
    const severities: ("low" | "medium" | "high")[] = ["low", "medium", "high"];
    const locations = ["fuselage", "wing", "tail", "landing_gear", "engine"];
    
    return {
      hasDamage: true,
      confidence: 0.80 + Math.random() * 0.15,
      damageType: damageTypes[Math.floor(Math.random() * damageTypes.length)],
      severity: severities[Math.floor(Math.random() * severities.length)],
      location: locations[Math.floor(Math.random() * locations.length)]
    };
  }
}

export class OptimizationEngine {
  async simulateScenarios(currentState: any): Promise<{
    scenarios: Array<{
      id: string;
      action: string;
      delaySaved: number;
      costImpact: number;
      confidence: number;
    }>;
    recommended: string;
  }> {
    await new Promise(resolve => setTimeout(resolve, 150));
    
    const scenarios = [
      {
        id: "scenario_1",
        action: "Swap gates 23 & 24",
        delaySaved: 18,
        costImpact: -500,
        confidence: 0.94
      },
      {
        id: "scenario_2",
        action: "Delay departure by 5 minutes",
        delaySaved: 35,
        costImpact: -1200,
        confidence: 0.87
      },
      {
        id: "scenario_3",
        action: "Reroute via alternate path",
        delaySaved: 12,
        costImpact: 2400,
        confidence: 0.91
      }
    ];
    
    const recommended = scenarios.reduce((best, current) => 
      (current.delaySaved / Math.abs(current.costImpact)) > 
      (best.delaySaved / Math.abs(best.costImpact)) ? current : best
    ).id;
    
    return { scenarios, recommended };
  }
}

export const delayPredictionModel = new DelayPredictionModel();
export const damageDetectionModel = new DamageDetectionModel();
export const optimizationEngine = new OptimizationEngine();
