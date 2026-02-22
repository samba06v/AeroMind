// Real-time Data Streaming and WebSocket Service
import { WebSocket, WebSocketServer } from "ws";
import type { Server } from "http";

export interface FlightUpdate {
  flightId: string;
  status: "on_time" | "delayed" | "cancelled" | "boarding";
  delay: number;
  gate: string;
  timestamp: Date;
}

export interface NetworkEvent {
  type: "delay" | "weather" | "maintenance" | "crew_issue" | "gate_conflict";
  airport: string;
  severity: "low" | "medium" | "high" | "critical";
  description: string;
  affectedFlights: string[];
  timestamp: Date;
}

export class RealtimeDataStream {
  private wss: WebSocketServer | null = null;
  private clients: Set<WebSocket> = new Set();
  private dataGeneratorInterval: NodeJS.Timeout | null = null;

  initialize(httpServer: Server) {
    this.wss = new WebSocketServer({ server: httpServer, path: "/ws" });

    this.wss.on("connection", (ws: WebSocket) => {
      console.log("New WebSocket client connected");
      this.clients.add(ws);

      // Send initial data
      ws.send(JSON.stringify({
        type: "connection",
        message: "Connected to AeroMind Nexus real-time stream",
        timestamp: new Date()
      }));

      ws.on("message", (message: string) => {
        try {
          const data = JSON.parse(message.toString());
          this.handleClientMessage(ws, data);
        } catch (error) {
          console.error("Error parsing WebSocket message:", error);
        }
      });

      ws.on("close", () => {
        console.log("WebSocket client disconnected");
        this.clients.delete(ws);
      });

      ws.on("error", (error) => {
        console.error("WebSocket error:", error);
        this.clients.delete(ws);
      });
    });

    // Start generating simulated real-time data
    this.startDataGeneration();
  }

  private handleClientMessage(ws: WebSocket, data: any) {
    switch (data.type) {
      case "subscribe":
        ws.send(JSON.stringify({
          type: "subscribed",
          channel: data.channel,
          timestamp: new Date()
        }));
        break;
      case "ping":
        ws.send(JSON.stringify({
          type: "pong",
          timestamp: new Date()
        }));
        break;
    }
  }

  private startDataGeneration() {
    // Generate updates every 2 seconds
    this.dataGeneratorInterval = setInterval(() => {
      this.generateFlightUpdate();
      
      // Occasionally generate network events
      if (Math.random() < 0.3) {
        this.generateNetworkEvent();
      }

      // Send network metrics
      if (Math.random() < 0.5) {
        this.generateNetworkMetrics();
      }
    }, 2000);
  }

  private generateFlightUpdate() {
    const airlines = ["AA", "UA", "DL", "WN", "B6"];
    const statuses: Array<"on_time" | "delayed" | "cancelled" | "boarding"> = 
      ["on_time", "delayed", "boarding"];
    
    const update: FlightUpdate = {
      flightId: `${airlines[Math.floor(Math.random() * airlines.length)]}${Math.floor(Math.random() * 9000 + 1000)}`,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      delay: Math.floor(Math.random() * 60),
      gate: `${String.fromCharCode(65 + Math.floor(Math.random() * 5))}${Math.floor(Math.random() * 30 + 1)}`,
      timestamp: new Date()
    };

    this.broadcast({
      type: "flight_update",
      data: update
    });
  }

  private generateNetworkEvent() {
    const airports = ["JFK", "LAX", "ORD", "ATL", "DFW", "DEN"];
    const types: Array<"delay" | "weather" | "maintenance" | "crew_issue" | "gate_conflict"> = 
      ["delay", "weather", "maintenance", "crew_issue", "gate_conflict"];
    const severities: Array<"low" | "medium" | "high" | "critical"> = 
      ["low", "medium", "high", "critical"];

    const event: NetworkEvent = {
      type: types[Math.floor(Math.random() * types.length)],
      airport: airports[Math.floor(Math.random() * airports.length)],
      severity: severities[Math.floor(Math.random() * severities.length)],
      description: this.generateEventDescription(),
      affectedFlights: Array(Math.floor(Math.random() * 5 + 1))
        .fill(0)
        .map(() => `FL${Math.floor(Math.random() * 9000 + 1000)}`),
      timestamp: new Date()
    };

    this.broadcast({
      type: "network_event",
      data: event
    });
  }

  private generateEventDescription(): string {
    const descriptions = [
      "Severe weather approaching runway",
      "Gate conflict detected",
      "Crew scheduling issue",
      "Aircraft maintenance required",
      "ATC delay due to congestion",
      "Ground equipment malfunction",
      "Passenger boarding delay"
    ];
    return descriptions[Math.floor(Math.random() * descriptions.length)];
  }

  private generateNetworkMetrics() {
    const metrics = {
      activeFlights: 2800 + Math.floor(Math.random() * 200),
      avgDelay: 12 + Math.floor(Math.random() * 20),
      onTimePerformance: 0.85 + Math.random() * 0.1,
      networkEfficiency: 0.90 + Math.random() * 0.08,
      criticalAlerts: Math.floor(Math.random() * 5),
      timestamp: new Date()
    };

    this.broadcast({
      type: "network_metrics",
      data: metrics
    });
  }

  private broadcast(message: any) {
    const data = JSON.stringify(message);
    this.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  }

  stop() {
    if (this.dataGeneratorInterval) {
      clearInterval(this.dataGeneratorInterval);
    }
    this.clients.forEach(client => client.close());
    this.wss?.close();
  }
}

export class DataAggregator {
  private buffer: Map<string, any[]> = new Map();
  private windowSize: number = 60000; // 1 minute

  addData(channel: string, data: any) {
    if (!this.buffer.has(channel)) {
      this.buffer.set(channel, []);
    }

    const channelData = this.buffer.get(channel)!;
    channelData.push({
      ...data,
      timestamp: Date.now()
    });

    // Remove old data outside window
    const cutoff = Date.now() - this.windowSize;
    this.buffer.set(
      channel,
      channelData.filter(item => item.timestamp > cutoff)
    );
  }

  getAggregated(channel: string): {
    count: number;
    avg: number;
    min: number;
    max: number;
    latest: any;
  } | null {
    const data = this.buffer.get(channel);
    if (!data || data.length === 0) return null;

    const values = data.map(item => item.value || 0);
    
    return {
      count: data.length,
      avg: values.reduce((a, b) => a + b, 0) / values.length,
      min: Math.min(...values),
      max: Math.max(...values),
      latest: data[data.length - 1]
    };
  }

  clearChannel(channel: string) {
    this.buffer.delete(channel);
  }
}

export class EventProcessor {
  private eventQueue: any[] = [];
  private processing: boolean = false;

  async addEvent(event: any) {
    this.eventQueue.push(event);
    if (!this.processing) {
      this.processQueue();
    }
  }

  private async processQueue() {
    this.processing = true;

    while (this.eventQueue.length > 0) {
      const event = this.eventQueue.shift();
      await this.processEvent(event);
    }

    this.processing = false;
  }

  private async processEvent(event: any) {
    // Simulate event processing
    await new Promise(resolve => setTimeout(resolve, 100));

    // Apply business logic
    switch (event.type) {
      case "delay":
        await this.handleDelayEvent(event);
        break;
      case "weather":
        await this.handleWeatherEvent(event);
        break;
      case "maintenance":
        await this.handleMaintenanceEvent(event);
        break;
    }
  }

  private async handleDelayEvent(event: any) {
    // Trigger cascade analysis
    console.log(`Processing delay event for ${event.airport}`);
  }

  private async handleWeatherEvent(event: any) {
    // Trigger weather impact analysis
    console.log(`Processing weather event for ${event.airport}`);
  }

  private async handleMaintenanceEvent(event: any) {
    // Trigger maintenance scheduling
    console.log(`Processing maintenance event for ${event.airport}`);
  }
}

// Export singleton instances
export const realtimeStream = new RealtimeDataStream();
export const dataAggregator = new DataAggregator();
export const eventProcessor = new EventProcessor();
