import { prisma } from './db';
import { j, toSlug } from './format';

const baseLoc = "Mönchengladbach";

const jobs = [
  {
    roleKey: "zfa",
    title: "ZFA in der Behandlung (m/w/d)",
    intro: "Bei ZAHNÄRZTEMG arbeitest du strukturiert, modern und im Team auf Augenhöhe – ohne Schichtchaos.",
    responsibilities: j(["Stuhlassistenz & Aufbereitung","Röntgen & Dokumentation","PZR‑Vorbereitung","Empfangsunterstützung"]),
    requirements: j(["Abgeschlossene Ausbildung","Sorgfältige, freundliche Art","Lust auf Fortbildung"]),
    benefits: j(["Feste Zeiten","Überdurchschnittliche Vergütung","Fortbildungsbudget","Zentrale Lage","Wertschätzendes Team"]),
    employmentType: "Vollzeit/Teilzeit",
    location: baseLoc,
    slug: "zfa-in-der-behandlung",
  },
  {
    roleKey: "zmp",
    title: "ZMP Prophylaxe (m/w/d)",
    intro: "Genug Zeit pro Termin, top Geräte und echte Prävention.",
    responsibilities: j(["PZR & UPT","Recallsteuerung","Dokumentation"]),
    requirements: j(["ZMP/ZMF mit Prophylaxefokus","Kommunikativ, strukturiert"]),
    benefits: j(["Terminpuffer","Fortbildungstage","Bonusmodell"]),
    employmentType: "Vollzeit/Teilzeit",
    location: baseLoc,
    slug: "zmp-prophylaxe",
  },
  {
    roleKey: "zahnarzt",
    title: "Zahnarzt/Zahnärztin (m/w/d)",
    intro: "Qualität vor Taktzahl: Mentoring, digitale Prozesse, moderne Ausstattung.",
    responsibilities: j(["Kons/Endo/ZE je nach Schwerpunkt","Befund & Aufklärung","Dokumentation"]),
    requirements: j(["Approbation","Evidenzbasiert, teamorientiert"]),
    benefits: j(["Mentoring","Fortbildungszuschüsse","Leistungsgerechte Vergütung"]),
    employmentType: "Vollzeit/Teilzeit",
    location: baseLoc,
    slug: "zahnarzt",
  },
  {
    roleKey: "kinderzahnarzt",
    title: "Kinderzahnarzt/Kinderzahnärztin (m/w/d)",
    intro: "Kindgerechte Atmosphäre mit längeren Slots und Elternkommunikation auf Augenhöhe.",
    responsibilities: j(["Prophylaxe & Versiegelungen","Füllungen","Behutsame Begleitung von Angstpatient:innen"]),
    requirements: j(["Erfahrung mit Kindern","Geduld & klare Sprache"]),
    benefits: j(["Spezialzimmer","Team‑Support"]),
    employmentType: "Vollzeit/Teilzeit",
    location: baseLoc,
    slug: "kinderzahnarzt",
  },
  {
    roleKey: "kieferorthopade",
    title: "Kieferorthopäde/Kieferorthopädin (m/w/d)",
    intro: "KFO digital und interdisziplinär – Aligner & festsitzende Apparaturen.",
    responsibilities: j(["Diagnose & Planung","Bogenwechsel","Aligner‑Kontrollen"]),
    requirements: j(["Fachzahnarzt KFO bzw. Weiterbildung"]),
    benefits: j(["Moderne Geräte","Fortbildung","Hochwertiges Patientengut"]),
    employmentType: "Vollzeit/Teilzeit",
    location: baseLoc,
    slug: "kieferorthopade",
  }
];

export async function seed() {
  for (const x of jobs) {
    await prisma.job.upsert({
      where: { slug: x.slug },
      update: {},
      create: x as any
    });
  }
}
