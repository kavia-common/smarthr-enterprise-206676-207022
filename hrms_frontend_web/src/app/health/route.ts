import { NextResponse } from "next/server";

// PUBLIC_INTERFACE
export async function GET() {
  /** Health endpoint for platform readiness/liveness checks. */
  return NextResponse.json({ status: "ok" }, { status: 200 });
}
