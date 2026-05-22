import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

function csvRow(cols: string[]) {
  return cols.map(c => `"${c.replace(/"/g,'""')}"`).join(",") + "\n";
}

export async function GET(
  _req: Request,
  ctx: { params: { slug: string } }
) {
  const job = await prisma.job.findUnique({ where: { slug: ctx.params.slug } });
  if (!job) return new NextResponse("Not found", { status: 404 });

  const headlines = [
    "ZFA gesucht – feste Zeiten",
    "ZMP: Prophylaxe mit Zeit",
    "Zahnarztteam in MG",
    "Kinderzahnarzt mit Herz",
    "KFO digital arbeiten",
    "Bewirb dich in 60 Sek.",
    "Modern & menschlich",
    "Top‑Team, faire Bezahlung",
    "Jetzt in Mönchengladbach",
    "Karriere bei ZAHNÄRZTEMG",
    job.title.slice(0,30)
  ].slice(0,15);

  const descriptions = [
    "Moderne Praxis, klare Abläufe. Starte jetzt.",
    "Fortbildungen, faires Gehalt, nettes Team.",
    "Unkomplizierte Bewerbung – Lebenslauf reicht.",
    `${job.location}: ${job.employmentType}`
  ].map(d => d.slice(0,90));

  let csv = "";
  csv += csvRow(["Headline"]);
  headlines.forEach(h => csv += csvRow([h]));
  csv += "\n";
  csv += csvRow(["Description"]);
  descriptions.forEach(d => csv += csvRow([d]));

  return new NextResponse(csv, {
    status: 200,
    headers: { "Content-Type": "text/csv; charset=utf-8" }
  });
}
