import type { APIRoute } from 'astro';
import { publications } from '../data/portfolio';

export const GET: APIRoute = ({ site }) => {
  const today = new Date().toISOString().slice(0, 10);
  const papers = publications.flatMap((p) => p.links).filter((l) => l.href.startsWith('/papers/') && l.label.includes('Paper'));
  const urls = [
    { loc: '/', priority: '1.0' },
    ...papers.map((l) => ({ loc: l.href, priority: '0.6' })),
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${new URL(u.loc, site).href}</loc>
    <lastmod>${today}</lastmod>
    <priority>${u.priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`;

  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
