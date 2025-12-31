/* ===============================
   💌 INTRO SCREEN
================================ */
const intro = document.getElementById("intro");
const content = document.getElementById("content");

intro.addEventListener("click", () => {
  intro.style.display = "none";
  content.style.display = "block";
});

/* ===============================
   🎬 SLIDE SYSTEM
================================ */
let current = 0;
const slides = document.querySelectorAll(".slide");

document.querySelectorAll(".next").forEach(btn => {
  btn.addEventListener("click", () => {
    slides[current].classList.remove("active");
    current++;
    if (current >= slides.length) return;

    slides[current].classList.add("active");
    burstHearts();

    if (current === slides.length - 1) {
      startFinalWish();
      startFireworks();
    }
  });
});

document.querySelectorAll(".prev").forEach(btn => {
  btn.addEventListener("click", () => {
    slides[current].classList.remove("active");
    current--;
    if (current < 0) current = 0;
    slides[current].classList.add("active");
    burstHearts();
  });
});

/* ===============================
   🧡 FINAL WISH ANIMATION
================================ */
let finalPlayed = false;
function startFinalWish() {
  if (finalPlayed) return;
  finalPlayed = true;

  const wish = document.getElementById("finalWish");
  const msg = document.getElementById("finalMessage");

  const headingText = wish.textContent;
  const messageHTML = msg.innerHTML;

  wish.innerHTML = "";
  msg.innerHTML = "";
  wish.style.visibility = "visible";
  msg.style.visibility = "visible";
  wish.style.opacity = "1";
  wish.classList.add("reveal");

  // Heading typing
  [...headingText].forEach((char, i) => {
    const span = document.createElement("span");
    span.textContent = char === " " ? "\u00A0" : char;
    span.className = "letter";
    span.style.animationDelay = `${i * 0.03}s`; // Faster heading
    wish.appendChild(span);
  });

  setTimeout(() => { wish.classList.add("glow"); }, 800);

  // Message typing (FAST)
  setTimeout(() => {
    const lines = messageHTML.split("<br>");
    let delay = 0;

    lines.forEach(line => {
      const lineDiv = document.createElement("div");
      const cleanLine = line.trim();

      [...cleanLine].forEach(char => {
        const span = document.createElement("span");
        span.textContent = char === " " ? "\u00A0" : char;
        span.className = "letter";
        span.style.opacity = "0";
        span.style.animation = `letterAppear 0.3s ease forwards`;
        span.style.animationDelay = `${delay * 0.015}s`; // Much faster typing
        delay++;
        lineDiv.appendChild(span);
      });
      msg.appendChild(lineDiv);
    });
  }, 800);
}
/* ===============================
   🃏 FLIP CARDS
================================ */
document.querySelectorAll(".flip-card").forEach(card => {
  card.addEventListener("click", () => {
    card.classList.toggle("active");
    burstHearts();
  });
});

/* ===============================
   💖 HEART EFFECT (FIXED)
================================ */
const vw = window.innerWidth;
const vh = window.innerHeight;

function burstHearts() {
  for (let i = 0; i < 20; i++) {
    const heart = document.createElement("div");
    heart.innerHTML = "❤";
    heart.className = "burst-heart";
    document.body.appendChild(heart);

    heart.style.left = Math.random() * vw + "px";
    heart.style.top  = Math.random() * vh + "px";

    setTimeout(() => heart.remove(), 1000);
  }
}

/* ===============================
   🎵 BACKGROUND MUSIC
================================ */
const music = document.getElementById("bgMusic");
let musicStarted = false;

document.body.addEventListener("click", () => {
  if (!musicStarted && music) {
    music.volume = 0;
    music.play();
    musicStarted = true;

    let vol = 0;
    const fade = setInterval(() => {
      vol += 0.02;
      if (vol >= 0.6) clearInterval(fade);
      music.volume = vol;
    }, 150);
  }
});

function fireworks() {
  const colors = ['#ff4d6d', '#ffb3c1', '#ffd700', '#ffffff', '#ff85a1', '#00ffff'];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  
  // Create explosion at a random spot in the top half of the screen
  const originX = Math.random() * window.innerWidth;
  const originY = Math.random() * (window.innerHeight * 0.6);

  for (let i = 0; i < 30; i++) {
    const spark = document.createElement("div");
    spark.className = "firework-spark"; // Using a new class name to avoid conflicts
    document.body.appendChild(spark);

    spark.style.backgroundColor = randomColor;
    spark.style.boxShadow = `0 0 10px ${randomColor}`;
    spark.style.left = originX + "px";
    spark.style.top = originY + "px";

    const angle = Math.random() * Math.PI * 2;
    const velocity = Math.random() * 100 + 50;
    const xDist = Math.cos(angle) * velocity;
    const yDist = Math.sin(angle) * velocity;

    // Apply movement directly via JS animation
    spark.animate([
      { transform: 'translate(0, 0) scale(1)', opacity: 1 },
      { transform: `translate(${xDist}px, ${yDist}px) scale(0)`, opacity: 0 }
    ], {
      duration: 1000,
      easing: 'ease-out',
      fill: 'forwards'
    });

    setTimeout(() => spark.remove(), 1000);
  }
}
