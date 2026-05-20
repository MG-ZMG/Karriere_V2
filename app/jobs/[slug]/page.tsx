import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { p } from "@/lib/format";

export default async function JobPage({ params }: { params: { slug: string }}) {
  const job = await prisma.job.findUnique({ where: { slug: params.slug }});
  if (!job) return notFound();
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold">{job.title}</h1>
      <p className="mt-3 text-slate-700">{job.intro}</p>

      <div className="mt-6 grid md:grid-cols-2 gap-6">
        <div>
          <h2 className="font-semibold">Deine Aufgaben</h2>
          <ul className="list-disc ml-5 mt-2">{p(job.responsibilities).map((x,i)=><li key={i}>{x}</li>)}</ul>
        </div>
        <div>
          <h2 className="font-semibold">Das bringst du mit</h2>
          <ul className="list-disc ml-5 mt-2">{p(job.requirements).map((x,i)=><li key={i}>{x}</li>)}</ul>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="font-semibold">Wir bieten</h2>
        <ul className="list-disc ml-5 mt-2">{p(job.benefits).map((x,i)=><li key={i}>{x}</li>)}</ul>
      </div>

      <div className="mt-8 border rounded-lg p-4">
        <h3 className="font-semibold mb-2">Kurzbewerbung</h3>
        <form action={`mailto:${process.env.CONTACT_EMAIL}`} method="post" encType="text/plain" className="grid gap-3">
          <input name="name" placeholder="Dein Name" className="border rounded p-2" required />
          <input name="email" type="email" placeholder="E-Mail" className="border rounded p-2" required />
          <input name="phone" placeholder="Telefon (optional)" className="border rounded p-2" />
          <textarea name="message" placeholder="Kurze Nachricht (optional)" className="border rounded p-2" />
          <button className="bg-slate-900 text-white rounded px-4 py-2 w-max">Absenden</button>
        </form>
        <p className="text-xs text-slate-500 mt-2">Mit dem Absenden stimmst du der Verarbeitung deiner Daten zum Zweck der Bewerbung zu.</p>
      </div>
    </div>
  );
}
