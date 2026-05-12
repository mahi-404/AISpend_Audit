# 🏷 Market Pricing Data Registry

This registry serves as the ground-truth for the Credex Audit Engine. Data is verified monthly against official provider documentation.

## 🛠 Verified AI Tool Pricing (Last Update: May 2026)

| Tool | Pro/Plus Tier | Team/Business Tier | Enterprise | Min Seats (Team) |
| :--- | :--- | :--- | :--- | :--- |
| **ChatGPT** | $20/mo | $25/seat/mo | Custom | 2 |
| **Claude** | $20/mo | $30/seat/mo | Custom | 5 |
| **Cursor** | $20/mo | $40/seat/mo | Custom | 1 |
| **GitHub Copilot**| $10/mo | $19/seat/mo | $39/seat/mo | 1 |
| **Gemini** | $20/mo | $30/seat/mo | $30/seat/mo | 1 |
| **Perplexity** | $20/mo | $20/seat/mo | Custom | 1 |
| **Midjourney** | $10-$60/mo | $30/seat/mo | Custom | 1 |
| **v0** | $20/mo | $20/seat/mo | Custom | 1 |

## 📊 Redundancy Matrices

The engine uses these groupings to detect overlapping operational capabilities:

### Group: General Purpose LLM
- ChatGPT
- Claude
- Gemini

### Group: Engineering & IDE
- Cursor
- GitHub Copilot

### Group: Search & Research
- Perplexity
- Gemini

## 🔍 Data Sourcing Methodology
1. **Direct Scrape**: Automated check of `/pricing` pages.
2. **Manual Verification**: Review of Terms of Service for seat minimums and collaborative feature sets.
3. **API Cost Modeling**: Average token burn estimates for API-based tools.
