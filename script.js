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

	// Contact form handling
	const contactForm = document.getElementById("contactForm");
	if (contactForm) {
		contactForm.addEventListener("submit", async function (e) {
			e.preventDefault();

			const name = document.getElementById("name").value;
			const email = document.getElementById("email").value;
			const subject = document.getElementById("subject").value;
			const message = document.getElementById("message").value;
			const formMessage = document.getElementById("formMessage");

			// Create FormData to send to FormSubmit.co
			const formData = new FormData();
			formData.append("name", name);
			formData.append("email", email);
			formData.append("subject", subject);
			formData.append("message", message);
			formData.append("_captcha", "false");
			formData.append("_next", window.location.href);

			try {
				const response = await fetch("https://formsubmit.co/santiago.velasco.pereira@gmail.com", {
					method: "POST",
					body: formData
				});

				if (response.ok) {
					formMessage.textContent = "Message sent successfully! I'll get back to you soon.";
					formMessage.className = "form-message success";
					contactForm.reset();

					// Clear message after 5 seconds
					setTimeout(() => {
						formMessage.className = "form-message";
						formMessage.textContent = "";
					}, 5000);
				} else {
					throw new Error("Form submission failed");
				}
			} catch (error) {
				formMessage.textContent = "There was an error sending your message. Please try again or email me directly.";
				formMessage.className = "form-message error";

				setTimeout(() => {
					formMessage.className = "form-message";
					formMessage.textContent = "";
				}, 5000);
			}
		});
	}
});
