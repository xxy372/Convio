// Smooth scroll for nav links
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Intersection observer for scroll animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.feature-card, .stat-card, .timeline-item, .gallery-item, .credit-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1)';
  observer.observe(el);
});

// Nav shadow on scroll
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  nav.style.borderBottomColor = window.scrollY > 40 ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.07)';
});

// ── Gallery lightbox ─────────────────────────────────────────────────────────
(function () {
  // Build overlay DOM
  const lb      = document.createElement('div');
  lb.className  = 'lightbox';
  lb.setAttribute('role', 'dialog');
  lb.setAttribute('aria-modal', 'true');

  const inner   = document.createElement('div');
  inner.className = 'lightbox-inner';

  const img     = document.createElement('img');
  img.className = 'lightbox-img';
  img.alt       = '';

  const caption = document.createElement('p');
  caption.className = 'lightbox-caption';

  const dots    = document.createElement('div');
  dots.className = 'lightbox-dots lb-hidden';

  inner.append(img, caption, dots);

  const btnClose = document.createElement('button');
  btnClose.className = 'lightbox-btn lightbox-close';
  btnClose.innerHTML = '&#10005;';
  btnClose.setAttribute('aria-label', 'Close');

  const btnPrev  = document.createElement('button');
  btnPrev.className = 'lightbox-btn lightbox-prev lb-hidden';
  btnPrev.innerHTML = '&#8592;';
  btnPrev.setAttribute('aria-label', 'Previous image');

  const btnNext  = document.createElement('button');
  btnNext.className = 'lightbox-btn lightbox-next lb-hidden';
  btnNext.innerHTML = '&#8594;';
  btnNext.setAttribute('aria-label', 'Next image');

  lb.append(inner, btnClose, btnPrev, btnNext);
  document.body.appendChild(lb);

  // State
  let images = [], currentIdx = 0;

  function open(card) {
    images     = card.dataset.images.split(',').map(s => s.trim());
    currentIdx = 0;
    caption.textContent = card.querySelector('.gallery-label')?.textContent || '';
    render();
    lb.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    lb.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  function render() {
    img.src = images[currentIdx];
    const multi = images.length > 1;

    btnPrev.classList.toggle('lb-hidden', !multi);
    btnNext.classList.toggle('lb-hidden', !multi);
    dots.classList.toggle('lb-hidden', !multi);

    if (multi) {
      dots.innerHTML = '';
      images.forEach((_, i) => {
        const d = document.createElement('span');
        d.className = 'lightbox-dot' + (i === currentIdx ? ' active' : '');
        d.addEventListener('click', () => { currentIdx = i; render(); });
        dots.appendChild(d);
      });
    }
  }

  function prev() { currentIdx = (currentIdx - 1 + images.length) % images.length; render(); }
  function next() { currentIdx = (currentIdx + 1) % images.length; render(); }

  // Events
  btnClose.addEventListener('click', close);
  btnPrev.addEventListener('click', prev);
  btnNext.addEventListener('click', next);

  // Click outside the inner content closes
  lb.addEventListener('click', e => { if (e.target === lb) close(); });

  document.addEventListener('keydown', e => {
    if (!lb.classList.contains('is-open')) return;
    if (e.key === 'Escape')     close();
    if (e.key === 'ArrowLeft')  prev();
    if (e.key === 'ArrowRight') next();
  });

  // Wire up cards
  document.querySelectorAll('.gallery-item[data-images]').forEach(card => {
    card.addEventListener('click', () => open(card));
  });
})();