/* ========================================
   PORTFOLIO - PARTICLES BACKGROUND
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
  initParticles();
});

function initParticles() {
  const canvas = document.getElementById('particlesCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  const particles = [];
  const particleCount = 60;
  const connectionDistance = 150;
  let mouse = { x: null, y: null, radius: 150 };

  window.addEventListener('mousemove', function(e) {
    mouse.x = e.x;
    mouse.y = e.y;
  });

  window.addEventListener('mouseout', function() {
    mouse.x = null;
    mouse.y = null;
  });

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.directionX = (Math.random() * 2) - 1;
      this.directionY = (Math.random() * 2) - 1;
      this.size = Math.random() * 2 + 1;
      this.color = this.getRandomColor();
    }

    getRandomColor() {
      const colors = [
        'rgba(99, 102, 241, 0.5)',
        'rgba(6, 182, 212, 0.5)',
        'rgba(236, 72, 153, 0.5)',
        'rgba(129, 140, 248, 0.5)',
      ];
      return colors[Math.floor(Math.random() * colors.length)];
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
      ctx.fillStyle = this.color;
      ctx.fill();
    }

    update() {
      if (this.x > canvas.width || this.x < 0) {
        this.directionX = -this.directionX;
      }

      if (this.y > canvas.height || this.y < 0) {
        this.directionY = -this.directionY;
      }

      // Mouse interaction
      if (mouse.x) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouse.radius) {
          const forceDirectionX = dx / distance;
          const forceDirectionY = dy / distance;
          const force = (mouse.radius - distance) / mouse.radius;
          this.x -= forceDirectionX * force * this.size;
          this.y -= forceDirectionY * force * this.size;
        }
      }

      this.x += this.directionX;
      this.y += this.directionY;

      this.draw();
    }
  }

  function init() {
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
  }

  function connect() {
    for (let a = 0; a < particles.length; a++) {
      for (let b = a; b < particles.length; b++) {
        const distance = ((particles[a].x - particles[b].x) * (particles[a].x - particles[b].x)) +
          ((particles[a].y - particles[b].y) * (particles[a].y - particles[b].y));

        if (distance < connectionDistance * connectionDistance) {
          const opacity = 1 - (distance / (connectionDistance * connectionDistance));
          ctx.strokeStyle = `rgba(99, 102, 241, ${opacity * 0.2})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(particles[a].x, particles[a].y);
          ctx.lineTo(particles[b].x, particles[b].y);
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
    }

    connect();
    requestAnimationFrame(animate);
  }

  init();
  animate();
}