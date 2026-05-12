import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const savings = searchParams.get("savings") || "0";

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#080b14",
            backgroundImage: "radial-gradient(circle at 50% 50%, #1e1b4b 0%, #080b14 100%)",
            color: "white",
            padding: "80px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100px",
              width: "100px",
              backgroundColor: "#7c3aed",
              borderRadius: "24px",
              marginBottom: "40px",
            }}
          >
            <svg
              width="60"
              height="60"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
          </div>
          <div
            style={{
              fontSize: "48px",
              fontWeight: "bold",
              color: "#a78bfa",
              marginBottom: "20px",
              textTransform: "uppercase",
              letterSpacing: "4px",
            }}
          >
            AI Spend Audit
          </div>
          <div
            style={{
              fontSize: "84px",
              fontWeight: "900",
              marginBottom: "20px",
            }}
          >
            Save ${savings}/year
          </div>
          <div
            style={{
              fontSize: "32px",
              color: "#94a3b8",
              maxWidth: "800px",
              lineHeight: "1.4",
            }}
          >
            View the verified optimization roadmap to reduce AI overhead and increase productivity.
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
