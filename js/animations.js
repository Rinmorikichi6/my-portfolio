/* ========================================
   PORTFOLIO - ANIMATIONS
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
  initScrollAnimations();
  initHoverAnimations();
  initParallax();
});

/* ========================================
   SCROLL ANIMATIONS
   ======================================== */
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const elements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .stagger-item');
  elements.forEach(el => observer.observe(el));
}

/* ========================================
   HOVER ANIMATIONS
   ======================================== */
function initHoverAnimations() {
  // Card hover effects
  const cards = document.querySelectorAll('.service-card, .project-card');
  cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-10px)';
    });
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });

  // Button ripple effect
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', function(e) {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const ripple = document.createElement('span');
      ripple.style.cssText = `
        position: absolute;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        pointer-events: none;
        width: 20px;
        height: 20px;
        left: ${x}px;
        top: ${y}px;
        transform: translate(-50%, -50%);
        animation: ripple 0.6s linear;
      `;

      btn.style.position = 'relative';
      btn.style.overflow = 'hidden';
      btn.appendChild(ripple);

      setTimeout(() => ripple.remove(), 600);
    });
  });
}

/* ========================================
   PARALLAX EFFECT
   ======================================== */
function initParallax() {
  const parallaxElements = document.querySelectorAll('[data-parallax]');

  window.addEventListener('scroll', function() {
    const scrollY = window.pageYOffset;
    parallaxElements.forEach(el => {
      const speed = parseFloat(el.getAttribute('data-parallax')) || 0.5;
      const yPos = -(scrollY * speed);
      el.style.transform = `translateY(${yPos}px)`;
    });
  });
}

// Add ripple animation dynamically
const style = document.createElement('style');
style.textContent = `
  @keyframes ripple {
    0% { width: 0; height: 0; opacity: 1; }
    100% { width: 200px; height: 200px; opacity: 0; }
  }
`;
document.head.appendChild(style);