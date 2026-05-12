# 📊 Performance Metrics & Methodology

This document explains the mathematical foundations of the Credex Audit Engine.

## 🧮 Core Calculations

### 1. Stack Efficiency Score (0-100)
Calculated based on the ratio of "Optimized Spend" vs "Current Burn".
- **Formula**: `Efficiency = (1 - (Detected Savings / Total Current Spend)) * 100`
- **Impact**: High efficiency scores indicate lean, high-velocity teams with zero tool redundancy.

### 2. Operational Risk Index (0-100)
Measures the likelihood of unmanaged tool sprawl and compliance risk.
- **Factor A**: Number of redundant general-purpose LLMs (+15 pts per tool).
- **Factor B**: Waste ratio (>30% waste triggers a +40 pt risk penalty).

### 3. Benchmark Percentile
A simulated metric based on team scale (FTEs). 
- **Startups (<10 FTEs)**: Higher efficiency baseline expected.
- **Growth (10-50 FTEs)**: Mid-tier efficiency baseline.
- **Enterprise (50+ FTEs)**: Complex tool-sprawl is normalized but penalized.

## 📈 Data Integrity Verified
Every `AuditResult` includes a **Financial Integrity Badge**. This badge is programmatically applied if the following conditions are met:
1. `totalSavingsYearly` matches `totalSavingsMonthly * 12`.
2. `newProjectedMonthlySpend` is correctly derived from `currentSpend - savings`.
3. Tool names match the verified `AI_TOOLS_PRICING` registry.

## 🔍 Audit Heuristics
- **Redundancy Priority**: Redundancy rules are applied first to prevent "double-savings" on overlapping tool downgrades.
- **Seat Thresholds**: Detecting over-provisioned "Team" plans (e.g. 5 seats paid, 2 used) based on provider-specific minimum seat counts.
