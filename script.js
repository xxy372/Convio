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

// Video play overlay
const demoVideo = document.getElementById('demoVideo');
const playBtn = document.getElementById('playBtn');
const videoOverlay = document.getElementById('videoOverlay');

if (demoVideo) {
  demoVideo.load();
}

if (demoVideo && playBtn && videoOverlay) {
  playBtn.addEventListener('click', () => {
    demoVideo.play();
  });

  demoVideo.addEventListener('play', () => {
    videoOverlay.classList.add('hidden');
  });

  demoVideo.addEventListener('pause', () => {
    if (!demoVideo.ended) {
      videoOverlay.classList.remove('hidden');
    }
  });

  demoVideo.addEventListener('ended', () => {
    videoOverlay.classList.remove('hidden');
  });
}