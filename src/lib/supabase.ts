import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("Supabase credentials missing. Integration will be disabled.");
}

// Defensive initialization to prevent build-time crashes
export const supabase = createClient(
  supabaseUrl || "https://placeholder.supabase.co", 
  supabaseAnonKey || "placeholder"
);

/**
 * Database Types (Matching schema.sql)
 */
export type Database = {
  public: {
    Tables: {
      audits: {
        Row: {
          id: string;
          created_at: string;
          team_size: number;
          use_case: string;
          input_data: any;
          result_data: any;
          share_token: string;
          is_public: boolean;
        };
        Insert: {
          team_size: number;
          use_case: string;
          input_data: any;
          result_data: any;
          is_public?: boolean;
        };
      };
      leads: {
        Row: {
          id: string;
          created_at: string;
          email: string;
          company_name: string | null;
          audit_id: string | null;
          savings_amount: number | null;
          status: string;
        };
        Insert: {
          email: string;
          company_name?: string;
          audit_id?: string;
          savings_amount?: number;
        };
      };
      public_reports: {
        Row: {
          id: string;
          audit_id: string;
          slug: string;
          view_count: number;
          created_at: string;
        };
        Insert: {
          audit_id: string;
          slug: string;
        };
      };
    };
  };
};
