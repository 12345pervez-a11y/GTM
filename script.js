/* =========================================
   24 GROUP — WEBSITE SCRIPTS
   ========================================= */

// ---- Navbar scroll effect ----
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, { passive: true });

// ---- Mobile hamburger menu ----
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  hamburger.classList.toggle('active', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

// Close menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('active');
    document.body.style.overflow = '';
  });
});

// ---- Scroll-reveal animations ----
function initScrollReveal() {
  const targets = [
    '.section-header',
    '.service-card',
    '.about-card',
    '.about-copy',
    '.testimonial-card',
    '.contact-info',
    '.contact-form',
    '.cta-inner',
  ];

  const elements = document.querySelectorAll(targets.join(', '));

  elements.forEach(el => el.classList.add('fade-up'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px',
  });

  elements.forEach(el => observer.observe(el));
}

// ---- Contact form ----
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const btn = contactForm.querySelector('button[type="submit"]');
  const originalText = btn.textContent;

  // Basic validation
  const email = contactForm.querySelector('#email').value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    shakeField(contactForm.querySelector('#email'));
    return;
  }

  const firstName = contactForm.querySelector('#firstName').value.trim();
  if (!firstName) {
    shakeField(contactForm.querySelector('#firstName'));
    return;
  }

  // Simulate submission
  btn.textContent = 'Sending…';
  btn.disabled = true;

  setTimeout(() => {
    // Replace form with success message
    contactForm.innerHTML = `
      <div class="form-success visible">
        <div class="check-icon">✓</div>
        <h3>Message received!</h3>
        <p>Thank you for reaching out. A member of our team will be in touch within one business day.</p>
      </div>
    `;
  }, 1200);
});

function shakeField(field) {
  field.style.borderColor = '#e05252';
  field.focus();
  field.animate([
    { transform: 'translateX(0)' },
    { transform: 'translateX(-6px)' },
    { transform: 'translateX(6px)' },
    { transform: 'translateX(-4px)' },
    { transform: 'translateX(4px)' },
    { transform: 'translateX(0)' },
  ], { duration: 350, easing: 'ease-out' });

  field.addEventListener('focus', () => {
    field.style.borderColor = '';
  }, { once: true });
}

// ---- Smooth anchor scroll with offset for fixed navbar ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const href = anchor.getAttribute('href');
    if (href === '#') return;

    const target = document.querySelector(href);
    if (!target) return;

    e.preventDefault();
    const offset = 80;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;

    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// ---- Active nav link highlight ----
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navAnchors.forEach(a => {
        a.style.color = a.getAttribute('href') === `#${id}`
          ? 'rgba(255,255,255,1)'
          : '';
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));

// ---- Init ----
document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
});
