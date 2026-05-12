import { describe, it, expect } from "vitest";
import { AuditEngine } from "@/services/audit-engine";
import { AuditInput } from "@/types/audit";

describe("AuditEngine Bug Reproduction", () => {
  it("should not double count savings when multiple rules apply to the same tool", () => {
    const input: AuditInput = {
      teamSize: 1,
      useCase: "coding",
      tools: [
        {
          tool: "ChatGPT",
          plan: "Team",
          seats: 1,
          monthlySpend: 30,
        },
        {
          tool: "Claude",
          plan: "Team",
          seats: 1,
          monthlySpend: 30,
        }
      ]
    };

    const result = AuditEngine.performAudit(input);
    
    // Total original spend = 60
    // Ideal outcome: 
    // 1. Claude -> Free (Save 30)
    // 2. ChatGPT -> Cursor Pro (Spend 20 instead of 30, Save 10)
    // Total savings should be 40. 
    // New projected spend should be 20.
    
    console.log("Total Current Monthly Spend:", result.totalCurrentMonthlySpend);
    console.log("Total Savings Monthly:", result.totalSavingsMonthly);
    console.log("New Projected Monthly Spend:", result.newProjectedMonthlySpend);
    console.log("Recommendations:", JSON.stringify(result.recommendations, null, 2));

    expect(result.newProjectedMonthlySpend).toBe(20);
    expect(result.totalSavingsMonthly).toBe(40);
  });
});
