import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Section, SectionHeader } from "@/components/Section";
import { Brain, Network, Cpu, Database, Eye, GitBranch } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function Technology() {
  const technologies = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Graph Neural Networks",
      description: "Advanced GNN architecture models complex flight network dependencies and cascading delay propagation patterns.",
      details: ["Temporal Graph Convolution", "Multi-hop Attention Mechanism", "Real-time Network State Prediction"]
    },
    {
      icon: <Network className="w-8 h-8" />,
      title: "Digital Twin Architecture",
      description: "Real-time virtual replica of global aviation operations synchronized with live data streams.",
      details: ["Event-driven Simulation", "State Synchronization", "Predictive State Modeling"]
    },
    {
      icon: <Eye className="w-8 h-8" />,
      title: "Computer Vision AI",
      description: "Deep learning models for aircraft damage detection, ramp safety monitoring, and anomaly identification.",
      details: ["YOLOv8 Object Detection", "Semantic Segmentation", "Defect Classification"]
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: "Data Fusion Engine",
      description: "Multi-source data integration combining weather, telemetry, schedules, and operational data.",
      details: ["Stream Processing", "Data Normalization", "Real-time ETL Pipeline"]
    },
    {
      icon: <Cpu className="w-8 h-8" />,
      title: "Optimization Engine",
      description: "Monte Carlo simulation and constraint optimization for decision recommendation.",
      details: ["Multi-objective Optimization", "Constraint Satisfaction", "Scenario Generation"]
    },
    {
      icon: <GitBranch className="w-8 h-8" />,
      title: "Time-Series Forecasting",
      description: "LSTM and Transformer models for delay prediction and demand forecasting.",
      details: ["Attention Mechanisms", "Multi-variate Forecasting", "Uncertainty Quantification"]
    }
  ];

  return (
    <div className="bg-background text-foreground min-h-screen">
      <Navbar />
      
      <Section className="pt-32">
        <SectionHeader 
          title="Technology Stack" 
          subtitle="Built on cutting-edge AI/ML and distributed systems architecture"
        />
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {technologies.map((tech, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="p-6 h-full bg-card border-white/10 hover:border-primary/50 transition-all duration-300 group">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <div className="text-primary">{tech.icon}</div>
                </div>
                <h3 className="text-xl font-bold mb-2">{tech.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">{tech.description}</p>
                <ul className="space-y-2">
                  {tech.details.map((detail, i) => (
                    <li key={i} className="text-xs text-muted-foreground flex items-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mr-2" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>
      
      <Footer />
    </div>
  );
}
