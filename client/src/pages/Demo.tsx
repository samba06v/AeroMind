import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Section } from "@/components/Section";
import { NetworkVisualization } from "@/components/NetworkVisualization";
import { DelayPredictionChart } from "@/components/DelayPredictionChart";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity, AlertTriangle, TrendingUp, Zap, Play, Pause } from "lucide-react";

export default function Demo() {
  const [isSimulating, setIsSimulating] = useState(false);

  const metrics = [
    { label: "Active Flights", value: "2,847", change: "+12%", icon: <Activity className="w-5 h-5" /> },
    { label: "Predicted Delays", value: "143", change: "-8%", icon: <AlertTriangle className="w-5 h-5" /> },
    { label: "Network Efficiency", value: "94.2%", change: "+2.1%", icon: <TrendingUp className="w-5 h-5" /> },
    { label: "Disruptions Prevented", value: "37", change: "+15%", icon: <Zap className="w-5 h-5" /> },
  ];

  return (
    <div className="bg-background text-foreground min-h-screen">
      <Navbar />
      
      <Section className="pt-32">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold font-display mb-2">Live Platform Demo</h1>
            <p className="text-muted-foreground">Real-time aviation intelligence dashboard</p>
          </div>
          <Button 
            size="lg"
            onClick={() => setIsSimulating(!isSimulating)}
            className="gap-2"
          >
            {isSimulating ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {isSimulating ? "Pause Simulation" : "Start Simulation"}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {metrics.map((metric, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="p-6 bg-card border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">{metric.label}</span>
                  <div className="text-primary">{metric.icon}</div>
                </div>
                <div className="flex items-end justify-between">
                  <span className="text-3xl font-bold">{metric.value}</span>
                  <span className={`text-sm ${metric.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                    {metric.change}
                  </span>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <Tabs defaultValue="network" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 max-w-md">
            <TabsTrigger value="network">Network</TabsTrigger>
            <TabsTrigger value="predictions">Predictions</TabsTrigger>
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
          </TabsList>

          <TabsContent value="network" className="space-y-6">
            <NetworkVisualization />
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6 bg-card border-white/10">
                <h3 className="text-lg font-semibold mb-4">Recent Events</h3>
                <div className="space-y-3">
                  {[
                    { time: "14:23", event: "Weather delay detected at ORD", severity: "warning" },
                    { time: "14:18", event: "Gate conflict resolved at LAX", severity: "success" },
                    { time: "14:12", event: "Crew legality issue at JFK", severity: "critical" },
                    { time: "14:05", event: "Optimal route suggested for AA442", severity: "info" },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-black/30">
                      <span className={`w-2 h-2 rounded-full mt-2 ${
                        item.severity === 'critical' ? 'bg-red-500' :
                        item.severity === 'warning' ? 'bg-yellow-500' :
                        item.severity === 'success' ? 'bg-green-500' : 'bg-blue-500'
                      }`} />
                      <div className="flex-1">
                        <p className="text-sm">{item.event}</p>
                        <span className="text-xs text-muted-foreground">{item.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6 bg-card border-white/10">
                <h3 className="text-lg font-semibold mb-4">Optimization Suggestions</h3>
                <div className="space-y-4">
                  {[
                    { action: "Swap gates 23 & 24 at ORD", impact: "Save 18 min", confidence: 94 },
                    { action: "Delay departure AA442 by 5 min", impact: "Prevent cascade", confidence: 87 },
                    { action: "Reroute UA123 via alternate path", impact: "Save $2.4K fuel", confidence: 91 },
                  ].map((suggestion, idx) => (
                    <div key={idx} className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                      <div className="flex items-start justify-between mb-2">
                        <p className="text-sm font-medium">{suggestion.action}</p>
                        <span className="text-xs text-primary">{suggestion.confidence}% confidence</span>
                      </div>
                      <p className="text-xs text-muted-foreground mb-3">{suggestion.impact}</p>
                      <Button size="sm" variant="outline" className="w-full">Apply Suggestion</Button>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="predictions">
            <DelayPredictionChart />
            
            <div className="grid md:grid-cols-3 gap-6 mt-6">
              <Card className="p-6 bg-card border-white/10">
                <h4 className="text-sm font-semibold mb-2 text-muted-foreground">Model Accuracy</h4>
                <p className="text-3xl font-bold">96.8%</p>
                <p className="text-xs text-green-500 mt-1">+1.2% from last week</p>
              </Card>
              <Card className="p-6 bg-card border-white/10">
                <h4 className="text-sm font-semibold mb-2 text-muted-foreground">Avg Prediction Lead Time</h4>
                <p className="text-3xl font-bold">4.2 hrs</p>
                <p className="text-xs text-muted-foreground mt-1">Before disruption occurs</p>
              </Card>
              <Card className="p-6 bg-card border-white/10">
                <h4 className="text-sm font-semibold mb-2 text-muted-foreground">Cost Savings (Today)</h4>
                <p className="text-3xl font-bold">$127K</p>
                <p className="text-xs text-green-500 mt-1">From prevented delays</p>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="alerts">
            <Card className="p-6 bg-card border-white/10">
              <h3 className="text-lg font-semibold mb-4">Active Alerts</h3>
              <div className="space-y-4">
                {[
                  { 
                    title: "Severe Weather Approaching DEN", 
                    desc: "Thunderstorms expected 16:00-19:00. 23 flights affected.",
                    severity: "critical",
                    time: "2 min ago"
                  },
                  { 
                    title: "Crew Shortage at ATL", 
                    desc: "3 crews approaching duty time limits. Recommend crew swap.",
                    severity: "warning",
                    time: "15 min ago"
                  },
                  { 
                    title: "Aircraft Maintenance Alert", 
                    desc: "N12345 requires inspection before next departure.",
                    severity: "warning",
                    time: "28 min ago"
                  },
                ].map((alert, idx) => (
                  <div key={idx} className={`p-4 rounded-lg border ${
                    alert.severity === 'critical' 
                      ? 'bg-red-500/10 border-red-500/30' 
                      : 'bg-yellow-500/10 border-yellow-500/30'
                  }`}>
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold">{alert.title}</h4>
                      <span className="text-xs text-muted-foreground">{alert.time}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{alert.desc}</p>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">View Details</Button>
                      <Button size="sm">Take Action</Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </Section>
      
      <Footer />
    </div>
  );
}
