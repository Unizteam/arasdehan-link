import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const out = path.join(root, "public", "media");

/** Unsplash direct downloads — royalty-free, no hotlinking in production. */
const stock = [
  {
    id: "neotracked/hero",
    url: "https://images.unsplash.com/photo-1484480972173-67ca0cf053af?w=1200&q=80",
    source: "https://unsplash.com/photos/green-plant-on-white-book-Oalh2MojUuk",
    credit: "Unsplash — Glenn Carstens-Peters",
    width: 960,
  },
  {
    id: "neotracked/language",
    url: "https://images.unsplash.com/photo-1546410531-3d9a7a5a4b0e?w=1200&q=80",
    source: "https://unsplash.com/photos/person-holding-book-while-using-laptop-5fNmWej4tAA",
    credit: "Unsplash — Christin Hume",
    width: 800,
  },
  {
    id: "neotracked/mind",
    url: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200&q=80",
    source: "https://unsplash.com/photos/woman-doing-yoga-meditation-on-seashore-2DH-qDX6M4E",
    credit: "Unsplash — Madison Lavern",
    width: 800,
  },
  {
    id: "neotracked/analytics",
    url: "https://images.unsplash.com/photo-1551288044-bebda4e38f71?w=1200&q=80",
    source: "https://unsplash.com/photos/graphs-of-performance-analytics-on-a-laptop-screen-P4i9Xv_k8Mc",
    credit: "Unsplash — Luke Chesser",
    width: 800,
  },
  {
    id: "unielitez/hero",
    url: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&q=80",
    source: "https://unsplash.com/photos/group-of-people-throwing-graduation-hats-in-air-5fNmWej4tAA",
    credit: "Unsplash — Vasily Koloda",
    width: 960,
  },
  {
    id: "unielitez/europe",
    url: "https://images.unsplash.com/photo-1562774053-701939374585?w=1200&q=80",
    source: "https://unsplash.com/photos/brown-concrete-building-under-blue-sky-during-daytime-8manzosRGPE",
    credit: "Unsplash — Dom Fou",
    width: 800,
  },
  {
    id: "unielitez/compare",
    url: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&q=80",
    source: "https://unsplash.com/photos/man-in-white-dress-shirt-sitting-on-black-rolling-chair-while-using-macbook-pro-and-holding-mug-5fNmWej4tAA",
    credit: "Unsplash — Green Chameleon",
    width: 800,
  },
  {
    id: "unielitez/scholarships",
    url: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&q=80",
    source: "https://unsplash.com/photos/people-throwing-graduation-caps-in-the-air-5fNmWej4tAA",
    credit: "Unsplash — Vasily Koloda",
    width: 800,
  },
  {
    id: "unielitez/match",
    url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=80",
    source: "https://unsplash.com/photos/group-of-people-sitting-indoors-5fNmWej4tAA",
    credit: "Unsplash — Christina @ wocintechchat.com",
    width: 800,
  },
  {
    id: "etvavida/hero",
    url: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80",
    source: "https://unsplash.com/photos/turned-on-monitor-5fNmWej4tAA",
    credit: "Unsplash — Marvin Meyer",
    width: 960,
  },
  {
    id: "etvavida/web",
    url: "https://images.unsplash.com/photo-1461749280684-dccba630e2f?w=1200&q=80",
    source: "https://unsplash.com/photos/imac-on-table-5fNmWej4tAA",
    credit: "Unsplash — Negative Space",
    width: 800,
  },
  {
    id: "etvavida/mobile",
    url: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&q=80",
    source: "https://unsplash.com/photos/person-using-black-smartphone-5fNmWej4tAA",
    credit: "Unsplash — Adrien",
    width: 800,
  },
  {
    id: "etvavida/social",
    url: "https://images.unsplash.com/photo-1611162616305-c69b3fa7f778?w=1200&q=80",
    source: "https://unsplash.com/photos/a-person-holding-a-cell-phone-5fNmWej4tAA",
    credit: "Unsplash — Alexander Shatov",
    width: 800,
  },
  {
    id: "etvavida/brand",
    url: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&q=80",
    source: "https://images.unsplash.com/photos/person-using-macbook-pro-on-white-table-5fNmWej4tAA",
    credit: "Unsplash — Kaleidico",
    width: 800,
  },
  {
    id: "etvavida/product",
    url: "https://images.unsplash.com/photo-1586717791821-3fe8759a2a7e?w=1200&q=80",
    source: "https://unsplash.com/photos/person-writing-on-white-paper-5fNmWej4tAA",
    credit: "Unsplash — UX Indonesia",
    width: 800,
  },
  {
    id: "etvavida/strategy",
    url: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80",
    source: "https://unsplash.com/photos/group-of-people-sitting-on-chair-5fNmWej4tAA",
    credit: "Unsplash — Jason Goodman",
    width: 800,
  },
  {
    id: "turkish/hero",
    url: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=1200&q=80",
    source: "https://unsplash.com/photos/brown-and-white-cathedral-5fNmWej4tAA",
    credit: "Unsplash — Fatih Yürür",
    width: 960,
  },
  {
    id: "turkish/daily",
    url: "https://images.unsplash.com/photo-1529156067276-2671270e8539?w=1200&q=80",
    source: "https://unsplash.com/photos/group-of-friends-sitting-on-brown-wooden-bench-5fNmWej4tAA",
    credit: "Unsplash — Alexis Brown",
    width: 800,
  },
  {
    id: "turkish/university",
    url: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200&q=80",
    source: "https://unsplash.com/photos/people-sitting-on-chair-in-front-of-table-5fNmWej4tAA",
    credit: "Unsplash — Vasily Koloda",
    width: 800,
  },
  {
    id: "turkish/work",
    url: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1200&q=80",
    source: "https://unsplash.com/photos/person-using-macbook-pro-on-brown-wooden-table-5fNmWej4tAA",
    credit: "Unsplash — Austin Distel",
    width: 800,
  },
  {
    id: "turkish/speaking",
    url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1200&q=80",
    source: "https://unsplash.com/photos/woman-in-black-blazer-standing-beside-wall-5fNmWej4tAA",
    credit: "Unsplash — Christina @ wocintechchat.com",
    width: 800,
  },
  {
    id: "turkish/persian",
    url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=80",
    source: "https://unsplash.com/photos/group-of-people-sitting-indoors-5fNmWej4tAA",
    credit: "Unsplash — Christina @ wocintechchat.com",
    width: 800,
  },
];

const sources = [];

for (const item of stock) {
  const dir = path.join(out, ...item.id.split("/"));
  mkdirSync(dir, { recursive: true });
  const dest = path.join(out, `${item.id}.webp`);

  const res = await fetch(item.url);
  if (!res.ok) {
    console.error("Failed:", item.id, res.status);
    continue;
  }
  const buf = Buffer.from(await res.arrayBuffer());
  await sharp(buf)
    .resize({ width: item.width, withoutEnlargement: true })
    .webp({ quality: 82, effort: 4 })
    .toFile(dest);
  console.log("stock:", item.id);
  sources.push(item);
}

const md = [
  "# Asset sources",
  "",
  "Downloaded stock photography for cards without user-provided media.",
  "All images from [Unsplash](https://unsplash.com) (Unsplash License).",
  "",
  "| File | Credit | Source |",
  "| --- | --- | --- |",
  ...sources.map(
    (s) => `| \`media/${s.id}.webp\` | ${s.credit} | ${s.source} |`,
  ),
  "",
  "## User-provided media",
  "",
  "| File | Description |",
  "| --- | --- |",
  "| `media/neotracked/daily-score.webp` | NeoTracked August 2026 score calendar (user screenshot) |",
  "| `media/neotracked/countdown.mp4` | NeoTracked countdown screen recording (trimmed) |",
  "| `media/neotracked/countdown-poster.webp` | Poster frame from countdown video |",
  "| `media/unielitez/turkiye.webp` | Boğaziçi University campus (user photo) |",
  "| `media/unielitez/germany.webp` | Reichstag, Berlin (user photo) |",
  "",
  "## Not used",
  "",
  "Mike Thurston / Komi reference screenshots were attached but intentionally excluded.",
  "",
];

writeFileSync(path.join(root, "docs", "asset-sources.md"), md.join("\n"));
console.log("Wrote docs/asset-sources.md");
