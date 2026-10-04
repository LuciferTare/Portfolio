import { animate } from 'animejs/animation';
import { set, stagger } from 'animejs/utils';

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function initUI() {
  const cleanups = [navState(), mobileMenu(), copyButtons(), disclosures(), contactForm(), noImageDrag()];
  return () => cleanups.forEach((fn) => fn());
}

function noImageDrag() {
  const onDragStart = (e: DragEvent) => {
    if (e.target instanceof HTMLImageElement) e.preventDefault();
  };
  document.addEventListener('dragstart', onDragStart);
  return () => document.removeEventListener('dragstart', onDragStart);
}


function navState() {
  const nav = document.querySelector<HTMLElement>('[data-nav]');
  const sentinel = document.querySelector('.nav-sentinel');
  const indicator = document.querySelector<HTMLElement>('[data-nav-indicator]');
  const links = [...document.querySelectorAll<HTMLAnchorElement>('[data-nav-link]')];
  const list = document.querySelector<HTMLElement>('[data-nav-list]');
  if (!nav || !sentinel) return () => {};

  const scrolled = new IntersectionObserver(([e]) => nav.toggleAttribute('data-scrolled', !e.isIntersecting));
  scrolled.observe(sentinel);

  const sections = links
    .map((l) => document.querySelector<HTMLElement>(l.hash))
    .filter((s): s is HTMLElement => Boolean(s));
  let current: HTMLAnchorElement | null = null;

  const moveIndicator = (link: HTMLAnchorElement | null) => {
    if (!indicator || !list) return;
    if (!link) {
      animate(indicator, { opacity: 0, duration: reducedMotion() ? 0 : 250 });
      return;
    }
    const x = link.offsetLeft + 12;
    const w = Math.max(link.offsetWidth - 24, 8);
    const params = { translateX: x, scaleX: w / 100, opacity: 1 };
    if (reducedMotion()) set(indicator, params);
    else animate(indicator, { ...params, duration: 600, ease: 'outExpo' });
  };

  const setActive = (id: string | null) => {
    const link = id ? links.find((l) => l.hash === `#${id}`) ?? null : null;
    if (link === current) return;
    current?.removeAttribute('aria-current');
    link?.setAttribute('aria-current', 'true');
    current = link;
    moveIndicator(link);
  };

  const visible = new Map<string, boolean>();
  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => visible.set(e.target.id, e.isIntersecting));
      const active = sections.find((s) => visible.get(s.id));
      setActive(active?.id ?? null);
    },
    { rootMargin: '-35% 0px -64% 0px' },
  );
  sections.forEach((s) => spy.observe(s));

  const onResize = () => current && moveIndicator(current);
  window.addEventListener('resize', onResize, { passive: true });

  return () => {
    scrolled.disconnect();
    spy.disconnect();
    window.removeEventListener('resize', onResize);
  };
}


function mobileMenu() {
  const dialog = document.querySelector<HTMLDialogElement>('[data-menu]');
  const openBtn = document.querySelector<HTMLButtonElement>('[data-menu-open]');
  const closeBtn = dialog?.querySelector<HTMLButtonElement>('[data-menu-close]');
  if (!dialog || !openBtn || !closeBtn) return () => {};

  const items = [...dialog.querySelectorAll<HTMLElement>('[data-menu-item]')];
  let closing = false;

  const open = () => {
    dialog.showModal();
    document.body.style.overflow = 'hidden';
    openBtn.setAttribute('aria-expanded', 'true');
    if (reducedMotion()) return;
    animate(dialog, { opacity: [0, 1], duration: 250, ease: 'outQuad' });
    animate(items, { opacity: [0, 1], translateY: [28, 0], duration: 700, ease: 'outExpo', delay: stagger(45, { start: 60 }) });
  };

  const close = (then?: () => void) => {
    if (closing || !dialog.open) return;
    const finish = () => {
      dialog.close();
      closing = false;
      then?.();
    };
    if (reducedMotion()) return finish();
    closing = true;
    animate(dialog, { opacity: [1, 0], duration: 200, ease: 'inQuad', onComplete: finish });
  };

  const onClose = () => {
    document.body.style.overflow = '';
    openBtn.setAttribute('aria-expanded', 'false');
    set([dialog, ...items], { opacity: 1, translateY: 0 });
  };

  const onCancel = (e: Event) => {
    e.preventDefault();
    close(() => openBtn.focus());
  };

  const onLinkClick = (e: Event) => {
    const link = (e.target as HTMLElement).closest<HTMLAnchorElement>('[data-menu-link]');
    if (!link) return;
    e.preventDefault();
    close(() => {
      const target = document.querySelector<HTMLElement>(link.hash);
      if (!target) return;
      target.scrollIntoView({ behavior: reducedMotion() ? 'auto' : 'smooth' });
      history.pushState(null, '', link.hash);
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    });
  };

  const onBackdrop = (e: MouseEvent) => {
    if (e.target === dialog) close(() => openBtn.focus());
  };
  const onCloseClick = () => close(() => openBtn.focus());
  const onDesktop = (e: MediaQueryListEvent) => e.matches && dialog.open && dialog.close();
  const desktop = window.matchMedia('(min-width: 1024px)');

  openBtn.setAttribute('aria-expanded', 'false');
  openBtn.addEventListener('click', open);
  closeBtn.addEventListener('click', onCloseClick);
  dialog.addEventListener('cancel', onCancel);
  dialog.addEventListener('close', onClose);
  dialog.addEventListener('click', onLinkClick);
  dialog.addEventListener('click', onBackdrop);
  desktop.addEventListener('change', onDesktop);

  return () => {
    openBtn.removeEventListener('click', open);
    closeBtn.removeEventListener('click', onCloseClick);
    dialog.removeEventListener('cancel', onCancel);
    dialog.removeEventListener('close', onClose);
    dialog.removeEventListener('click', onLinkClick);
    dialog.removeEventListener('click', onBackdrop);
    desktop.removeEventListener('change', onDesktop);
  };
}


function copyButtons() {
  const live = document.querySelector<HTMLElement>('[data-live]');

  const onClick = async (e: Event) => {
    const btn = (e.target as HTMLElement).closest<HTMLButtonElement>('[data-copy]');
    if (!btn) return;
    const text = btn.dataset.copy ?? '';
    const label = btn.querySelector<HTMLElement>('[data-copy-text]');
    const original = label?.textContent ?? '';
    try {
      await navigator.clipboard.writeText(text);
      if (label) label.textContent = 'Copied';
      if (live) live.textContent = btn.dataset.copyLabel ?? 'Copied';
    } catch {
      if (label) label.textContent = 'Copy failed';
      if (live) live.textContent = 'Could not copy. Please select the text and copy it manually.';
    }
    window.setTimeout(() => {
      if (label) label.textContent = original;
      if (live) live.textContent = '';
    }, 2200);
  };

  document.addEventListener('click', onClick);
  return () => document.removeEventListener('click', onClick);
}


function disclosures() {
  const onClick = (e: Event) => {
    const btn = (e.target as HTMLElement).closest<HTMLButtonElement>('[data-disclosure]');
    if (!btn) return;
    const panel = document.getElementById(btn.getAttribute('aria-controls') ?? '');
    if (!panel) return;
    const open = btn.getAttribute('aria-expanded') !== 'true';
    btn.setAttribute('aria-expanded', String(open));
    panel.hidden = !open;
  };

  document.addEventListener('click', onClick);
  return () => document.removeEventListener('click', onClick);
}


function contactForm() {
  const form = document.querySelector<HTMLFormElement>('[data-contact-form]');
  if (!form) return () => {};

  const status = form.querySelector<HTMLElement>('[data-form-status]')!;
  const submit = form.querySelector<HTMLButtonElement>('[data-submit]')!;
  const submitLabel = form.querySelector<HTMLElement>('[data-submit-label]')!;
  const provider = form.dataset.provider;
  const email = form.dataset.email ?? '';
  const idleLabel = submitLabel.textContent ?? '';

  const fields = ['name', 'email', 'message'].map((n) => form.elements.namedItem(n) as HTMLInputElement);

  const showError = (field: HTMLInputElement, show: boolean) => {
    field.setAttribute('aria-invalid', String(show));
    form.querySelector(`[data-error-for="${field.name}"]`)?.toggleAttribute('hidden', !show);
  };

  const validate = () => {
    let firstInvalid: HTMLInputElement | null = null;
    fields.forEach((f) => {
      f.value = f.value.trimStart();
      const ok = f.checkValidity() && f.value.trim().length > 0;
      showError(f, !ok);
      if (!ok && !firstInvalid) firstInvalid = f;
    });
    (firstInvalid as HTMLInputElement | null)?.focus();
    return !firstInvalid;
  };

  const setStatus = (tone: 'ok' | 'error' | '', html: string) => {
    status.dataset.tone = tone;
    status.innerHTML = html;
  };

  const onInput = (e: Event) => {
    const f = e.target as HTMLInputElement;
    if (f.getAttribute('aria-invalid') === 'true' && f.checkValidity()) showError(f, false);
  };

  const onSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    setStatus('', '');
    if (!validate()) return;

    const data = new FormData(form);
    if (data.get('bot-field')) return;
    const topic = String(data.get('topic') ?? '');
    const name = String(data.get('name') ?? '').trim();
    const from = String(data.get('email') ?? '').trim();
    const message = String(data.get('message') ?? '').trim();
    const mailLink = `<a class="link link-rest" href="mailto:${email}">${email}</a>`;

    if (provider !== 'netlify') {
      const subject = `${topic}: message from ${name}`;
      const body = `${message}\n\n${name}\n${from}`;
      window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setStatus(
        'ok',
        `Your email app should now be open with the message filled in. Press send there to deliver it. If nothing opened, write to ${mailLink}.`,
      );
      return;
    }

    submit.disabled = true;
    submitLabel.textContent = 'Sending…';
    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(data as unknown as Record<string, string>).toString(),
      });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setStatus('ok', `Thanks, ${escapeHtml(name)}. Your message has been sent, and I'll reply to ${escapeHtml(from)}.`);
    } catch {
      setStatus('error', `The message could not be sent. Please try again, or email me directly at ${mailLink}.`);
    } finally {
      submit.disabled = false;
      submitLabel.textContent = idleLabel;
    }
  };

  form.addEventListener('submit', onSubmit);
  form.addEventListener('input', onInput);
  return () => {
    form.removeEventListener('submit', onSubmit);
    form.removeEventListener('input', onInput);
  };
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);
}
