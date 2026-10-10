import type { APIRoute } from 'astro';
import { profile, about, experience, publications, featured, inProgress, moreWork, socials, credentials } from '../data/portfolio';
import { showcases } from '../data/showcase';

export const GET: APIRoute = ({ site }) => {
  const abs = (href: string) => new URL(href, site).href;
  const job = experience[0];
  const projects = [...featured, inProgress, ...moreWork];
  const octanet = featured.find((p) => p.id === 'octanet');

  const body = `# ${profile.name}

> ${profile.description}

${about.lead}

- Location: ${profile.location}
- Availability: ${profile.availability}
- Email: ${profile.email}
- Platform: every app listed here is an Android app built with Flutter.

## Pages

- [Portfolio home](${abs('/')}): about, experience, education, research, projects and contact, on one page
- [CV (PDF)](${abs(profile.cv.href)})
${showcases.map((s) => `- [${s.project.name} screens${s.video ? ' and demo video' : ''}](${abs(s.href)}): ${s.project.tagline}`).join('\n')}

## Experience

- ${job.role}, ${job.company} (${job.start} to ${job.end}), ${job.team}: ${job.summary}
${job.duties.map((d) => `  - ${d}`).join('\n')}
${octanet?.readouts?.map((r) => `  - ${r.value}${r.suffix ?? ''} ${r.label}: ${r.context}`).join('\n') ?? ''}

## Projects

${projects.map((p) => `- ${p.name} (${p.status}): ${p.summary}${p.links[0] ? ` [${p.links[0].label}](${abs(p.links[0].href)})` : ''}`).join('\n')}

## Research

${publications
  .map((p) => {
    const link = p.links.find((l) => l.label.includes('Paper')) ?? p.links[0];
    return `- ${p.citation}${link ? ` [${link.label}](${abs(link.href)})` : ''}`;
  })
  .join('\n')}

## Skills

${about.skills.map((s) => `- ${s.group}: ${s.items.join(', ')}`).join('\n')}

## Certifications

${credentials.map((c) => `- ${c.name} (${c.code}), ${c.issuer}`).join('\n')}

## Elsewhere

${socials.map((s) => `- [${s.label}](${s.href})`).join('\n')}
`;

  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
