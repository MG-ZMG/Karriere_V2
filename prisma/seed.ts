import { seed } from "../lib/jobs";
seed().then(()=>{ console.log("Seeded"); process.exit(0); });
