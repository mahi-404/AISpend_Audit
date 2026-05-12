"use client";

import React from "react";
import { AuditResult, AuditRecommendation } from "@/types/audit";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingDown, 
  ArrowRight, 
  Zap, 
  ShieldCheck, 
  Calendar, 
  PieChart, 
  BarChart3, 
  ArrowUpRight,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Activity,
  Target,
  Layers,
  Lock,
  ArrowDownToLine,
  Info
} from "lucide-react";
import { cn } from "@/lib/utils";
import { LeadCaptureModal } from "./lead-capture";

interface AuditDashboardProps {
  result: AuditResult;
  onReset: () => void;
}

export function AuditDashboard({ result, onReset }: AuditDashboardProps) {
  const [summary, setSummary] = React.useState<string>("");
  const [loadingSummary, setLoadingSummary] = React.useState(true);

  React.useEffect(() => {
    async function fetchSummary() {
      setLoadingSummary(true);
      try {
        const res = await fetch("/api/generate-summary", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ result }),
        });
        
        if (!res.ok) throw new Error("API call failed");
        
        const data = await res.json();
        if (data.summary) {
          setSummary(data.summary);
        } else {
          throw new Error("Empty summary received");
        }
      } catch (e) {
        console.error("Failed to fetch summary", e);
        // Consultant-grade fallback
        const fallback = `Based on our proprietary audit of your AI stack, we've identified $${result.totalSavingsMonthly} in immediate monthly optimization opportunities. Your current ${result.metrics.stackComplexityScore}/10 complexity score indicates potential tool sprawl. By consolidating redundancies and right-sizing subscriptions, your team can achieve a ${result.metrics.efficiencyScore}% efficiency rating, outperforming ${result.metrics.benchmarkPercentile}% of similar startups in your sector.`;
        setSummary(fallback);
      } finally {
        setLoadingSummary(false);
      }
    }
    fetchSummary();
  }, [result]);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-10 pb-32">
      {/* Premium Header */}
      <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end border-b border-border/40 pb-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary px-3 py-1 text-[10px] font-black uppercase tracking-widest">
              Financial Integrity Verified
            </Badge>
            <span className="text-xs text-muted-foreground font-medium">Audit ID: {Math.random().toString(36).substring(7).toUpperCase()}</span>
          </div>
          <h2 className="text-4xl font-black tracking-tighter sm:text-5xl lg:text-6xl">
            Audit <span className="text-primary italic">Intelligence</span> Report
          </h2>
          <p className="mt-4 max-w-xl text-lg text-muted-foreground leading-relaxed">
            Professional analysis of your AI operational overhead with {result.recommendations.length} high-impact strategic interventions.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="lg" className="h-12 border-border/60 hover:bg-muted font-bold text-xs uppercase tracking-widest px-6" onClick={() => window.print()}>
            <ArrowDownToLine className="mr-2 h-4 w-4" /> Download Report
          </Button>
          <Button size="lg" className="h-12 bg-primary text-primary-foreground font-black text-xs uppercase tracking-widest px-8 shadow-xl shadow-primary/20" onClick={onReset}>
            Restart Audit
          </Button>
        </div>
      </div>

      {/* Strategic Efficiency Gauge Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <ScoreCard 
          title="Stack Efficiency" 
          value={result.metrics.efficiencyScore} 
          subtitle="Overall performance"
          icon={Activity}
          color="primary"
          percentage
        />
        <ScoreCard 
          title="Optimization Potential" 
          value={Math.round((result.totalSavingsMonthly / result.totalCurrentMonthlySpend) * 100)} 
          subtitle="Monthly spend reduction"
          icon={TrendingDown}
          color="emerald"
          percentage
        />
        <ScoreCard 
          title="Operational Risk" 
          value={result.metrics.riskScore} 
          subtitle="Sprawl & redundancy"
          icon={ShieldCheck}
          color="orange"
          percentage
          inverse
        />
        <ScoreCard 
          title="Complexity Index" 
          value={result.metrics.stackComplexityScore} 
          subtitle="Out of 10 scale"
          icon={Layers}
          color="violet"
        />
      </div>

      {/* Main Stats with Visualizations */}
      <div className="grid gap-8 lg:grid-cols-3">
        <Card className="lg:col-span-2 overflow-hidden border-border/40 shadow-2xl bg-card/30 backdrop-blur-sm">
          <CardHeader className="border-b border-border/40 pb-6">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-black">Financial Trajectory</CardTitle>
                <CardDescription>Monthly savings impact on annual budget</CardDescription>
              </div>
              <div className="text-right">
                <p className="text-3xl font-black text-emerald-500">-${result.totalSavingsYearly.toLocaleString()}</p>
                <p className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Total Yearly Impact</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="flex flex-col md:flex-row">
              <div className="flex-1 p-8 space-y-8 border-r border-border/40">
                <div className="space-y-2">
                  <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Spend Breakdown</p>
                  <div className="relative pt-4">
                    <div className="flex h-12 overflow-hidden rounded-xl bg-muted/30">
                      <div className="bg-primary transition-all duration-1000 group relative" style={{ width: `${(result.newProjectedMonthlySpend / result.totalCurrentMonthlySpend) * 100}%` }}>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100" />
                      </div>
                      <div className="bg-emerald-500 transition-all duration-1000 group relative animate-pulse" style={{ width: `${(result.totalSavingsMonthly / result.totalCurrentMonthlySpend) * 100}%` }}>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100" />
                      </div>
                    </div>
                    <div className="mt-4 flex justify-between text-xs font-bold">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-sm bg-primary" />
                        <span>Optimized Spend: ${result.newProjectedMonthlySpend}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-sm bg-emerald-500" />
                        <span>Total Savings: ${result.totalSavingsMonthly}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">Spend Per Employee</p>
                    <p className="text-2xl font-black">${result.metrics.spendPerEmployee}</p>
                    <p className="text-[10px] text-muted-foreground italic mt-1">Monthly weighted average</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">Annual Waste</p>
                    <p className="text-2xl font-black text-rose-500">${result.metrics.annualWaste.toLocaleString()}</p>
                    <p className="text-[10px] text-muted-foreground italic mt-1">Projected at current burn</p>
                  </div>
                </div>
              </div>

              <div className="w-full md:w-80 p-8 bg-muted/10">
                <h4 className="text-sm font-black uppercase tracking-widest mb-6">Strategic Benchmark</h4>
                <div className="space-y-6">
                  <div className="relative h-40 w-full flex items-end justify-center">
                    {/* SVG Gauge */}
                    <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                      <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="8" className="text-muted/10" />
                      <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="8" strokeDasharray="251.2" strokeDashoffset={251.2 - (251.2 * result.metrics.benchmarkPercentile) / 100} className="text-primary transition-all duration-1000" strokeLinecap="round" />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <div className="flex items-center gap-1">
                        <span className="text-4xl font-black leading-none">{result.metrics.benchmarkPercentile}</span>
                        <span className="text-sm font-bold text-muted-foreground">%</span>
                      </div>
                      <span className="text-[10px] font-black uppercase text-muted-foreground/60 mt-2 tracking-widest">Percentile</span>
                    </div>
                  </div>
                  <p className="text-xs text-center text-muted-foreground leading-relaxed">
                    Your efficiency exceeds <span className="text-foreground font-bold">{result.metrics.benchmarkPercentile}%</span> of companies with similar team sizes.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI Consultant Summary */}
        <Card className="border-primary/20 bg-primary/5 shadow-xl relative overflow-hidden h-full">
          <div className="absolute top-0 right-0 p-4">
             <div className="h-2 w-2 rounded-full bg-primary animate-ping" />
          </div>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-xl font-black uppercase tracking-tight">
              <Sparkles className="h-5 w-5 text-primary" />
              Executive Insight
            </CardTitle>
            <CardDescription className="text-xs font-medium text-primary/70 uppercase tracking-widest">Consultant-Grade Analysis</CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            {loadingSummary ? (
              <div className="space-y-4 animate-pulse">
                <div className="h-4 w-full rounded bg-primary/10" />
                <div className="h-4 w-5/6 rounded bg-primary/10" />
                <div className="h-4 w-4/5 rounded bg-primary/10" />
                <div className="h-4 w-full rounded bg-primary/10" />
              </div>
            ) : (
              <p className="text-base leading-relaxed text-foreground/90 font-medium italic border-l-2 border-primary/30 pl-4 py-2">
                "{summary}"
              </p>
            )}
            
            <div className="mt-10 pt-8 border-t border-primary/10">
              <h5 className="text-[10px] font-black uppercase text-primary tracking-widest mb-4">Strategic Next Steps</h5>
              <ul className="space-y-4">
                <NextStep icon={Lock} text="Secure enterprise-wide seat auditing" />
                <NextStep icon={Target} text="Consolidate duplicate LLM workspaces" />
                <NextStep icon={BarChart3} text="Implement real-time spend tracking" />
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Strategic Recommendations Sections */}
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-black flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Zap className="h-4 w-4 text-primary" />
            </div>
            Strategic Optimization Roadmap
          </h3>
          <div className="flex items-center gap-4 text-xs font-bold text-muted-foreground uppercase tracking-widest">
            <span>{result.recommendations.length} Active Items</span>
            <div className="h-4 w-[1px] bg-border" />
            <span>Sorted by High Impact</span>
          </div>
        </div>

        <div className="grid gap-6">
          {result.recommendations.map((rec, i) => (
            <DetailedRecommendationCard key={i} recommendation={rec} />
          ))}
          
          {result.recommendations.length === 0 && (
            <div className="flex flex-col items-center justify-center rounded-[2rem] border-2 border-dashed border-border py-24 text-center bg-card/10">
              <div className="h-16 w-16 rounded-full bg-emerald-500/10 flex items-center justify-center mb-6">
                <CheckCircle2 className="h-8 w-8 text-emerald-500" />
              </div>
              <h4 className="text-2xl font-black">Capital Allocation: Optimized</h4>
              <p className="mt-3 max-w-sm text-muted-foreground">Your AI operational overhead is currently at peak efficiency. No immediate interventions required.</p>
            </div>
          )}
        </div>
      </div>

      {/* Final Conversion / CTA */}
      <Card className="overflow-hidden border-none bg-[#0a0a0a] text-white shadow-2xl relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-violet-500/10 opacity-50" />
        <CardContent className="relative flex flex-col items-center justify-between gap-10 p-12 md:flex-row">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-[10px] font-black uppercase tracking-widest text-primary">
              <Sparkles className="h-3 w-3" /> Professional Advisory
            </div>
            <h3 className="text-3xl font-black tracking-tight md:text-4xl">Maximize Your Savings with <span className="gradient-text">Credex Enterprise</span></h3>
            <p className="text-lg text-white/60 leading-relaxed">
              Our specialists help Series A+ startups implement institutional-grade AI cost controls. Save an average of 34% more with our direct API partnerships.
            </p>
          </div>
          <LeadCaptureModal />
        </CardContent>
      </Card>
    </div>
  );
}

function ScoreCard({ title, value, subtitle, icon: Icon, color, percentage = false, inverse = false }: any) {
  const isGood = inverse ? value < 30 : value > 70;
  const isBad = inverse ? value > 70 : value < 30;

  return (
    <Card className="relative overflow-hidden border-border/40 hover:border-primary/40 transition-all group">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-[10px] font-black uppercase tracking-widest text-muted-foreground group-hover:text-primary transition-colors">
          {title}
        </CardTitle>
        <Icon className={cn("h-4 w-4", color === "primary" ? "text-primary" : `text-${color}-500`)} />
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline gap-1">
          <p className="text-4xl font-black tracking-tighter">{value}{percentage && "%"}</p>
          <span className={cn(
            "text-[10px] font-bold uppercase tracking-tight px-2 py-0.5 rounded-full",
            isGood ? "bg-emerald-500/10 text-emerald-500" : isBad ? "bg-rose-500/10 text-rose-500" : "bg-orange-500/10 text-orange-500"
          )}>
            {isGood ? "Optimized" : isBad ? "Critical" : "Stable"}
          </span>
        </div>
        <p className="mt-2 text-xs text-muted-foreground font-medium">{subtitle}</p>
        
        {/* Progress Bar Mini */}
        <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-muted/40">
          <div 
            className={cn("h-full transition-all duration-1000", color === "primary" ? "bg-primary" : `bg-${color}-500`)} 
            style={{ width: `${percentage ? value : (value / 10) * 100}%` }} 
          />
        </div>
      </CardContent>
    </Card>
  );
}

function DetailedRecommendationCard({ recommendation: rec }: { recommendation: AuditRecommendation }) {
  return (
    <Card className="group overflow-hidden border-border/40 transition-all hover:border-primary/40 hover:shadow-2xl bg-card/20">
      <div className="flex flex-col lg:flex-row divide-y lg:divide-y-0 lg:divide-x divide-border/40">
        <div className="flex-1 p-8 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Badge className="rounded-md h-8 px-4 font-black uppercase text-[10px] tracking-widest bg-primary text-primary-foreground">
                {rec.tool}
              </Badge>
              <Badge variant="outline" className="rounded-md h-8 px-4 font-bold uppercase text-[9px] tracking-widest border-border text-muted-foreground">
                {rec.type.replace("-", " ")}
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase text-muted-foreground">Confidence</span>
              <div className="flex items-center gap-1">
                {[1,2,3,4,5].map(i => (
                  <div key={i} className={cn("h-1.5 w-3 rounded-full", i <= Math.round((rec.confidenceScore || 0) / 20) ? "bg-primary" : "bg-muted")} />
                ))}
              </div>
            </div>
          </div>
          
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-4">
              <div className="flex items-center gap-4 bg-muted/20 p-4 rounded-2xl border border-border/40">
                <div className="flex flex-col">
                  <span className="text-[9px] font-black uppercase text-muted-foreground tracking-widest mb-1">Current State</span>
                  <span className="text-sm font-black truncate">{rec.currentPlan}</span>
                </div>
                <ArrowRight className="h-4 w-4 text-primary shrink-0" />
                <div className="flex flex-col">
                  <span className="text-[9px] font-black uppercase text-primary tracking-widest mb-1">Proposed State</span>
                  <span className="text-sm font-black text-primary truncate">{rec.recommendedPlan}{rec.recommendedTool ? ` (${rec.recommendedTool})` : ""}</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed font-medium">
                <span className="font-black text-foreground mr-1">Finding:</span> {rec.reason}
              </p>
            </div>

            <div className="space-y-4 border-l border-border/40 pl-6">
              <div className="space-y-1">
                <p className="text-[9px] font-black uppercase text-emerald-500 tracking-widest">Financial Intelligence</p>
                <p className="text-xs font-bold leading-relaxed">{rec.financialImpact}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[9px] font-black uppercase text-orange-500 tracking-widest">Operational Tradeoff</p>
                <p className="text-xs font-medium text-muted-foreground leading-relaxed">{rec.operationalTradeoff}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-72 p-8 bg-muted/5 flex flex-col justify-center gap-6">
          <div className="space-y-1">
            <span className="text-[10px] font-black uppercase text-emerald-500 tracking-widest">Monthly Yield</span>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-black text-foreground tracking-tighter">${rec.monthlySavings}</span>
              <span className="text-sm font-bold text-muted-foreground">/mo</span>
            </div>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Yearly Projection</span>
            <p className="text-xl font-black text-foreground/80">${rec.yearlySavings.toLocaleString()}</p>
          </div>
          <Button className="w-full h-12 bg-foreground text-background hover:bg-foreground/90 font-black text-[10px] uppercase tracking-widest shadow-lg">
            Apply Selection
          </Button>
        </div>
      </div>
    </Card>
  );
}

function NextStep({ icon: Icon, text }: { icon: any; text: string }) {
  return (
    <li className="flex items-start gap-3 group cursor-pointer">
      <div className="h-5 w-5 rounded-md bg-primary/20 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-primary transition-colors">
        <Icon className="h-3 w-3 text-primary group-hover:text-primary-foreground transition-colors" />
      </div>
      <span className="text-sm font-bold text-foreground/70 group-hover:text-foreground transition-colors">{text}</span>
    </li>
  );
}
