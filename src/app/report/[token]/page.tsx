import { getAuditByToken } from "@/services/db";
import { AuditDashboard } from "@/components/audit/audit-dashboard";
import { notFound } from "next/navigation";
import { Metadata } from "next";

interface ReportPageProps {
  params: { token: string };
}

export async function generateMetadata({ params }: ReportPageProps): Promise<Metadata> {
  const audit = await getAuditByToken(params.token).catch(() => null);
  
  if (!audit) return { title: "Report Not Found" };

  return {
    title: `AI Spend Audit Report - $${audit.result_data.totalSavingsYearly}/yr savings`,
    description: `Optimization roadmap for a team of ${audit.team_size} using ${audit.use_case} AI tools.`,
  };
}

export default async function ReportPage({ params }: ReportPageProps) {
  try {
    const audit = await getAuditByToken(params.token);

    if (!audit) {
      notFound();
    }

    return (
      <div className="container mx-auto max-w-5xl px-4 py-24">
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-bold">Public Optimization Report</h1>
          <p className="text-muted-foreground">Generated on {new Date(audit.created_at).toLocaleDateString()}</p>
        </div>
        
        {/* We reuse the same dashboard but hide the "New Audit" button in a real app, 
            or handle it via a 'readonly' prop if needed. */}
        <AuditDashboard 
          result={audit.result_data} 
          onReset={() => {}} // Reset is disabled for public reports
        />
      </div>
    );
  } catch (error) {
    console.error("Error loading report:", error);
    notFound();
  }
}
