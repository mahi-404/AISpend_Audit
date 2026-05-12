import { ToolName, UseCaseSuitability } from "./pricing";

export interface UserToolInput {
  tool: ToolName;
  plan: string;
  seats: number;
  monthlySpend: number;
}

export interface AuditInput {
  tools: UserToolInput[];
  teamSize: number;
  useCase: UseCaseSuitability;
}

export type RecommendationType = 
  | "plan-downgrade" 
  | "plan-upgrade" 
  | "alternative-tool" 
  | "seat-optimization" 
  | "redundancy-elimination"
  | "api-optimization";

export type RiskLevel = "low" | "medium" | "high";

export interface AuditRecommendation {
  tool: ToolName;
  currentPlan: string;
  recommendedPlan: string;
  recommendedTool?: ToolName;
  type: RecommendationType;
  monthlySavings: number;
  yearlySavings: number;
  reason: string;
  financialImpact: string; // Detailed impact statement
  operationalTradeoff: string; // What the user might lose/gain
  confidenceScore: number; // 0-100
}

export interface AuditMetrics {
  spendPerEmployee: number;
  efficiencyScore: number; // 0-100
  riskScore: number; // 0-100
  stackComplexityScore: number; // 1-10
  annualWaste: number;
  benchmarkPercentile: number; // How much better than similar teams (0-100)
}

export interface AuditResult {
  totalCurrentMonthlySpend: number;
  totalCurrentYearlySpend: number;
  totalSavingsMonthly: number;
  totalSavingsYearly: number;
  newProjectedMonthlySpend: number;
  recommendations: AuditRecommendation[];
  metrics: AuditMetrics;
  auditTimestamp: string;
}
