import { supabase } from "@/lib/supabase";
import { AuditInput, AuditResult } from "@/types/audit";

/**
 * Save an audit to the database
 */
export async function saveAudit(input: AuditInput, result: AuditResult) {
  const { data, error } = await supabase
    .from("audits")
    .insert({
      team_size: input.teamSize,
      use_case: input.useCase,
      input_data: input.tools,
      result_data: result,
      is_public: true, // Default to true for sharing capabilities
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Capture a lead for consultation
 */
export async function captureLead(email: string, company?: string, auditId?: string, savings?: number) {
  const { data, error } = await supabase
    .from("leads")
    .insert({
      email,
      company_name: company,
      audit_id: auditId,
      savings_amount: savings,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Get an audit by its share token
 */
export async function getAuditByToken(token: string) {
  const { data, error } = await supabase
    .from("audits")
    .select("*")
    .eq("share_token", token)
    .single();

  if (error) throw error;
  return data;
}

/**
 * Increment view count for a public report
 */
export async function incrementReportView(slug: string) {
  const { data, error } = await supabase
    .rpc("increment_view_count", { report_slug: slug });
  
  // Note: This requires a custom SQL function in Supabase
  // create function increment_view_count(report_slug text) 
  // returns void as $$ update public_reports set view_count = view_count + 1 where slug = report_slug $$ language sql;

  return { data, error };
}
