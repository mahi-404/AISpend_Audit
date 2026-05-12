import { AI_TOOLS_PRICING } from "@/data/pricing";
import { AIToolPricing, PricingPlan, ToolName, UseCaseSuitability } from "@/types/pricing";

/**
 * Retrieves pricing data for a specific tool.
 */
export function getToolPricing(toolName: ToolName): AIToolPricing | undefined {
  return AI_TOOLS_PRICING[toolName];
}

/**
 * Finds a specific plan for a tool by name.
 */
export function getPlan(toolName: ToolName, planName: string): PricingPlan | undefined {
  const tool = getToolPricing(toolName);
  return tool?.plans.find(p => p.name.toLowerCase() === planName.toLowerCase());
}

/**
 * Recommends tools based on team size and use case.
 */
export function recommendTools(options: {
  teamSize: number;
  useCase: UseCaseSuitability;
  isEnterprise: boolean;
}): AIToolPricing[] {
  const { teamSize, useCase, isEnterprise } = options;

  return Object.values(AI_TOOLS_PRICING).filter(tool => {
    return tool.plans.some(plan => {
      const sizeMatch = 
        teamSize >= plan.recommendedTeamSize.min && 
        (plan.recommendedTeamSize.max === "unlimited" || teamSize <= plan.recommendedTeamSize.max);
      
      const useCaseMatch = plan.useCaseSuitability.includes(useCase);
      const enterpriseMatch = !isEnterprise || plan.enterpriseEligible;

      return sizeMatch && useCaseMatch && enterpriseMatch;
    });
  });
}

/**
 * Calculates total monthly cost for a set of tools and plans.
 */
export function calculateTotalMonthlyCost(selections: { tool: ToolName; plan: string; quantity: number }[]): number {
  return selections.reduce((total, selection) => {
    const plan = getPlan(selection.tool, selection.plan);
    return total + (plan ? plan.monthlyPrice * selection.quantity : 0);
  }, 0);
}

/**
 * Utility to check if a tool has a free tier.
 */
export function hasFreeTier(toolName: ToolName): boolean {
  const tool = getToolPricing(toolName);
  return tool?.plans.some(p => p.monthlyPrice === 0) ?? false;
}
