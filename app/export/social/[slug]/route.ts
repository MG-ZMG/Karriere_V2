import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(
  _req: Request,
  ctx: { params: { slug: string } }
) {
  const job = await prisma.job.findUnique({ where: { slug: ctx.params.slug } });
  if (!job) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const short = `Lust auf ein Team ohne Chaos? Werde ${job.title} bei ZAHNÄRZTEMG in ${job.location}. Bewirb dich in 60 Sek.`;
  const medium = `${job.title} in ${job.location}: ${job.intro} Jetzt schnell bewerben – Lebenslauf reicht.`;
  const long = `${job.title} bei ZAHNÄRZTEMG: ${job.intro} Vorteile: ${JSON.parse(job.benefits).slice(0,3).join(", ")}. Bewirb dich jetzt!`;

  const data = {
    role: job.roleKey,
    slug: job.slug,
    captions: {
      instagram: [short, medium, long],
      facebook: [short, medium, long]
    },
    hashtags: ["#ZFA","#ZMP","#Zahnmedizin","#Karriere","#Mönchengladbach"].slice(0,3)
  };

  return NextResponse.json(data, { status: 200 });
}
