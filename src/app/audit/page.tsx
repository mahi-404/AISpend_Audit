import { AuditForm } from "@/components/audit/audit-form";
import { Badge } from "@/components/ui/badge";
import { Zap } from "lucide-react";

export default function AuditPage() {
  return (
    <main className="min-h-screen relative overflow-hidden bg-background selection:bg-primary/20">
      {/* Background Layer */}
      <div className="absolute inset-0 grid-bg -z-10" />
      <div className="absolute inset-0 hero-gradient -z-10" />

      <div className="container mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 relative z-10">
        {/* Centered Brand Header */}
        <div className="flex flex-col items-center mb-12 animate-in">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center shadow-2xl shadow-primary/30">
              <Zap className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-black tracking-tighter uppercase">Credex</span>
          </div>
          <div className="h-[1px] w-12 bg-primary/30" />
        </div>

        <div className="mb-12 text-center animate-in">
          <Badge className="mb-6 bg-primary/10 text-primary border-none text-[10px] uppercase font-black tracking-[0.4em] px-5 py-1.5 shadow-sm">
            Institutional Audit Engine
          </Badge>
          <h1 className="text-6xl font-black tracking-tighter sm:text-7xl lg:text-9xl mb-2 leading-[0.85] max-w-4xl mx-auto">
            AI Spend <span className="gradient-text italic">Validation</span>
          </h1>
          <p className="mx-auto mt-2 max-w-2xl text-xl text-muted-foreground font-medium leading-relaxed opacity-80">
            Professional-grade capital allocation analysis. Our engine verifies your operational parameters against current market benchmarks.
          </p>
        </div>

        <div className="relative animate-in delay-200">
          <div className="absolute -top-24 -left-24 h-96 w-96 bg-primary/5 rounded-full blur-[120px] -z-10" />
          <div className="absolute -bottom-24 -right-24 h-96 w-96 bg-violet-500/5 rounded-full blur-[120px] -z-10" />
          
          <div className="glass-card rounded-[3rem] p-4 sm:p-10 md:p-16 shadow-2xl">
            <AuditForm />
          </div>
        </div>

        {/* Audit Confidence Section */}
        <div className="mt-24 grid gap-8 sm:grid-cols-3">
           <div className="text-center p-6 space-y-3">
              <p className="text-2xl font-black uppercase tracking-tighter">98.4%</p>
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Confidence Rating</p>
           </div>
           <div className="text-center p-6 space-y-3">
              <p className="text-2xl font-black uppercase tracking-tighter">Verified</p>
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Data Integrity</p>
           </div>
           <div className="text-center p-6 space-y-3">
              <p className="text-2xl font-black uppercase tracking-tighter">Real-time</p>
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Market Benchmarks</p>
           </div>
        </div>
      </div>
    </main>
  );
}
