import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Section, SectionHeader } from "@/components/Section";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Activity, TrendingUp, AlertTriangle, CheckCircle2, BarChart3, Network, Zap } from "lucide-react";

function ImagePlaceholder({ icon: Icon, title, subtitle }: { icon: any, title: string, subtitle: string }) {
  return (
    <div className="bg-gradient-to-br from-primary/20 to-blue-900/20 rounded-2xl border border-white/10 p-8 flex flex-col items-center justify-center min-h-[300px] text-center">
      <Icon className="w-20 h-20 text-primary mb-4" />
      <h4 className="text-xl font-bold mb-2">{title}</h4>
      <p className="text-sm text-muted-foreground">{subtitle}</p>
      <div className="mt-6 grid grid-cols-3 gap-4 w-full max-w-xs">
        <div className="h-16 bg-primary/10 rounded-lg animate-pulse" />
        <div className="h-16 bg-primary/10 rounded-lg animate-pulse delay-75" />
        <div className="h-16 bg-primary/10 rounded-lg animate-pulse delay-150" />
      </div>
    </div>
  );
}

export default function Platform() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <Navbar />
      
      <Section className="pt-32">
        <SectionHeader 
          title="Platform Capabilities" 
          subtitle="Comprehensive suite for aviation disruption management"
        />
        
        <Tabs defaultValue="prediction" className="mt-12">
          <TabsList className="grid w-full grid-cols-3 max-w-2xl mx-auto">
            <TabsTrigger value="prediction">Prediction</TabsTrigger>
            <TabsTrigger value="simulation">Simulation</TabsTrigger>
            <TabsTrigger value="detection">Detection</TabsTrigger>
          </TabsList>
          
          <TabsContent value="prediction" className="mt-8">
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-8 bg-card border-white/10">
                <Activity className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-2xl font-bold mb-4">Cascading Delay Prediction</h3>
                <p className="text-muted-foreground mb-6">
                  Our Graph Neural Network analyzes the entire flight network to predict how delays propagate across routes, airports, and aircraft rotations.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-primary mr-2 mt-0.5" />
                    <span className="text-sm">Network-wide impact analysis in real-time</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-primary mr-2 mt-0.5" />
                    <span className="text-sm">Crew legality and connection risk assessment</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-primary mr-2 mt-0.5" />
                    <span className="text-sm">Probabilistic delay forecasting with confidence intervals</span>
                  </li>
                </ul>
              </Card>
              
              <ImagePlaceholder 
                icon={BarChart3}
                title="Predictive Analytics Dashboard"
                subtitle="Real-time delay forecasting with confidence intervals"
              />
            </div>
          </TabsContent>
          
          <TabsContent value="simulation" className="mt-8">
            <div className="grid md:grid-cols-2 gap-8">
              <ImagePlaceholder 
                icon={Network}
                title="Simulation Engine"
                subtitle="What-if scenario analysis and optimization"
              />
              
              <Card className="p-8 bg-card border-white/10">
                <TrendingUp className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-2xl font-bold mb-4">What-If Simulation Engine</h3>
                <p className="text-muted-foreground mb-6">
                  Run thousands of operational scenarios to identify the optimal recovery strategy before executing changes.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-primary mr-2 mt-0.5" />
                    <span className="text-sm">Gate swap optimization</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-primary mr-2 mt-0.5" />
                    <span className="text-sm">Aircraft rotation re-planning</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-primary mr-2 mt-0.5" />
                    <span className="text-sm">Cost-benefit analysis for each scenario</span>
                  </li>
                </ul>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="detection" className="mt-8">
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-8 bg-card border-white/10">
                <AlertTriangle className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-2xl font-bold mb-4">AI Damage Detection</h3>
                <p className="text-muted-foreground mb-6">
                  Computer vision models automatically detect aircraft damage, ramp hazards, and maintenance anomalies during turnaround operations.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-primary mr-2 mt-0.5" />
                    <span className="text-sm">Real-time damage classification</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-primary mr-2 mt-0.5" />
                    <span className="text-sm">Automated maintenance alert generation</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-primary mr-2 mt-0.5" />
                    <span className="text-sm">Historical damage pattern analysis</span>
                  </li>
                </ul>
              </Card>
              
              <ImagePlaceholder 
                icon={Zap}
                title="AI Damage Detection"
                subtitle="Computer vision for aircraft inspection"
              />
            </div>
          </TabsContent>
        </Tabs>
      </Section>
      
      <Footer />
    </div>
  );
}
