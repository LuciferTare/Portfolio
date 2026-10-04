// Subpath imports keep the bundle to the anime.js modules actually used.
import { animate } from 'animejs/animation';
import { createAnimatable } from 'animejs/animatable';
import { createTimeline } from 'animejs/timeline';
import { $, random, round, set, stagger } from 'animejs/utils';

declare global {
  interface Window {
    __motionFallback?: number;
  }
}

const EASE = 'outExpo';
let introPlayed = false;
let shownStatically = false;

export function initMotion() {
  const html = document.documentElement;
  window.clearTimeout(window.__motionFallback);

  const reduceMq = window.matchMedia('(prefers-reduced-motion: reduce)');
  const fineMq = window.matchMedia('(hover: hover) and (pointer: fine)');
  let cleanup = () => {};

  const setup = () => {
    cleanup();
    cleanup = () => {};

    if (reduceMq.matches || html.classList.contains('motion-ready-fallback')) {
      html.classList.remove('motion');
      shownStatically = true;
      introPlayed = true;
      return;
    }

    const cleanups: Array<() => void> = [];
    cleanups.push(heroIntro(() => (introPlayed = true)));
    if (!shownStatically) {
      html.classList.add('motion');
      cleanups.push(scrollReveals());
      cleanups.push(countUps());
    }
    if (fineMq.matches) cleanups.push(magnetic());

    cleanup = () => cleanups.forEach((fn) => fn());
  };

  setup();
  reduceMq.addEventListener('change', setup);
  fineMq.addEventListener('change', setup);

  return () => {
    reduceMq.removeEventListener('change', setup);
    fineMq.removeEventListener('change', setup);
    cleanup();
  };
}


function heroIntro(onDone: () => void) {
  const words = $('[data-hero-word]');
  const blocks = $('[data-hero]');
  const phone = $('[data-phone]');
  const apps = $('[data-app]');

  if (introPlayed) {
    set([...words, ...blocks, ...phone, ...apps], { opacity: 1, translateY: 0, scale: 1 });
    return startFlap();
  }

  let stop = () => {};
  const tl = createTimeline({
    defaults: { ease: EASE },
    onComplete: () => {
      onDone();
      stop = startFlap();
    },
  });

  tl.add(words, { translateY: ['105%', '0%'], duration: 1100, delay: stagger(110) }, 80)
    .add(blocks, { opacity: [0, 1], translateY: [18, 0], duration: 900, delay: stagger(90) }, 420)
    .add(phone, { opacity: [0, 1], translateY: [40, 0], scale: [0.97, 1], duration: 1300 }, 300)
    .add(
      apps,
      {
        opacity: [0, 1],
        scale: [0.6, 1],
        duration: 700,
        ease: 'outBack(1.6)',
        delay: stagger(55, { grid: [4, 3], from: 'first' }),
      },
      800,
    );

  return () => {
    tl.revert();
    stop();
  };
}


const FLAP_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ/-';

function startFlap() {
  const board = document.querySelector<HTMLElement>('[data-flap]');
  const toggle = document.querySelector<HTMLButtonElement>('[data-flap-toggle]');
  if (!board) return () => {};

  const titles: string[] = JSON.parse(board.dataset.titles || '[]');
  const cells = [...board.querySelectorAll<HTMLElement>('[data-cell]')];
  if (titles.length < 2 || !cells.length) return () => {};

  const width = cells.length;
  const region = board.closest<HTMLElement>('.role') ?? board;
  let index = 0;
  let timer = 0;
  let userPaused = false;
  let hoverPaused = false;
  let visible = true;
  const running = new Set<ReturnType<typeof animate>>();

  const flipTo = (cell: HTMLElement, sequence: string[], delay: number) => {
    const [char, ...rest] = sequence;
    const a = animate(cell, {
      rotateX: [0, -90],
      duration: 70,
      delay,
      ease: 'inQuad',
      onComplete: () => {
        running.delete(a);
        cell.textContent = char;
        const b = animate(cell, {
          rotateX: [90, 0],
          duration: rest.length ? 70 : 220,
          ease: rest.length ? 'outQuad' : 'outBack(2.2)',
          onComplete: () => {
            running.delete(b);
            if (rest.length) flipTo(cell, rest, 0);
          },
        });
        running.add(b);
      },
    });
    running.add(a);
  };

  const show = (title: string) => {
    const padded = title.padEnd(width, ' ');
    cells.forEach((cell, i) => {
      const next = padded[i] === ' ' ? ' ' : padded[i];
      if (cell.textContent === next) return;
      const noise = next === ' ' ? [] : [0, 1].map(() => FLAP_CHARS[random(0, FLAP_CHARS.length - 1)]);
      flipTo(cell, [...noise, next], i * 24);
    });
  };

  const tick = () => {
    index = (index + 1) % titles.length;
    show(titles[index]);
  };

  const sync = () => {
    const shouldRun = !userPaused && !hoverPaused && visible && !document.hidden;
    if (shouldRun && !timer) timer = window.setInterval(tick, 4500);
    if (!shouldRun && timer) {
      window.clearInterval(timer);
      timer = 0;
    }
  };

  const setPaused = (paused: boolean) => {
    userPaused = paused;
    if (toggle) {
      toggle.setAttribute('aria-pressed', String(paused));
      toggle.querySelector('[data-flap-icon="pause"]')?.toggleAttribute('hidden', paused);
      toggle.querySelector('[data-flap-icon="play"]')?.toggleAttribute('hidden', !paused);
      const label = toggle.querySelector('[data-flap-label]');
      if (label) label.textContent = paused ? 'Play title animation' : 'Pause title animation';
    }
    sync();
  };

  const onToggle = () => setPaused(!userPaused);
  const onEnter = () => ((hoverPaused = true), sync());
  const onLeave = () => ((hoverPaused = false), sync());
  const onVisibility = () => sync();
  const io = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    sync();
  });

  toggle?.removeAttribute('hidden');
  toggle?.addEventListener('click', onToggle);
  region.addEventListener('pointerenter', onEnter);
  region.addEventListener('pointerleave', onLeave);
  document.addEventListener('visibilitychange', onVisibility);
  io.observe(board);
  sync();

  return () => {
    window.clearInterval(timer);
    timer = 0;
    running.forEach((a) => a.revert());
    io.disconnect();
    toggle?.removeEventListener('click', onToggle);
    toggle?.setAttribute('hidden', '');
    region.removeEventListener('pointerenter', onEnter);
    region.removeEventListener('pointerleave', onLeave);
    document.removeEventListener('visibilitychange', onVisibility);
    const first = titles[0].padEnd(width, ' ');
    cells.forEach((c, i) => (c.textContent = first[i] === ' ' ? ' ' : first[i]));
  };
}


function scrollReveals() {
  const targets = $('[data-reveal]') as HTMLElement[];
  const pending = new Set(targets);

  const io = new IntersectionObserver(
    (entries) => {
      const entering = entries
        .filter((e) => e.isIntersecting)
        .map((e) => e.target as HTMLElement)
        .sort((a, b) => (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1));
      if (!entering.length) return;

      const images = entering.filter((el) => el.dataset.reveal === 'image');
      const rest = entering.filter((el) => el.dataset.reveal !== 'image');

      if (rest.length) {
        animate(rest, {
          opacity: [0, 1],
          translateY: [22, 0],
          duration: 1000,
          ease: EASE,
          delay: stagger(70),
        });
      }
      images.forEach((el) => {
        const img = el.querySelector('img');
        animate(el, { opacity: [0, 1], duration: 500, ease: 'outQuad' });
        if (img) animate(img, { scale: [1.12, 1], duration: 1600, ease: EASE });
      });

      entering.forEach((el) => {
        io.unobserve(el);
        pending.delete(el);
      });
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0 },
  );

  targets.forEach((el) => io.observe(el));

  return () => io.disconnect();
}


function countUps() {
  const nodes = $('[data-count]') as HTMLElement[];

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target as HTMLElement;
        const to = Number(el.dataset.count);
        const from = Number(el.dataset.countFrom ?? 0);
        const counter = { v: from };
        el.textContent = String(from);
        animate(counter, {
          v: to,
          duration: 2000,
          delay: 200,
          ease: 'outExpo',
          modifier: round(0),
          onUpdate: () => (el.textContent = String(counter.v)),
          onComplete: () => (el.textContent = String(to)),
        });
        io.unobserve(el);
      });
    },
    { threshold: 0.6 },
  );

  nodes.forEach((n) => io.observe(n));
  return () => {
    io.disconnect();
    nodes.forEach((n) => (n.textContent = n.dataset.count ?? n.textContent));
  };
}


function magnetic() {
  const els = $('[data-magnetic]') as HTMLElement[];
  const offs: Array<() => void> = [];

  els.forEach((el) => {
    const pos = createAnimatable(el, { x: 450, y: 450, ease: 'out(4)' });
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      pos.x((e.clientX - (r.left + r.width / 2)) * 0.22);
      pos.y((e.clientY - (r.top + r.height / 2)) * 0.3);
    };
    const leave = () => {
      pos.x(0, 700, 'outElastic(1, .5)');
      pos.y(0, 700, 'outElastic(1, .5)');
    };
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerleave', leave);
    offs.push(() => {
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerleave', leave);
      pos.revert();
    });
  });

  return () => offs.forEach((fn) => fn());
}
