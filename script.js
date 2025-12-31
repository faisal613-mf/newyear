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

  // Capture text BEFORE showing anything
  const headingText = wish.textContent;
  const messageHTML = msg.innerHTML;

  // Clear immediately while still hidden
  wish.textContent = "";
  msg.innerHTML = "";

  // Now reveal containers
  wish.style.visibility = "visible";
  msg.style.visibility  = "visible";

  // --- Heading animation ---
  wish.classList.add("reveal");
  setTimeout(() => wish.classList.add("glow"), 1200);

  [...headingText].forEach((char, i) => {
    const span = document.createElement("span");
    span.textContent = char === " " ? "\u00A0" : char;
    span.className = "letter";
    span.style.animationDelay = `${i * 0.05}s`;
    wish.appendChild(span);
  });

  // --- Message animation ---
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
   💖 HEART EFFECT
================================ */
function burstHearts() {
  for (let i = 0; i < 20; i++) {
    const heart = document.createElement("div");
    heart.innerHTML = "❤";
    heart.className = "burst-heart";
    document.body.appendChild(heart);

    heart.style.left = Math.random() * 100 + "vw";
    heart.style.top = Math.random() * 100 + "vh";

    setTimeout(() => heart.remove(), 1000);
  }
}

/* ===============================
   🎵 BACKGROUND MUSIC
================================ */
const music = document.getElementById("bgMusic");
let musicStarted = false;

document.body.addEventListener("click", () => {
  if (!musicStarted) {
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
   🎆 FIREWORKS
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

    const x = 50 + Math.random() * 30 - 15;
    const y = 50 + Math.random() * 30 - 15;

    spark.style.left = x + "vw";
    spark.style.top = y + "vh";

    setTimeout(() => spark.remove(), 1000);
  }
}
document.querySelectorAll(".flip-card").forEach(card => {
  card.addEventListener("click", () => {
    const text = card.querySelector(".card-text");
    if (text) {
      text.classList.add("show");
      setTimeout(() => text.classList.add("glow"), 800);
    }
  });
});
