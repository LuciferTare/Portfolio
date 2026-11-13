# SEO Audit Report: sushanttare.netlify.app

**Audited:** 13 November 2026
**Scope:** live site (`https://sushanttare.netlify.app/`) plus the local Astro 7 source in `d:\Portfolio` (branch `main`, clean tree at audit time)
**Business type detected:** personal developer portfolio / freelance mobile developer (Agency/Publisher hybrid). Not local, not e-commerce, not SaaS.
**Status:** audit only. No files in the project were modified except this report.

---

## 1. Executive summary

**SEO Health Score: 80 / 100**

This is a well-built site. Static HTML, correct canonicals, a hand-built JSON-LD graph, a valid sitemap, `llms.txt`, good titles, sane headings, no layout shift, and Lighthouse SEO / Accessibility / Best Practices all at 100. There are **no Critical issues**: nothing is blocking indexing.

What holds the score back is a small number of concrete defects plus some strategic gaps:

1. **Mobile Total Blocking Time is 1,180 ms** (Lighthouse mobile performance 74). Almost all of it is Style & Layout work, not JavaScript (H-1).
2. **Every page shares the same social card and the same `og:image:alt`** describing Sushant, including the app pages and the four `/work/` pages (M-2).
3. **Meta descriptions on work and app pages run 200+ characters** and will be truncated (M-1).
4. **The Fit&Fuel app site lives at `/fit&fuel/`, is linked from nowhere and absent from the sitemap**, and its `&` is a latent bug for XML (M-3, M-4).
5. **The site sits on a shared `*.netlify.app` subdomain** with no custom domain (M-7).

### Score breakdown

| Category                  | Weight | Score | Weighted |
| ------------------------- | ------ | ----- | -------- |
| Technical SEO             | 22%    | 80    | 17.6     |
| Content quality / E-E-A-T | 23%    | 78    | 17.9     |
| On-page SEO               | 20%    | 82    | 16.4     |
| Schema / structured data  | 10%    | 85    | 8.5      |
| Performance (CWV)         | 10%    | 72    | 7.2      |
| AI search readiness       | 10%    | 82    | 8.2      |
| Images                    | 5%     | 90    | 4.5      |
| **Total**                 |        |       | **80.3** |

### Findings count

| Priority | Count |
| -------- | ----- |
| Critical | 0     |
| High     | 1     |
| Medium   | 9     |
| Low      | 11    |

---

## 2. Method and limits

- **Live checks:** `curl` of headers and bodies for `/`, `/robots.txt`, `/sitemap.xml`, `/llms.txt`, `/work/*`, `/fit&fuel/*`, a 404 URL, `/og.png`, `/cv/*`, `/videos/*`, static assets. HTML parsed with a Node script (meta, links, headings, images, JSON-LD, landmarks, anchors).
- **Lab performance:** Lighthouse 12, mobile emulation, headless Chrome, **one run** against the live homepage. Treat the numbers as indicative: single-run variance on TBT is large.
- **Not available:**
  - The PageSpeed Insights API returned HTTP 429 (shared quota exhausted), so there is no CrUX **field** data. A site this small probably has none anyway.
  - No Search Console or GA4 access, so indexation status and real queries are unverified. The file `public/googlee083279730cd435a.html` suggests Search Console ownership is already verified; checking Coverage and Sitemaps there is the first thing to do after fixes.
  - Desktop Lighthouse and backlink data were not collected. Backlink analysis was skipped as out of scope for an on-site audit.
- **Source review:** `Base.astro`, `index.astro`, `work/[id].astro`, `[app]/index.astro`, `[app]/[doc].astro`, `404.astro`, `Hero.astro`, `showcase.ts`, `apps.ts`, `sitemap.xml.ts`, `llms.txt.ts`, `portfolio.ts` (profile and projects), `astro.config.mjs`, `netlify.toml`, `public/_headers`, `public/robots.txt`.
- The skill's specialist areas (technical, content, schema, sitemap, performance, visual, GEO, agentic, SXO) were run by direct inspection rather than as separate sub-agents; the site is small enough that this was the more reliable route.

---

## 3. Findings

Each finding lists evidence, affected files, and the exact fix. Every fix includes how to tell if it failed.

### Critical

None.

---

### High

#### H-1. Mobile Total Blocking Time 1,180 ms; Lighthouse Performance 74

**Evidence (Lighthouse mobile, single run, live homepage)**

| Metric            | Value                | Rating                                                                    |
| ----------------- | -------------------- | ------------------------------------------------------------------------- |
| FCP               | 1.2 s                | good                                                                      |
| LCP               | 1.9 s                | good (element is the `<h1>` word span; 629 ms TTFB + 541 ms render delay) |
| CLS               | 0.004                | good                                                                      |
| **TBT**           | **1,180 ms**         | **poor** (score 0.21)                                                     |
| Speed Index       | 3.5 s                | needs work                                                                |
| Max potential FID | 660 ms               | poor                                                                      |
| Transfer          | 113 KiB, 13 requests | excellent                                                                 |

- Main-thread breakdown: **Style & Layout 2,251 ms**, Other 1,243 ms, Rendering 300 ms, **Script Evaluation only 238 ms**, parse 51 ms.
- Long tasks (657, 329, 246, 93 ms) are attributed to the document itself, not to a script bundle. `ui.*.js` (40 KB) is only 214 ms of scripting.
- Conclusion: this is **style/layout cost**, not too much JavaScript. Likely contributors, in the code: the whole 152 KB of CSS is inlined (`astro.config.mjs`: `inlineStylesheets: 'always'`), 868 DOM nodes, per-character split text (hero name and the airport-style "flap" title, `Hero.astro:19-44`), and Anime.js animating layout-affecting properties on load. I did **not** profile which of these dominates, so confirm in Chrome DevTools Performance (CPU 4× slowdown) before changing anything.
- Real-user INP will not be this bad (Lighthouse throttles CPU 4×), but TBT this high is a reliable warning that INP on a mid-range Android phone, the audience for a Flutter developer's portfolio, could exceed 200 ms during the intro animation.

**Affected files:** `src/scripts/motion.ts`, `src/components/Hero.astro`, `src/styles/global.css`, `astro.config.mjs`.

**Fix (investigate, then apply the cheapest that works):**

1. Record a Performance trace on the live URL; find which "Recalculate Style" / "Layout" events cluster in the first 2 s.
2. Animate only `transform` and `opacity` (the hero already uses `translateY`; check the flap board and stagger code for width/height/top/left or `filter`).
3. Add `content-visibility: auto; contain-intrinsic-size: auto 800px;` to below-the-fold `<section>`s (Experience, Research, About, Education, Freelance, Contact) so the browser skips their style/layout until scrolled near.
4. Start non-hero animations after `requestIdleCallback`/first interaction rather than at load.
5. Consider `inlineStylesheets: 'auto'`, so the 152 KB HTML is not parsed as one block (HTML is 28.7 KB gzipped, so network cost is fine; this is about parse/style cost, so measure before and after).

**Fails if:** a re-run of Lighthouse mobile (median of 3) still reports TBT > 600 ms. **Leading indicator:** TBT and "Style & Layout" ms in each Lighthouse run; CrUX INP once the site has enough traffic.

---

### Medium

#### M-1. Meta descriptions too long on work, app and home pages

**Evidence (live):**

| Page                        | Length     |
| --------------------------- | ---------- |
| `/`                         | 166        |
| `/work/cravecoin/`          | **206**    |
| `/fit&fuel/`                | **200**    |
| `/fit&fuel/privacy-policy/` | 124 (fine) |

Google truncates around 155-160 characters on desktop and fewer on mobile. The work-page description (`work/[id].astro:54`) leads with boilerplate ("Cravecoin running on Android: 14 screens and a demo video.") and the useful text is cut off.

**Fix:**

- `work/[id].astro:54`: lead with what the app is, put the "screens/demo" hint last, cap at ~155:
  ```ts
  const description =
    `${p.summary}`.slice(0, 120).replace(/\s+\S*$/, "") +
    `… ${screens.length} Android screens${video ? " and demo video" : ""}.`;
  ```
  (or hand-write a `seoDescription` field per project in `portfolio.ts`; better for quality).
- `[app]/index.astro:55`: stop reusing `app.summary` (200 chars) as the description; add a `seoDescription` to `apps.ts`.
- Home (`profile.description`, 166 chars): trim ~10 chars, e.g. drop "on mobile apps".

**Fails if:** Search Console snippets still end in "…" mid-sentence for these URLs.

#### M-2. Same social card and `og:image:alt` on every page

**Evidence:** `Base.astro:40-41` hard-codes `ogImage = abs("/og.png")` and an `ogAlt` that describes Sushant ("Sole mobile developer behind OctaNet…"). It is emitted on `/work/cravecoin/` and `/fit&fuel/` too. Sharing a Cravecoin or Fit&Fuel link shows the portfolio card, and the alt text is wrong for the page. `og.png` itself is good (1200×630, 61 KB, readable).

**Fix:** add optional `image` and `imageAlt` props to `Base.astro` (default to the current values so nothing changes for the home page). For work pages, generate a card per app (the repo already has `scripts/make-og.mjs`; extend it, or use the app's first non-splash screenshot at 1200×630). Set `og:image:alt` to describe that image.

**Fails if:** the Facebook Sharing Debugger / LinkedIn Post Inspector still shows the home card for `/work/*`.

#### M-3. `&` in the URL path: `/fit&fuel/`

**Evidence:** `apps.ts:64` `id: "fit&fuel"` becomes the folder `dist/fit&fuel/`. Live works (`200`), `%26` forms 301 to the raw `&`. The canonical is correct (HTML-escaped as `&amp;` in the attribute). But:

- A raw `&` is **invalid inside XML**. The current `sitemap.xml.ts` writes `new URL(u.loc, site).href` straight into `<loc>`, so the moment someone adds this app to the sitemap (see M-4) the whole sitemap becomes malformed and Search Console will reject it.
- It is brittle in copy/paste, Play Console fields, social crawlers and analytics.

**Fix (needs your confirmation first):** the privacy-policy URL is probably already registered in Google Play Console. Do **not** drop the old path without checking. Safe approach:

1. Change `apps.ts` `id` to `"fitfuel"` (the icon import, `formName`, legal folder `src/data/legal/fit&fuel/` and `[doc].astro` glob use `app.id`, so rename the legal folder to match).
2. Add to `netlify.toml`:
   ```toml
   [[redirects]]
     from = "/fit&fuel/*"
     to = "/fitfuel/:splat"
     status = 301
   ```
3. Update the Play Console policy URL to `/fitfuel/privacy-policy/`.
   Minimum alternative if you won't rename: XML-escape `loc` in `sitemap.xml.ts` (`.replaceAll("&", "&amp;")`) before adding the page.

**Fails if:** the sitemap fails Search Console validation or the old Play-Console URL returns 404.

#### M-4. Fit&Fuel app site is orphaned and unlisted

**Evidence:** the comment in `apps.ts:5-6` says the portfolio "never links to these pages". Confirmed live: the homepage has no link to `/fit&fuel/`, and the sitemap does not include it. The page is indexable (`index, follow`, self-canonical), so it will only be found via the Play listing or by luck. It is a substantial page (≈760 words, pricing, schema) and the only place the "Fit&Fuel gym app" entity is described. The four legal pages are indexable boilerplate.

**Fix (decide intent first):**

- If you **want it found:** add `/fit&fuel/` (escaped, or `/fitfuel/` after M-3) to `sitemap.xml.ts`, and link to it from the Fit&Fuel card in `Projects.astro` ("Visit the Fit&Fuel site"). Keep the legal pages out of the sitemap but indexable (Play Store reviewers visit them directly).
- If you **want it kept separate:** add `noindex, follow` for the app and legal pages (pass `noindex` to `Base`). Note that `Base.astro:235` then drops the canonical, which is acceptable.
- Also reconsider `SoftwareApplication.offers` (`[app]/index.astro:66-72`) while the status is "Coming soon to Google Play": advertising an INR price range for an app that cannot yet be installed misstates availability. Either omit `offers` until launch or keep and add `availability: "https://schema.org/PreOrder"`.

**Fails if:** `site:sushanttare.netlify.app fit` still returns nothing 3-4 weeks after the change (when you chose "found").

#### M-5. Work pages are thin (≈250 visible words)

**Evidence:** `/work/cravecoin/` has one H1, one H2 ("Screens 14"), ~249 words, mostly captions and chips. These are the only deep pages that rank for app-name queries ("Cravecoin app", "Quantaview crypto analyser", "Power Gauge Flutter battery"), but they carry little unique text beyond `p.summary` and `p.features`.

**Fix:** extend `work/[id].astro` with real prose from data you already have in `portfolio.ts`: a "What it does" H2, "How it's built" H2 (stack decisions: GetX, Method Channels, WebSocket), "What I'd do differently". Link the matching research paper PDF in text (already a button; also in prose with descriptive anchor text). Aim for 400-600 words per page, written by hand, not templated.

**Fails if:** the pages still show "Crawled, currently not indexed" or "Discovered, currently not indexed" in Search Console after 4 weeks.

#### M-6. Demo videos have no captions or transcript; no `VideoObject` schema

**Evidence:** `work/[id].astro:185-194` renders `<video controls preload="none">` with a poster, no `<track kind="captions">`, and the caption text says "Demo recording of …, with sound". Fails WCAG 1.2.2 (captions for prerecorded video with audio) and gives search engines nothing to index from the 2-3 MB MP4s. Good: `preload="none"` plus a poster is right for page weight.

**Fix:** add a `.vtt` file per video in `public/videos/` and `<track kind="captions" src="/videos/<id>.vtt" srclang="en" label="English" default>`. Add a `VideoObject` (`name`, `description`, `thumbnailUrl` = poster, `uploadDate`, `contentUrl`) to the page's `schema` array. A visible 3-5 line transcript/summary under the video is enough for the text signal.

**Fails if:** the Rich Results Test or Search Console Video report flags missing `thumbnailUrl` / `uploadDate`.

#### M-7. No custom domain; entity lives on a shared `netlify.app` subdomain

**Evidence:** `astro.config.mjs` `site` and every canonical, sitemap and schema URL use `sushanttare.netlify.app`. The Person entity's `sameAs` points at GitHub/LinkedIn/Instagram only. A shared platform subdomain has no domain-level authority of its own, can't be moved without losing the URL history, and looks less credible on a CV or to a recruiter than `sushanttare.dev` / `.in`. It also means your brand (a common name, "Sushant Tare") competes with other people of that name with nothing the site can claim as its own.

**Fix:** buy a domain, add it in Netlify (Domain management → set as primary), then:

1. Change `site` in `astro.config.mjs`, `profile.site` in `portfolio.ts:124`, and the Sitemap line in `public/robots.txt`.
2. Keep `sushanttare.netlify.app` redirecting: Netlify does this automatically once a custom primary domain is set.
3. In Search Console use **Change of Address** (only works domain-to-domain, not from a `netlify.app` subdomain, so rely on 301s and re-verify the new property).
   Do this once, early; every later change moves the target.

**Fails if:** the old URL still ranks and the new one has no impressions after 8 weeks.

#### M-8. Flagship project (OctaNet) has no indexable page of its own

**Evidence:** OctaNet is the strongest claim on the site ("used by ISPs across 7 countries", 40% shorter delivery cycle, 25% fewer defects). Yet `/work/octanet` is a 404 (no screenshots in `assets-src/projects/octanet`), and the "Read the OctaNet case study" link is `#project-octanet`, an in-page anchor (`portfolio.ts:230`). Search and AI answers can quote only the home page for it.

**Fix:** give OctaNet a `/work/octanet/` page. Either add screenshots to `assets-src/projects/octanet/` and run `node scripts/prepare-assets.mjs` (the template picks it up automatically and appears in the sitemap and `llms.txt`), or build a text-led case-study variant. Add `SoftwareApplication` with `installUrl`/`sameAs` pointing to the Play listing (`https://play.google.com/store/apps/details?id=octanet.tech`) and to `https://octanet.tech`.

**Fails if:** queries like "OctaNet app Flutter developer" still return only the home page.

#### M-9. Achievement claims lack external corroboration

**Evidence:** "7 countries", "40% shorter delivery cycle", "25% fewer quality defects" appear in the title area, `og:image:alt`, `llms.txt` and the Person schema, with no attribution, date or independent source on the site. Google's QRG E-E-A-T and AI systems both weigh whether such claims can be checked. Strengths already present: a named employer, a verifiable Play listing, five papers with PDFs and certificates, real author identity, a real photo with alt text.

**Fix:** add dated context ("as of Oct 2026") and one external anchor per claim: link the employer (`https://octanet.tech`) or a client announcement; add the LinkedIn recommendation or a short testimonial with a name; link the ISSN/ISBN-bearing journal pages (only one, `ijirt.org/Article?manuscript=181711`, is linked now). Add an `Organization` node for TrustLink Technologies (with `url` and `sameAs`) and point `Person.worksFor` at it; it is currently a bare name.

**Fails if:** AI answers (ChatGPT/Perplexity/Gemini) asked about "Sushant Tare Flutter developer" still do not mention OctaNet or the papers after the changes have been crawled.

---

### Low

| ID   | Finding                                                                                                                                                                                                                                                                       | Evidence / file                                        | Fix                                                                                                                                                                                                                                    |
| ---- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| L-1  | Sitemap `<priority>` is ignored by Google; three `lastmod` values are year-month only (`2025-11`, `2025-10`, `2025-06`)                                                                                                                                                       | `sitemap.xml.ts:21,36`; live sitemap                   | Valid W3C but use full dates; drop `<priority>`                                                                                                                                                                                        |
| L-2  | `<html lang="en">` while schema `inLanguage` and `og:locale` say `en-IN`                                                                                                                                                                                                      | `Base.astro:229` vs `:70,78,275`                       | Use `lang="en-IN"` (or make schema/og `en`)                                                                                                                                                                                            |
| L-3  | The 404 page emits `WebSite`/`WebPage`/`BreadcrumbList` JSON-LD and `og:url …/404/`                                                                                                                                                                                           | `404.astro`, `Base.astro`                              | Suppress `schema` and `og:url` when `noindex`                                                                                                                                                                                          |
| L-4  | Schema details: `Person.email` is `mailto:…` (should be the bare address); `primaryImageOfPage` is a URL string (should be an `ImageObject` or `@id`); work-page `SoftwareApplication` has no `applicationCategory` or `offers`, so not eligible for the software rich result | `Base.astro:84,109`; `work/[id].astro:55-66`           | Fix the two literals; add `applicationCategory: "FinanceApplication"` etc. and `offers: {price: 0, priceCurrency: "INR"}` only where true (Cravecoin/Quantaview are not published on Play; do not claim a free listing you don't have) |
| L-5  | Personal Gmail with digits (`sushanttare20022004@…`) is printed in plain text in HTML, JSON-LD, `llms.txt`. Looks like a birth year and is spam-harvestable                                                                                                                   | `portfolio.ts:118`, `Base.astro:109`, `llms.txt.ts:19` | Create a short contact address; keep the form as the primary path                                                                                                                                                                      |
| L-6  | Un-hashed static assets served with `max-age=0` (`og.png`, `favicon*`, `apple-touch-icon.png`)                                                                                                                                                                                | live headers; `_headers`                               | Add `/*.png`, `/favicon*` rules with `max-age=86400` (not `immutable`, since names are stable)                                                                                                                                         |
| L-7  | No explicit AI-crawler policy in `robots.txt`; `llms.txt` exists (good, but Google ignores it)                                                                                                                                                                                | `public/robots.txt`                                    | Optional: add explicit `User-agent: GPTBot`/`ClaudeBot`/`PerplexityBot` + `Allow: /` blocks and a `Content-Signal` line stating intent. No action needed if you want everything open                                                   |
| L-8  | Hero `<h1>` is the name only; the role ("Flutter Developer") is in an `sr-only` `<p>` and an `aria-hidden` animated board                                                                                                                                                     | `Hero.astro:19,29,35`                                  | Title tag already carries the keyword; optionally make the sr-only text the first line inside the H1 (`<span class="sr-only">, Flutter developer</span>`), taking care not to change the visual                                        |
| L-9  | Lighthouse flags `label-content-name-mismatch` on the logo link (`aria-label="Sushant Tare, back to top"` vs visible initials/name)                                                                                                                                           | `Nav.astro` `.mark`                                    | Make the visible text start with the same words as the accessible name                                                                                                                                                                 |
| L-10 | No Bing Webmaster Tools / IndexNow set up (Copilot citations use the Bing index); Google Search Console verification file is present                                                                                                                                          | `public/googlee083279730cd435a.html`                   | Add Bing site verification; optional IndexNow key file on deploy                                                                                                                                                                       |

---

## 4. What is already right (leave alone)

Verified on the live site and in source:

- **Indexability:** `200` on all content URLs; self-referencing absolute canonicals on every indexable page; `noindex, follow` on `/404`; `max-image-preview:large, max-snippet:-1` robots directives; HTTPS with HSTS (preload); no redirect chains.
- **robots.txt / sitemap:** allow-all with a Sitemap line; sitemap is valid XML, 10 URLs, includes real `lastmod` from git history (with the safe fallback of omitting it when git is unavailable, `sitemap.xml.ts:6-15`). `llms.txt` is generated from the same data and so cannot drift.
- **Titles:** all ≤ 51 characters, unique per page, brand-suffixed.
- **Headings:** one H1 per page; clean H1 → H2 → H3 → H4 on the home page; semantic landmarks (`header`, `nav`, `main`, `footer`, `section`, `article`); skip links; breadcrumbs with schema.
- **Images:** all served as WebP/JPG through `astro:assets` with `srcset`, explicit `width`/`height` (CLS 0.004), `loading="lazy"` below the fold; screenshots have descriptive alt text ("Cravecoin, Home gainers screen"); decorative icons next to visible names use `alt=""` correctly; portrait has good descriptive alt. 113 KiB total transfer on the home page.
- **Schema:** one connected `@graph` with stable `@id`s: `WebSite`, `ProfilePage`, `Person` (sameAs, knowsAbout, makesOffer, alumniOf), `BreadcrumbList`, and five `ScholarlyArticle` nodes with ISSN/ISBN/volume/pages. Valid JSON-LD. No deprecated types (no HowTo, no FAQPage).
- **Open Graph / Twitter:** complete (`og:type profile`, size, type, alt, locale, `summary_large_image`). The card itself is attractive and legible.
- **Mobile:** viewport meta present; Lighthouse mobile CLS 0.004; accessibility 100.
- **Fonts:** self-hosted variable Geist, `font-display: swap`, two preloads, `crossorigin` set.
- **Caching / security headers:** `/_astro/*` is `immutable` for one year; `X-Content-Type-Options`, `X-Frame-Options: DENY`, `Referrer-Policy`, `Permissions-Policy` all served.
- **Content:** original, specific, first-person text with real names and numbers; five papers with PDFs and certificates; a verifiable Play listing; a visible CV. This is genuine experience-based content, not template filler.

---

## 5. Netlify-specific checklist

| Check                            | Result                                                                                                                                                                                                                                                                                        |
| -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Build config (`netlify.toml`)    | `npm run build`, `publish = dist`, `NODE_VERSION = 24`. Fine                                                                                                                                                                                                                                  |
| Custom 404                       | `dist/404.html` is served with a real `404` status. Correct (no soft 404)                                                                                                                                                                                                                     |
| `_headers`                       | Security + immutable `/_astro/*`; PDF/video caching present. Add static-image rules (L-6)                                                                                                                                                                                                     |
| `_redirects` / `[[redirects]]`   | None. Will be needed for the custom domain and the `/fit&fuel/` rename (M-3, M-7)                                                                                                                                                                                                             |
| `&` in a folder name on Netlify  | Works (`200`); `%26` form redirects 301. Fragile in XML (M-3)                                                                                                                                                                                                                                 |
| Forms                            | `data-netlify="true"` with honeypot is correct; `submission-created.mts` handles notification. No SEO impact. Make sure `bot-field` stays `aria-hidden`/off-screen as now                                                                                                                     |
| Deploy previews / branch deploys | Netlify generally serves non-production deploys with a noindex header, but this is not visible from production. **Verify** by `curl -I` on a deploy-preview URL; if it lacks `X-Robots-Tag: noindex`, add it in `netlify.toml` under `[context.deploy-preview]` and `[context.branch-deploy]` |
| Build-time git dependency        | `sitemap.xml.ts` runs `git log` at build. Works on Netlify (full clone) and degrades safely if git history is missing                                                                                                                                                                         |
| `*.netlify.app` and www          | No www variant to canonicalise; only relevant once a custom domain exists (M-7)                                                                                                                                                                                                               |

---

## 6. AI search readiness (GEO) and agent readiness

| Signal                                                   | Status                                                                                                                                                      |
| -------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Server-rendered content (no JS needed to read it)        | Yes. All text is in the static HTML; AI crawlers that do not execute JS see everything                                                                      |
| `robots.txt` blocks AI bots                              | No: all allowed                                                                                                                                             |
| Entity clarity                                           | Strong: consistent name, role, place, employer, `sameAs`. Weak: no domain of its own (M-7), no OctaNet entity page (M-8), `worksFor` is a bare string (M-9) |
| Citability                                               | Good short, fact-dense passages (hero intro, About lead, experience summary). Improve by adding dates and sources to numeric claims                         |
| Passage structure                                        | Good H2/H3 sectioning on the home page; weak on work pages (M-5)                                                                                            |
| Markdown alternates / `.well-known` agent files / WebMCP | None. Optional and low-value for a portfolio; not recommended unless you want to experiment                                                                 |
| Agent-usable page (accessibility tree)                   | Good: real buttons/links with names, labelled form, skip link                                                                                               |

---

## 7. Prioritised implementation plan

Order follows dependencies. Items in the same step are independent and can ship together.

### Step 1: Quick correctness wins (≈1 hour, one commit)

1. **M-1** description rewrites (add `seoDescription` fields). _Independent._
2. **L-1, L-2, L-3, L-4** sitemap tidy, `lang`, 404 schema, schema literals.

_Verify:_ `curl` the sitemap and grep for `work/[a-z]*"` without trailing slash (should be 0); view-source home links; validate JSON-LD in the Rich Results Test; resubmit sitemap in Search Console.

### Step 2: Social and richness (≈2-3 hours)

4. **M-2** per-page OG image + alt (extend `make-og.mjs`, add `image` prop to `Base.astro`).
5. **M-6** captions + `VideoObject`.
6. **L-6** cache rules.

### Step 3: Performance (≈half a day; investigate first)

7. **H-1** trace, then apply `content-visibility`, transform-only animations, deferred non-hero motion. Re-run Lighthouse mobile ×3 and compare TBT. _This is the one item with an uncertain cause, so don't pre-commit to a specific fix._

### Step 4: Content depth (ongoing)

8. **M-5** extend work-page copy; **M-8** add `/work/octanet/`; **M-9** add dated, sourced claims and a TrustLink `Organization` node.

### Step 5: Decisions that need you

9. **M-4** (is Fit&Fuel meant to be found?) and **M-3** (rename `fit&fuel` → `fitfuel`? check Play Console policy URL first).
10. **M-7** custom domain. Do this before heavy link-building or sharing the URL widely, since it changes every canonical.

### Step 6: Off-site and monitoring

11. **L-10** Bing Webmaster Tools; check Search Console (Pages, Sitemaps, Core Web Vitals).
12. Re-audit in 4 weeks; compare against this report's baseline. Suggested next command: `/seo drift baseline https://sushanttare.netlify.app/` before making changes, so regressions are caught automatically.

---

## 8. Appendix: raw numbers

- Home HTML: 152,148 bytes (28,751 gzipped), ~2,040 visible words, 868 DOM nodes, 13 sections, 9 articles.
- JS: `ui.*.js` 40.6 KB, home inline module 10.3 KB (Anime.js is bundled into these).
- Lighthouse mobile: Performance 74, Accessibility 100, Best Practices 100, SEO 100.
- Sitemap: 1 home, 4 work, 5 paper PDFs. Missing by design or oversight: `/fit&fuel/` and its 4 legal pages.
- Live URL map: `/` 200, `/work/<id>/` 200, `/work/<id>` 301, `/work/octanet` 404, `/fit&fuel/` 200, `/fit%26fuel/` 301, `/robots.txt` 200, `/sitemap.xml` 200, `/llms.txt` 200, `/og.png` 200, `/nonexistent` 404 (custom page, `noindex`).
