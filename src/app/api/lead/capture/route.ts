import { NextResponse } from "next/server";
import { captureLead } from "@/services/db";
import { sendLeadConfirmationEmail } from "@/services/email";
import { leadSchema } from "@/lib/validations";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // 1. Zod Validation & Honeypot Check
    const validatedData = leadSchema.parse(body);

    // 2. Persist to Database
    const lead = await captureLead(
      validatedData.email,
      validatedData.company,
      validatedData.auditId,
      0 // Savings placeholder
    );

    // 3. Send Confirmation Email
    await sendLeadConfirmationEmail(validatedData.email, validatedData.company);

    return NextResponse.json({ success: true, id: lead.id });
  } catch (error: any) {
    console.error("Lead capture error:", error);
    
    if (error.name === "ZodError") {
      return NextResponse.json({ error: "Invalid data", details: error.errors }, { status: 400 });
    }

    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
