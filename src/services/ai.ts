import Anthropic from "@anthropic-ai/sdk";
import { AuditResult } from "@/types/audit";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || "sk-ant-placeholder",
});

/**
 * Generates a personalized audit summary using Claude.
 * Includes a deterministic fallback if the API fails.
 */
export async function generateAuditSummary(result: AuditResult): Promise<string> {
  const prompt = `
    Act as a Senior SaaS Financial Consultant and Startup Operations Strategist. 
    Analyze this AI spend audit and provide a high-level executive summary (approx. 100-120 words).
    
    Audit Data Points:
    - Current Annual Waste: $${result.metrics.annualWaste}
    - Stack Efficiency Score: ${result.metrics.efficiencyScore}/100
    - Operational Risk Score: ${result.metrics.riskScore}/100
    - Benchmark Percentile: ${result.metrics.benchmarkPercentile}% (meaning we are better than X% of peers)
    - Key Action Items: ${result.recommendations.map(r => `${r.tool}: ${r.reason}`).join(" | ")}
    
    Tone Requirements:
    - Executive, professional, and strategically insightful.
    - Avoid generic filler. Use terms like "capital allocation," "operational overhead," and "strategic consolidation."
    - Tone should be "informed and authoritative."
    
    Structure:
    1. Direct assessment of the current stack efficiency.
    2. Highlight the single most critical strategic intervention.
    3. Conclude with the long-term operational impact of these optimizations.
  `;

  try {
    if (!process.env.ANTHROPIC_API_KEY) {
      throw new Error("No API key");
    }

    const response = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20240620", // Upgraded to Sonnet for better reasoning
      max_tokens: 400,
      messages: [{ role: "user", content: prompt }],
    });

    const content = response.content[0];
    if (content.type === "text") {
      return content.text;
    }
    
    return generateFallbackSummary(result);
  } catch (error) {
    console.error("Claude API Error:", error);
    return generateFallbackSummary(result);
  }
}

/**
 * Deterministic fallback summary in case AI generation fails.
 * Designed to feel like a professional consultant's report.
 */
function generateFallbackSummary(result: AuditResult): string {
  if (result.totalSavingsMonthly === 0) {
    return `Your AI stack is operating at peak efficiency with a ${result.metrics.efficiencyScore}% optimization rating. Our analysis confirms that your capital allocation across ${result.metrics.stackComplexityScore} primary tools is perfectly aligned with your team scale. You currently outperform ${result.metrics.benchmarkPercentile}% of peer organizations in cost-to-value ratio.`;
  }

  const topRec = result.recommendations[0];
  return `Our financial engine has identified $${result.totalSavingsMonthly.toLocaleString()} in immediate monthly optimization potential, representing a ${Math.round((result.totalSavingsMonthly / result.totalCurrentMonthlySpend) * 100)}% reduction in operational overhead. The most critical intervention involves ${topRec.tool}, where right-sizing to the ${topRec.recommendedPlan} tier addresses current over-provisioning. Implementing these ${result.recommendations.length} strategic changes will eliminate $${result.metrics.annualWaste.toLocaleString()} in annual capital leakage while improving your overall stack efficiency to ${result.metrics.efficiencyScore}%.`;
}
