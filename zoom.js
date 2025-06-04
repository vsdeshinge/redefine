document.addEventListener("DOMContentLoaded", function () {
  // Hamburger toggle
  const hamburger = document.querySelector(".hamburger");
  const nav = document.querySelector("nav");
  const header = document.querySelector("header");

  hamburger?.addEventListener("click", () => {
    nav.classList.toggle("active");
  });

  window.addEventListener("scroll", () => {
    header?.classList.toggle("scrolled", window.scrollY > 50);
  });

  // GSAP hero slider
  const slides = document.querySelectorAll(".hero-slide");
  const wrapper = document.getElementById("heroWrapper");

  function animateSlide(slide, index, nextSlide) {
    const heading = slide.querySelector(".overlay-heading-2");
    const subheading = slide.querySelector(".subheading");
    const button = slide.querySelector(".cta-button");

    const tl = gsap.timeline();

    // Make current slide visible
    tl.set(slide, { opacity: 1, pointerEvents: "auto" });

    // Animate heading in
    tl.fromTo(heading, { clipPath: "inset(0 100% 0 0)" }, {
      clipPath: "inset(0 0% 0 0)",
      duration: 1.2,
      ease: "power2.out"
    });

    // Subheading in
    tl.to(subheading, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: "power2.out"
    }, "-=0.8");

    // CTA in
    tl.to(button, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out"
    }, "-=1");

    // Wait before exit
    tl.addPause("+=2");

    // CTA out
    tl.to(button, {
      opacity: 0,
      y: 50,
      duration: 0.6,
      ease: "power2.in"
    });

    // Subheading out
    tl.to(subheading, {
      opacity: 0,
      y: 50,
      duration: 0.6,
      ease: "power2.in"
    }, "-=0.4");

    // Heading out (clip wipe)
    tl.to(heading, {
      clipPath: "inset(0 100% 0 0)",
      duration: 1,
      ease: "power2.in"
    }, "-=0.4");

    // Flash to white
    tl.to(wrapper, {
      backgroundColor: "white",
      duration: 0.4,
      ease: "power1.inOut"
    }, "-=0.4");

    // Hide current slide
    tl.to(slide, {
      opacity: 0,
      duration: 0.3,
      ease: "power2.in"
    }, "-=0.3");

    return tl;
  }

  // Create master timeline
  const master = gsap.timeline({ repeat: 5 });

  slides.forEach((slide, i) => {
    const nextSlide = slides[(i + 1) % slides.length]; // wrap around
    master.add(animateSlide(slide, i, nextSlide));
  });

});




//our companies

const title = document.getElementById('animatedTitle');
const words = title.textContent.trim().split(' ');

// Create span-wrapped characters
const spans = [];
title.innerHTML = '';

words.forEach((word, wordIndex) => {
  [...word].forEach((char, i) => {
    const span = document.createElement('span');
    span.textContent = char;
    span.style.animationDelay = `${(wordIndex * 0.3 + i * 0.05)}s`;
    spans.push(span);
    title.appendChild(span);
  });
  const space = document.createElement('span');
  space.innerHTML = '&nbsp;';
  title.appendChild(space);
});

// IntersectionObserver to trigger animation on scroll
const observer = new IntersectionObserver(
  ([entry]) => {
    if (entry.isIntersecting) {
      title.style.opacity = 1;
      spans.forEach((span) => {
        span.style.animationPlayState = 'running';
      });
      observer.disconnect(); // animate once
    }
  },
  { threshold: 0.5 }
);

// Initially pause animations
spans.forEach(span => {
  span.style.animationPlayState = 'paused';
});

observer.observe(title);








gsap.registerPlugin(ScrollTrigger);


window.addEventListener("load", () => {
  const zoomImage = document.querySelector(".image-container img");
  const heading = document.querySelector(".overlay-heading");

  // Zoom effect
  gsap.to(zoomImage, {
    scale: 3,
    ease: "none",
    scrollTrigger: {
      trigger: ".zoom-wrapper",
      start: "50% center",    // ✅ NEW LINE
      end: "50% top",
      scrub: true,
      pin: true,
      anticipatePin: 1
    }
  });
  

  gsap.to(zoomImage, {
    opacity: 0,
    ease: "none",
    scrollTrigger: {
      trigger: ".zoom-wrapper",
      start: "50% center",   // ✅ NEW (fade starts later)
      end: "50% top",
      scrub: true
    }
  });
  

  // ✅ Text wipe animation (pure wipe from left to right after 30% scroll)
  gsap.fromTo(
    heading,
    { clipPath: "inset(0 100% 0 0)", webkitClipPath: "inset(0 100% 0 0)" },
    {
      clipPath: "inset(0 0% 0 0)",
      webkitClipPath: "inset(0 0% 0 0)",
      duration: 1.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".zoom-wrapper",
        start: "50% 10%", // Start after 30% scroll
        
      }
    }
  );
});



document.addEventListener("DOMContentLoaded", () => {
	const track = document.querySelector(".carousel-track");
	const cards = document.querySelectorAll(".deconstructed-card");
	const prevBtn = document.querySelector(".carousel-button.prev");
	const nextBtn = document.querySelector(".carousel-button.next");
	const dotsContainer = document.querySelector(".dots-container");

	cards.forEach((_, index) => {
		const dot = document.createElement("div");
		dot.classList.add("dot");
		if (index === 0) dot.classList.add("active");
		dot.addEventListener("click", () => goToCard(index));
		dotsContainer.appendChild(dot);
	});

	const dots = document.querySelectorAll(".dot");

	const cardWidth = cards[0].offsetWidth;
	const cardMargin = 40;
	const totalCardWidth = cardWidth + cardMargin;

	let currentIndex = 0;

	cards.forEach((card) => {
		card.addEventListener("mousemove", (e) => {
			const rect = card.getBoundingClientRect();
			const x = (e.clientX - rect.left) / rect.width;
			const y = (e.clientY - rect.top) / rect.height;
			const xDeg = (y - 0.5) * 8;
			const yDeg = (x - 0.5) * -8;
			card.style.transform = `perspective(1200px) rotateX(${xDeg}deg) rotateY(${yDeg}deg)`;
			const layers = card.querySelectorAll(".card-layer");
			layers.forEach((layer, index) => {
				const depth = 30 * (index + 1);
				const translateZ = depth;
				const offsetX = (x - 0.5) * 10 * (index + 1);
				const offsetY = (y - 0.5) * 10 * (index + 1);
				layer.style.transform = `translate3d(${offsetX}px, ${offsetY}px, ${translateZ}px)`;
			});
			const waveSvg = card.querySelector(".wave-svg");
			if (waveSvg) {
				const moveX = (x - 0.5) * -20;
				const moveY = (y - 0.5) * -20;
				waveSvg.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.05)`;
				const wavePaths = waveSvg.querySelectorAll("path:not(:first-child)");
				wavePaths.forEach((path, index) => {
					const factor = 1 + index * 0.5;
					const waveX = moveX * factor * 0.5;
					const waveY = moveY * factor * 0.3;
					path.style.transform = `translate(${waveX}px, ${waveY}px)`;
				});
			}
			const bgObjects = card.querySelectorAll(".bg-object");
			bgObjects.forEach((obj, index) => {
				const factorX = (index + 1) * 10;
				const factorY = (index + 1) * 8;
				const moveX = (x - 0.5) * factorX;
				const moveY = (y - 0.5) * factorY;
				if (obj.classList.contains("square")) {
					obj.style.transform = `rotate(45deg) translate(${moveX}px, ${moveY}px)`;
				} else if (obj.classList.contains("triangle")) {
					obj.style.transform = `translate(calc(-50% + ${moveX}px), calc(-50% + ${moveY}px)) scale(1)`;
				} else {
					obj.style.transform = `translate(${moveX}px, ${moveY}px)`;
				}
			});
		});

		card.addEventListener("mouseleave", () => {
			card.style.transform = "";
			const layers = card.querySelectorAll(".card-layer");
			layers.forEach((layer) => {
				layer.style.transform = "";
			});
			const waveSvg = card.querySelector(".wave-svg");
			if (waveSvg) {
				waveSvg.style.transform = "";
				const wavePaths = waveSvg.querySelectorAll("path:not(:first-child)");
				wavePaths.forEach((path) => {
					path.style.transform = "";
				});
			}
			const bgObjects = card.querySelectorAll(".bg-object");
			bgObjects.forEach((obj) => {
				if (obj.classList.contains("square")) {
					obj.style.transform = "rotate(45deg) translateY(-20px)";
				} else if (obj.classList.contains("triangle")) {
					obj.style.transform = "translate(-50%, -50%) scale(0.5)";
				} else {
					obj.style.transform = "translateY(20px)";
				}
			});
		});
	});

	function goToCard(index) {
		index = Math.max(0, Math.min(index, cards.length - 1));

		currentIndex = index;
		updateCarousel();
	}

	function updateCarousel() {
		const translateX = -currentIndex * totalCardWidth;

		track.style.transform = `translateX(${translateX}px)`;

		dots.forEach((dot, index) => {
			dot.classList.toggle("active", index === currentIndex);
		});
	}

	prevBtn.addEventListener("click", () => {
		goToCard(currentIndex - 1);
	});

	nextBtn.addEventListener("click", () => {
		goToCard(currentIndex + 1);
	});

	document.addEventListener("keydown", (e) => {
		if (e.key === "ArrowLeft") {
			goToCard(currentIndex - 1);
		} else if (e.key === "ArrowRight") {
			goToCard(currentIndex + 1);
		}
	});

	let touchStartX = 0;
	let touchEndX = 0;

	track.addEventListener("touchstart", (e) => {
		touchStartX = e.changedTouches[0].screenX;
	});

	track.addEventListener("touchend", (e) => {
		touchEndX = e.changedTouches[0].screenX;
		handleSwipe();
	});

	function handleSwipe() {
		if (touchStartX - touchEndX > 50) {
			goToCard(currentIndex + 1);
		} else if (touchEndX - touchStartX > 50) {
			goToCard(currentIndex - 1);
		}
	}

	window.addEventListener("resize", () => {
		const newCardWidth = cards[0].offsetWidth;
		const newTotalCardWidth = newCardWidth + cardMargin;

		const translateX = -currentIndex * newTotalCardWidth;
		track.style.transition = "none";
		track.style.transform = `translateX(${translateX}px)`;

		setTimeout(() => {
			track.style.transition = "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)";
		}, 50);
	});

	updateCarousel();
});










// Create timeline triggered on scroll
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".intro-section",
    start: "70% 80%", // when top of section hits 80% of viewport height
    toggleActions: "play none none none"
  }
});

tl.fromTo("#intro-left", 
  { x: "-100%", opacity: 0 }, 
  { x: "0%", opacity: 1, duration: 1.5, ease: "power2.out" }, 
  0
);

tl.fromTo("#intro-right", 
  { x: "100%", opacity: 0 }, 
  { x: "0%", opacity: 1, duration: 1.5, ease: "power2.out" }, 
  0
);

tl.to(".intro-subtitle", {
  opacity: 1,
  y: 0,
  duration: 1,
  ease: "power1.inOut"
}, "+=0.1");





  document.addEventListener("DOMContentLoaded", () => {
    const wrapper = document.querySelector(".swiper-wrapper");
    const slides = document.querySelectorAll(".swiper-slide");

    let current = 1; // Start with the middle slide

    function updateSlides() {
      slides.forEach((slide, index) => {
        slide.classList.remove("active-card");
        slide.classList.add("fade-card");

        if (index === current) {
          slide.classList.add("active-card");
          slide.classList.remove("fade-card");
        }
      });

      const containerHeight = document.querySelector('.swiper-container').offsetHeight;
      const cardHeight = slides[0].offsetHeight;
      const spacing = 32; // your gap

// calculate to center the current card
const offset = -current * (cardHeight + spacing) + (containerHeight / 2 - cardHeight / 2);
wrapper.style.transform = `translateY(${offset}px)`;

      wrapper.style.transform = `translateY(${offset}px)`;
    }

    function autoScroll() {
      current = (current + 1) % slides.length;
      updateSlides();
    }

    updateSlides();
    setInterval(autoScroll, 4000); // Change every 4s
  });

