import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Users, 
  Activity, 
  Database, 
  Settings, 
  BarChart3, 
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Clock,
  TrendingUp,
  Server,
  Cpu,
  HardDrive,
  Zap
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function Admin() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="bg-background text-foreground min-h-screen">
      <Navbar />
      
      <div className="pt-20 px-4 md:px-6 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold font-display mb-2">Admin Panel</h1>
            <p className="text-muted-foreground">System management and monitoring</p>
          </div>
          <Badge variant="outline" className="text-green-500 border-green-500">
            <CheckCircle2 className="w-4 h-4 mr-2" />
            All Systems Operational
          </Badge>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="system">System</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            <DashboardOverview />
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <AnalyticsPanel />
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <UsersPanel />
          </TabsContent>

          {/* System Tab */}
          <TabsContent value="system" className="space-y-6">
            <SystemMonitoring />
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <SettingsPanel />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function DashboardOverview() {
  const stats = [
    { label: "Total Users", value: "1,247", change: "+12%", icon: <Users className="w-5 h-5" />, color: "text-blue-500" },
    { label: "API Requests", value: "45.2K", change: "+23%", icon: <Activity className="w-5 h-5" />, color: "text-green-500" },
    { label: "Active Sessions", value: "342", change: "+8%", icon: <Zap className="w-5 h-5" />, color: "text-yellow-500" },
    { label: "System Uptime", value: "99.9%", change: "+0.1%", icon: <Server className="w-5 h-5" />, color: "text-purple-500" },
  ];

  const recentActivity = [
    { time: "2 min ago", event: "New user registration", user: "john@example.com", status: "success" },
    { time: "5 min ago", event: "API rate limit exceeded", user: "api-client-123", status: "warning" },
    { time: "12 min ago", event: "Database backup completed", user: "system", status: "success" },
    { time: "18 min ago", event: "Failed login attempt", user: "admin@test.com", status: "error" },
    { time: "25 min ago", event: "ML model updated", user: "system", status: "success" },
  ];

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <Card key={idx} className="p-6 bg-card border-white/10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">{stat.label}</span>
              <div className={stat.color}>{stat.icon}</div>
            </div>
            <div className="flex items-end justify-between">
              <span className="text-3xl font-bold">{stat.value}</span>
              <span className="text-sm text-green-500">{stat.change}</span>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6 bg-card border-white/10">
          <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {recentActivity.map((activity, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-black/30">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  activity.status === 'success' ? 'bg-green-500' :
                  activity.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                }`} />
                <div className="flex-1">
                  <p className="text-sm font-medium">{activity.event}</p>
                  <p className="text-xs text-muted-foreground">{activity.user}</p>
                </div>
                <span className="text-xs text-muted-foreground">{activity.time}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 bg-card border-white/10">
          <h3 className="text-lg font-semibold mb-4">System Health</h3>
          <div className="space-y-4">
            {[
              { name: "API Server", status: "operational", uptime: "99.9%" },
              { name: "Database", status: "operational", uptime: "99.8%" },
              { name: "ML Services", status: "operational", uptime: "99.7%" },
              { name: "WebSocket", status: "operational", uptime: "99.9%" },
              { name: "Analytics", status: "operational", uptime: "99.6%" },
            ].map((service, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-black/30">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-medium">{service.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground">{service.uptime}</span>
                  <Badge variant="outline" className="text-green-500 border-green-500 text-xs">
                    {service.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </>
  );
}

function AnalyticsPanel() {
  const metrics = [
    { label: "Total Predictions", value: "12,847", period: "Last 30 days" },
    { label: "Avg Response Time", value: "142ms", period: "Last hour" },
    { label: "Success Rate", value: "98.7%", period: "Last 24 hours" },
    { label: "Data Processed", value: "2.4TB", period: "Last 30 days" },
  ];

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, idx) => (
          <Card key={idx} className="p-6 bg-card border-white/10">
            <div className="mb-2">
              <span className="text-2xl font-bold">{metric.value}</span>
            </div>
            <p className="text-sm font-medium mb-1">{metric.label}</p>
            <p className="text-xs text-muted-foreground">{metric.period}</p>
          </Card>
        ))}
      </div>

      <Card className="p-6 bg-card border-white/10">
        <h3 className="text-lg font-semibold mb-4">API Usage by Endpoint</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Endpoint</TableHead>
              <TableHead>Requests</TableHead>
              <TableHead>Avg Time</TableHead>
              <TableHead>Success Rate</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[
              { endpoint: "/api/ml/predict-delay", requests: "15.2K", time: "125ms", success: "99.2%", status: "healthy" },
              { endpoint: "/api/ml/network-status", requests: "8.7K", time: "89ms", success: "99.8%", status: "healthy" },
              { endpoint: "/api/ai/gnn-propagation", requests: "3.4K", time: "245ms", success: "97.5%", status: "healthy" },
              { endpoint: "/api/ai/lstm-forecast", requests: "2.1K", time: "312ms", success: "98.1%", status: "healthy" },
              { endpoint: "/api/analytics/time-series", requests: "1.8K", time: "156ms", success: "99.5%", status: "healthy" },
            ].map((row, idx) => (
              <TableRow key={idx}>
                <TableCell className="font-mono text-sm">{row.endpoint}</TableCell>
                <TableCell>{row.requests}</TableCell>
                <TableCell>{row.time}</TableCell>
                <TableCell>{row.success}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="text-green-500 border-green-500">
                    {row.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </>
  );
}

function UsersPanel() {
  const users = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin", status: "active", lastLogin: "2 hours ago" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User", status: "active", lastLogin: "5 hours ago" },
    { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "User", status: "active", lastLogin: "1 day ago" },
    { id: 4, name: "Alice Brown", email: "alice@example.com", role: "Analyst", status: "inactive", lastLogin: "3 days ago" },
    { id: 5, name: "Charlie Wilson", email: "charlie@example.com", role: "User", status: "active", lastLogin: "12 hours ago" },
  ];

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-2">
          <Input placeholder="Search users..." className="w-64" />
          <Button variant="outline">Filter</Button>
        </div>
        <Button>Add New User</Button>
      </div>

      <Card className="p-6 bg-card border-white/10">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Login</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Badge variant="outline">{user.role}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={user.status === "active" ? "default" : "secondary"}>
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">{user.lastLogin}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">Edit</Button>
                    <Button size="sm" variant="outline">Delete</Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </>
  );
}

function SystemMonitoring() {
  const systemMetrics = [
    { label: "CPU Usage", value: "45%", icon: <Cpu className="w-5 h-5" />, status: "normal" },
    { label: "Memory", value: "6.2GB / 16GB", icon: <HardDrive className="w-5 h-5" />, status: "normal" },
    { label: "Disk Space", value: "124GB / 500GB", icon: <Database className="w-5 h-5" />, status: "normal" },
    { label: "Network", value: "2.4 Mbps", icon: <Activity className="w-5 h-5" />, status: "normal" },
  ];

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {systemMetrics.map((metric, idx) => (
          <Card key={idx} className="p-6 bg-card border-white/10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">{metric.label}</span>
              <div className="text-primary">{metric.icon}</div>
            </div>
            <div className="text-2xl font-bold mb-2">{metric.value}</div>
            <div className="w-full bg-white/10 rounded-full h-2">
              <div className="bg-primary h-2 rounded-full" style={{width: metric.value.split('%')[0] || '50%'}} />
            </div>
          </Card>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6 bg-card border-white/10">
          <h3 className="text-lg font-semibold mb-4">Service Status</h3>
          <div className="space-y-3">
            {[
              { name: "Express Server", port: 5000, status: "running", pid: 12345 },
              { name: "PostgreSQL", port: 5432, status: "running", pid: 12346 },
              { name: "WebSocket Server", port: 5000, status: "running", pid: 12347 },
              { name: "ML Service", port: null, status: "running", pid: 12348 },
            ].map((service, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-black/30">
                <div>
                  <p className="text-sm font-medium">{service.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {service.port && `Port: ${service.port} | `}PID: {service.pid}
                  </p>
                </div>
                <Badge variant="outline" className="text-green-500 border-green-500">
                  {service.status}
                </Badge>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 bg-card border-white/10">
          <h3 className="text-lg font-semibold mb-4">Recent Logs</h3>
          <div className="space-y-2 font-mono text-xs">
            {[
              { time: "16:05:42", level: "INFO", message: "Server started on port 5000" },
              { time: "16:05:43", level: "INFO", message: "Database connected successfully" },
              { time: "16:05:44", level: "INFO", message: "WebSocket server initialized" },
              { time: "16:06:12", level: "WARN", message: "High memory usage detected" },
              { time: "16:07:23", level: "INFO", message: "ML model loaded successfully" },
            ].map((log, idx) => (
              <div key={idx} className="p-2 rounded bg-black/30">
                <span className="text-muted-foreground">[{log.time}]</span>{" "}
                <span className={
                  log.level === "ERROR" ? "text-red-500" :
                  log.level === "WARN" ? "text-yellow-500" : "text-green-500"
                }>[{log.level}]</span>{" "}
                <span>{log.message}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </>
  );
}

function SettingsPanel() {
  return (
    <div className="space-y-6">
      <Card className="p-6 bg-card border-white/10">
        <h3 className="text-lg font-semibold mb-4">General Settings</h3>
        <div className="space-y-4">
          <div>
            <Label htmlFor="siteName">Site Name</Label>
            <Input id="siteName" defaultValue="AeroMind Nexus" className="mt-2" />
          </div>
          <div>
            <Label htmlFor="apiUrl">API Base URL</Label>
            <Input id="apiUrl" defaultValue="http://localhost:5000" className="mt-2" />
          </div>
          <div>
            <Label htmlFor="maxUsers">Max Concurrent Users</Label>
            <Input id="maxUsers" type="number" defaultValue="1000" className="mt-2" />
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-card border-white/10">
        <h3 className="text-lg font-semibold mb-4">ML Model Settings</h3>
        <div className="space-y-4">
          <div>
            <Label htmlFor="modelVersion">Model Version</Label>
            <Input id="modelVersion" defaultValue="v2.1.0" className="mt-2" />
          </div>
          <div>
            <Label htmlFor="confidence">Confidence Threshold</Label>
            <Input id="confidence" type="number" step="0.01" defaultValue="0.85" className="mt-2" />
          </div>
          <div>
            <Label htmlFor="batchSize">Batch Size</Label>
            <Input id="batchSize" type="number" defaultValue="32" className="mt-2" />
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-card border-white/10">
        <h3 className="text-lg font-semibold mb-4">Security Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Two-Factor Authentication</p>
              <p className="text-sm text-muted-foreground">Require 2FA for admin accounts</p>
            </div>
            <Button variant="outline">Enable</Button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">API Rate Limiting</p>
              <p className="text-sm text-muted-foreground">Limit requests per minute</p>
            </div>
            <Button variant="outline">Configure</Button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Session Timeout</p>
              <p className="text-sm text-muted-foreground">Auto logout after inactivity</p>
            </div>
            <Input type="number" defaultValue="30" className="w-24" />
          </div>
        </div>
      </Card>

      <div className="flex justify-end gap-2">
        <Button variant="outline">Cancel</Button>
        <Button>Save Changes</Button>
      </div>
    </div>
  );
}
