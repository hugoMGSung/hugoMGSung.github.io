const track = document.querySelector(".carousel-track");
const slides = Array.from(document.querySelectorAll(".project-card"));
const prevButton = document.querySelector(".carousel-btn.prev");
const nextButton = document.querySelector(".carousel-btn.next");
const dotsContainer = document.querySelector(".carousel-dots");

let currentIndex = 0;

if (track && slides.length > 0 && dotsContainer) {
  slides.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.className = index === 0 ? "dot active" : "dot";
    dot.type = "button";
    dot.setAttribute("aria-label", `${index + 1}번 프로젝트 보기`);
    dot.addEventListener("click", () => {
      moveToSlide(index);
    });
    dotsContainer.appendChild(dot);
  });

  const dots = Array.from(dotsContainer.querySelectorAll(".dot"));

  function moveToSlide(index) {
    currentIndex = (index + slides.length) % slides.length;
    track.style.transform = `translateX(-${currentIndex * 100}%)`;

    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle("active", dotIndex === currentIndex);
    });
  }

  prevButton?.addEventListener("click", () => {
    moveToSlide(currentIndex - 1);
  });

  nextButton?.addEventListener("click", () => {
    moveToSlide(currentIndex + 1);
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") moveToSlide(currentIndex - 1);
    if (event.key === "ArrowRight") moveToSlide(currentIndex + 1);
  });
}
