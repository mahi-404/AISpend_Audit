"use client";

import React, { useState } from "react";
import { AI_TOOLS_PRICING } from "@/data/pricing";
import { recommendTools } from "@/utils/pricing-helpers";
import { ToolName, UseCaseSuitability } from "@/types/pricing";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Search, Filter, Info } from "lucide-react";
import { cn } from "@/lib/utils";

export default function PricingPage() {
  const [teamSize, setTeamSize] = useState(1);
  const [useCase, setUseCase] = useState<UseCaseSuitability>("individual");
  const [isEnterprise, setIsEnterprise] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const recommended = recommendTools({ teamSize, useCase, isEnterprise });
  
  const filteredTools = Object.values(AI_TOOLS_PRICING).filter(tool => 
    tool.tool.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto max-w-7xl px-4 py-24">
      <div className="mb-16 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Centralized <span className="gradient-text">AI Pricing</span>
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Compare plans and get recommendations for your specific team needs.
        </p>
      </div>

      {/* Recommendation Engine */}
      <Card className="mb-12 border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Info className="h-5 w-5 text-primary" />
            AI Recommendation Engine
          </CardTitle>
          <CardDescription>
            Tell us about your team to find the best tool fits.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <label className="text-sm font-medium">Team Size</label>
              <input 
                type="number" 
                min="1"
                value={teamSize}
                onChange={(e) => setTeamSize(parseInt(e.target.value) || 1)}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Primary Use Case</label>
              <select 
                value={useCase}
                onChange={(e) => setUseCase(e.target.value as UseCaseSuitability)}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="individual">Individual Developer</option>
                <option value="small-team">Small Startup Team</option>
                <option value="enterprise">Enterprise Organization</option>
                <option value="power-user">Power User</option>
              </select>
            </div>
            <div className="flex items-end pb-1">
              <label className="flex items-center gap-2 text-sm font-medium">
                <input 
                  type="checkbox"
                  checked={isEnterprise}
                  onChange={(e) => setIsEnterprise(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                Require Enterprise Eligibility
              </label>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            <p className="w-full text-xs font-semibold uppercase text-muted-foreground">Top Recommendations:</p>
            {recommended.map(tool => (
              <Badge key={tool.tool} variant="default" className="px-3 py-1">
                {tool.tool}
              </Badge>
            ))}
            {recommended.length === 0 && <span className="text-sm text-muted-foreground">No perfect matches found. Try adjusting filters.</span>}
          </div>
        </CardContent>
      </Card>

      {/* Tools Directory */}
      <div className="mb-8 flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input 
            type="text"
            placeholder="Search tools (Cursor, Claude, etc.)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-full border border-input bg-background pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">Category: All</span>
        </div>
      </div>

      <div className="grid gap-8">
        {filteredTools.map(tool => (
          <div key={tool.tool} className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">{tool.tool}</h2>
              <Badge variant="outline">{tool.category}</Badge>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {tool.plans.map(plan => (
                <Card key={plan.name} className="flex flex-col border-border/50">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg">{plan.name}</CardTitle>
                    <div className="mt-2 flex items-baseline gap-1">
                      <span className="text-3xl font-bold">${plan.monthlyPrice}</span>
                      <span className="text-sm text-muted-foreground">/mo</span>
                    </div>
                    <CardDescription className="min-h-[40px] text-xs">
                      {plan.bestFor}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-1 flex-col">
                    <div className="mb-4 space-y-1">
                      <p className="text-[10px] font-bold uppercase text-muted-foreground">Yearly Estimate</p>
                      <p className="text-sm font-semibold">${plan.yearlyEstimate}</p>
                    </div>
                    
                    <ul className="flex-1 space-y-2">
                      {plan.features.slice(0, 3).map(feature => (
                        <li key={feature} className="flex items-start gap-2 text-xs">
                          <CheckCircle2 className="mt-0.5 h-3 w-3 shrink-0 text-primary" />
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button variant="outline" className="mt-6 w-full text-xs" asChild>
                      <a href={tool.websiteUrl} target="_blank" rel="noopener noreferrer">
                        View Details
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
