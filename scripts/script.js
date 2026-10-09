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

  const contactForm = document.querySelector("#contactForm");

  if (contactForm) {
    const formMessage = contactForm.querySelector("#formMessage");
    const submitButton = contactForm.querySelector('button[type="submit"]');

    contactForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      submitButton.disabled = true;
      const originalButtonText = submitButton.textContent;
      submitButton.textContent = "Sending...";
      formMessage.className = "form-message";
      formMessage.textContent = "";

      try {
        const response = await fetch(contactForm.action, {
          method: "POST",
          body: new FormData(contactForm),
          headers: { Accept: "application/json" }
        });
        const result = await response.json();

        if (!response.ok || (result.success !== true && result.success !== "true")) {
          throw new Error("Form submission failed");
        }

        contactForm.reset();
        formMessage.textContent = "Your message was sent successfully.";
        formMessage.classList.add("success");
      } catch (error) {
        formMessage.textContent = "Your message could not be sent. Please try again.";
        formMessage.classList.add("error");
      } finally {
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
      }
    });
  }

  const autoplayVideo = document.querySelector(".avila-video");

  if (autoplayVideo) {
    const videoObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          autoplayVideo.play().catch(() => {});
        } else {
          autoplayVideo.pause();
        }
      });
    }, { threshold: 0.35 });

    videoObserver.observe(autoplayVideo);
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