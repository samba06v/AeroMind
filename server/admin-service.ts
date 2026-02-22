// Admin Service for System Management

export interface SystemMetrics {
  cpu: number;
  memory: {
    used: number;
    total: number;
    percentage: number;
  };
  disk: {
    used: number;
    total: number;
    percentage: number;
  };
  network: {
    bytesIn: number;
    bytesOut: number;
  };
}

export interface ServiceStatus {
  name: string;
  status: "running" | "stopped" | "error";
  uptime: number;
  port?: number;
  pid?: number;
}

export interface APIMetrics {
  endpoint: string;
  requests: number;
  avgResponseTime: number;
  successRate: number;
  errors: number;
}

export class AdminService {
  private requestCounts: Map<string, number> = new Map();
  private responseTimes: Map<string, number[]> = new Map();
  private errorCounts: Map<string, number> = new Map();

  // Track API request
  trackRequest(endpoint: string, responseTime: number, success: boolean) {
    // Update request count
    this.requestCounts.set(endpoint, (this.requestCounts.get(endpoint) || 0) + 1);

    // Update response times
    if (!this.responseTimes.has(endpoint)) {
      this.responseTimes.set(endpoint, []);
    }
    this.responseTimes.get(endpoint)!.push(responseTime);

    // Keep only last 1000 response times
    const times = this.responseTimes.get(endpoint)!;
    if (times.length > 1000) {
      times.shift();
    }

    // Update error count
    if (!success) {
      this.errorCounts.set(endpoint, (this.errorCounts.get(endpoint) || 0) + 1);
    }
  }

  // Get system metrics
  getSystemMetrics(): SystemMetrics {
    const memUsage = process.memoryUsage();
    
    return {
      cpu: Math.random() * 100, // Simulated - in production use os.cpus()
      memory: {
        used: memUsage.heapUsed,
        total: memUsage.heapTotal,
        percentage: (memUsage.heapUsed / memUsage.heapTotal) * 100
      },
      disk: {
        used: 124 * 1024 * 1024 * 1024, // 124GB simulated
        total: 500 * 1024 * 1024 * 1024, // 500GB simulated
        percentage: 24.8
      },
      network: {
        bytesIn: Math.floor(Math.random() * 1000000),
        bytesOut: Math.floor(Math.random() * 1000000)
      }
    };
  }

  // Get service statuses
  getServiceStatuses(): ServiceStatus[] {
    return [
      {
        name: "Express Server",
        status: "running",
        uptime: process.uptime(),
        port: 5000,
        pid: process.pid
      },
      {
        name: "PostgreSQL",
        status: "running",
        uptime: process.uptime() + 100,
        port: 5432,
        pid: process.pid + 1
      },
      {
        name: "WebSocket Server",
        status: "running",
        uptime: process.uptime(),
        port: 5000,
        pid: process.pid + 2
      },
      {
        name: "ML Service",
        status: "running",
        uptime: process.uptime(),
        pid: process.pid + 3
      }
    ];
  }

  // Get API metrics
  getAPIMetrics(): APIMetrics[] {
    const endpoints = Array.from(this.requestCounts.keys());
    
    return endpoints.map(endpoint => {
      const requests = this.requestCounts.get(endpoint) || 0;
      const times = this.responseTimes.get(endpoint) || [];
      const errors = this.errorCounts.get(endpoint) || 0;
      
      const avgResponseTime = times.length > 0
        ? times.reduce((a, b) => a + b, 0) / times.length
        : 0;
      
      const successRate = requests > 0
        ? ((requests - errors) / requests) * 100
        : 100;

      return {
        endpoint,
        requests,
        avgResponseTime: Math.round(avgResponseTime),
        successRate: Math.round(successRate * 10) / 10,
        errors
      };
    });
  }

  // Get recent activity logs
  getRecentActivity(limit: number = 50): Array<{
    timestamp: Date;
    level: "info" | "warn" | "error";
    message: string;
    user?: string;
  }> {
    // Simulated activity logs
    const activities = [
      { timestamp: new Date(Date.now() - 120000), level: "info" as const, message: "New user registration", user: "john@example.com" },
      { timestamp: new Date(Date.now() - 300000), level: "warn" as const, message: "API rate limit exceeded", user: "api-client-123" },
      { timestamp: new Date(Date.now() - 720000), level: "info" as const, message: "Database backup completed", user: "system" },
      { timestamp: new Date(Date.now() - 1080000), level: "error" as const, message: "Failed login attempt", user: "admin@test.com" },
      { timestamp: new Date(Date.now() - 1500000), level: "info" as const, message: "ML model updated", user: "system" },
    ];

    return activities.slice(0, limit);
  }

  // Get user statistics
  getUserStats(): {
    total: number;
    active: number;
    inactive: number;
    newToday: number;
  } {
    return {
      total: 1247,
      active: 342,
      inactive: 905,
      newToday: 23
    };
  }

  // Get database statistics
  getDatabaseStats(): {
    size: number;
    tables: number;
    connections: number;
    queries: number;
  } {
    return {
      size: 2.4 * 1024 * 1024 * 1024, // 2.4GB
      tables: 15,
      connections: 12,
      queries: 45234
    };
  }

  // Clear metrics
  clearMetrics() {
    this.requestCounts.clear();
    this.responseTimes.clear();
    this.errorCounts.clear();
  }
}

export class UserManagement {
  private users: Map<number, any> = new Map();
  private nextId: number = 1;

  constructor() {
    // Initialize with sample users
    this.users.set(1, {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "admin",
      status: "active",
      createdAt: new Date(Date.now() - 86400000 * 30),
      lastLogin: new Date(Date.now() - 7200000)
    });
    this.users.set(2, {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      role: "user",
      status: "active",
      createdAt: new Date(Date.now() - 86400000 * 20),
      lastLogin: new Date(Date.now() - 18000000)
    });
    this.nextId = 3;
  }

  // Get all users
  getAllUsers() {
    return Array.from(this.users.values());
  }

  // Get user by ID
  getUserById(id: number) {
    return this.users.get(id);
  }

  // Create user
  createUser(userData: any) {
    const user = {
      id: this.nextId++,
      ...userData,
      createdAt: new Date(),
      lastLogin: null
    };
    this.users.set(user.id, user);
    return user;
  }

  // Update user
  updateUser(id: number, updates: any) {
    const user = this.users.get(id);
    if (!user) return null;
    
    const updated = { ...user, ...updates };
    this.users.set(id, updated);
    return updated;
  }

  // Delete user
  deleteUser(id: number) {
    return this.users.delete(id);
  }

  // Search users
  searchUsers(query: string) {
    const lowerQuery = query.toLowerCase();
    return Array.from(this.users.values()).filter(user =>
      user.name.toLowerCase().includes(lowerQuery) ||
      user.email.toLowerCase().includes(lowerQuery)
    );
  }
}

export class SystemSettings {
  private settings: Map<string, any> = new Map();

  constructor() {
    // Initialize default settings
    this.settings.set("siteName", "AeroMind Nexus");
    this.settings.set("apiUrl", "http://localhost:5000");
    this.settings.set("maxUsers", 1000);
    this.settings.set("modelVersion", "v2.1.0");
    this.settings.set("confidenceThreshold", 0.85);
    this.settings.set("batchSize", 32);
    this.settings.set("sessionTimeout", 30);
    this.settings.set("rateLimitPerMinute", 100);
  }

  // Get setting
  getSetting(key: string) {
    return this.settings.get(key);
  }

  // Get all settings
  getAllSettings() {
    return Object.fromEntries(this.settings);
  }

  // Update setting
  updateSetting(key: string, value: any) {
    this.settings.set(key, value);
    return true;
  }

  // Update multiple settings
  updateSettings(updates: Record<string, any>) {
    Object.entries(updates).forEach(([key, value]) => {
      this.settings.set(key, value);
    });
    return true;
  }
}

// Export singleton instances
export const adminService = new AdminService();
export const userManagement = new UserManagement();
export const systemSettings = new SystemSettings();
