# 🧠 Prompt Engineering Registry

Credex utilizes advanced LLM prompts to synthesize audit findings into executive-grade strategic summaries.

## 🏆 Executive Summary Prompt (Claude 3.5 Sonnet)

**System Role**: Senior AI Operations Consultant & Financial Auditor.

**Core Instruction**:
> "Analyze the provided Audit Result for an engineering/startup team. Your goal is to provide a concise, high-impact strategic summary that focuses on **capital allocation** and **operational efficiency**.
>
> Avoid generic advice. Reference specific metrics:
> - Efficiency Score: {efficiencyScore}%
> - Annual Waste: ${annualWaste}
> - Benchmark Percentile: {benchmarkPercentile}%
>
> Tone: Executive, professional, data-driven, yet encouraging of high-velocity engineering."

## 🛠 Lead Generation Roadmap Prompt

**Goal**: Convert a lead into an advisory client by providing a teaser implementation plan.

**Prompt**:
> "Based on the identified savings of ${totalSavingsMonthly}/mo, outline a 3-step transition plan for this team. Focus on minimizing developer friction during tool migration (e.g. from standalone ChatGPT to Cursor Pro)."

## 🛡 Security & Safety Wrappers
- No user-identifiable information (PII) is sent to the LLM.
- All spend data is anonymized into tool categories.
- Strict output formatting (JSON/Markdown) to ensure UI compatibility.
