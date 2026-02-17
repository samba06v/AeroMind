import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { 
  ArrowRight, 
  Activity, 
  Network, 
  Shield, 
  Cpu, 
  Globe, 
  Zap,
  BarChart3,
  GitGraph,
  Layers,
  CheckCircle2
} from "lucide-react";

import { Navbar } from "@/components/Navbar";
import { Section, SectionHeader } from "@/components/Section";
import { FeatureCard } from "@/components/FeatureCard";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useContactForm, useNewsletter } from "@/hooks/use-contact";
import { api } from "@shared/routes";

// --- Hero Section ---
function Hero() {
  return (
    <div className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Abstract Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-900/20 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4" />
        
        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-6 backdrop-blur-sm">
            <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse" />
            Next Gen Aviation Intelligence
          </div>
          <h1 className="text-5xl md:text-7xl font-bold font-display leading-[1.1] mb-6">
            Predict. Simulate. <br />
            <span className="text-gradient">Prevent Disruption.</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-lg leading-relaxed">
            Transforming reactive aviation operations into a predictive, unified intelligence network. Stop disruptions before they cascade.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="text-lg px-8 py-6 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_30px_-10px_var(--primary)]">
              Request Demo
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6 rounded-full border-white/20 hover:bg-white/5">
              Explore Platform
            </Button>
          </div>
        </motion.div>

        {/* Hero Visual - Abstract Globe/Network */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative h-[400px] md:h-[600px] w-full"
        >
          {/* Unsplash abstract tech image placeholder */}
          <div className="relative w-full h-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-black/50 backdrop-blur-sm group">
             {/* Tech network abstract */}
            <img 
              src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=80" 
              alt="Global network connectivity" 
              className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-700 group-hover:scale-105 transform"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
            
            {/* Floating UI Cards */}
            <motion.div 
              animate={{ y: [0, -20, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="absolute top-1/4 right-8 bg-black/80 backdrop-blur-md border border-primary/30 p-4 rounded-xl shadow-xl max-w-[200px]"
            >
              <div className="flex items-center gap-2 mb-2">
                <Activity className="text-primary w-4 h-4" />
                <span className="text-xs font-mono text-primary">LIVE MONITORING</span>
              </div>
              <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                <div className="h-full w-[75%] bg-primary" />
              </div>
              <p className="text-xs mt-2 text-white/70">Efficiency: 98.4%</p>
            </motion.div>

            <motion.div 
              animate={{ y: [0, 15, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-1/3 left-8 bg-black/80 backdrop-blur-md border border-red-500/30 p-4 rounded-xl shadow-xl"
            >
              <div className="flex items-center gap-2 mb-1">
                <Zap className="text-red-500 w-4 h-4" />
                <span className="text-xs font-mono text-red-500">ANOMALY DETECTED</span>
              </div>
              <p className="text-xs text-white">Route 442 - Weather Delay</p>
              <p className="text-xs text-primary mt-1">Simulating alternative...</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// --- The Problem Section ---
function ProblemSection() {
  return (
    <Section id="problem" dark>
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <div>
          <SectionHeader 
            title="The Fragmentation Crisis" 
            subtitle="Today's aviation ecosystem is disjointed. Airlines, airports, and ATC operate in silos, leading to cascading failures."
            align="left"
          />
          
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center shrink-0 border border-red-500/20">
                <Activity className="text-red-500 w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xl font-bold mb-2">The Butterfly Effect</h4>
                <p className="text-muted-foreground">A generic 20-minute delay at a single hub can cascade into a multi-hour global disruption within 4 hours.</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center shrink-0 border border-orange-500/20">
                <Layers className="text-orange-500 w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xl font-bold mb-2">Siloed Data</h4>
                <p className="text-muted-foreground">Critical operational data is trapped in legacy systems. Decisions are made with incomplete pictures.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative">
          {/* Visual representation of fragmentation vs unity */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-card border border-white/5 p-6 rounded-2xl h-48 flex flex-col justify-between">
              <span className="text-muted-foreground font-mono text-sm">AIRLINE OPS</span>
              <div className="h-2 w-full bg-red-500/50 rounded-full" />
            </div>
            <div className="bg-card border border-white/5 p-6 rounded-2xl h-48 flex flex-col justify-between translate-y-8">
              <span className="text-muted-foreground font-mono text-sm">ATC DATA</span>
              <div className="h-2 w-2/3 bg-orange-500/50 rounded-full" />
            </div>
            <div className="bg-card border border-white/5 p-6 rounded-2xl h-48 flex flex-col justify-between -translate-y-8">
              <span className="text-muted-foreground font-mono text-sm">GROUND HANDLING</span>
              <div className="h-2 w-1/2 bg-yellow-500/50 rounded-full" />
            </div>
            <div className="bg-card border border-white/5 p-6 rounded-2xl h-48 flex flex-col justify-between">
              <span className="text-muted-foreground font-mono text-sm">MAINTENANCE</span>
              <div className="h-2 w-3/4 bg-blue-500/50 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

// --- Solution / Pillars Section ---
function SolutionSection() {
  const features = [
    {
      icon: <Network className="w-6 h-6" />,
      title: "Cascading Prediction",
      description: "Proprietary Graph Neural Networks model how delays propagate across the global network in real-time.",
      delay: 0
    },
    {
      icon: <GitGraph className="w-6 h-6" />,
      title: "Data Fusion",
      description: "Integrate weather, flight telemetry, crew schedules, and passenger loads into a single source of truth.",
      delay: 0.1
    },
    {
      icon: <Cpu className="w-6 h-6" />,
      title: "Decision Simulation",
      description: "Run thousands of 'What-if' scenarios per second to find the optimal recovery strategy before acting.",
      delay: 0.2
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "AI Safety Vision",
      description: "Computer Vision automatically detects ramp hazards and aircraft damage during turnaround.",
      delay: 0.3
    }
  ];

  return (
    <Section id="solution">
      <SectionHeader 
        title="Prescriptive Aviation Intelligence" 
        subtitle="We don't just show you the problem. We simulate the solution."
      />
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((f, i) => (
          <FeatureCard key={i} {...f} />
        ))}
      </div>
    </Section>
  );
}

// --- Product Walkthrough ---
function ProductSection() {
  const steps = [
    {
      step: "01",
      title: "Data Ingestion",
      desc: "Connects to legacy airline ERPs, AODB, and external weather APIs.",
      img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80" // Dashboard data
    },
    {
      step: "02",
      title: "Predictive Intelligence",
      desc: "Graph Neural Networks analyze historical patterns to forecast disruptions.",
      img: "https://images.unsplash.com/photo-1558494949-ef526b0042a0?w=800&q=80" // Server room/AI
    },
    {
      step: "03",
      title: "Prescriptive Simulation",
      desc: "The 'What-If' Engine generates optimal recovery plans.",
      img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80" // Analytics chart
    }
  ];

  return (
    <Section id="product" dark>
      <SectionHeader title="How It Works" />
      <div className="space-y-24">
        {steps.map((item, index) => (
          <div key={index} className={cn("flex flex-col md:flex-row gap-12 items-center", index % 2 !== 0 ? "md:flex-row-reverse" : "")}>
            <div className="flex-1 space-y-6">
              <span className="text-6xl font-display font-bold text-white/5">{item.step}</span>
              <h3 className="text-3xl font-bold font-display">{item.title}</h3>
              <p className="text-lg text-muted-foreground">{item.desc}</p>
              <ul className="space-y-3 mt-4">
                <li className="flex items-center text-sm text-muted-foreground">
                  <CheckCircle2 className="text-primary w-4 h-4 mr-2" /> Real-time processing
                </li>
                <li className="flex items-center text-sm text-muted-foreground">
                  <CheckCircle2 className="text-primary w-4 h-4 mr-2" /> Legacy system compatible
                </li>
              </ul>
            </div>
            <div className="flex-1 relative group">
              <div className="absolute inset-0 bg-primary/20 blur-2xl group-hover:bg-primary/30 transition-all duration-500 rounded-full" />
              <img 
                src={item.img} 
                alt={item.title} 
                className="relative z-10 rounded-2xl border border-white/10 shadow-2xl w-full h-auto object-cover aspect-video grayscale group-hover:grayscale-0 transition-all duration-500"
              />
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

// --- Contact Form Component ---
function ContactSection() {
  const mutation = useContactForm();
  
  const formSchema = z.object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Invalid email address"),
    company: z.string().min(2, "Company is required"),
    role: z.string().optional(),
    message: z.string().min(10, "Message must be at least 10 characters"),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      role: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutation.mutate(values);
    form.reset();
  }

  return (
    <Section id="contact">
      <div className="max-w-4xl mx-auto bg-card border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] pointer-events-none" />
        
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold font-display mb-4">Partner with AeroMind</h2>
            <p className="text-muted-foreground mb-8">
              Ready to transform your operations? Get in touch with our team to schedule a demo or discuss your specific needs.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Globe className="text-primary w-6 h-6 mt-1" />
                <div>
                  <h4 className="font-semibold text-foreground">Global HQ</h4>
                  <p className="text-sm text-muted-foreground">123 Aviation Blvd, Suite 400<br/>San Francisco, CA 94107</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <BarChart3 className="text-primary w-6 h-6 mt-1" />
                <div>
                  <h4 className="font-semibold text-foreground">Sales</h4>
                  <p className="text-sm text-muted-foreground">sales@aeromindnexus.com<br/>+1 (555) 123-4567</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-background/50 p-6 rounded-2xl border border-white/5">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} className="bg-white/5 border-white/10" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="john@airline.com" {...field} className="bg-white/5 border-white/10" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company</FormLabel>
                        <FormControl>
                          <Input placeholder="Acme Airways" {...field} className="bg-white/5 border-white/10" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Role</FormLabel>
                        <FormControl>
                          <Input placeholder="Director of Ops" {...field} className="bg-white/5 border-white/10" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Tell us about your operational challenges..." className="resize-none bg-white/5 border-white/10 min-h-[100px]" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button 
                  type="submit" 
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                  disabled={mutation.isPending}
                >
                  {mutation.isPending ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </Section>
  );
}

export default function Home() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <Navbar />
      <Hero />
      <ProblemSection />
      <SolutionSection />
      <ProductSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
