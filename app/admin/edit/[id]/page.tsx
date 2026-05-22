"use client";
import { useEffect, useState } from "react";

export default function EditJob({ params }: { params: { id: string }}) {
  const [job, setJob] = useState<any>(null);

  useEffect(() => {
    fetch(`/api/job/${params.id}`).then(r=>r.json()).then(setJob);
  }, [params.id]);

  if (!job) return <div className="mx-auto max-w-3xl px-4 py-10">Lade…</div>;

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-bold mb-4">Job bearbeiten</h1>
      <form method="post" action={`/api/job/${params.id}`} className="grid gap-3">
        <input name="title" defaultValue={job.title} className="border rounded p-2" />
        <input name="slug" defaultValue={job.slug} className="border rounded p-2" />
        <textarea name="intro" defaultValue={job.intro} className="border rounded p-2" />
        <textarea name="responsibilities" defaultValue={job.responsibilitiesParsed.join("\n")} className="border rounded p-2" />
        <textarea name="requirements" defaultValue={job.requirementsParsed.join("\n")} className="border rounded p-2" />
        <textarea name="benefits" defaultValue={job.benefitsParsed.join("\n")} className="border rounded p-2" />
        <input name="employmentType" defaultValue={job.employmentType} className="border rounded p-2" />
        <input name="location" defaultValue={job.location} className="border rounded p-2" />
        <select name="status" defaultValue={job.status} className="border rounded p-2">
          <option value="published">published</option>
          <option value="draft">draft</option>
        </select>
        <button className="bg-slate-900 text-white rounded px-4 py-2 w-max">Speichern</button>
      </form>
    </div>
  );
}
