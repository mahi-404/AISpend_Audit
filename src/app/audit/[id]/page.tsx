import { Metadata } from "next";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { AuditDashboard } from "@/components/audit/audit-dashboard";
import { Badge } from "@/components/ui/badge";
import { Zap } from "lucide-react";
import { siteConfig } from "@/lib/config";

interface PublicAuditPageProps {
  params: { id: string };
}

/**
 * Fetches the public audit data from Supabase.
 * Ensures the audit is marked as 'public'.
 */
async function getPublicAudit(id: string) {
  const { data, error } = await supabase
    .from("audits")
    .select("*")
    .eq("id", id)
    .eq("is_public", true)
    .single();

  if (error || !data) return null;
  return data;
}

/**
 * Generates dynamic SEO and Social Metadata
 */
export async function generateMetadata({ params }: PublicAuditPageProps): Promise<Metadata> {
  const audit = await getPublicAudit(params.id);
  
  if (!audit) {
    return {
      title: "Audit Not Found | AI Spend Audit",
    };
  }

  const savings = audit.result_data.totalSavingsYearly;
  const title = `AI Spend Roadmap: Save $${savings}/year`;
  const description = `This team identified $${savings} in annual savings across their AI stack. View the optimization roadmap.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `${siteConfig.url}/audit/${params.id}`,
      images: [
        {
          url: `${siteConfig.url}/api/og?savings=${savings}`, // Dynamic OG image endpoint
          width: 1200,
          height: 630,
          alt: "AI Spend Audit Roadmap",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${siteConfig.url}/api/og?savings=${savings}`],
    },
  };
}

export default async function PublicAuditPage({ params }: PublicAuditPageProps) {
  const audit = await getPublicAudit(params.id);

  if (!audit) {
    notFound();
  }

  return (
    <div className="container mx-auto max-w-5xl px-4 py-24">
      {/* Public Header */}
      <div className="mb-12 flex flex-col items-center text-center">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary shadow-xl shadow-primary/20">
          <Zap className="h-8 w-8 text-primary-foreground" />
        </div>
        <Badge variant="outline" className="mb-4 uppercase tracking-widest text-primary border-primary/20 bg-primary/5">
          Public Optimization Report
        </Badge>
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          AI Spend <span className="gradient-text">Roadmap</span>
        </h1>
        <p className="mt-4 max-w-xl text-lg text-muted-foreground">
          A verified audit identifying ${audit.result_data.totalSavingsYearly} in annual savings across {audit.result_data.recommendations.length} optimization areas.
        </p>
      </div>

      {/* Reusing the Dashboard with 'readonly' mindset */}
      <div className="relative rounded-3xl border border-border/50 bg-card/50 p-1 shadow-2xl">
        <div className="absolute inset-0 -z-10 bg-grid-pattern opacity-10" />
        <AuditDashboard 
          result={audit.result_data} 
          onReset={() => {}} // Disabled for public view
        />
      </div>

      {/* Public Footer CTA */}
      <div className="mt-20 rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/5 to-transparent p-12 text-center">
        <h2 className="text-2xl font-bold">Want to audit your own AI spend?</h2>
        <p className="mt-2 text-muted-foreground">Join 150+ teams saving millions in wasted AI subscriptions.</p>
        <div className="mt-8 flex justify-center">
          <a
            href="/"
            className="inline-flex h-12 items-center justify-center rounded-xl bg-primary px-8 text-base font-bold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:scale-105"
          >
            Start Free Audit Now
          </a>
        </div>
      </div>
    </div>
  );
}
