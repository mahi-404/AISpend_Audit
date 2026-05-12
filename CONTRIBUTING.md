# Contributing to Credex

We welcome contributions to the AI Spend Audit platform! As a financial intelligence tool, we prioritize accuracy, security, and institutional-grade design.

## 🛠 How to Contribute

### 1. Adding a New AI Tool
To add a new provider to the Audit Engine:
1. Update `src/types/pricing.ts` with the new `ToolName`.
2. Append the pricing metadata to `AI_TOOLS_PRICING` in `src/data/pricing.ts`.
3. Add any redundancy groupings to `AuditEngine.evaluateRedundancyRules` in `src/services/audit-engine.ts`.
4. Run `npm test` to ensure the new tool doesn't break existing heuristics.

### 2. Improving Heuristics
If you find a new way to optimize AI spend (e.g. a new bulk discount tier), please:
1. Open an issue describing the optimization logic.
2. Provide a link to official provider documentation.
3. Submit a PR with updated engine logic and corresponding tests.

## 🎨 Design Standards
- Follow the **Glassmorphism** design tokens in `globals.css`.
- Use `lucide-react` for all icons.
- Maintain the **Black-weight** typography hierarchy for headings.

## 🛡 Security Policy
- **DO NOT** commit API keys or secrets.
- Always use `.env.example` for new environment variables.
- Ensure all inputs are validated via **Zod**.

## 🚦 Pull Request Process
1. Ensure `npx tsc --noEmit` passes.
2. Ensure `npm run lint` passes.
3. Ensure all tests pass.
4. Update any relevant documentation (`ARCHITECTURE.md`, `METRICS.md`).

---
**Credex Operations © 2026**
