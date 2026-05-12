// Sample data for development / demo
import type { SpendRecord } from "@/types";

export const sampleSpendData: SpendRecord[] = [
  {
    id: "1",
    provider: "openai",
    model: "gpt-4o",
    tokens: 120000,
    cost: 1.8,
    timestamp: new Date("2026-05-01"),
    projectId: "proj_1",
  },
  {
    id: "2",
    provider: "anthropic",
    model: "claude-3-5-sonnet",
    tokens: 85000,
    cost: 1.275,
    timestamp: new Date("2026-05-02"),
    projectId: "proj_1",
  },
  {
    id: "3",
    provider: "google",
    model: "gemini-2.0-flash",
    tokens: 200000,
    cost: 0.3,
    timestamp: new Date("2026-05-03"),
    projectId: "proj_2",
  },
];
