const intro = document.getElementById("intro");
const content = document.getElementById("content");
const slides = document.querySelectorAll(".slide");
let current = 0;

intro.addEventListener("click", () => {
    intro.style.display = "none";
    content.style.display = "block";
    startMusic();
});

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
            setInterval(fireworks, 1000);
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

document.querySelectorAll(".flip-card").forEach(card => {
    card.addEventListener("click", () => {
        card.classList.toggle("active");
        burstHearts();
    });
});

let finalPlayed = false;

function startFinalWish() {
    if (finalPlayed) return;
    finalPlayed = true;

    const wish = document.getElementById("finalWish");
    const msg = document.getElementById("finalMessage");

    // Clear and Show
    const headingText = wish.textContent;
    wish.innerHTML = "";
    wish.style.visibility = "visible";
    wish.style.opacity = "1";
    msg.style.visibility = "visible";

    // 1. Animate Heading
    [...headingText].forEach((char, i) => {
        const span = document.createElement("span");
        span.textContent = char === " " ? "\u00A0" : char;
        span.className = "letter";
        span.style.display = "inline-block";
        span.style.animation = "letterAppear .5s ease forwards";
        span.style.animationDelay = `${i * 0.05}s`;
        wish.appendChild(span);
    });

    // 2. Reveal Message and Start Continuous Celebration
    setTimeout(() => {
        wish.classList.add("glow");
        msg.style.transition = "opacity 2s ease";
        msg.style.opacity = "1";
        
        // Intensify Fireworks for the finale
        setInterval(fireworks, 600); 
        setInterval(burstHearts, 1500);
    }, 1500);
}

function burstHearts() {
    for (let i = 0; i < 15; i++) {
        const heart = document.createElement("div");
        heart.innerHTML = "❤";
        heart.className = "burst-heart";
        heart.style.left = Math.random() * 100 + "vw";
        heart.style.top = Math.random() * 100 + "vh";
        heart.style.color = `hsl(${Math.random()*360},100%,75%)`;
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 1000);
    }
}

function fireworks() {
    const colors = ['#ff4d6d','#ffd700','#ffffff','#00ffff','#ff85a1'];
    const color = colors[Math.floor(Math.random()*colors.length)];
    const x = Math.random()*window.innerWidth;
    const y = Math.random()*window.innerHeight*.5;

    for (let i = 0; i < 30; i++) {
        const spark = document.createElement("div");
        spark.className = "firework-spark";
        document.body.appendChild(spark);

        spark.style.backgroundColor = color;
        spark.style.boxShadow = `0 0 10px ${color}`;
        spark.style.left = x + "px";
        spark.style.top = y + "px";

        const angle = Math.random()*Math.PI*2;
        const velocity = Math.random()*150+50;

        spark.animate([
            { transform: 'translate(0,0) scale(1)', opacity: 1 },
            { transform: `translate(${Math.cos(angle)*velocity}px,${Math.sin(angle)*velocity}px) scale(0)`, opacity: 0 }
        ], { duration: 1000, easing: 'ease-out', fill: 'forwards' });

        setTimeout(() => spark.remove(), 1000);
    }
}

function startMusic() {
    const music = document.getElementById("bgMusic");
    if (music && music.paused) {
        music.volume = 0;
        music.play().then(() => {
            let v = 0;
            const fade = setInterval(() => {
                v += .05;
                if (v >= .5) clearInterval(fade);
                music.volume = v;
            }, 100);
        });
    }
}


