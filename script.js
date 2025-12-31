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
  const msg  = document.getElementById("finalMessage");

  const headingText = wish.textContent;
  const messageHTML = msg.innerHTML;

  wish.textContent = "";
  msg.innerHTML = "";

  wish.style.visibility = "visible";
  msg.style.visibility  = "visible";

  wish.classList.add("reveal");
  setTimeout(() => wish.classList.add("glow"), 1200);

  [...headingText].forEach((char, i) => {
    const span = document.createElement("span");
    span.textContent = char === " " ? "\u00A0" : char;
    span.className = "letter";
    span.style.animationDelay = `${i * 0.05}s`;
    wish.appendChild(span);
  });

  setTimeout(() => {
    const lines = messageHTML.split("<br>");
    let delay = 0;

    lines.forEach(line => {
      const lineDiv = document.createElement("div");

      [...line].forEach(char => {
        const span = document.createElement("span");
        span.textContent = char === " " ? "\u00A0" : char;
        span.className = "letter";
        span.style.opacity = "0";
        span.style.animation = `letterAppear 0.6s ease forwards`;
        span.style.animationDelay = `${delay * 0.07}s`;
        delay++;
        lineDiv.appendChild(span);
      });

      msg.appendChild(lineDiv);
    });
  }, 1200);
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

/* ===============================
   🎆 FIREWORKS (FIXED)
================================ */
let fireworksStarted = false;

function startFireworks() {
  if (fireworksStarted) return;
  fireworksStarted = true;
  setInterval(fireworks, 1200);
}

function fireworks() {
  for (let i = 0; i < 40; i++) {
    const spark = document.createElement("div");
    spark.className = "firework";
    document.body.appendChild(spark);

    const x = vw / 2 + Math.random() * 300 - 150;
    const y = vh / 2 + Math.random() * 300 - 150;

    spark.style.left = x + "px";
    spark.style.top  = y + "px";

    setTimeout(() => spark.remove(), 1000);
  }
}
