import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Section, SectionHeader } from "@/components/Section";
import { Card } from "@/components/ui/card";
import { Building2, Plane, Wrench, Globe } from "lucide-react";

export default function Customers() {
  const segments = [
    {
      icon: <Building2 className="w-8 h-8" />,
      title: "Regional Airports",
      description: "Optimize gate utilization, reduce turnaround times, and improve on-time performance.",
      benefits: ["15-20% reduction in delays", "Improved passenger satisfaction", "Better resource allocation"]
    },
    {
      icon: <Plane className="w-8 h-8" />,
      title: "Airlines",
      description: "Network-wide disruption management, crew optimization, and operational cost reduction.",
      benefits: ["$2-5M annual savings per hub", "Reduced crew overtime", "Improved aircraft utilization"]
    },
    {
      icon: <Wrench className="w-8 h-8" />,
      title: "MRO & Ground Handling",
      description: "Predictive maintenance scheduling and automated damage detection systems.",
      benefits: ["30% faster inspections", "Reduced AOG incidents", "Enhanced safety compliance"]
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Aviation Authorities",
      description: "System-wide monitoring, capacity planning, and regulatory compliance tools.",
      benefits: ["Real-time network visibility", "Data-driven policy making", "Enhanced safety oversight"]
    }
  ];

  return (
    <div className="bg-background text-foreground min-h-screen">
      <Navbar />
      
      <Section className="pt-32">
        <SectionHeader 
          title="Who We Serve" 
          subtitle="Transforming operations across the aviation ecosystem"
        />
        
        <div className="grid md:grid-cols-2 gap-8 mt-12">
          {segments.map((segment, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="p-8 h-full bg-card border-white/10 hover:border-primary/50 transition-all duration-300">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                  <div className="text-primary">{segment.icon}</div>
                </div>
                <h3 className="text-2xl font-bold mb-3">{segment.title}</h3>
                <p className="text-muted-foreground mb-6">{segment.description}</p>
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-primary">Key Benefits:</p>
                  <ul className="space-y-2">
                    {segment.benefits.map((benefit, i) => (
                      <li key={i} className="text-sm text-muted-foreground flex items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mr-2" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>
      
      <Footer />
    </div>
  );
}
