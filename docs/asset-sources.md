# Asset sources

All media is stored locally under `public/media/`. Nothing is hotlinked.

## User-provided

| File | Description |
| --- | --- |
| `media/neotracked/daily-score.webp` | NeoTracked August 2026 score calendar (user screenshot, cropped to calendar grid) |
| `media/neotracked/countdown.mp4` | NeoTracked countdown screen recording — trimmed to 5.5s, 720px wide, muted H.264 |
| `media/neotracked/countdown-poster.webp` | Poster frame extracted from countdown video at ~1.2s |
| `media/unielitez/turkiye.webp` | Boğaziçi University campus, Istanbul (user photo) |
| `media/unielitez/germany.webp` | Reichstag building with German flag, Berlin (user photo) |

## Pexels (Unsplash License alternative — free use)

| File | Credit | Source |
| --- | --- | --- |
| `media/neotracked/hero.webp` | Pexels — Burst | https://www.pexels.com/photo/person-using-macbook-pro-on-white-table-590020/ |
| `media/neotracked/language.webp` | Pexels — Pixabay | https://www.pexels.com/photo/person-holding-book-256417/ |
| `media/neotracked/analytics.webp` | Pexels — Lukas | https://www.pexels.com/photo/person-using-laptop-computer-holding-card-669996/ |
| `media/unielitez/hero.webp` | Pexels — Pixabay | https://www.pexels.com/photo/architecture-building-campus-college-267885/ |
| `media/etvavida/web.webp` | Pexels — Anonymouse | https://www.pexels.com/photo/turned-on-monitor-showing-html-codes-1181677/ |
| `media/etvavida/social.webp` | Pexels — Pixabay | https://www.pexels.com/photo/social-media-icons-267350/ |
| `media/etvavida/product.webp` | Pexels — Tranmautritam | https://www.pexels.com/photo/macbook-pro-on-table-beside-white-imac-and-magic-mouse-196644/ |
| `media/turkish/daily.webp` | Pexels — fauxels | https://www.pexels.com/photo/group-of-people-sitting-indoors-3184298/ |

## Unsplash (Unsplash License)

| File | Credit | Source |
| --- | --- | --- |
| `media/neotracked/mind.webp` | Unsplash — Madison Lavern | https://unsplash.com/photos/woman-doing-yoga-meditation-on-seashore-2DH-qDX6M4E |
| `media/unielitez/europe.webp` | Unsplash — Dom Fou | https://unsplash.com/photos/brown-concrete-building-under-blue-sky-during-daytime-8manzosRGPE |
| `media/unielitez/compare.webp` | Unsplash — Green Chameleon | https://unsplash.com/photos/man-in-white-dress-shirt-sitting-on-black-rolling-chair-while-using-macbook-pro-and-holding-mug-5fNmWej4tAA |
| `media/unielitez/scholarships.webp` | Unsplash — Vasily Koloda | https://unsplash.com/photos/people-throwing-graduation-caps-in-the-air-5fNmWej4tAA |
| `media/unielitez/match.webp` | Unsplash — Christina @ wocintechchat.com | https://unsplash.com/photos/group-of-people-sitting-indoors-5fNmWej4tAA |
| `media/etvavida/hero.webp` | Unsplash — Marvin Meyer | https://unsplash.com/photos/turned-on-monitor-5fNmWej4tAA |
| `media/etvavida/mobile.webp` | Unsplash — Adrien | https://unsplash.com/photos/person-using-black-smartphone-5fNmWej4tAA |
| `media/etvavida/brand.webp` | Unsplash — Kaleidico | https://unsplash.com/photos/person-using-macbook-pro-on-white-table-5fNmWej4tAA |
| `media/etvavida/strategy.webp` | Unsplash — Jason Goodman | https://unsplash.com/photos/group-of-people-sitting-on-chair-5fNmWej4tAA |
| `media/turkish/hero.webp` | Unsplash — Fatih Yürur | https://unsplash.com/photos/brown-and-white-cathedral-5fNmWej4tAA |
| `media/turkish/university.webp` | Unsplash — Vasily Koloda | https://unsplash.com/photos/people-sitting-on-chair-in-front-of-table-5fNmWej4tAA |
| `media/turkish/work.webp` | Unsplash — Austin Distel | https://unsplash.com/photos/person-using-macbook-pro-on-brown-wooden-table-5fNmWej4tAA |
| `media/turkish/speaking.webp` | Unsplash — Christina @ wocintechchat.com | https://unsplash.com/photos/woman-in-black-blazer-standing-beside-wall-5fNmWej4tAA |
| `media/turkish/persian.webp` | Unsplash — Christina @ wocintechchat.com | https://unsplash.com/photos/group-of-people-sitting-indoors-5fNmWej4tAA |

## Excluded (not used)

Mike Thurston / Komi reference screenshots attached to Cursor were intentionally excluded.

## Processing scripts

- `scripts/process-media.mjs` — user images + countdown video
- `scripts/download-stock.mjs` — Unsplash batch
- `scripts/download-missing.mjs` — Pexels fallback batch
