import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import { 
  delayPredictionModel, 
  damageDetectionModel, 
  optimizationEngine 
} from "./ml-service";
import { 
  gnnModel, 
  lstmModel, 
  cvModel, 
  rlOptimizer 
} from "./ai-models";
import { 
  timeSeriesAnalyzer, 
  networkAnalyzer, 
  predictiveAnalytics 
} from "./analytics-service";
import { realtimeStream } from "./realtime-service";
import { 
  adminService, 
  userManagement, 
  systemSettings 
} from "./admin-service";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  // Initialize WebSocket for real-time updates
  realtimeStream.initialize(httpServer);

  app.post(api.contact.submit.path, async (req, res) => {
    try {
      const input = api.contact.submit.input.parse(req.body);
      const submission = await storage.createContactSubmission(input);
      res.status(201).json(submission);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  app.post(api.newsletter.subscribe.path, async (req, res) => {
    try {
      const input = api.newsletter.subscribe.input.parse(req.body);
      const subscriber = await storage.createNewsletterSubscriber(input);
      res.status(201).json(subscriber);
    } catch (err) {
       if (err instanceof Error && 'code' in err && err.code === '23505') {
         return res.status(400).json({ message: "Email already subscribed" });
       }
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  // Basic ML/AI Endpoints
  app.post("/api/ml/predict-delay", async (req, res) => {
    try {
      const flightData = req.body;
      const prediction = await delayPredictionModel.predictDelay(flightData);
      res.json(prediction);
    } catch (err) {
      res.status(500).json({ message: "Prediction failed" });
    }
  });

  app.get("/api/ml/network-status", async (req, res) => {
    try {
      const status = await delayPredictionModel.getNetworkStatus();
      res.json(status);
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch network status" });
    }
  });

  app.post("/api/ml/detect-damage", async (req, res) => {
    try {
      const { imageData } = req.body;
      const detection = await damageDetectionModel.detectDamage(imageData);
      res.json(detection);
    } catch (err) {
      res.status(500).json({ message: "Damage detection failed" });
    }
  });

  app.post("/api/ml/optimize", async (req, res) => {
    try {
      const currentState = req.body;
      const optimization = await optimizationEngine.simulateScenarios(currentState);
      res.json(optimization);
    } catch (err) {
      res.status(500).json({ message: "Optimization failed" });
    }
  });

  // Advanced AI Endpoints
  app.post("/api/ai/gnn-propagation", async (req, res) => {
    try {
      const { sourceNode, initialDelay, networkState } = req.body;
      const propagation = await gnnModel.predictPropagation(sourceNode, initialDelay, networkState);
      const result = Object.fromEntries(propagation);
      res.json({ propagation: result });
    } catch (err) {
      res.status(500).json({ message: "GNN propagation failed" });
    }
  });

  app.post("/api/ai/lstm-forecast", async (req, res) => {
    try {
      const { historicalData, forecastHours } = req.body;
      const forecast = await lstmModel.forecast(historicalData, forecastHours);
      res.json(forecast);
    } catch (err) {
      res.status(500).json({ message: "LSTM forecast failed" });
    }
  });

  app.post("/api/ai/cv-detect", async (req, res) => {
    try {
      const { imageData } = req.body;
      const detection = await cvModel.detectDamage(imageData);
      res.json(detection);
    } catch (err) {
      res.status(500).json({ message: "Computer vision detection failed" });
    }
  });

  app.post("/api/ai/rl-optimize", async (req, res) => {
    try {
      const { initialState, iterations } = req.body;
      const optimization = await rlOptimizer.monteCarloOptimization(initialState, iterations || 1000);
      res.json(optimization);
    } catch (err) {
      res.status(500).json({ message: "RL optimization failed" });
    }
  });

  // Analytics Endpoints
  app.post("/api/analytics/time-series", async (req, res) => {
    try {
      const { data, operation, params } = req.body;
      let result;

      switch (operation) {
        case "moving_average":
          result = timeSeriesAnalyzer.movingAverage(data, params.window);
          break;
        case "exponential_smoothing":
          result = timeSeriesAnalyzer.exponentialSmoothing(data, params.alpha);
          break;
        case "detect_anomalies":
          result = timeSeriesAnalyzer.detectAnomalies(data, params.threshold);
          break;
        case "seasonal_decompose":
          result = timeSeriesAnalyzer.seasonalDecompose(data, params.period);
          break;
        default:
          return res.status(400).json({ message: "Unknown operation" });
      }

      res.json({ result });
    } catch (err) {
      res.status(500).json({ message: "Time series analysis failed" });
    }
  });

  app.post("/api/analytics/network", async (req, res) => {
    try {
      const { adjacencyMatrix, operation } = req.body;
      let result;

      switch (operation) {
        case "centrality":
          result = networkAnalyzer.calculateCentrality(adjacencyMatrix);
          break;
        case "communities":
          result = networkAnalyzer.detectCommunities(adjacencyMatrix);
          break;
        default:
          return res.status(400).json({ message: "Unknown operation" });
      }

      res.json({ result });
    } catch (err) {
      res.status(500).json({ message: "Network analysis failed" });
    }
  });

  app.post("/api/analytics/regression", async (req, res) => {
    try {
      const { x, y, type, params } = req.body;
      let result;

      switch (type) {
        case "linear":
          result = predictiveAnalytics.linearRegression(x, y);
          break;
        case "polynomial":
          result = predictiveAnalytics.polynomialRegression(x, y, params?.degree || 2);
          break;
        case "forecast":
          result = predictiveAnalytics.forecastWithConfidence(y, params?.horizon || 24, params?.confidence || 0.95);
          break;
        default:
          return res.status(400).json({ message: "Unknown regression type" });
      }

      res.json({ result });
    } catch (err) {
      res.status(500).json({ message: "Regression analysis failed" });
    }
  });

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({
      status: "healthy",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      services: {
        ml: "operational",
        ai: "operational",
        analytics: "operational",
        realtime: "operational"
      }
    });
  });

  // Admin Endpoints
  app.get("/api/admin/metrics/system", (req, res) => {
    try {
      const metrics = adminService.getSystemMetrics();
      res.json(metrics);
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch system metrics" });
    }
  });

  app.get("/api/admin/metrics/api", (req, res) => {
    try {
      const metrics = adminService.getAPIMetrics();
      res.json(metrics);
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch API metrics" });
    }
  });

  app.get("/api/admin/services", (req, res) => {
    try {
      const services = adminService.getServiceStatuses();
      res.json(services);
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch service statuses" });
    }
  });

  app.get("/api/admin/activity", (req, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 50;
      const activity = adminService.getRecentActivity(limit);
      res.json(activity);
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch activity logs" });
    }
  });

  app.get("/api/admin/stats/users", (req, res) => {
    try {
      const stats = adminService.getUserStats();
      res.json(stats);
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch user stats" });
    }
  });

  app.get("/api/admin/stats/database", (req, res) => {
    try {
      const stats = adminService.getDatabaseStats();
      res.json(stats);
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch database stats" });
    }
  });

  // User Management Endpoints
  app.get("/api/admin/users", (req, res) => {
    try {
      const users = userManagement.getAllUsers();
      res.json(users);
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch users" });
    }
  });

  app.get("/api/admin/users/:id", (req, res) => {
    try {
      const user = userManagement.getUserById(parseInt(req.params.id));
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  app.post("/api/admin/users", (req, res) => {
    try {
      const user = userManagement.createUser(req.body);
      res.status(201).json(user);
    } catch (err) {
      res.status(500).json({ message: "Failed to create user" });
    }
  });

  app.put("/api/admin/users/:id", (req, res) => {
    try {
      const user = userManagement.updateUser(parseInt(req.params.id), req.body);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json({ message: "Failed to update user" });
    }
  });

  app.delete("/api/admin/users/:id", (req, res) => {
    try {
      const deleted = userManagement.deleteUser(parseInt(req.params.id));
      if (!deleted) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json({ message: "User deleted successfully" });
    } catch (err) {
      res.status(500).json({ message: "Failed to delete user" });
    }
  });

  // Settings Endpoints
  app.get("/api/admin/settings", (req, res) => {
    try {
      const settings = systemSettings.getAllSettings();
      res.json(settings);
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch settings" });
    }
  });

  app.put("/api/admin/settings", (req, res) => {
    try {
      systemSettings.updateSettings(req.body);
      res.json({ message: "Settings updated successfully" });
    } catch (err) {
      res.status(500).json({ message: "Failed to update settings" });
    }
  });

  return httpServer;
}
