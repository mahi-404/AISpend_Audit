import { AIToolPricing, ToolName } from "@/types/pricing";

export const AI_TOOLS_PRICING: Record<ToolName, AIToolPricing> = {
  ChatGPT: {
    tool: "ChatGPT",
    category: "chat-interface",
    websiteUrl: "https://openai.com/chatgpt/pricing",
    plans: [
      {
        name: "Free",
        monthlyPrice: 0,
        yearlyEstimate: 0,
        recommendedTeamSize: { min: 1, max: 1 },
        useCaseSuitability: ["individual"],
        enterpriseEligible: false,
        features: ["Basic access"],
        bestFor: "Casual use."
      },
      {
        name: "Plus",
        monthlyPrice: 20,
        yearlyEstimate: 240,
        recommendedTeamSize: { min: 1, max: 1 },
        useCaseSuitability: ["individual", "power-user"],
        enterpriseEligible: false,
        features: ["DALL-E", "Browsing", "Advanced Data Analysis"],
        bestFor: "Power users."
      },
      {
        name: "Team",
        monthlyPrice: 25,
        yearlyEstimate: 300,
        recommendedTeamSize: { min: 2, max: "unlimited" },
        useCaseSuitability: ["small-team"],
        enterpriseEligible: true,
        features: ["Higher message caps", "Admin workspace"],
        bestFor: "Small business teams."
      },
      {
        name: "Enterprise",
        monthlyPrice: 60,
        yearlyEstimate: 720,
        recommendedTeamSize: { min: 20, max: "unlimited" },
        useCaseSuitability: ["enterprise"],
        enterpriseEligible: true,
        features: ["Enterprise security", "Unlimited high-speed GPT-4"],
        bestFor: "Large scale enterprises."
      }
    ]
  },
  Claude: {
    tool: "Claude",
    category: "chat-interface",
    websiteUrl: "https://claude.ai/pricing",
    plans: [
      {
        name: "Free",
        monthlyPrice: 0,
        yearlyEstimate: 0,
        recommendedTeamSize: { min: 1, max: 1 },
        useCaseSuitability: ["individual", "hobbyist"],
        enterpriseEligible: false,
        features: ["Limited message usage"],
        bestFor: "Casual chat usage."
      },
      {
        name: "Pro",
        monthlyPrice: 20,
        yearlyEstimate: 240,
        recommendedTeamSize: { min: 1, max: 1 },
        useCaseSuitability: ["individual", "power-user"],
        enterpriseEligible: false,
        features: ["5x more usage", "Early access to new features"],
        bestFor: "Heavy chat users."
      },
      {
        name: "Team",
        monthlyPrice: 30,
        yearlyEstimate: 360,
        recommendedTeamSize: { min: 5, max: "unlimited" },
        useCaseSuitability: ["small-team", "mid-size-team"],
        enterpriseEligible: true,
        features: ["Increased usage limits", "Admin tools"],
        bestFor: "Collaboration within teams."
      }
    ]
  },
  Cursor: {
    tool: "Cursor",
    category: "ide-extension",
    websiteUrl: "https://cursor.sh/pricing",
    plans: [
      {
        name: "Free",
        monthlyPrice: 0,
        yearlyEstimate: 0,
        recommendedTeamSize: { min: 1, max: 1 },
        useCaseSuitability: ["individual", "hobbyist"],
        enterpriseEligible: false,
        features: ["2,000 completions", "50 premium requests"],
        bestFor: "Individual developers starting out."
      },
      {
        name: "Pro",
        monthlyPrice: 20,
        yearlyEstimate: 240,
        recommendedTeamSize: { min: 1, max: 1 },
        useCaseSuitability: ["individual", "power-user", "coding"],
        enterpriseEligible: false,
        features: ["Unlimited completions", "500 premium requests/mo"],
        bestFor: "Power users and professional developers."
      },
      {
        name: "Business",
        monthlyPrice: 40,
        yearlyEstimate: 480,
        recommendedTeamSize: { min: 1, max: "unlimited" },
        useCaseSuitability: ["small-team", "mid-size-team", "enterprise", "coding"],
        enterpriseEligible: true,
        features: ["Admin dashboard", "SAML/SSO"],
        bestFor: "Teams requiring centralized management."
      }
    ]
  },
  "GitHub Copilot": {
    tool: "GitHub Copilot",
    category: "ide-extension",
    websiteUrl: "https://github.com/features/copilot/plans",
    plans: [
      {
        name: "Individual",
        monthlyPrice: 10,
        yearlyEstimate: 100,
        recommendedTeamSize: { min: 1, max: 1 },
        useCaseSuitability: ["individual", "coding"],
        enterpriseEligible: false,
        features: ["Autocomplete", "Chat"],
        bestFor: "Solo developers."
      },
      {
        name: "Business",
        monthlyPrice: 19,
        yearlyEstimate: 228,
        recommendedTeamSize: { min: 1, max: "unlimited" },
        useCaseSuitability: ["small-team", "mid-size-team", "coding"],
        enterpriseEligible: true,
        features: ["IP indemnity", "Policy management"],
        bestFor: "Growing businesses."
      },
      {
        name: "Enterprise",
        monthlyPrice: 39,
        yearlyEstimate: 468,
        recommendedTeamSize: { min: 1, max: "unlimited" },
        useCaseSuitability: ["enterprise", "coding"],
        enterpriseEligible: true,
        features: ["Custom models", "Advanced security"],
        bestFor: "Large scale enterprises."
      }
    ]
  },
  Perplexity: {
    tool: "Perplexity",
    category: "chat-interface",
    websiteUrl: "https://perplexity.ai/pro",
    plans: [
      {
        name: "Free",
        monthlyPrice: 0,
        yearlyEstimate: 0,
        recommendedTeamSize: { min: 1, max: "unlimited" },
        useCaseSuitability: ["individual", "research"],
        enterpriseEligible: false,
        features: ["Basic search"],
        bestFor: "Casual search."
      },
      {
        name: "Pro",
        monthlyPrice: 20,
        yearlyEstimate: 240,
        recommendedTeamSize: { min: 1, max: 1 },
        useCaseSuitability: ["individual", "power-user", "research"],
        enterpriseEligible: false,
        features: ["Pro search", "Selectable models"],
        bestFor: "Power researchers."
      }
    ]
  },
  Gemini: {
    tool: "Gemini",
    category: "chat-interface",
    websiteUrl: "https://gemini.google.com/pricing",
    plans: [
      {
        name: "Free",
        monthlyPrice: 0,
        yearlyEstimate: 0,
        recommendedTeamSize: { min: 1, max: 1 },
        useCaseSuitability: ["individual"],
        enterpriseEligible: false,
        features: ["Basic Gemini access"],
        bestFor: "Google users."
      },
      {
        name: "Gemini Advanced",
        monthlyPrice: 20,
        yearlyEstimate: 240,
        recommendedTeamSize: { min: 1, max: 1 },
        useCaseSuitability: ["individual", "power-user"],
        enterpriseEligible: false,
        features: ["Gemini 1.5 Pro", "2TB Storage"],
        bestFor: "Power users in Google ecosystem."
      },
      {
        name: "Business",
        monthlyPrice: 20,
        yearlyEstimate: 240,
        recommendedTeamSize: { min: 1, max: "unlimited" },
        useCaseSuitability: ["small-team", "enterprise"],
        enterpriseEligible: true,
        features: ["Admin controls", "Workspace integration"],
        bestFor: "Google Workspace teams."
      }
    ]
  },
  Midjourney: {
    tool: "Midjourney",
    category: "chat-interface", // Using Discord/Web chat
    websiteUrl: "https://midjourney.com",
    plans: [
      {
        name: "Basic",
        monthlyPrice: 10,
        yearlyEstimate: 96,
        recommendedTeamSize: { min: 1, max: 1 },
        useCaseSuitability: ["individual", "marketing"],
        enterpriseEligible: false,
        features: ["3.3 hr/mo GPU"],
        bestFor: "Occasional image gen."
      },
      {
        name: "Standard",
        monthlyPrice: 30,
        yearlyEstimate: 288,
        recommendedTeamSize: { min: 1, max: 1 },
        useCaseSuitability: ["individual", "marketing"],
        enterpriseEligible: false,
        features: ["15 hr/mo GPU"],
        bestFor: "Heavy creative work."
      }
    ]
  },
  v0: {
    tool: "v0",
    category: "chat-interface",
    websiteUrl: "https://v0.dev",
    plans: [
      {
        name: "Free",
        monthlyPrice: 0,
        yearlyEstimate: 0,
        recommendedTeamSize: { min: 1, max: "unlimited" },
        useCaseSuitability: ["individual", "coding"],
        enterpriseEligible: false,
        features: ["Basic credits"],
        bestFor: "UI prototyping."
      },
      {
        name: "Premium",
        monthlyPrice: 20,
        yearlyEstimate: 240,
        recommendedTeamSize: { min: 1, max: 1 },
        useCaseSuitability: ["individual", "power-user", "coding"],
        enterpriseEligible: false,
        features: ["Priority access", "More credits"],
        bestFor: "Professional frontend devs."
      }
    ]
  },
  "Anthropic API": {
    tool: "Anthropic API",
    category: "api-provider",
    websiteUrl: "https://www.anthropic.com/api",
    plans: [
      {
        name: "Pay-as-you-go",
        monthlyPrice: 0,
        yearlyEstimate: 0,
        recommendedTeamSize: { min: 1, max: "unlimited" },
        useCaseSuitability: ["individual", "small-team", "enterprise", "coding", "analysis"],
        enterpriseEligible: true,
        features: ["Claude 3.5 Sonnet access"],
        bestFor: "Developers."
      }
    ]
  },
  "OpenAI API": {
    tool: "OpenAI API",
    category: "api-provider",
    websiteUrl: "https://openai.com/api/pricing",
    plans: [
      {
        name: "Usage-based",
        monthlyPrice: 0,
        yearlyEstimate: 0,
        recommendedTeamSize: { min: 1, max: "unlimited" },
        useCaseSuitability: ["individual", "small-team", "enterprise", "coding", "analysis"],
        enterpriseEligible: true,
        features: ["GPT-4o access"],
        bestFor: "Developers."
      }
    ]
  },
  Windsurf: {
    tool: "Windsurf",
    category: "ide-extension",
    websiteUrl: "https://codeium.com/windsurf",
    plans: [
      {
        name: "Free",
        monthlyPrice: 0,
        yearlyEstimate: 0,
        recommendedTeamSize: { min: 1, max: 1 },
        useCaseSuitability: ["individual", "coding"],
        enterpriseEligible: false,
        features: ["Agentic AI"],
        bestFor: "Testing agentic IDE."
      },
      {
        name: "Individual Pro",
        monthlyPrice: 20,
        yearlyEstimate: 240,
        recommendedTeamSize: { min: 1, max: 1 },
        useCaseSuitability: ["individual", "power-user", "coding"],
        enterpriseEligible: false,
        features: ["Unlimited agent use"],
        bestFor: "Pro devs."
      }
    ]
  }
};
