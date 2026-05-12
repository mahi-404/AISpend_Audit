import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Lock,
  Sparkles,
  TrendingDown,
  Zap,
  Layers,
  Activity,
  ShieldCheck,
  ArrowUpRight,
  MousePointer2
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function HomePage() {
  return (
    <main className="min-h-screen relative overflow-hidden bg-background selection:bg-primary/20">
      {/* Premium Background Layer */}
      <div className="absolute inset-0 grid-bg -z-10" />
      <div className="absolute inset-0 hero-gradient -z-10" />
      
      {/* Sticky Premium Nav */}
      <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
              <Zap className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-black tracking-tighter uppercase">Credex</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
            <Link href="#methodology" className="hover:text-primary transition-colors">Methodology</Link>
            <Link href="#benchmarks" className="hover:text-primary transition-colors">Benchmarks</Link>
            <Link href="#enterprise" className="hover:text-primary transition-colors">Enterprise</Link>
          </div>
          <Link
            href="/audit"
            className="inline-flex h-9 items-center justify-center rounded-lg bg-foreground px-5 text-[10px] font-black uppercase tracking-widest text-background transition-all hover:scale-105 active:scale-95"
          >
            Run Free Audit
          </Link>
        </div>
      </nav>

      <div className="container relative z-10 px-4 py-20 sm:px-6 lg:px-8 mx-auto">
        {/* Hero Section */}
        <div className="mx-auto max-w-5xl text-center mb-32">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-primary mb-8 animate-in border border-primary/20 shadow-xl shadow-primary/5">
            <Sparkles className="h-3 w-3" /> Professional Financial Intelligence for AI-First Teams
          </div>
          
          <h1 className="animate-in text-6xl font-black tracking-tighter sm:text-8xl lg:text-9xl mb-8 leading-[0.85]">
            Audit Your <span className="gradient-text italic">AI Capital</span> Overhead
          </h1>
          
          <p className="mx-auto max-w-2xl text-xl text-muted-foreground leading-relaxed animate-in mb-12 font-medium">
            Stop guessing your SaaS burn. Credex provides institutional-grade auditing for your AI stack, identifying redundant seats and legacy tiers in 3 minutes.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-in">
            <Link
              href="/audit"
              className="group relative inline-flex h-16 items-center justify-center rounded-2xl bg-primary px-10 text-xs font-black uppercase tracking-[0.2em] text-primary-foreground shadow-2xl shadow-primary/30 transition-all hover:scale-105 hover:shadow-primary/40 active:scale-95"
            >
              Start Free Audit
              <ArrowRight className="ml-3 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="#methodology"
              className="inline-flex h-16 items-center justify-center rounded-2xl border border-border bg-background/50 px-10 text-xs font-black uppercase tracking-[0.2em] backdrop-blur-xl transition-all hover:bg-muted"
            >
              How it works
            </Link>
          </div>

          <div className="mt-16 flex flex-col items-center gap-4 animate-in">
             <div className="flex -space-x-3">
              {[1,2,3,4,5].map(i => (
                <div key={i} className="h-10 w-10 rounded-full border-4 border-background bg-muted flex items-center justify-center overflow-hidden shadow-xl">
                   <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=user${i}`} alt="User" />
                </div>
              ))}
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/60">Trusted by 2,400+ Founders & CFOs</p>
          </div>
        </div>

        {/* Value Propositions */}
        <div className="grid gap-8 md:grid-cols-3 mb-40">
           <FeatureCard 
             icon={TrendingDown}
             title="Redundancy Detection"
             desc="Automatically identify overlapping LLM subscriptions (e.g. ChatGPT + Claude) for small teams."
             color="emerald"
           />
           <FeatureCard 
             icon={ShieldCheck}
             title="Financial Integrity"
             desc="Audit-ready reports with precise math, avoiding floating-point errors in SaaS billing projections."
             color="primary"
           />
           <FeatureCard 
             icon={Layers}
             title="Stack Consolidation"
             desc="Intelligent migration paths from generic tools to use-case specific platforms like Cursor or v0."
             color="violet"
           />
        </div>

        {/* Social Proof Banner */}
        <div className="rounded-[3rem] border border-border/40 bg-card/30 backdrop-blur-xl p-12 mb-40 relative overflow-hidden">
           <div className="absolute top-0 right-0 p-8 opacity-5">
              <Zap className="h-64 w-64" />
           </div>
           <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                 <Badge className="mb-6 bg-primary/10 text-primary border-none text-[10px] uppercase font-black tracking-widest px-4 py-1">Case Study</Badge>
                 <h3 className="text-4xl font-black tracking-tight mb-6 leading-tight">"Credex cut our AI burn by 42% in one audit session."</h3>
                 <p className="text-muted-foreground text-lg mb-8 font-medium">Luminary AI was over-provisioning ChatGPT Enterprise seats. Our engine identified the mismatch and suggested a $12k/year cost saving strategy.</p>
                 <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-muted overflow-hidden">
                       <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" alt="Sarah" />
                    </div>
                    <div>
                       <p className="font-black text-sm uppercase tracking-tight">Sarah Chen</p>
                       <p className="text-xs text-muted-foreground font-bold">CTO, Luminary AI</p>
                    </div>
                 </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                 <div className="rounded-3xl bg-background/50 p-8 border border-border/40">
                    <p className="text-4xl font-black mb-2">$2.4M</p>
                    <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Total Audited Spend</p>
                 </div>
                 <div className="rounded-3xl bg-background/50 p-8 border border-border/40">
                    <p className="text-4xl font-black mb-2">34%</p>
                    <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Avg. Savings ROI</p>
                 </div>
              </div>
           </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mb-40">
           <h2 className="text-4xl sm:text-6xl font-black tracking-tighter mb-8 leading-none">Ready to reclaim your <br/><span className="gradient-text italic">operational margin?</span></h2>
           <Link
              href="/audit"
              className="inline-flex h-20 items-center justify-center rounded-3xl bg-foreground px-12 text-sm font-black uppercase tracking-[0.3em] text-background shadow-2xl transition-all hover:scale-105 active:scale-95"
            >
              Launch Audit Engine
            </Link>
        </div>
      </div>

      <footer className="border-t border-border/40 bg-muted/5 py-20">
         <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-10">
            <div className="flex flex-col items-center md:items-start gap-4">
               <div className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-md bg-primary flex items-center justify-center">
                    <Zap className="h-3.5 w-3.5 text-primary-foreground" />
                  </div>
                  <span className="text-lg font-black tracking-tighter uppercase">Credex</span>
               </div>
               <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/40 max-w-xs text-center md:text-left">
                  Institutional grade financial auditing for the next generation of AI-first companies.
               </p>
            </div>
            <div className="flex flex-wrap justify-center gap-12 text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">
               <Link href="#" className="hover:text-primary transition-colors">Security</Link>
               <Link href="#" className="hover:text-primary transition-colors">Privacy</Link>
               <Link href="#" className="hover:text-primary transition-colors">Legal</Link>
               <Link href="#" className="hover:text-primary transition-colors">API Docs</Link>
            </div>
         </div>
         <p className="text-center text-[10px] font-black uppercase tracking-widest text-muted-foreground/20 mt-12">© 2026 Credex Financial Operations. All Rights Reserved.</p>
      </footer>
    </main>
  );
}

function FeatureCard({ icon: Icon, title, desc, color }: any) {
  return (
    <div className="group rounded-[2.5rem] border border-border/40 bg-card/20 p-10 backdrop-blur-sm transition-all hover:border-primary/40 hover:shadow-2xl">
       <div className={cn(
         "h-14 w-14 rounded-2xl flex items-center justify-center mb-8 transition-all group-hover:scale-110 shadow-lg shadow-black/5",
         color === "primary" ? "bg-primary text-primary-foreground" : `bg-${color}-500/10 text-${color}-500`
       )}>
          <Icon className="h-7 w-7" />
       </div>
       <h4 className="text-xl font-black mb-4 tracking-tight uppercase">{title}</h4>
       <p className="text-muted-foreground leading-relaxed text-sm font-medium">{desc}</p>
    </div>
  );
}
