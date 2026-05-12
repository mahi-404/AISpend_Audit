import { NextResponse } from "next/server";
import { saveAudit } from "@/services/db";

export async function POST(request: Request) {
  try {
    const { input, result } = await request.json();

    if (!input || !result) {
      return NextResponse.json({ error: "Missing data" }, { status: 400 });
    }

    const data = await saveAudit(input, result);

    return NextResponse.json({ 
      success: true, 
      id: data.id, 
      shareToken: data.share_token 
    });
  } catch (error: any) {
    console.error("Audit save error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
