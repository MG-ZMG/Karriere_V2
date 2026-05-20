import { NextResponse } from "next/server";
export async function POST(req: Request) {
  // Hier später: Daten parsen, in DB speichern, Feeds regenerieren, Meta/Google Hooks triggern.
  return NextResponse.redirect(new URL("/admin", req.url), 303);
}
