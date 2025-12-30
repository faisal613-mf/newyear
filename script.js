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
  setInterval(fireworks, 1200);
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

        const x = Math.random() * 100;
        const y = Math.random() * 100;

        heart.style.left = x + "vw";
        heart.style.top = y + "vh";

        setTimeout(() => heart.remove(), 1000);
    }
}
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
