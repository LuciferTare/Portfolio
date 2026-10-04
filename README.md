# sushanttare.netlify.app

Personal portfolio of Sushant Tare. Astro 7, TypeScript, Tailwind CSS 4, Anime.js 4.

## Run

```bash
npm install
npm run dev       # http://localhost:4321, live reload
npm run build     # production build into dist/
npm run preview   # serve dist/ locally
npm run check     # TypeScript + Astro diagnostics
```

## Edit content

Everything visible on the site lives in **`src/data/portfolio.ts`**:

| What | Where in the file |
| --- | --- |
| Name, rotating titles, intro, email, availability | `profile` |
| About text, skills, languages | `about` |
| Job role card | `experience` |
| Degrees, certifications (add `verifyUrl` when you have it) | `education`, `credentials` |
| Aavishkar numbers (Cravecoin sidebar) | `recognition` |
| Papers, links, citations | `publications` |
| OctaNet (with the three numbers) and Cravecoin | `featured` |
| Fit&Fuel | `inProgress` |
| Quantaview, Stoxium, Power Gauge, Towzer | `moreWork` |
| Contact form mode | `contact.formProvider` |

A link with `href: ''` is hidden until you fill it in. Use a plain hyphen (`-`) in ranges.

## Replace files

The originals live in **`assets-src/`** and are copied into the site by a script. Replace a file there (same name), then:

```bash
node scripts/prepare-assets.mjs   # icons, CV, paper PDFs, portrait crop
npm run og                        # social card + PNG favicons (needs Chrome or Edge)
```

```
assets-src/
  icons/          project logo PNGs -> src/assets/icons/
  certificates/   research paper + certificate PDFs, one pair per project -> public/papers/
  resume/         Sushant_Tare_CV.pdf -> public/cv/ (Master_CV is reference only, not published)
  portrait/       source photo, cropped into src/assets/portrait.jpg
  videos/         raw project demo footage (not copied by the script)
```

- **Higher-resolution icons:** overwrite the file in `assets-src/icons/`, or drop it straight into `src/assets/icons/` with the same name. They are resized automatically.
- **New paper or certificate PDF:** put the pair in `assets-src/certificates/` as `<Name> Paper.pdf` / `<Name> Certificate.pdf`, add the copy mapping in `scripts/prepare-assets.mjs`, then add both links to that publication.
- **Project screenshots (later):** put them in `src/assets/`, import them in `portfolio.ts` like the icons, and render them with `<Image>` in `src/components/Projects.astro`.
- **Project videos:** raw footage lives in `assets-src/videos/`; a rendered/trimmed version meant for the site goes in `public/videos/` and is referenced directly from a component.

## Contact form

The form uses Netlify Forms (`contact.formProvider: 'netlify'`). Enable form detection for the Netlify site, deploy this version, then add an email notification under **Forms > Submission notifications**. Netlify Forms does not provide a built-in submitter auto-reply; that needs an email integration or automation service.

## Deploy (Netlify)

`netlify.toml` already sets the build command and output folder.

1. Push this folder to a GitHub repository.
2. In Netlify, open the existing `sushanttare` site, then **Site configuration > Build & deploy > Link repository**, and choose the repo.
3. Netlify builds on every push. `public/_headers` sets caching and security headers.

## Structure

```
src/data/portfolio.ts     all content (typed)
src/components/           one component per section
src/scripts/motion.ts     every animation, one Anime.js scope, reduced-motion aware
src/scripts/ui.ts         nav state, mobile menu, copy buttons, form
src/styles/global.css     design tokens (colours, type, radius) and primitives
scripts/                  asset copy + social image generation
assets-src/               raw source files (icons, certificates, resume, portrait, videos)
```
