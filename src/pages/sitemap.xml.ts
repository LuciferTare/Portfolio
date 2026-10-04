import type { APIRoute } from 'astro';
import { execFileSync } from 'node:child_process';
import { publications } from '../data/portfolio';

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
      .map((l) => ({ loc: l.href, lastmod: p.datePublished, priority: '0.6' })),
  );
  const urls = [{ loc: '/', lastmod: lastCommit('src', 'public'), priority: '1.0' }, ...papers];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${new URL(u.loc, site).href}</loc>${u.lastmod ? `\n    <lastmod>${u.lastmod}</lastmod>` : ''}
    <priority>${u.priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`;

  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
