/* ===============================
   💌 INITIALIZATION
================================ */
const intro   = document.getElementById("intro");
const content = document.getElementById("content");
const slides  = document.querySelectorAll(".slide");

let current = 0;
let finalPlayed = false;
let fireworksStarted = false;

/* ===============================
   START EXPERIENCE
================================ */
intro.addEventListener("click", () => {
  intro.style.display = "none";
  content.style.display = "block";
  startMusic();
});

/* ===============================
   🃏 FLIP CARD
================================ */
document.querySelectorAll(".flip-card").forEach(card => {
  card.addEventListener("click", () => {
    card.classList.toggle("active");
    burstHearts();
  });
});

/* ===============================
   🎬 SLIDE NAVIGATION
================================ */
document.querySelectorAll(".next").forEach(btn => {
  btn.addEventListener("click", () => {
    if (current < slides.length - 1) {
      slides[current].classList.remove("active");
      current++;
      slides[current].classList.add("active");
      burstHearts();

      if (current === slides.length - 1) {
        startFinalWish();
        startFireworks();
      }
    }
  });
});

document.querySelectorAll(".prev").forEach(btn => {
  btn.addEventListener("click", () => {
    if (current > 0) {
      slides[current].classList.remove("active");
      current--;
      slides[current].classList.add("active");
      burstHearts();
    }
  });
});

/* ===============================
   🧡 FINAL WISH
================================ */
function startFinalWish() {
  if (finalPlayed) return;
  finalPlayed = true;

  const wish = document.getElementById("finalWish");
  const msg  = document.getElementById("finalMessage");

  const headingText = wish.textContent;
  const messageHTML = msg.innerHTML;

  wish.innerHTML = "";
  msg.innerHTML  = "";

  wish.style.visibility = "visible";
  msg.style.visibility  = "visible";
  wish.classList.add("reveal");

  [...headingText].forEach((char, i) => {
    const span = document.createElement("span");
    span.textContent = char === " " ? "\u00A0" : char;
    span.className = "letter";
    span.style.animation = "letterAppear 0.6s ease forwards";
    span.style.animationDelay = `${i * 0.05}s`;
    wish.appendChild(span);
  });

  setTimeout(() => {
    const lines = messageHTML.split("<br>");
    let delay = 0;

    lines.forEach(line => {
      const lineDiv = document.createElement("div");

      [...line.trim()].forEach(char => {
        const span = document.createElement("span");
        span.textContent = char === " " ? "\u00A0" : char;
        span.className = "letter";
        span.style.opacity = "0";
        span.style.animation = "letterAppear 0.6s ease forwards";
        span.style.animationDelay = `${delay * 0.04}s`;
        delay++;
        lineDiv.appendChild(span);
      });

      msg.appendChild(lineDiv);
    });
  }, 1200);
}

/* ===============================
   🎆 FIREWORKS
================================ */
function startFireworks() {
  if (fireworksStarted) return;
  fireworksStarted = true;

  setInterval(fireworks, 1200);
}

function fireworks() {
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  const colors = ['#ff4d6d', '#ffb3c1', '#ff758f', '#ffd700', '#ffffff'];

  for (let i = 0; i < 40; i++) {
    const spark = document.createElement("div");
    spark.className = "firework";
    document.body.appendChild(spark);

    const color = colors[Math.floor(Math.random() * colors.length)];
    spark.style.backgroundColor = color;
    spark.style.boxShadow = `0 0 10px ${color}`;

    const x = vw / 2 + Math.random() * 300 - 150;
    const y = vh / 2 + Math.random() * 300 - 150;

    spark.style.left = x + "px";
    spark.style.top  = y + "px";

    setTimeout(() => spark.remove(), 1000);
  }
}

/* ===============================
   💖 HEARTS
================================ */
function burstHearts() {
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  for (let i = 0; i < 15; i++) {
    const heart = document.createElement("div");
    heart.className = "burst-heart";
    heart.textContent = "❤";

    heart.style.left = Math.random() * vw + "px";
    heart.style.top  = Math.random() * vh + "px";
    heart.style.color = `hsl(${Math.random() * 360}, 100%, 75%)`;

    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 1000);
  }
}

/* ===============================
   🎵 MUSIC
================================ */
function startMusic() {
  const music = document.getElementById("bgMusic");

  if (music && music.paused) {
    music.volume = 0;
    music.play().then(() => {
      let vol = 0;
      const fade = setInterval(() => {
        vol += 0.05;
        if (vol >= 0.5) clearInterval(fade);
        music.volume = vol;
      }, 100);
    }).catch(() => {});
  }
}
