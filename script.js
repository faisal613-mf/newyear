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

  // Save original content
  const headingText = wish.textContent;
  const messageHTML = msg.innerHTML;

  // Prepare containers
  wish.innerHTML = "";
  msg.innerHTML = "";

  // Make visible before animating
  wish.style.visibility = "visible";
  msg.style.visibility = "visible";
  wish.style.opacity = "1";

  wish.classList.add("reveal");

  // Animate heading
  [...headingText].forEach((char, i) => {
    const span = document.createElement("span");
    span.textContent = char === " " ? "\u00A0" : char;
    span.className = "letter";
    span.style.animationDelay = `${i * 0.05}s`;
    wish.appendChild(span);
  });

  // ADDED: Corrected glow timeout
  setTimeout(() => {
    wish.classList.add("glow");
  }, 1200); // This was the missing part!

  // Animate message
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
        span.style.animation = `letterAppear 0.6s ease forwards`;
        span.style.animationDelay = `${delay * 0.04}s`;
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


function fireworks() {
  // 1. Define a set of romantic & celebratory colors
  const colors = ['#ff4d6d', '#ffb3c1', '#ff758f', '#fff', '#ffd700', '#ff85a1'];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  for (let i = 0; i < 40; i++) {
    const spark = document.createElement("div");
    spark.className = "firework";
    document.body.appendChild(spark);

    // 2. Set the starting position (center area)
    const startX = vw / 2 + (Math.random() * 200 - 100);
    const startY = vh / 2 + (Math.random() * 200 - 100);

    // 3. Apply the random color and glow
    spark.style.backgroundColor = randomColor;
    spark.style.boxShadow = `0 0 10px ${randomColor}, 0 0 20px ${randomColor}`;

    // 4. Calculate a random explosion direction for each spark
    const angle = Math.random() * Math.PI * 2;
    const velocity = Math.random() * 150 + 50;
    const xDist = Math.cos(angle) * velocity;
    const yDist = Math.sin(angle) * velocity;

    spark.style.left = startX + "px";
    spark.style.top = startY + "px";

    // 5. Use CSS Variables to tell the animation where to fly to
    spark.style.setProperty('--x', `${xDist}px`);
    spark.style.setProperty('--y', `${yDist}px`);

    setTimeout(() => spark.remove(), 1000);
  }
}





