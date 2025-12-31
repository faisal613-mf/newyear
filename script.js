/* ===============================
   💌 INITIALIZATION
================================ */
const intro = document.getElementById("intro");
const content = document.getElementById("content");
const slides = document.querySelectorAll(".slide");
let current = 0;

intro.addEventListener("click", () => {
    intro.style.display = "none";
    content.style.display = "block";
    startMusic();
});

/* ===============================
   🎬 SLIDE NAVIGATION
================================ */
document.querySelectorAll(".next").forEach(btn => {
    btn.addEventListener("click", () => {
        slides[current].classList.remove("active");
        current++;
        
        if (current < slides.length) {
            slides[current].classList.add("active");
            burstHearts();
        }

        if (current === slides.length - 1) {
            startFinalWish();
            setInterval(fireworks, 1000); // Continuous fireworks on last slide
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
   🃏 INTERACTION
================================ */
document.querySelectorAll(".flip-card").forEach(card => {
    card.addEventListener("click", () => {
        card.classList.toggle("active");
        burstHearts();
    });
});

/* ===============================
   🧡 FINAL WISH (ULTRA FAST)
================================ */
let finalPlayed = false;
function startFinalWish() {
  if (finalPlayed) return;
  finalPlayed = true;

  const wish = document.getElementById("finalWish");
  const msg = document.getElementById("finalMessage");

  // Store the text before clearing it
  const headingText = wish.textContent;
  const messageHTML = msg.innerHTML;

  // Clear the containers
  wish.innerHTML = "";
  msg.innerHTML = "";

  // Make them visible
  wish.style.visibility = "visible";
  msg.style.visibility = "visible";
  wish.style.opacity = "1"; // Ensure opacity is up

  wish.classList.add("reveal");

  // Type out the heading
  [...headingText].forEach((char, i) => {
    const span = document.createElement("span");
    span.textContent = char;
    span.className = "letter";
    span.style.animationDelay = `${i * 0.05}s`;
    wish.appendChild(span);
  });

  // Type out the message
  setTimeout(() => {
    const lines = messageHTML.split("<br>");
    let delay = 0;

    lines.forEach(line => {
      const lineDiv = document.createElement("div");
      // Strip extra whitespace from the line
      const cleanLine = line.trim();
      
      [...cleanLine].forEach(char => {
        const span = document.createElement("span");
        span.textContent = char === " " ? "\u00A0" : char;
        span.className = "letter";
        span.style.opacity = "0";
        span.style.animation = `letterAppear 0.6s ease forwards`;
        span.style.animationDelay = `${delay * 0.04}s`; // Slightly faster for long messages
        delay++;
        lineDiv.appendChild(span);
      });
      msg.appendChild(lineDiv);
      msg.appendChild(document.createElement("br")); // Re-add the line break
    });
  }, 1500);
}
/* ===============================
   🎆 EFFECTS (HEARTS & FIREWORKS)
================================ */
function burstHearts() {
    for (let i = 0; i < 15; i++) {
        const heart = document.createElement("div");
        heart.innerHTML = "❤";
        heart.className = "burst-heart";
        heart.style.left = Math.random() * 100 + "vw";
        heart.style.top = Math.random() * 100 + "vh";
        heart.style.color = `hsl(${Math.random() * 360}, 100%, 75%)`;
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 1000);
    }
}

function fireworks() {
  const vw = window.innerWidth; // Add this
  const vh = window.innerHeight; // Add this
  
  const colors = ['#ff4d6d', '#ffb3c1', '#ff758f', '#fff', '#ffd700', '#ff85a1'];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  for (let i = 0; i < 40; i++) {
    const spark = document.createElement("div");
    spark.className = "firework";
    document.body.appendChild(spark);

    // Position explosion in the center area
    const startX = vw / 2;
    const startY = vh / 2;

    spark.style.backgroundColor = randomColor;
    spark.style.boxShadow = `0 0 10px ${randomColor}, 0 0 20px ${randomColor}`;

    const angle = Math.random() * Math.PI * 2;
    const velocity = Math.random() * 200 + 100; // Increased distance
    const xDist = Math.cos(angle) * velocity;
    const yDist = Math.sin(angle) * velocity;

    spark.style.left = startX + "px";
    spark.style.top = startY + "px";

    spark.style.setProperty('--x', `${xDist}px`);
    spark.style.setProperty('--y', `${yDist}px`);

    setTimeout(() => spark.remove(), 1200);
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


