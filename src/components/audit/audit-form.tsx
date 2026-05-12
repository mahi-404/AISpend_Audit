"use client";

import React, { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { auditFormSchema, AuditFormValues } from "@/lib/validations";
import { AuditEngine } from "@/services/audit-engine";
import { AuditResult } from "@/types/audit";
import { ToolName } from "@/types/pricing";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ChevronRight,
  ChevronLeft,
  Plus,
  Trash2,
  Check,
  Loader2,
  AlertCircle,
  Sparkles,
  CheckCircle2,
  Target,
  Activity,
  Layers,
  Zap
} from "lucide-react";
import { cn } from "@/lib/utils";

const STEPS = [
  { id: 1, title: "Company Profile", description: "Team & Operational Context" },
  { id: 2, title: "Capital Allocation", description: "Analyze AI Tool Subscriptions" },
  { id: 3, title: "Final Validation", description: "Review Strategic Inputs" },
];

import { AuditDashboard } from "./audit-dashboard";

export function AuditForm() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<AuditResult | null>(null);

  const form = useForm<AuditFormValues>({
    resolver: zodResolver(auditFormSchema),
    defaultValues: {
      teamSize: 5,
      useCase: "coding",
      tools: [{ tool: "ChatGPT", plan: "Team", seats: 5, monthlySpend: 125 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "tools",
  });

  // localStorage persistence
  useEffect(() => {
    const saved = localStorage.getItem("audit_form_data");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        form.reset(parsed);
      } catch (e) {
        console.error("Failed to load saved form", e);
      }
    }
  }, [form]);

  useEffect(() => {
    const subscription = form.watch((value) => {
      localStorage.setItem("audit_form_data", JSON.stringify(value));
    });
    return () => subscription.unsubscribe();
  }, [form]);

  const onSubmit = async (values: AuditFormValues) => {
    setIsSubmitting(true);
    // Sophisticated simulation of financial engine
    await new Promise((resolve) => setTimeout(resolve, 2400));
    const auditResult = AuditEngine.performAudit(values as any);
    setResult(auditResult);
    setIsSubmitting(false);
    setStep(4); // Result step
  };

  const nextStep = async () => {
    let fieldsToValidate: any[] = [];
    if (step === 1) fieldsToValidate = ["teamSize", "useCase"];
    if (step === 2) fieldsToValidate = ["tools"];

    const isValid = await form.trigger(fieldsToValidate as any);
    if (isValid) setStep(step + 1);
  };

  const prevStep = () => setStep(step - 1);

  if (result && step === 4) {
    return <AuditDashboard result={result} onReset={() => {
      setResult(null);
      setStep(1);
    }} />;
  }

  return (
    <div className="mx-auto w-full max-w-3xl">
      {/* Premium Progress Indicator */}
      <div className="mb-12 flex justify-between relative">
        <div className="absolute top-4 left-0 w-full h-[1px] bg-border/40 -z-10" />
        {STEPS.map((s) => {
          const isActive = step === s.id;
          const isCompleted = step > s.id;
          return (
            <div key={s.id} className="flex flex-col items-center gap-3 bg-background px-4">
              <div className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full border-2 text-[10px] font-black transition-all duration-500",
                isActive ? "border-primary bg-primary text-primary-foreground shadow-xl shadow-primary/20 scale-125" :
                  isCompleted ? "border-primary bg-primary/10 text-primary" : "border-muted text-muted-foreground"
              )}>
                {isCompleted ? <Check className="h-4 w-4" /> : s.id}
              </div>
              <div className="text-center">
                <p className={cn("text-[9px] font-black uppercase tracking-[0.2em]", isActive ? "text-foreground" : "text-muted-foreground")}>{s.title}</p>
                <p className="hidden sm:block text-[10px] text-muted-foreground/60 font-medium mt-1">{s.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)}>
        {/* Step 1: Company Profile */}
        {step === 1 && (
          <Card className="animate-in fade-in slide-in-from-bottom-2 duration-500 border-border/40 shadow-2xl bg-card/50">
            <CardHeader className="pb-8">
              <CardTitle className="text-2xl font-black tracking-tight">Company Context</CardTitle>
              <CardDescription>Provide operational parameters to calibrate our financial benchmarking engine.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-10">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-black uppercase tracking-widest text-foreground/80">Full-Time Equivalent (FTE) Count</label>
                  <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-md">{form.watch("teamSize")} Employees</span>
                </div>
                <div className="relative pt-2">
                  <input
                    type="range"
                    min="1"
                    max="1000"
                    {...form.register("teamSize", { valueAsNumber: true })}
                    className="w-full h-1.5 bg-muted rounded-full appearance-none cursor-pointer accent-primary"
                  />
                  <div className="flex justify-between mt-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                    <span>Startup (1)</span>
                    <span>Growth (100)</span>
                    <span>Enterprise (1k)</span>
                  </div>
                </div>
                {form.formState.errors.teamSize && (
                  <p className="flex items-center gap-1 text-xs text-rose-500 font-bold mt-2"><AlertCircle className="h-3 w-3" /> {form.formState.errors.teamSize.message}</p>
                )}
              </div>

              <div className="space-y-6">
                <label className="text-sm font-black uppercase tracking-widest text-foreground/80">Primary Operational Focus</label>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                  {[
                    { id: "coding", icon: Zap, label: "Engineering" },
                    { id: "writing", icon: CheckCircle2, label: "Content" },
                    { id: "research", icon: Sparkles, label: "R&D" },
                    { id: "analysis", icon: Activity, label: "Data" },
                    { id: "marketing", icon: Target, label: "Growth" },
                    { id: "mixed", icon: Layers, label: "Full-Stack" }
                  ].map((uc) => {
                    const isActive = form.watch("useCase") === uc.id;
                    const Icon = uc.icon;
                    return (
                      <button
                        key={uc.id}
                        type="button"
                        onClick={() => form.setValue("useCase", uc.id as any, { shouldValidate: true })}
                        className={cn(
                          "group relative flex flex-col items-start p-5 rounded-2xl border-2 transition-all duration-300 text-left overflow-hidden",
                          isActive 
                            ? "border-primary bg-primary text-primary-foreground shadow-2xl scale-[1.03] z-10" 
                            : "border-border bg-background hover:border-primary/40 hover:bg-muted/50"
                        )}
                      >
                        {isActive && (
                          <div className="absolute top-3 right-3 flex items-center gap-2">
                             <span className="text-[8px] font-black tracking-widest bg-white/20 px-2 py-0.5 rounded-full">SELECTED</span>
                             <div className="h-5 w-5 rounded-full bg-white flex items-center justify-center shadow-lg animate-in zoom-in-50 duration-300">
                               <Check className="h-3 w-3 text-primary" />
                             </div>
                          </div>
                        )}
                        <div className={cn(
                          "h-10 w-10 rounded-xl flex items-center justify-center mb-4 transition-colors",
                          isActive ? "bg-white text-primary shadow-lg" : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
                        )}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <span className={cn(
                          "text-xs font-black uppercase tracking-widest",
                          isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground"
                        )}>{uc.label}</span>
                        <p className={cn(
                          "text-[10px] mt-1 font-medium",
                          isActive ? "text-primary-foreground/70" : "text-muted-foreground opacity-60"
                        )}>Optimize for {uc.id}</p>
                      </button>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: AI Stack (Capital Allocation) */}
        {step === 2 && (
          <Card className="animate-in fade-in slide-in-from-bottom-2 duration-500 border-border/40 shadow-2xl bg-card/50">
            <CardHeader className="flex flex-row items-center justify-between pb-8">
              <div>
                <CardTitle className="text-2xl font-black tracking-tight">AI Asset Portfolio</CardTitle>
                <CardDescription>Itemize active subscriptions for financial redundancy analysis.</CardDescription>
              </div>
              <Button type="button" variant="outline" size="sm" onClick={() => append({ tool: "Claude", plan: "Pro", seats: 1, monthlySpend: 20 })} className="h-10 px-4 gap-2 font-bold text-[10px] uppercase tracking-widest border-primary/20 bg-primary/5 text-primary hover:bg-primary/10 transition-all">
                <Plus className="h-3 w-3" /> Add Subscription
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              {fields.map((field, index) => (
                <div key={field.id} className="relative rounded-[1.5rem] border border-border/60 bg-background/40 p-6 transition-all hover:border-primary/30 hover:shadow-xl group">
                  <button type="button" onClick={() => remove(index)} className="absolute right-4 top-4 text-muted-foreground/40 hover:text-rose-500 transition-colors">
                    <Trash2 className="h-4 w-4" />
                  </button>

                  <div className="grid gap-8">
                    <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/80">Asset Provider</label>
                      <div className="flex flex-wrap gap-2">
                        {["ChatGPT", "Claude", "Cursor", "GitHub Copilot", "Gemini", "OpenAI API", "Anthropic API"].map((toolName) => {
                          const isToolActive = form.watch(`tools.${index}.tool`) === toolName;
                          return (
                            <button
                              key={toolName}
                              type="button"
                              onClick={() => {
                                form.setValue(`tools.${index}.tool`, toolName as any, { shouldValidate: true });
                                // Smart defaults based on real pricing
                                if (toolName === "ChatGPT") {
                                  form.setValue(`tools.${index}.plan`, "Team");
                                  form.setValue(`tools.${index}.monthlySpend`, 25 * form.getValues("teamSize"));
                                  form.setValue(`tools.${index}.seats`, form.getValues("teamSize"));
                                } else if (toolName === "Claude") {
                                  form.setValue(`tools.${index}.plan`, "Team");
                                  form.setValue(`tools.${index}.monthlySpend`, 30 * Math.max(5, form.getValues("teamSize")));
                                  form.setValue(`tools.${index}.seats`, Math.max(5, form.getValues("teamSize")));
                                }
                              }}
                              className={cn(
                                "relative h-10 px-4 rounded-xl border-2 text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 overflow-hidden",
                                isToolActive
                                  ? "border-primary bg-primary text-primary-foreground shadow-xl scale-105 z-10"
                                  : "border-border bg-background text-muted-foreground hover:border-primary/40"
                              )}
                            >
                              {isToolActive ? (
                                <div className="flex items-center gap-2">
                                  <div className="h-4 w-4 rounded-full bg-white flex items-center justify-center">
                                    <Check className="h-2.5 w-2.5 text-primary" />
                                  </div>
                                  <span>{toolName}</span>
                                  <span className="ml-2 bg-white/20 px-1.5 py-0.5 rounded text-[8px]">SELECTED</span>
                                </div>
                              ) : (
                                <>
                                  <div className="h-1.5 w-1.5 rounded-full bg-border" />
                                  {toolName}
                                </>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-3">
                      <div className="space-y-2">
                        <label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60">Subscription Tier</label>
                        <input
                          {...form.register(`tools.${index}.plan`)}
                          placeholder="e.g. Enterprise"
                          className="w-full rounded-xl border border-border bg-background/60 px-4 py-2.5 text-xs font-bold focus:ring-2 focus:ring-primary/20 transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60">Allocated Seats</label>
                        <input
                          type="number"
                          {...form.register(`tools.${index}.seats`, { valueAsNumber: true })}
                          className="w-full rounded-xl border border-border bg-background/60 px-4 py-2.5 text-xs font-bold focus:ring-2 focus:ring-primary/20 transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60">Monthly Spend (USD)</label>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-bold text-xs">$</span>
                          <input
                            type="number"
                            {...form.register(`tools.${index}.monthlySpend`, { valueAsNumber: true })}
                            className="w-full rounded-xl border border-border bg-background/60 pl-8 pr-4 py-2.5 text-xs font-bold focus:ring-2 focus:ring-primary/20 transition-all"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Step 3: Final Validation */}
        {step === 3 && (
          <Card className="animate-in fade-in slide-in-from-bottom-2 duration-500 border-border/40 shadow-2xl bg-card/50">
            <CardHeader className="pb-8">
              <CardTitle className="text-2xl font-black tracking-tight">Audit Confirmation</CardTitle>
              <CardDescription>Final validation of operational data before engine execution.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-[1.5rem] bg-muted/40 p-6 space-y-4 border border-border/40">
                  <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Company Baseline</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-foreground/70">Team Scale</span>
                    <span className="text-sm font-black">{form.watch("teamSize")} FTEs</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-foreground/70">Target Use-Case</span>
                    <span className="text-sm font-black capitalize">{form.watch("useCase")}</span>
                  </div>
                </div>
                <div className="rounded-[1.5rem] bg-primary/5 p-6 space-y-4 border border-primary/10">
                  <p className="text-[10px] font-black uppercase tracking-widest text-primary">Financial Profile</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-primary/70">Portfolio Size</span>
                    <span className="text-sm font-black">{fields.length} Assets</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-primary/70">Gross Monthly Burn</span>
                    <span className="text-sm font-black">${form.watch("tools").reduce((sum, t) => sum + (t.monthlySpend || 0), 0).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Portfolio Breakdown</p>
                <div className="space-y-3">
                  {form.watch("tools").map((t, i) => (
                    <div key={i} className="flex items-center justify-between rounded-xl border border-border/40 bg-background/40 px-5 py-3 transition-all hover:bg-muted/30">
                      <div className="flex items-center gap-3">
                        <div className="h-2 w-2 rounded-full bg-primary" />
                        <span className="text-sm font-bold">{t.tool} <span className="text-muted-foreground font-medium text-xs ml-1">({t.plan})</span></span>
                      </div>
                      <span className="text-sm font-black text-foreground/80">${(t.monthlySpend || 0).toLocaleString()} <span className="text-[10px] text-muted-foreground uppercase ml-1">USD</span></span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Tactical Navigation */}
        <div className="mt-10 flex items-center justify-between px-2">
          <Button
            type="button"
            variant="ghost"
            onClick={prevStep}
            disabled={step === 1 || isSubmitting}
            className={cn(
              "h-12 px-6 font-black text-[10px] uppercase tracking-widest transition-all",
              step === 1 && "invisible"
            )}
          >
            <ChevronLeft className="mr-2 h-4 w-4" /> Previous Phase
          </Button>

          {step < 3 ? (
            <Button type="button" onClick={nextStep} className="h-12 px-8 font-black text-[10px] uppercase tracking-widest shadow-xl shadow-primary/20">
              Continue <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button type="submit" disabled={isSubmitting} className="h-12 min-w-[200px] font-black text-[10px] uppercase tracking-widest shadow-xl shadow-primary/30 bg-primary hover:scale-[1.02] active:scale-[0.98] transition-all">
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Calibrating Engine...
                </>
              ) : (
                <>
                  Execute Audit <Sparkles className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}


