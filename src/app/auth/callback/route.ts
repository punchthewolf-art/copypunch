import { NextResponse } from "next/server";

// Phase 2: will exchange OAuth code for Supabase session
export async function GET(request: Request) {
  const { origin } = new URL(request.url);
  return NextResponse.redirect(`${origin}/generateur`);
}
