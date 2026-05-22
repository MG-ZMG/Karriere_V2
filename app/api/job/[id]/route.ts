import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

function linesToJson(s: string | null) {
  return JSON.stringify((s || "").split("\n").map(x=>x.trim()).filter(Boolean));
}

export async function GET(
  _req: Request,
  ctx: { params: { id: string } }
) {
  const j = await prisma.job.findUnique({ where: { id: ctx.params.id }});
  if (!j) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({
    ...j,
    responsibilitiesParsed: JSON.parse(j.responsibilities),
    requirementsParsed: JSON.parse(j.requirements),
    benefitsParsed: JSON.parse(j.benefits),
  });
}

export async function POST(req: Request, ctx: { params: { id: string } }) {
  const form = await req.formData();
  const data = {
    title: String(form.get("title") || ""),
    slug: String(form.get("slug") || ""),
    intro: String(form.get("intro") || ""),
    responsibilities: linesToJson(String(form.get("responsibilities") || "")),
    requirements: linesToJson(String(form.get("requirements") || "")),
    benefits: linesToJson(String(form.get("benefits") || "")),
    employmentType: String(form.get("employmentType") || ""),
    location: String(form.get("location") || ""),
    status: String(form.get("status") || "published"),
  };
  await prisma.job.update({ where: { id: ctx.params.id }, data });
  return NextResponse.redirect(new URL("/admin", req.url), 303);
}
