// ========================================
// SCROLL REVEAL
// ========================================

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.15
    }
);


// Elements that reveal as you scroll
document
    .querySelectorAll(
        ".section-header, .reel-card, .about-content, .service, .business-card, .contact h2, .contact-button"
    )
    .forEach((element, index) => {

        element.classList.add("fade-in");

        // Small stagger between items
        element.style.transitionDelay = `${Math.min(index * 0.05, 0.25)}s`;

        observer.observe(element);
    });


// ========================================
// HERO INTRO
// ========================================

window.addEventListener("load", () => {

    const heroContent = document.querySelector(".hero-content");

    if (heroContent) {
        heroContent.classList.add("hero-loaded");
    }

});
