import type { APIRoute } from 'astro';
import { execFileSync } from 'node:child_process';
import { publications } from '../data/portfolio';
import { showcases } from '../data/showcase';
import { apps, appDocs } from '../data/apps';

// URLs such as /fit&fuel/ contain characters that must be entity-escaped inside XML.
const xmlEscape = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');

// Date of the last commit touching these paths, or undefined when git history is unavailable
// (e.g. a shallow clone). An omitted lastmod is better than one that changes on every build.
const lastCommit = (...paths: string[]) => {
  try {
    const out = execFileSync('git', ['log', '-1', '--format=%cI', '--', ...paths], { encoding: 'utf8' }).trim();
    return out ? out.slice(0, 10) : undefined;
  } catch {
    return undefined;
  }
};

export const GET: APIRoute = ({ site }) => {
  const papers = publications.flatMap((p) =>
    p.links
      .filter((l) => l.href.startsWith('/papers/') && l.label.includes('Paper'))
      // datePublished is sometimes year-month only; the file's last commit is always a full date.
      .map((l) => ({ loc: l.href, lastmod: lastCommit(`public${l.href}`) })),
  );
  const work = showcases.map((s) => ({
    loc: s.href,
    lastmod: lastCommit(`src/assets/projects/${s.project.id}`, 'src/pages/work'),
  }));
  // Same rule as src/pages/[app]/[doc].astro: a legal page exists only where its markdown file does.
  const legalFiles = new Set(Object.keys(import.meta.glob('../data/legal/*/*.md')));
  const appPages = apps.flatMap((app) => [
    {
      loc: `/${app.id}/`,
      lastmod: lastCommit('src/data/apps.ts', 'src/pages/[app]/index.astro', 'src/components/app'),
    },
    ...appDocs
      .filter((doc) => legalFiles.has(`../data/legal/${app.id}/${doc.slug}.md`))
      .map((doc) => ({
        loc: `/${app.id}/${doc.slug}/`,
        lastmod: lastCommit(`src/data/legal/${app.id}/${doc.slug}.md`, 'src/pages/[app]/[doc].astro'),
      })),
  ]);
  const urls = [{ loc: '/', lastmod: lastCommit('src', 'public') }, ...work, ...appPages, ...papers];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${xmlEscape(new URL(u.loc, site).href)}</loc>${u.lastmod ? `\n    <lastmod>${u.lastmod}</lastmod>` : ''}
  </url>`,
  )
  .join('\n')}
</urlset>
`;

  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
