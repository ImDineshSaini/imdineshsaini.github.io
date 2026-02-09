// ============================================
// Auto Theme (System Preference)
// ============================================
const THEME_COLORS = {
  light: { primary: '#d97757', secondary: '#788c5d', tertiary: '#6a9bcc', text: '#b0aea5' },
  dark: { primary: '#ff9d6e', secondary: '#a8c98a', tertiary: '#8db4e2', text: '#6a6a6a' }
};

function updateSVGColors() {
  const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const colors = isDark ? THEME_COLORS.dark : THEME_COLORS.light;
  const svg = document.querySelector('.arch-svg');

  if (!svg) return;

  // AI/LLM layer
  svg.querySelectorAll('[fill="#d97757"]').forEach(el => el.setAttribute('fill', colors.primary));
  svg.querySelectorAll('[stroke="#d97757"]').forEach(el => el.setAttribute('stroke', colors.primary));

  // Microservices layer
  svg.querySelectorAll('[fill="#788c5d"]').forEach(el => el.setAttribute('fill', colors.secondary));
  svg.querySelectorAll('[stroke="#788c5d"]').forEach(el => el.setAttribute('stroke', colors.secondary));

  // Cloud layer
  svg.querySelectorAll('[fill="#6a9bcc"]').forEach(el => el.setAttribute('fill', colors.tertiary));
  svg.querySelectorAll('[stroke="#6a9bcc"]').forEach(el => el.setAttribute('stroke', colors.tertiary));

  // Banking layer
  svg.querySelectorAll('[fill="#C15F3C"]').forEach(el => el.setAttribute('fill', colors.primary));
  svg.querySelectorAll('[stroke="#C15F3C"]').forEach(el => el.setAttribute('stroke', colors.primary));

  // Labels
  svg.querySelectorAll('[fill="#b0aea5"]').forEach(el => el.setAttribute('fill', colors.text));
}

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateSVGColors);

// ============================================
// Navigation
// ============================================
const nav = document.getElementById('nav');
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 30);
});

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('active');
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('active');
    navLinks.classList.remove('open');
  });
});

// ============================================
// Active nav link on scroll
// ============================================
const sections = document.querySelectorAll('section[id]');

function updateActiveNav() {
  const scrollY = window.scrollY + 120;
  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    const link = navLinks.querySelector(`a[href="#${id}"]`);
    if (link) {
      link.classList.toggle('active', scrollY >= top && scrollY < top + height);
    }
  });
}

window.addEventListener('scroll', updateActiveNav);

// ============================================
// Scroll Reveal (IntersectionObserver)
// ============================================
function initReveal() {
  const revealElements = document.querySelectorAll(
    '.tl-item, .exp-card, .arch-card, .art-card, ' +
    '.stat-card, .impact-card, .edu-item, ' +
    '.about-text, .about-cards'
  );

  revealElements.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.06,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
}

// ============================================
// Staggered reveal for grid children
// ============================================
function initStaggeredReveal() {
  const grids = document.querySelectorAll(
    '.expertise-grid, .impact-grid, .articles-grid, .about-cards, .arch-grid'
  );

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const children = entry.target.children;
        Array.from(children).forEach((child, i) => {
          child.style.transitionDelay = `${i * 0.08}s`;
        });
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.05
  });

  grids.forEach(grid => observer.observe(grid));
}

// ============================================
// Hero entrance animation
// ============================================
function initHeroAnimation() {
  const heroElements = document.querySelectorAll('.anim-fade');

  heroElements.forEach((el, i) => {
    el.style.transition = `opacity 0.55s ease ${i * 0.1}s, transform 0.55s ease ${i * 0.1}s`;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      });
    });
  });
}

// ============================================
// Subtle orb parallax on mouse move
// ============================================
function initOrbParallax() {
  const orbs = document.querySelectorAll('.orb');
  if (!orbs.length) return;

  let ticking = false;
  document.addEventListener('mousemove', (e) => {
    if (ticking) return;
    ticking = true;

    requestAnimationFrame(() => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;

      orbs.forEach((orb, i) => {
        const speed = (i + 1) * 8;
        orb.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
      });

      ticking = false;
    });
  });
}

// ============================================
// Initialize
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  updateSVGColors();
  initReveal();
  initStaggeredReveal();
  initHeroAnimation();
  initOrbParallax();
});
