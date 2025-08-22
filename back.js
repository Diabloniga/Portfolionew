const canvas = document.getElementById("bubbleCanvas");
const ctx = canvas.getContext("2d");
const text = "ADITYA BISHT";

let particles = [];

function initParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.font = "bold 80px Arial";
  ctx.fillStyle = "black";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, canvas.width / 2, canvas.height / 2);

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  particles = [];
  for (let y = 0; y < canvas.height; y += 6) {
    for (let x = 0; x < canvas.width; x += 6) {
      const index = (y * canvas.width + x) * 4;
      if (data[index + 3] > 128) {
        particles.push({
          x: x,
          y: y,
          baseX: x,
          baseY: y,
          size: 3,
          color: `hsl(${Math.random() * 360}, 70%, 40%)`,
          vx: 0,
          vy: 0
        });
      }
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let p of particles) {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.fill();

    p.x += p.vx;
    p.y += p.vy;

    p.vx += (p.baseX - p.x) * 0.01;
    p.vy += (p.baseY - p.y) * 0.01;

    p.vx *= 0.92;
    p.vy *= 0.92;
  }
  requestAnimationFrame(animate);
}

canvas.addEventListener("mousemove", e => {
  const rect = canvas.getBoundingClientRect();
  const mx = e.clientX - rect.left;
  const my = e.clientY - rect.top;

  for (let p of particles) {
    const dx = p.x - mx;
    const dy = p.y - my;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 60) {
      const angle = Math.atan2(dy, dx);
      const force = (60 - dist) / 6;
      p.vx += Math.cos(angle) * force;
      p.vy += Math.sin(angle) * force;
    }
  }
});

canvas.addEventListener("click", () => {
  for (let p of particles) {
    p.vx += (Math.random() - 0.5) * 20;
    p.vy += (Math.random() - 0.5) * 20;
  }
});

initParticles();
animate();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initParticles();
});

const links = document.querySelectorAll("nav a");
links.forEach(link => {
  link.addEventListener("click", () => {
    links.forEach(l => l.classList.remove("active"));
    link.classList.add("active");
  });
});

document.addEventListener("mousemove", function(e) {
  const sparkle = document.createElement("div");
  sparkle.className = "sparkle";
  sparkle.style.left = e.pageX + "px";
  sparkle.style.top = e.pageY + "px";
  
  document.body.appendChild(sparkle);
  setTimeout(() => sparkle.remove(), 800);
});

const avatar = document.querySelector(".avatar");
if (avatar) {
  avatar.addEventListener("mouseenter", () => {
    avatar.style.filter = "brightness(1.1)";
  });
  avatar.addEventListener("mouseleave", () => {
    avatar.style.filter = "brightness(1)";
  });
}

const wrap = document.querySelector('.photo-wrap');
if (wrap) {
  wrap.addEventListener('mousemove', (e) => {
    const r = wrap.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) / (r.width / 2);
    const y = (e.clientY - r.top - r.height / 2) / (r.height / 2);
    wrap.style.transform = `rotateX(${-y * 6}deg) rotateY(${x * 6}deg)`;
  });
  wrap.addEventListener('mouseleave', () => {
    wrap.style.transform = 'none';
  });
}
