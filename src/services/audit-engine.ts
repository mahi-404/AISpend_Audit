import { AI_TOOLS_PRICING } from "@/data/pricing";
import { AuditInput, AuditRecommendation, AuditResult, UserToolInput, AuditMetrics } from "@/types/audit";
import { getPlan, getToolPricing } from "@/utils/pricing-helpers";

/**
 * Core Audit Engine for AI Spend Audit
 * Deterministic business logic for detecting overspending and recommending optimizations.
 */
export class AuditEngine {
  /**
   * Main entry point to perform a full audit.
   */
  public static performAudit(input: AuditInput): AuditResult {
    const recommendations: AuditRecommendation[] = [];
    const handledTools = new Set<string>();
    let totalCurrentMonthly = 0;

    for (const tool of input.tools) {
      totalCurrentMonthly += toolInputToMonthly(tool);
    }

    // 1. Redundancy Rules (Consolidate overlapping tools first)
    const redundancyRecs = this.evaluateRedundancyRules(input);
    for (const rec of redundancyRecs) {
      recommendations.push(rec);
      handledTools.add(rec.tool);
    }

    // 2. Alternative Tool Rules (Switch to better alternatives for use-case)
    const alternativeRecs = this.evaluateAlternativeRules(input, handledTools);
    for (const rec of alternativeRecs) {
      recommendations.push(rec);
      handledTools.add(rec.tool);
    }

    // 3. Plan-based Rules (Downgrade to cheaper plans for remaining tools)
    for (const toolInput of input.tools) {
      if (!handledTools.has(toolInput.tool)) {
        const planRecs = this.evaluatePlanRules(toolInput, input.teamSize);
        recommendations.push(...planRecs);
        if (planRecs.length > 0) handledTools.add(toolInput.tool);
      }
    }

    // 4. Calculate Financial Metrics
    const totalSavingsMonthly = Math.round(recommendations.reduce((sum, r) => sum + r.monthlySavings, 0) * 100) / 100;
    const totalCurrentYearly = Math.round(totalCurrentMonthly * 12 * 100) / 100;
    const totalSavingsYearly = Math.round(totalSavingsMonthly * 12 * 100) / 100;

    const metrics = this.calculateMetrics(input, recommendations, totalCurrentMonthly, totalSavingsMonthly);

    return {
      totalCurrentMonthlySpend: totalCurrentMonthly,
      totalCurrentYearlySpend: totalCurrentYearly,
      totalSavingsMonthly,
      totalSavingsYearly,
      newProjectedMonthlySpend: Math.max(0, Math.round((totalCurrentMonthly - totalSavingsMonthly) * 100) / 100),
      recommendations,
      metrics,
      auditTimestamp: new Date().toISOString(),
    };
  }

  /**
   * Calculates high-level audit metrics for executive overview.
   */
  private static calculateMetrics(
    input: AuditInput, 
    recommendations: AuditRecommendation[], 
    currentSpend: number, 
    savings: number
  ): AuditMetrics {
    const spendPerEmployee = input.teamSize > 0 ? currentSpend / input.teamSize : currentSpend;
    
    // Efficiency Score: Higher is better (less waste)
    const wasteRatio = currentSpend > 0 ? savings / currentSpend : 0;
    const efficiencyScore = Math.max(0, Math.min(100, Math.round((1 - wasteRatio) * 100)));

    // Risk Score: Higher means more redundant/unmanaged spend
    const redundancyCount = recommendations.filter(r => r.type === "redundancy-elimination" || r.type === "plan-downgrade").length;
    const riskScore = Math.min(100, (redundancyCount * 15) + (wasteRatio > 0.3 ? 40 : 10));

    // Complexity Score: 1-10 based on tool count and use-case
    const stackComplexityScore = Math.min(10, Math.round((input.tools.length / 2) + 1));

    // Benchmark Percentile: Simulated benchmarking vs similar companies
    // Teams with low waste score higher
    const benchmarkPercentile = Math.max(5, Math.min(95, efficiencyScore + (input.teamSize < 10 ? 5 : -5)));

    return {
      spendPerEmployee: Math.round(spendPerEmployee * 100) / 100,
      efficiencyScore,
      riskScore,
      stackComplexityScore,
      annualWaste: savings * 12,
      benchmarkPercentile,
    };
  }

  /**
   * Evaluates rules specific to a single tool's plan and seat count.
   */
  private static evaluatePlanRules(input: UserToolInput, teamSize: number): AuditRecommendation[] {
    const recs: AuditRecommendation[] = [];
    const toolPricing = getToolPricing(input.tool);
    
    if (!toolPricing) return [];

    // RULE: Detect Small Team Over-provisioning (e.g. paying for 5 seats when only 2 used)
    const isTeamPlan = input.plan.toLowerCase().includes("team") || input.plan.toLowerCase().includes("business");
    if (isTeamPlan && input.seats <= 2) {
      const proPlan = toolPricing.plans.find(p => p.name.toLowerCase().includes("pro") || p.name.toLowerCase().includes("plus"));
      
      const currentPerSeat = input.monthlySpend / input.seats;
      if (proPlan && proPlan.monthlyPrice < currentPerSeat) {
        const perSeatSavings = currentPerSeat - proPlan.monthlyPrice;
        const totalMonthlySavings = perSeatSavings * input.seats;

        recs.push({
          tool: input.tool,
          currentPlan: input.plan,
          recommendedPlan: proPlan.name,
          type: "plan-downgrade",
          monthlySavings: totalMonthlySavings,
          yearlySavings: totalMonthlySavings * 12,
          confidenceScore: 95,
          reason: `Your team size (${input.seats}) does not justify the minimum seat requirements of the ${input.plan} tier.`,
          financialImpact: `Immediate cash-flow improvement of $${totalMonthlySavings}/mo by right-sizing to the ${proPlan.name} tier.`,
          operationalTradeoff: "Loss of administrative dashboard and SAML/SSO if currently utilized. Basic collaboration features remain intact."
        });
      }
    }

    return recs;
  }

  /**
   * Detects if the user has multiple tools that serve the same purpose.
   */
  private static evaluateRedundancyRules(input: AuditInput): AuditRecommendation[] {
    const recs: AuditRecommendation[] = [];
    
    const hasChatGPT = input.tools.find(t => t.tool === "ChatGPT" && t.plan !== "Free");
    const hasClaude = input.tools.find(t => t.tool === "Claude" && t.plan !== "Free");

    if (hasChatGPT && hasClaude && input.teamSize <= 5) {
      recs.push({
        tool: "Claude",
        currentPlan: hasClaude.plan,
        recommendedPlan: "Free",
        type: "redundancy-elimination",
        monthlySavings: hasClaude.monthlySpend,
        yearlySavings: hasClaude.monthlySpend * 12,
        confidenceScore: 85,
        reason: "Active subscriptions detected for both ChatGPT and Claude for a small team.",
        financialImpact: `Full elimination of $${hasClaude.monthlySpend}/mo redundant spend.`,
        operationalTradeoff: "Consolidates all LLM context into one platform. Requires migrating custom GPTs/Prompts to the primary tool."
      });
    }

    return recs;
  }

  /**
   * Evaluates rules that suggest switching tools based on use-case.
   */
  private static evaluateAlternativeRules(input: AuditInput, handledTools: Set<string>): AuditRecommendation[] {
    const recs: AuditRecommendation[] = [];

    if (input.useCase === "coding") {
      const candidateTool = input.tools.find(t => 
        (t.tool === "ChatGPT" || t.tool === "Claude") && 
        t.plan !== "Free" && 
        !handledTools.has(t.tool)
      );
      
      const hasCursor = input.tools.find(t => t.tool === "Cursor");

      if (candidateTool && !hasCursor) {
        const cursorPro = getPlan("Cursor", "Pro");
        if (cursorPro) {
          recs.push({
            tool: candidateTool.tool,
            currentPlan: candidateTool.plan,
            recommendedPlan: "Free",
            recommendedTool: "Cursor",
            type: "alternative-tool",
            monthlySavings: Math.max(0, candidateTool.monthlySpend - (cursorPro.monthlyPrice * input.teamSize)),
            yearlySavings: Math.max(0, (candidateTool.monthlySpend - (cursorPro.monthlyPrice * input.teamSize)) * 12),
            confidenceScore: 90,
            reason: "Cursor Pro offers deep IDE integration that significantly out-performs standalone chat interfaces for engineering teams.",
            financialImpact: `Projected efficiency gain of 20%+ for developers, plus a net spend reduction of $${Math.max(0, candidateTool.monthlySpend - (cursorPro.monthlyPrice * input.teamSize))}/mo.`,
            operationalTradeoff: "Requires developers to switch IDEs. High learning curve but massive long-term velocity gains."
          });
        }
      }
    }

    return recs;
  }
}

/**
 * Helper to ensure we use the actual spend or fallback to a calculated one
 */
function toolInputToMonthly(tool: UserToolInput): number {
  return tool.monthlySpend || 0;
}
