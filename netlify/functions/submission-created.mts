import nodemailer from 'nodemailer';

const { GMAIL_USER, GMAIL_APP_PASSWORD } = process.env;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface SubmissionEvent {
  body: string;
}

export const handler = async (event: SubmissionEvent) => {
  const { payload } = JSON.parse(event.body);
  if (payload.form_name !== 'contact') return { statusCode: 200 };

  const data = payload.data ?? {};
  const email = String(data.email ?? '').trim();
  const name = String(data.name ?? '').trim().slice(0, 100);
  const message = String(data.message ?? '').trim().slice(0, 5000);
  if (!EMAIL_RE.test(email) || !name) return { statusCode: 200 };

  if (!GMAIL_USER || !GMAIL_APP_PASSWORD) {
    console.error('submission-created: missing GMAIL_USER or GMAIL_APP_PASSWORD');
    return { statusCode: 200 };
  }

  const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: GMAIL_USER, pass: GMAIL_APP_PASSWORD },
  });

  const firstName = name.split(/\s+/)[0];
  try {
    await transport.sendMail({
      from: { name: 'Sushant Tare', address: GMAIL_USER },
      to: email,
      subject: 'Thanks for getting in touch',
      text: `Hi ${firstName},\n\nThanks for getting in touch. Your message reached me, and I'll reply to this address soon.\n\nYour message:\n\n${message}\n\nSushant Tare\nFlutter Developer\nhttps://sushanttare.netlify.app`,
      html: layout(
        `<p style="margin:0 0 16px">Hi ${esc(firstName)},</p>
         <p style="margin:0 0 16px">Thanks for getting in touch. Your message reached me, and I'll reply to this address soon.</p>
         <p style="margin:24px 0 8px;color:#8a909b;font-size:13px">Your message</p>
         <div style="border-left:3px solid #fcd535;padding:4px 0 4px 16px;color:#444">${paragraphs(message)}</div>
         <p style="margin:24px 0 0">Sushant Tare<br><span style="color:#8a909b">Flutter Developer</span><br>
         <a href="https://sushanttare.netlify.app" style="color:#b8860b">sushanttare.netlify.app</a></p>`,
      ),
    });
  } catch (error) {
    console.error('submission-created: confirmation failed', error);
  }
  return { statusCode: 200 };
};

function esc(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);
}

function paragraphs(s: string) {
  return s
    .split(/\n{2,}/)
    .map((p) => `<p style="margin:0 0 12px">${esc(p).replace(/\n/g, '<br>')}</p>`)
    .join('');
}

function layout(body: string) {
  return `<!doctype html><html><body style="margin:0;padding:24px;background:#f5f5f4;font-family:-apple-system,'Segoe UI',Roboto,sans-serif;font-size:15px;line-height:1.6;color:#181a20">
<div style="max-width:560px;margin:0 auto;background:#fff;border-radius:6px;padding:32px">${body}</div></body></html>`;
}
