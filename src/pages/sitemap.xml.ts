import type { APIRoute } from 'astro';
import { execFileSync } from 'node:child_process';
import { publications } from '../data/portfolio';
import { showcases } from '../data/showcase';

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
  const urls = [{ loc: '/', lastmod: lastCommit('src', 'public') }, ...work, ...papers];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${new URL(u.loc, site).href}</loc>${u.lastmod ? `\n    <lastmod>${u.lastmod}</lastmod>` : ''}
  </url>`,
  )
  .join('\n')}
</urlset>
`;

  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
