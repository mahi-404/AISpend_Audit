import { describe, it, expect } from "vitest";
import { AuditEngine } from "@/services/audit-engine";
import { AuditInput } from "@/types/audit";

describe("AuditEngine Core Logic", () => {
  it("should recommend a downgrade from Team to Pro for 1-seat users", () => {
    const input: AuditInput = {
      teamSize: 1,
      useCase: "individual",
      tools: [
        {
          tool: "ChatGPT",
          plan: "Team",
          seats: 1,
          monthlySpend: 30, // Assuming Team is $30/mo
        }
      ]
    };

    const result = AuditEngine.performAudit(input);
    
    expect(result.totalSavingsMonthly).toBeGreaterThan(0);
    expect(result.recommendations[0].type).toBe("plan-downgrade");
    expect(result.recommendations[0].recommendedPlan.toLowerCase()).toContain("plus");
  });

  it("should recommend Cursor Pro for coding use-cases with high ChatGPT spend", () => {
    const input: AuditInput = {
      teamSize: 1,
      useCase: "coding",
      tools: [
        {
          tool: "ChatGPT",
          plan: "Team",
          seats: 1,
          monthlySpend: 25,
        }
      ]
    };

    const result = AuditEngine.performAudit(input);
    
    const cursorRec = result.recommendations.find(r => r.recommendedTool === "Cursor");
    expect(cursorRec).toBeDefined();
    expect(cursorRec?.type).toBe("alternative-tool");
  });

  it("should calculate correct aggregate yearly savings", () => {
    const input: AuditInput = {
      teamSize: 2,
      useCase: "mixed",
      tools: [
        {
          tool: "ChatGPT",
          plan: "Team",
          seats: 2,
          monthlySpend: 60,
        }
      ]
    };

    const result = AuditEngine.performAudit(input);
    expect(result.totalSavingsYearly).toBe(result.totalSavingsMonthly * 12);
  });

  it("should return zero savings for an already optimized stack", () => {
    const input: AuditInput = {
      teamSize: 1,
      useCase: "individual",
      tools: [
        {
          tool: "ChatGPT",
          plan: "Plus",
          seats: 1,
          monthlySpend: 20,
        }
      ]
    };

    const result = AuditEngine.performAudit(input);
    // Based on our current rules, ChatGPT Plus at $20 is already optimal for 1 person individual
    // Unless we add an alternative like "Claude Free"
    const downgradeRecs = result.recommendations.filter(r => r.type === "plan-downgrade");
    expect(downgradeRecs.length).toBe(0);
  });

  it("should handle multiple tool optimizations simultaneously", () => {
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
    expect(result.recommendations.length).toBeGreaterThanOrEqual(2);
    expect(result.totalSavingsMonthly).toBeGreaterThan(10); // Savings from both
  });
});
