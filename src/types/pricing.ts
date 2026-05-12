export type UseCaseSuitability = 
  | "individual" 
  | "small-team" 
  | "mid-size-team" 
  | "enterprise" 
  | "hobbyist" 
  | "power-user"
  | "coding"
  | "marketing"
  | "analysis"
  | "writing"
  | "research"
  | "mixed";

export type BillingCycle = "monthly" | "annually";

export interface PricingPlan {
  name: string;
  monthlyPrice: number;
  yearlyEstimate: number; // monthlyPrice * 12 or discounted rate
  recommendedTeamSize: {
    min: number;
    max: number | "unlimited";
  };
  useCaseSuitability: UseCaseSuitability[];
  enterpriseEligible: boolean;
  features: string[];
  bestFor: string;
}

export interface AIToolPricing {
  tool: string;
  category: "ide-extension" | "chat-interface" | "api-provider" | "agent-platform";
  plans: PricingPlan[];
  websiteUrl: string;
}

export type ToolName = 
  | "Cursor" 
  | "GitHub Copilot" 
  | "Claude" 
  | "ChatGPT" 
  | "Anthropic API" 
  | "OpenAI API" 
  | "Gemini" 
  | "Windsurf"
  | "Perplexity"
  | "Midjourney"
  | "v0";
