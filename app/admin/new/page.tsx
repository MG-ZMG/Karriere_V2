"use client";
import { useState } from "react";
import { toSlug } from "@/lib/format";

export default function NewJob() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-bold mb-4">Neuer Job</h1>
      <form method="post" action="/api/publish" className="grid gap-3">
        <input name="title" value={title} onChange={e=>{setTitle(e.target.value); setSlug(toSlug(e.target.value));}} placeholder="Titel" className="border rounded p-2" required />
        <input name="slug" value={slug} onChange={e=>setSlug(e.target.value)} placeholder="slug" className="border rounded p-2" required />
        <textarea name="intro" placeholder="Intro" className="border rounded p-2" required />
        <textarea name="responsibilities" placeholder="Aufgaben — je Zeile ein Punkt" className="border rounded p-2" />
        <textarea name="requirements" placeholder="Profil — je Zeile ein Punkt" className="border rounded p-2" />
        <textarea name="benefits" placeholder="Benefits — je Zeile ein Punkt" className="border rounded p-2" />
        <input name="employmentType" placeholder="Vollzeit/Teilzeit" className="border rounded p-2" defaultValue="Vollzeit/Teilzeit"/>
        <input name="location" placeholder="Standort" className="border rounded p-2" defaultValue="Mönchengladbach"/>
        <select name="roleKey" className="border rounded p-2">
          <option value="zfa">ZFA</option>
          <option value="zmp">ZMP</option>
          <option value="zahnarzt">Zahnarzt</option>
          <option value="kinderzahnarzt">Kinderzahnarzt</option>
          <option value="kieferorthopade">Kieferorthopäde</option>
        </select>
        <button className="bg-slate-900 text-white rounded px-4 py-2 w-max">Speichern & veröffentlichen</button>
      </form>
      <p className="text-xs text-slate-500 mt-2">Hinweis: Das Formular speichert in dieser Version noch exemplarisch und triggert dann den Publish‑Dummy.</p>
    </div>
  );
}
