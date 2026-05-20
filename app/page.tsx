import Link from "next/link";
import { prisma } from "@/lib/db";
import { p } from "@/lib/format";

export default async function Home() {
  const jobs = await prisma.job.findMany({ where: { status: "published" }, orderBy: { createdAt: "desc" }});
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <section className="mb-12">
        <h1 className="text-3xl font-bold mb-3">Dein nächster Job bei ZAHNÄRZTEMG</h1>
        <p className="text-slate-600">Moderne Zimmer, klare Abläufe, nettes Team. Bewirb dich in 60 Sekunden – Lebenslauf reicht.</p>
      </section>

      <section className="grid md:grid-cols-2 gap-6">
        {jobs.map(j => (
          <Link key={j.id} href={`/jobs/${j.slug}`} className="border rounded-lg p-5 hover:shadow">
            <h2 className="text-xl font-semibold">{j.title}</h2>
            <p className="mt-2 text-slate-700">{j.intro}</p>
            <ul className="mt-3 text-sm list-disc ml-5">
              {p(j.benefits).slice(0,3).map((b,i)=><li key={i}>{b}</li>)}
            </ul>
            <div className="mt-4 text-sm text-slate-600">{j.location} · {j.employmentType}</div>
          </Link>
        ))}
      </section>

      <section className="mt-12">
        <Link href="/admin" className="text-sm underline">Admin</Link>
      </section>
    </div>
  );
}
