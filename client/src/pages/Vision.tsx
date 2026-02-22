import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Section, SectionHeader } from "@/components/Section";
import { Card } from "@/components/ui/card";
import { Target, Lightbulb, Users, TrendingUp } from "lucide-react";

export default function Vision() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <Navbar />
      
      <Section className="pt-32">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold font-display mb-6"
          >
            Our Vision
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-muted-foreground"
          >
            Making global aviation predictive, not reactive
          </motion.p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card className="p-8 bg-card border-white/10">
            <Target className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-2xl font-bold mb-4">Mission</h3>
            <p className="text-muted-foreground leading-relaxed">
              To transform aviation from a reactive, fragmented industry into a unified, predictive ecosystem where disruptions are prevented before they cascade, operations are optimized in real-time, and every stakeholder has access to actionable intelligence.
            </p>
          </Card>
          
          <Card className="p-8 bg-card border-white/10">
            <Lightbulb className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-2xl font-bold mb-4">Philosophy</h3>
            <p className="text-muted-foreground leading-relaxed">
              We believe that aviation's complexity is its strength, not its weakness. By connecting disparate systems and applying advanced AI, we can turn the industry's interconnected nature into a competitive advantage that benefits airlines, airports, and passengers alike.
            </p>
          </Card>
        </div>
        
        <div className="bg-gradient-to-br from-primary/10 to-blue-900/10 rounded-3xl p-12 border border-white/10">
          <h2 className="text-3xl font-bold mb-8 text-center">The Transformation</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-red-500 mb-2">Reactive</div>
              <div className="text-2xl mb-4">→</div>
              <div className="text-4xl font-bold text-primary">Predictive</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-500 mb-2">Fragmented</div>
              <div className="text-2xl mb-4">→</div>
              <div className="text-4xl font-bold text-primary">Unified</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-500 mb-2">Delayed</div>
              <div className="text-2xl mb-4">→</div>
              <div className="text-4xl font-bold text-primary">Optimized</div>
            </div>
          </div>
        </div>
      </Section>
      
      <Section dark>
        <SectionHeader title="Long-term Goals" />
        <div className="grid md:grid-cols-2 gap-6 mt-12">
          <Card className="p-6 bg-card border-white/10">
            <Users className="w-10 h-10 text-primary mb-4" />
            <h4 className="text-xl font-bold mb-2">Global Network Effect</h4>
            <p className="text-muted-foreground text-sm">
              Build the world's largest aviation intelligence network where every connected airport and airline contributes to and benefits from collective predictive power.
            </p>
          </Card>
          <Card className="p-6 bg-card border-white/10">
            <TrendingUp className="w-10 h-10 text-primary mb-4" />
            <h4 className="text-xl font-bold mb-2">Industry Standard</h4>
            <p className="text-muted-foreground text-sm">
              Establish AeroMind Nexus as the de facto platform for aviation disruption management, integrated into every major airline and airport operations center.
            </p>
          </Card>
        </div>
      </Section>
      
      <Footer />
    </div>
  );
}
