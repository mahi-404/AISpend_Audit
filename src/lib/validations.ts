import * as z from "zod";
import { ToolName, UseCaseSuitability } from "@/types/pricing";

export const toolSchema = z.object({
  tool: z.string().min(1, "Please select a tool"),
  plan: z.string().min(1, "Plan name is required"),
  seats: z.number().min(1, "At least 1 seat required"),
  monthlySpend: z.number().min(0, "Spend cannot be negative"),
});

export const auditFormSchema = z.object({
  teamSize: z.number().min(1, "Team size must be at least 1"),
  useCase: z.enum(["coding", "writing", "research", "analysis", "mixed", "marketing"] as const),
  tools: z.array(toolSchema).min(1, "Please add at least one AI tool"),
});

export const leadSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  company: z.string().min(1, "Company name is required"),
  role: z.string().min(1, "Please specify your role"),
  teamSize: z.number().optional(),
  auditId: z.string().uuid().optional(),
  honeypot: z.string().max(0, "Spam detected").optional(), // Honeypot field
});

export type AuditFormValues = z.infer<typeof auditFormSchema>;
export type LeadFormValues = z.infer<typeof leadSchema>;
