import { mkdirSync, existsSync } from "node:fs";
import { execFileSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import ffmpegPath from "@ffmpeg-installer/ffmpeg";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const assets = "C:\\Users\\IT.7\\.cursor\\projects\\d-mylinktr\\assets";
const out = path.join(root, "public", "media");
mkdirSync(out, { recursive: true });

const ffmpeg = ffmpegPath.path;

function runFfmpeg(args) {
  execFileSync(ffmpeg, args, { stdio: "inherit" });
}

/** Attached user assets → optimised public files */
const attached = [
  {
    src: path.join(
      assets,
      "c__Users_IT.7_AppData_Roaming_Cursor_User_workspaceStorage_4f3b43d6b43870c98f5a26b7baf40237_images_image-6648c078-e9f5-49f4-b796-9ae50cdc4915.png",
    ),
    out: path.join(out, "neotracked", "daily-score.webp"),
    width: 960,
    extract: { left: 0, top: 0, width: 780, height: 680 },
  },
  {
    src: path.join(
      assets,
      "c__Users_IT.7_AppData_Roaming_Cursor_User_workspaceStorage_4f3b43d6b43870c98f5a26b7baf40237_images_bogazici_university-3c50777f-4c58-4508-bc52-d87109489b0d.png",
    ),
    out: path.join(out, "unielitez", "turkiye.webp"),
    width: 800,
  },
  {
    src: path.join(
      assets,
      "c__Users_IT.7_AppData_Roaming_Cursor_User_workspaceStorage_4f3b43d6b43870c98f5a26b7baf40237_images_download-8a696601-293d-4a0b-9450-621841ac45f2.png",
    ),
    out: path.join(out, "unielitez", "germany.webp"),
    width: 800,
  },
];

for (const item of attached) {
  mkdirSync(path.dirname(item.out), { recursive: true });
  let img = sharp(item.src);
  if (item.extract) {
    img = img.extract(item.extract);
  }
  if (item.width) {
    img = img.resize({ width: item.width, withoutEnlargement: true });
  }
  await img.webp({ quality: 84, effort: 4 }).toFile(item.out);
  console.log("attached:", path.basename(item.out));
}

/* Countdown screen recording → trimmed mp4 + poster */
const videoSrc =
  "c:\\Users\\IT.7\\Videos\\Screen Recordings\\Screen Recording 2026-08-15 223622.mp4";
const videoDir = path.join(out, "neotracked");
mkdirSync(videoDir, { recursive: true });
const mp4Out = path.join(videoDir, "countdown.mp4");
const posterOut = path.join(videoDir, "countdown-poster.webp");

if (existsSync(videoSrc)) {
  runFfmpeg([
    "-y",
    "-i",
    videoSrc,
    "-ss",
    "0.3",
    "-t",
    "5.5",
    "-vf",
    "scale=720:-2:flags=lanczos",
    "-c:v",
    "libx264",
    "-preset",
    "slow",
    "-crf",
    "28",
    "-pix_fmt",
    "yuv420p",
    "-movflags",
    "+faststart",
    "-an",
    mp4Out,
  ]);

  const posterPng = path.join(videoDir, "countdown-poster.png");
  runFfmpeg(["-y", "-ss", "1.2", "-i", mp4Out, "-frames:v", "1", "-q:v", "2", posterPng]);
  await sharp(posterPng).webp({ quality: 82 }).toFile(posterOut);
  console.log("video:", path.basename(mp4Out), "+ poster");
} else {
  console.warn("Video source not found, skipping countdown encode.");
}

console.log("Done.");
