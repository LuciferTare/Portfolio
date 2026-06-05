/* ─────────────────────────────────────────
   NAVBAR — scroll effect + hamburger
───────────────────────────────────────── */
const navbar    = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

// Add scrolled class once the user scrolls past 60px
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// Toggle mobile menu
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
  document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
});

// Close mobile menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (
    navLinks.classList.contains('open') &&
    !navLinks.contains(e.target) &&
    !hamburger.contains(e.target)
  ) {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
  }
});

/* ─────────────────────────────────────────
   SCROLL-TRIGGERED ANIMATIONS
───────────────────────────────────────── */
const animatedEls = document.querySelectorAll('[data-animate]');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Only animate once
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

animatedEls.forEach(el => observer.observe(el));

/* ─────────────────────────────────────────
   LINK NAVIGATION (suppresses status-bar preview)
───────────────────────────────────────── */
document.querySelectorAll('a[data-scroll]').forEach(el => {
  el.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(el.dataset.scroll);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
  el.addEventListener('keydown', e => {
    if (e.key === 'Enter') el.click();
  });
});

document.querySelectorAll('a[data-href]').forEach(el => {
  el.addEventListener('click', e => {
    e.preventDefault();
    if (el.dataset.target === '_blank') {
      window.open(el.dataset.href, '_blank', 'noopener,noreferrer');
    } else {
      window.location.href = el.dataset.href;
    }
  });
  el.addEventListener('keydown', e => {
    if (e.key === 'Enter') el.click();
  });
});

/* ─────────────────────────────────────────
   SMOOTH ACTIVE NAV LINK HIGHLIGHTING
───────────────────────────────────────── */
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navAnchors.forEach(a => {
          a.style.color = a.getAttribute('href') === `#${id}` ? 'var(--accent)' : '';
        });
      }
    });
  },
  { threshold: 0.4 }
);

sections.forEach(s => sectionObserver.observe(s));

/* ─────────────────────────────────────────
   HERO PARALLAX (subtle)
───────────────────────────────────────── */
const heroBgGlows = document.querySelectorAll('.hero-bg-glow');

window.addEventListener('mousemove', (e) => {
  const { innerWidth: w, innerHeight: h } = window;
  const x = (e.clientX / w - 0.5) * 2;  // -1 to 1
  const y = (e.clientY / h - 0.5) * 2;

  heroBgGlows.forEach((glow, i) => {
    const factor = i === 0 ? 20 : -15;
    glow.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
  });
});

/* ─────────────────────────────────────────
   HERO TYPEWRITER
───────────────────────────────────────── */
(function () {
  const el = document.getElementById('heroTypewriter');
  if (!el) return;

  const phrases = [
    'Flutter Developer',
    'Mobile App Engineer',
    'Play Store Publisher',
    'Real-time Architect',
    'UI/UX Craftsman',
  ];

  let phraseIndex = 0;
  let charIndex   = 0;
  let deleting    = false;
  let pausing     = false;

  function tick() {
    const current = phrases[phraseIndex];

    if (pausing) { pausing = false; setTimeout(tick, deleting ? 500 : 1800); return; }

    if (!deleting) {
      el.textContent = current.slice(0, ++charIndex);
      if (charIndex === current.length) { deleting = true; pausing = true; }
    } else {
      el.textContent = current.slice(0, --charIndex);
      if (charIndex === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        pausing = true;
      }
    }

    setTimeout(tick, deleting ? 45 : 85);
  }

  setTimeout(tick, 1400);
})();


/* ─────────────────────────────────────────
   SKILL CHIPS — staggered entrance
───────────────────────────────────────── */
const skillChips = document.querySelectorAll('.skill-chip');
skillChips.forEach((chip, i) => {
  chip.style.transitionDelay = `${i * 0.04}s`;
  chip.style.opacity = '0';
  chip.style.transform = 'scale(0.85)';
  chip.style.transition = 'opacity 0.4s ease, transform 0.4s ease, background 0.3s ease, border-color 0.3s ease, transform 0.3s ease';
});

const skillsContainer = document.querySelector('.skills-grid');
if (skillsContainer) {
  const skillObserver = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        skillChips.forEach(chip => {
          chip.style.opacity = '1';
          chip.style.transform = 'scale(1)';
        });
        skillObserver.unobserve(entry.target);
      }
    },
    { threshold: 0.2 }
  );
  skillObserver.observe(skillsContainer);
}
