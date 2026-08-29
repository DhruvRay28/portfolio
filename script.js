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


document
    .querySelectorAll(
        ".section-header, .reel-card, .about-content, .service, .business-card, .contact h2, .contact-button"
    )
    .forEach((element) => {

        element.classList.add("fade-in");

        observer.observe(element);

    });
