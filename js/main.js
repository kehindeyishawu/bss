/* Basic Sharp Services — shared site scripts
   Loaded on every page via <script src="/js/main.js" defer></script>.
   `defer` guarantees the DOM is parsed before this runs, and top-level
   function declarations remain global so inline onclick handlers resolve. */

// Reveal on scroll
const reveals = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) { setTimeout(() => e.target.classList.add('visible'), i * 80); io.unobserve(e.target); }
  });
}, { threshold: 0.1 });
reveals.forEach(el => io.observe(el));

// Nav shrink on scroll
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  if (nav) nav.style.padding = window.scrollY > 60 ? '0.6rem 4rem' : '1rem 4rem';
});

// Hamburger
function toggleMenu() {
  const links = document.querySelector('.nav-links');
  const open = links.style.display === 'flex';
  if (open) { links.style.display = 'none'; return; }
  const navBottom = document.getElementById('navbar').getBoundingClientRect().bottom;
  Object.assign(links.style, {
    display: 'flex', flexDirection: 'column',
    position: 'fixed', top: navBottom + 'px', left: '0', right: '0',
    background: 'rgba(14,14,14,0.98)', padding: '2rem 1.5rem',
    gap: '1.5rem', zIndex: '840', borderBottom: '1px solid rgba(212,43,43,0.2)'
  });
}

// MEGA DROPDOWN LOGIC
function toggleMega(e) {
  e.stopPropagation();
  const navItem = document.getElementById('productsNavItem');
  const mega = document.getElementById('megaDropdown');
  const trigger = navItem.querySelector('.nav-dropdown-trigger');
  const isOpen = navItem.classList.contains('open');
  closeMega();
  if (!isOpen) {
    navItem.classList.add('open');
    trigger.setAttribute('aria-expanded', 'true');
    const navBottom = document.getElementById('navbar').getBoundingClientRect().bottom;
    mega.style.top = navBottom + 'px';
    if (window.innerWidth <= 900) {
      mega.style.height = (window.innerHeight - navBottom) + 'px';
    } else {
      mega.style.height = '';
    }
    mega.classList.add('open');
    document.body.style.overflow = 'hidden';
    // Close hamburger menu if open on mobile so it doesn't overlap the dropdown
    const navLinks = document.querySelector('.nav-links');
    if (navLinks && navLinks.style.display === 'flex') {
      navLinks.style.display = 'none';
    }
  }
}
function closeMega() {
  const navItem = document.getElementById('productsNavItem');
  const mega = document.getElementById('megaDropdown');
  const trigger = navItem ? navItem.querySelector('.nav-dropdown-trigger') : null;
  if (navItem) navItem.classList.remove('open');
  if (trigger) trigger.setAttribute('aria-expanded', 'false');
  if (mega) mega.classList.remove('open');
  document.body.style.overflow = '';
}
document.addEventListener('click', (e) => {
  if (!e.target.closest('#productsNavItem') && !e.target.closest('#megaDropdown')) closeMega();
  const links = document.querySelector('.nav-links');
  if (links && links.style.display === 'flex' && !e.target.closest('.nav-links') && !e.target.closest('.hamburger')) links.style.display = 'none';
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') { closeMega(); const links = document.querySelector('.nav-links'); if (links) links.style.display = 'none'; }
});
window.addEventListener('resize', () => {
  const mega = document.getElementById('megaDropdown');
  if (mega && mega.classList.contains('open')) {
    const navBottom = document.getElementById('navbar').getBoundingClientRect().bottom;
    mega.style.top = navBottom + 'px';
    mega.style.height = window.innerWidth <= 900 ? (window.innerHeight - navBottom) + 'px' : '';
  }
});

// Spec tabs (product pages only; harmless elsewhere)
function switchTab(e, id) {
  document.querySelectorAll('.spec-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.spec-panel').forEach(p => p.classList.remove('active'));
  e.target.classList.add('active');
  document.getElementById(id).classList.add('active');
}
