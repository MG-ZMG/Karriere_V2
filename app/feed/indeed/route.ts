import { prisma } from "@/lib/db";
import { p } from "@/lib/format";

export async function GET() {
  const jobs = await prisma.job.findMany({ where: { status: "published" }});
  const items = jobs.map(j => `
  <job>
    <title>${escapeXml(j.title)}</title>
    <date>${j.createdAt.toISOString()}</date>
    <referencenumber>${j.slug}</referencenumber>
    <url>${process.env.SITE_URL}/jobs/${j.slug}</url>
    <company>ZAHNÄRZTEMG</company>
    <city>${j.location}</city>
    <country>DE</country>
    <description><![CDATA[
      <p>${j.intro}</p>
      <h3>Aufgaben</h3><ul>${p(j.responsibilities).map(x=>`<li>${x}</li>`).join("")}</ul>
      <h3>Profil</h3><ul>${p(j.requirements).map(x=>`<li>${x}</li>`).join("")}</ul>
      <h3>Wir bieten</h3><ul>${p(j.benefits).map(x=>`<li>${x}</li>`).join("")}</ul>
    ]]></description>
  </job>`).join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <
