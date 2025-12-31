const intro = document.getElementById("intro");
const content = document.getElementById("content");
const slides = document.querySelectorAll(".slide");
let current = 0;

// Start experience
intro.onclick = () => {
  intro.style.display = "none";
  content.style.display = "block";
  document.getElementById("bgMusic").play().catch(()=>{});
};

// Flip card
document.querySelectorAll(".flip-card").forEach(card => {
  card.onclick = () => card.classList.toggle("active");
});

// Navigation
document.querySelectorAll(".next").forEach(btn => {
  btn.onclick = () => {
    if (current < slides.length - 1) {
      slides[current].classList.remove("active");
      current++;
      slides[current].classList.add("active");

      if (current === slides.length - 1) startFinal();
    }
  };
});

document.querySelectorAll(".prev").forEach(btn => {
  btn.onclick = () => {
    if (current > 0) {
      slides[current].classList.remove("active");
      current--;
      slides[current].classList.add("active");
    }
  };
});

// Final message
function startFinal() {
  document.getElementById("finalWish").classList.add("show");
  document.getElementById("finalMessage").classList.add("show");
}
