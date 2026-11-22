const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, {
  threshold: 0.15
});

document
  .querySelectorAll(".section, .hero-content, .hero-card, .project-card, .stats div, .skills-grid div, .process-grid div, .contact")
  .forEach((el) => {
    el.classList.add("hidden");
    observer.observe(el);
  });

document.querySelectorAll(".hero-card.tilt").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();

    const rotateX = ((e.clientY - rect.top - rect.height / 2) / rect.height) * -10;
    const rotateY = ((e.clientX - rect.left - rect.width / 2) / rect.width) * 10;

    card.style.transform = `
      perspective(900px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale(1.03)
    `;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "perspective(900px) rotateX(0) rotateY(0) scale(1)";
  });
});

window.addEventListener("scroll", () => {
  const nav = document.querySelector(".navbar");

  if (window.scrollY > 50) {
    nav.style.background = "rgba(7, 7, 13, 0.85)";
    nav.style.boxShadow = "0 10px 30px rgba(0,0,0,0.35)";
  } else {
    nav.style.background = "rgba(7, 7, 13, 0.72)";
    nav.style.boxShadow = "none";
  }
});

window.addEventListener("mousemove", (e) => {
  const x = e.clientX / window.innerWidth;
  const y = e.clientY / window.innerHeight;

  document.querySelectorAll(".orb").forEach((orb, i) => {
    const speed = (i + 1) * 18;
    orb.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
  });
});

function copiarCorreo() {
  const correo = "fernandoguillenrosario20@gmail.com";
  const toast = document.getElementById("toast");

  navigator.clipboard.writeText(correo)
    .then(() => {
      toast.textContent = "Correo copiado ✔";
      toast.classList.add("show-toast");

      setTimeout(() => {
        toast.classList.remove("show-toast");
      }, 2500);
    })
    .catch(() => {
      toast.textContent = "Correo: " + correo;
      toast.classList.add("show-toast");

      setTimeout(() => {
        toast.classList.remove("show-toast");
      }, 3000);
    });
}

const canvas = document.getElementById("code-bg");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resizeCanvas();

const codeWords = [
  "const", "let", "function", "return", "HTML", "CSS", "JavaScript",
  "Node.js", "Express", "MongoDB", "API", "deploy", "frontend",
  "backend", "e-commerce", "<div>", "</>", "{ }", "[ ]"
];

const fontSize = 16;
let columns = Math.floor(canvas.width / fontSize);
let drops = Array.from({ length: columns }, () => Math.random() * canvas.height);

function drawCodeRain() {
  ctx.fillStyle = "rgba(7, 7, 13, 0.12)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#00d4ff";
  ctx.font = `${fontSize}px monospace`;

  for (let i = 0; i < drops.length; i++) {
    const text = codeWords[Math.floor(Math.random() * codeWords.length)];

    ctx.fillText(text, i * fontSize, drops[i]);

    if (drops[i] > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }

    drops[i] += fontSize;
  }
}

setInterval(drawCodeRain, 55);

window.addEventListener("resize", () => {
  resizeCanvas();
  columns = Math.floor(canvas.width / fontSize);
  drops = Array.from({ length: columns }, () => Math.random() * canvas.height);
});