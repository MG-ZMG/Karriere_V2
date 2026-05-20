export const j = (arr: string[]) => JSON.stringify(arr);
export const p = (json: string | null) => (json ? (JSON.parse(json) as string[]) : []);
export const toSlug = (s: string) =>
  s.toLowerCase().normalize("NFKD").replace(/[^\w\s-]/g,"").trim().replace(/\s+/g,"-");
