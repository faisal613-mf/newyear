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
    const headingText = wish.textContent;
    const messageHTML = msg.innerHTML;

    wish.innerHTML = "";
    msg.innerHTML = "";
    wish.style.visibility = "visible";
    msg.style.visibility = "visible";
    wish.classList.add("reveal");

    // Fast Heading
    [...headingText].forEach((char, i) => {
        const span = document.createElement("span");
        span.textContent = char === " " ? "\u00A0" : char;
        span.className = "letter";
        span.style.animation = "letterAppear 0.3s ease forwards";
        span.style.animationDelay = `${i * 0.03}s`;
        wish.appendChild(span);
    });

    setTimeout(() => { wish.classList.add("glow"); }, 500);

    // Ultra Fast Message
    setTimeout(() => {
        const lines = messageHTML.split("<br>");
        let totalCharDelay = 0;

        lines.forEach(line => {
            const lineDiv = document.createElement("div");
            [...line.trim()].forEach(char => {
                const span = document.createElement("span");
                span.textContent = char === " " ? "\u00A0" : char;
                span.className = "letter";
                span.style.opacity = "0";
                span.style.animation = "letterAppear 0.3s ease forwards";
                span.style.animationDelay = `${totalCharDelay * 0.015}s`;
                totalCharDelay++;
                lineDiv.appendChild(span);
            });
            msg.appendChild(lineDiv);
        });
    }, 600);
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
    const colors = ['#ff4d6d', '#ffd700', '#ffffff', '#00ffff', '#ff85a1'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const originX = Math.random() * window.innerWidth;
    const originY = Math.random() * (window.innerHeight * 0.5);

    for (let i = 0; i < 30; i++) {
        const spark = document.createElement("div");
        spark.className = "firework-spark";
        document.body.appendChild(spark);

        spark.style.backgroundColor = randomColor;
        spark.style.boxShadow = `0 0 10px ${randomColor}`;
        spark.style.left = originX + "px";
        spark.style.top = originY + "px";

        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 150 + 50;
        
        spark.animate([
            { transform: 'translate(0, 0) scale(1)', opacity: 1 },
            { transform: `translate(${Math.cos(angle) * velocity}px, ${Math.sin(angle) * velocity}px) scale(0)`, opacity: 0 }
        ], { duration: 1000, easing: 'ease-out', fill: 'forwards' });

        setTimeout(() => spark.remove(), 1000);
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
