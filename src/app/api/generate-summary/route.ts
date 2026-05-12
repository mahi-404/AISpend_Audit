import { NextResponse } from "next/server";
import { generateAuditSummary } from "@/services/ai";

export async function POST(request: Request) {
  try {
    const { result } = await request.json();

    if (!result) {
      return NextResponse.json({ error: "Missing result data" }, { status: 400 });
    }

    const summary = await generateAuditSummary(result);

    return NextResponse.json({ summary });
  } catch (error: any) {
    console.error("Summary generation error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
