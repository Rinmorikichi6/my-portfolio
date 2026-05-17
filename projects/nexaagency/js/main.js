const services = [
  { icon: '🎯', title: 'Brand Strategy', desc: 'Position your brand with research-driven messaging and identity systems that resonate with your audience.' },
  { icon: '💻', title: 'Web Development', desc: 'High-performance websites and web apps built with modern stacks, optimized for speed and conversion.' },
  { icon: '📈', title: 'Digital Marketing', desc: 'SEO, paid media, and content campaigns designed to generate qualified leads and measurable ROI.' },
  { icon: '🎨', title: 'UI/UX Design', desc: 'User-centered interfaces that balance aesthetics with usability across desktop and mobile experiences.' }
];

document.getElementById('servicesGrid').innerHTML = services.map(s => `
  <article class="service-card">
    <div class="service-icon">${s.icon}</div>
    <h3>${s.title}</h3>
    <p>${s.desc}</p>
  </article>
`).join('');

const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
});

document.getElementById('menuBtn').addEventListener('click', () => {
  document.getElementById('nav').classList.toggle('open');
});

document.querySelectorAll('.nav a').forEach(link => {
  link.addEventListener('click', () => {
    document.getElementById('nav').classList.remove('open');
  });
});

document.getElementById('contactForm').addEventListener('submit', e => {
  e.preventDefault();
  const msg = document.getElementById('formMsg');
  msg.textContent = 'Thank you! Your message has been sent successfully.';
  msg.className = 'form-msg success';
  e.target.reset();
  setTimeout(() => {
    msg.textContent = '';
    msg.className = 'form-msg';
  }, 5000);
});
