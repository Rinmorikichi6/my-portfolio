/* ========================================
   PORTFOLIO - MAIN JAVASCRIPT
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
  initLoadingScreen();
  initCustomCursor();
  initScrollProgress();
  initNavbar();
  initMobileMenu();
  initTypingAnimation();
  initScrollReveal();
  initSmoothScroll();
  initProjectFilter();
  initContactForm();
  initCounterAnimation();
});

/* ========================================
   LOADING SCREEN
   ======================================== */
function initLoadingScreen() {
  const loadingScreen = document.getElementById('loadingScreen');
  if (!loadingScreen) return;

  window.addEventListener('load', function() {
    setTimeout(() => {
      loadingScreen.classList.add('hidden');
    }, 1500);
  });

  setTimeout(() => {
    loadingScreen.classList.add('hidden');
  }, 3000);
}

/* ========================================
   CUSTOM CURSOR
   ======================================== */
function initCustomCursor() {
  if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

  const cursorDot = document.querySelector('.cursor-dot');
  const cursorOutline = document.querySelector('.cursor-outline');
  if (!cursorDot || !cursorOutline) return;

  let posX = 0, posY = 0;
  let mouseX = 0, mouseY = 0;

  function updateCursor() {
    posX += (mouseX - posX) * 0.15;
    posY += (mouseY - posY) * 0.15;
    cursorDot.style.left = posX + 'px';
    cursorDot.style.top = posY + 'px';
    cursorOutline.style.left = posX + 'px';
    cursorOutline.style.top = posY + 'px';
    requestAnimationFrame(updateCursor);
  }

  document.addEventListener('mousemove', function(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  updateCursor();

  const interactiveElements = document.querySelectorAll('a, button, input, textarea, .project-card, .service-card, .filter-btn');
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => cursorOutline.classList.add('hovered'));
    el.addEventListener('mouseleave', () => cursorOutline.classList.remove('hovered'));
  });
}

/* ========================================
   SCROLL PROGRESS
   ======================================== */
function initScrollProgress() {
  const scrollProgressBar = document.getElementById('scrollProgressBar');
  if (!scrollProgressBar) return;

  window.addEventListener('scroll', function() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    scrollProgressBar.style.width = scrollPercent + '%';
  });
}

/* ========================================
   NAVBAR
   ======================================== */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Active nav link on scroll
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', function() {
    const scrollY = window.pageYOffset;
    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 150;
      const sectionId = section.getAttribute('id');
      const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        document.querySelector('.nav-links a.active')?.classList.remove('active');
        if (navLink) navLink.classList.add('active');
      }
    });
  });
}

/* ========================================
   MOBILE MENU
   ======================================== */
function initMobileMenu() {
  const menuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const closeMenu = document.getElementById('closeMenu');
  const mobileOverlay = document.getElementById('mobileOverlay');

  if (!menuToggle || !mobileMenu) return;

  function openMenu() {
    mobileMenu.classList.add('active');
    mobileOverlay?.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMenuHandler() {
    mobileMenu.classList.remove('active');
    mobileOverlay?.classList.remove('active');
    document.body.style.overflow = 'auto';
  }

  menuToggle?.addEventListener('click', openMenu);
  closeMenu?.addEventListener('click', closeMenuHandler);
  mobileOverlay?.addEventListener('click', closeMenuHandler);

  document.querySelectorAll('.mobile-menu a').forEach(link => {
    link.addEventListener('click', closeMenuHandler);
  });

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeMenuHandler();
  });
}

/* ========================================
   TYPING ANIMATION
   ======================================== */
function initTypingAnimation() {
  const typedText = document.getElementById('typedText');
  if (!typedText) return;

  const phrases = ['Full Stack Developer', 'Web Developer', 'Problem Solver', 'Tech Enthusiast'];
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      typedText.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typedText.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentPhrase.length) {
      isDeleting = true;
      typeSpeed = 2000;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
  }
  type();
}

/* ========================================
   SCROLL REVEAL
   ======================================== */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.section-header, .about-content, .skill-card, .service-card, .project-card');

  if (!revealElements.length) return;

  const revealOnScroll = function() {
    const windowHeight = window.innerHeight;
    revealElements.forEach(el => {
      const elementTop = el.getBoundingClientRect().top;
      if (elementTop < windowHeight - 100) {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }
    });
  };

  // Initial state
  revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
  });

  revealOnScroll();
  window.addEventListener('scroll', revealOnScroll);
}

/* ========================================
   SMOOTH SCROLL
   ======================================== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 0;
        const targetPosition = targetElement.offsetTop - navbarHeight;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      }
    });
  });
}

/* ========================================
   PROJECT FILTER
   ======================================== */
function initProjectFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (!filterBtns.length || !projectCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const filter = this.getAttribute('data-filter');

      filterBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.8)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

/* ========================================
   CONTACT FORM
   ======================================== */
function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  if (!contactForm) return;

  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const formMessage = document.getElementById('formMessage');
    const submitBtn = contactForm.querySelector('button[type="submit"]');

    const name = contactForm.querySelector('#name').value.trim();
    const email = contactForm.querySelector('#email').value.trim();
    const subject = contactForm.querySelector('#subject').value.trim();
    const message = contactForm.querySelector('#message').value.trim();

    let isValid = true;
    let errors = [];

    if (!name) {
      errors.push('Name is required');
      isValid = false;
    }

    if (!email || !email.includes('@')) {
      errors.push('Valid email is required');
      isValid = false;
    }

    if (!subject) {
      errors.push('Subject is required');
      isValid = false;
    }

    if (!message) {
      errors.push('Message is required');
      isValid = false;
    }

    if (isValid) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>Sending...</span>';

      // Simulate form submission
      setTimeout(() => {
        formMessage.textContent = 'Thank you! Your message has been sent successfully.';
        formMessage.className = 'form-message success';
        contactForm.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<span>Send Message</span>';

        setTimeout(() => {
          formMessage.style.display = 'none';
        }, 5000);
      }, 1500);
    } else {
      formMessage.innerHTML = errors.join('<br>');
      formMessage.className = 'form-message error';
    }
  });
}

/* ========================================
   COUNTER ANIMATION
   ======================================== */
function initCounterAnimation() {
  const counters = document.querySelectorAll('.stat-number[data-count]');
  if (!counters.length) return;

  const animateCounters = function() {
    counters.forEach(counter => {
      const rect = counter.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const updateCounter = function() {
          current += increment;
          if (current < target) {
            counter.textContent = Math.ceil(current);
            requestAnimationFrame(updateCounter);
          } else {
            counter.textContent = target;
          }
        };
        updateCounter();
      }
    });
  };

  animateCounters();
  window.addEventListener('scroll', animateCounters);
}