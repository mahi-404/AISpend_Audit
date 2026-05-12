"use client";

import React, { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle2, Loader2, Sparkles, Zap } from "lucide-react";

export function LeadCaptureModal() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate enterprise lead capture
    await new Promise(resolve => setTimeout(resolve, 1500));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="lg" className="h-14 min-w-[240px] bg-primary text-primary-foreground font-black text-xs uppercase tracking-widest px-10 shadow-2xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all">
          Speak with a specialist
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[460px] p-0 overflow-hidden border-none rounded-[2rem] bg-background">
        {!submitted ? (
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-violet-500/10 -z-10" />
            <div className="p-10">
              <DialogHeader className="space-y-4">
                <div className="h-12 w-12 rounded-2xl bg-primary flex items-center justify-center shadow-xl shadow-primary/20 mb-2">
                  <Zap className="h-6 w-6 text-primary-foreground" />
                </div>
                <DialogTitle className="text-3xl font-black tracking-tight leading-none">Institutional-Grade <br/>Cost Control</DialogTitle>
                <DialogDescription className="text-base font-medium text-muted-foreground leading-relaxed">
                  Enter your work email to receive a detailed implementation roadmap and schedule a 15-minute capital allocation audit.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                <div className="relative">
                  <Input 
                    type="email" 
                    placeholder="name@company.com" 
                    required 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-14 rounded-xl border-border/60 bg-muted/20 px-6 font-bold text-sm focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>
                <Button type="submit" disabled={loading} className="w-full h-14 bg-foreground text-background font-black text-[10px] uppercase tracking-[0.3em] shadow-xl hover:bg-foreground/90 transition-all">
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Request Implementation Roadmap"}
                </Button>
                <p className="text-center text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest mt-6">
                  Trusted by Series A+ Engineering Teams
                </p>
              </form>
            </div>
          </div>
        ) : (
          <div className="p-12 text-center flex flex-col items-center gap-6 animate-in zoom-in-95 duration-500">
            <div className="h-20 w-20 rounded-full bg-emerald-500/10 flex items-center justify-center shadow-xl shadow-emerald-500/5">
              <CheckCircle2 className="h-10 w-10 text-emerald-500" />
            </div>
            <div>
               <h3 className="text-2xl font-black tracking-tight mb-2">Request Received</h3>
               <p className="text-muted-foreground font-medium text-sm leading-relaxed">Our specialist will reach out within 4 hours with your custom implementation roadmap.</p>
            </div>
            <div className="w-full h-[1px] bg-border/40" />
            <div className="flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-widest">
               <Sparkles className="h-4 w-4" /> Priority Verification Enabled
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
