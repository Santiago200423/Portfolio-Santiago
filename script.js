document.addEventListener("DOMContentLoaded", function () {
	const reveals = document.querySelectorAll(".reveal");

	if (reveals.length > 0) {
		const observerOptions = {
			threshold: 0.15,
			rootMargin: "0px 0px -80px 0px"
		};

		const revealObserver = new IntersectionObserver((entries) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					entry.target.classList.add("active");
				} else {
					entry.target.classList.remove("active");
				}
			});
		}, observerOptions);

		reveals.forEach(section => revealObserver.observe(section));
	}

});



// ── About slider ──────────────────────────────────────────
const aboutSlider = document.querySelector('.avila-slider');

if (aboutSlider) {
  const slides = document.querySelectorAll('.avila-slider img');
  let currentSlide = 0;

  function goToSlide(index) {
    currentSlide = index;
    aboutSlider.scrollTo({
      left: aboutSlider.clientWidth * currentSlide,
      behavior: 'smooth'
    });
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    goToSlide(currentSlide);
  }

  let autoSlide = setInterval(nextSlide, 3500);

  aboutSlider.addEventListener('mouseenter', () => clearInterval(autoSlide));
  aboutSlider.addEventListener('mouseleave', () => {
    autoSlide = setInterval(nextSlide, 3500);
  });

  document.querySelectorAll('.avila-slider-nav a').forEach((dot, index) => {
    dot.addEventListener('click', (e) => {
      e.preventDefault();
      goToSlide(index);
    });
  });
}