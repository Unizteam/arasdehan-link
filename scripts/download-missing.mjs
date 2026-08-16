import { mkdirSync, writeFileSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const out = path.join(root, "public", "media");

/** Pexels — free to use, downloaded locally. */
const missing = [
  {
    id: "neotracked/hero",
    url: "https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=1200",
    source: "https://www.pexels.com/photo/person-using-macbook-pro-on-white-table-590020/",
    credit: "Pexels — Burst",
    width: 960,
  },
  {
    id: "neotracked/language",
    url: "https://images.pexels.com/photos/256417/pexels-photo-256417.jpeg?auto=compress&cs=tinysrgb&w=1200",
    source: "https://www.pexels.com/photo/person-holding-book-256417/",
    credit: "Pexels — Pixabay",
    width: 800,
  },
  {
    id: "neotracked/analytics",
    url: "https://images.pexels.com/photos/669996/pexels-photo-669996.jpeg?auto=compress&cs=tinysrgb&w=1200",
    source: "https://www.pexels.com/photo/person-using-laptop-computer-holding-card-669996/",
    credit: "Pexels — Lukas",
    width: 800,
  },
  {
    id: "unielitez/hero",
    url: "https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=1200",
    source: "https://www.pexels.com/photo/architecture-building-campus-college-267885/",
    credit: "Pexels — Pixabay",
    width: 960,
  },
  {
    id: "etvavida/web",
    url: "https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=1200",
    source: "https://www.pexels.com/photo/turned-on-monitor-showing-html-codes-1181677/",
    credit: "Pexels — Anonymouse",
    width: 800,
  },
  {
    id: "etvavida/social",
    url: "https://images.pexels.com/photos/147413/pexels-photo-147413.jpeg?auto=compress&cs=tinysrgb&w=1200",
    source: "https://www.pexels.com/photo/twitter-mobile-phone-on-laptop-147413/",
    credit: "Pexels — Pixabay",
    width: 800,
  },
  {
    id: "etvavida/product",
    url: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1200",
    source: "https://www.pexels.com/photo/macbook-pro-on-table-beside-white-imac-and-magic-mouse-196644/",
    credit: "Pexels — Tranmautritam",
    width: 800,
  },
  {
    id: "turkish/daily",
    url: "https://images.pexels.com/photos/3184298/pexels-photo-3184298.jpeg?auto=compress&cs=tinysrgb&w=1200",
    source: "https://www.pexels.com/photo/group-of-people-sitting-indoors-3184298/",
    credit: "Pexels — fauxels",
    width: 800,
  },
];

const sources = [];

for (const item of missing) {
  const dest = path.join(out, `${item.id}.webp`);
  if (existsSync(dest)) {
    console.log("skip:", item.id);
    continue;
  }
  mkdirSync(path.dirname(dest), { recursive: true });
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
  console.log("ok:", item.id);
  sources.push(item);
}

mkdirSync(path.join(root, "docs"), { recursive: true });
writeFileSync(
  path.join(root, "docs", "asset-sources.md"),
  [
    "# Asset sources",
    "",
    "## User-provided",
    "",
    "| File | Description |",
    "| --- | --- |",
    "| `media/neotracked/daily-score.webp` | NeoTracked score calendar screenshot |",
    "| `media/neotracked/countdown.mp4` | NeoTracked countdown screen recording (trimmed, muted) |",
    "| `media/neotracked/countdown-poster.webp` | Poster from countdown video |",
    "| `media/unielitez/turkiye.webp` | Boğaziçi University campus photo |",
    "| `media/unielitez/germany.webp` | Reichstag Berlin photo |",
    "",
    "## Pexels (additional downloads)",
    "",
    ...sources.map((s) => `- \`media/${s.id}.webp\` — ${s.credit} — ${s.source}`),
    "",
    "## Unsplash (initial batch — see public/media for files)",
    "",
    "Additional cards use Unsplash License images downloaded during build.",
    "",
    "## Excluded",
    "",
    "Mike Thurston / Komi reference screenshots were not used.",
    "",
  ].join("\n"),
);
console.log("Done");
