import Link from "next/link";
import { prisma } from "@/lib/db";

export default async function Admin() {
  const jobs = await prisma.job.findMany({ orderBy: { createdAt: "desc" }});
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Jobs</h1>
        <Link href="/admin/new" className="bg-slate-900 text-white rounded px-3 py-2 text-sm">Neu</Link>
      </div>
      <table className="w-full text-sm mt-6">
        <thead><tr className="text-left"><th>Titel</th><th>Slug</th><th>Status</th><th></th></tr></thead>
        <tbody>
          {jobs.map(j=>(
            <tr key={j.id} className="border-t">
              <td className="py-2">{j.title}</td>
              <td>{j.slug}</td>
              <td>{j.status}</td>
              <td className="text-right">
                <Link href={`/admin/edit/${j.id}`} className="underline">Bearbeiten</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
