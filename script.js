// ========================================
// SCROLL REVEAL
// ========================================

const revealElements = document.querySelectorAll(
    ".section-header, .reel-card, .about-content, .service, .business-card, .contact h2, .contact-button"
);

const observer = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (!entry.isIntersecting) return;

            entry.target.classList.add("visible");

            observer.unobserve(entry.target);

        });

    },
    {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px"
    }
);


// ========================================
// PREPARE SCROLL ANIMATIONS
// ========================================

revealElements.forEach((element, index) => {

    element.classList.add("fade-in");

    // No stagger on mobile
    if (window.innerWidth <= 700) {

        element.style.transitionDelay = "0s";

    } else {

        // Small desktop stagger
        element.style.transitionDelay =
            `${Math.min(index * 0.04, 0.2)}s`;

    }

    observer.observe(element);

});


// ========================================
// HERO INTRO
// ========================================

window.addEventListener("load", () => {

    const heroContent = document.querySelector(".hero-content");

    if (!heroContent) return;

    requestAnimationFrame(() => {

        setTimeout(() => {

            heroContent.classList.add("hero-loaded");

        }, 100);

    });

});


// ========================================
// REDUCE MOTION
// ========================================

if (
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
) {

    document
        .querySelectorAll(".fade-in")
        .forEach((element) => {

            element.style.transition = "none";
            element.style.opacity = "1";
            element.style.transform = "none";

        });

}


// ========================================
// VIDEO HELPER
// Stop every other portfolio video
// ========================================

function stopOtherVideos(currentVideo) {

    document
        .querySelectorAll(
            ".business-video, .wedding-video"
        )
        .forEach((video) => {

            if (video === currentVideo) return;

            video.pause();

            video.currentTime = 0;

            const card = video.closest(
                ".business-card, .reel-card"
            );

            if (card) {

                card.classList.remove(
                    "video-playing"
                );

            }

        });

}


// ========================================
// BUSINESS VIDEO
// DESKTOP HOVER + MOBILE TAP
// ========================================

const businessCards = document.querySelectorAll(
    ".business-card"
);

businessCards.forEach((card) => {

    const video = card.querySelector(
        ".business-video"
    );

    if (!video) return;


    // ----------------------------------------
    // DESKTOP — MOUSE ENTER
    // ----------------------------------------

    card.addEventListener("mouseenter", () => {

        if (window.innerWidth <= 700) return;

        stopOtherVideos(video);

        video.currentTime = 0;

        const playPromise = video.play();

        if (playPromise !== undefined) {

            playPromise.catch(() => {});

        }

    });


    // ----------------------------------------
    // DESKTOP — MOUSE LEAVE
    // ----------------------------------------

    card.addEventListener("mouseleave", () => {

        if (window.innerWidth <= 700) return;

        video.pause();

        video.currentTime = 0;

    });


    // ----------------------------------------
    // MOBILE — TAP
    // ----------------------------------------

    card.addEventListener("click", () => {

        if (window.innerWidth > 700) return;


        // ------------------------------------
        // START VIDEO
        // ------------------------------------

        if (video.paused) {

            stopOtherVideos(video);

            video.currentTime = 0;

            video.play()
                .then(() => {

                    card.classList.add(
                        "video-playing"
                    );

                })
                .catch(() => {

                    card.classList.remove(
                        "video-playing"
                    );

                });

        }


        // ------------------------------------
        // STOP VIDEO
        // ------------------------------------

        else {

            video.pause();

            video.currentTime = 0;

            card.classList.remove(
                "video-playing"
            );

        }

    });

});


// ========================================
// WEDDING VIDEO
// DESKTOP HOVER + MOBILE TAP
// ========================================

const weddingCards = document.querySelectorAll(
    ".reel-card"
);

weddingCards.forEach((card) => {

    const video = card.querySelector(
        ".wedding-video"
    );

    if (!video) return;


    // ----------------------------------------
    // DESKTOP — MOUSE ENTER
    // ----------------------------------------

    card.addEventListener("mouseenter", () => {

        if (window.innerWidth <= 700) return;

        stopOtherVideos(video);

        video.currentTime = 0;

        const playPromise = video.play();

        if (playPromise !== undefined) {

            playPromise.catch(() => {});

        }

    });


    // ----------------------------------------
    // DESKTOP — MOUSE LEAVE
    // ----------------------------------------

    card.addEventListener("mouseleave", () => {

        if (window.innerWidth <= 700) return;

        video.pause();

        video.currentTime = 0;

    });


    // ----------------------------------------
    // MOBILE — TAP
    // ----------------------------------------

    card.addEventListener("click", (event) => {

        if (window.innerWidth > 700) return;


        // Prevent the Instagram link
        // from opening on mobile
        event.preventDefault();


        // ------------------------------------
        // START VIDEO
        // ------------------------------------

        if (video.paused) {

            stopOtherVideos(video);

            video.currentTime = 0;

            video.play()
                .then(() => {

                    card.classList.add(
                        "video-playing"
                    );

                })
                .catch(() => {

                    card.classList.remove(
                        "video-playing"
                    );

                });

        }


        // ------------------------------------
        // STOP VIDEO
        // ------------------------------------

        else {

            video.pause();

            video.currentTime = 0;

            card.classList.remove(
                "video-playing"
            );

        }

    });

});

// ========================================
// PORTRAITS IMAGE SLIDESHOW
// DESKTOP HOVER + MOBILE TAP
// ========================================

document.addEventListener("DOMContentLoaded", () => {

    const portraitsCard =
        document.querySelector(".portraits-card");

    const portraitsImage =
        document.querySelector(".portraits-image");


    // ----------------------------------------
    // CHECK ELEMENTS
    // ----------------------------------------

    if (!portraitsCard || !portraitsImage) {

        console.error(
            "PORTRAITS: Card or image not found."
        );

        return;
    }


    // ----------------------------------------
    // PORTRAIT IMAGES
    // ----------------------------------------

    const portraitImages = [
        "image_6.jpg",
        "image_7.jpg",
        "image_8.jpg",
        "image_9.jpg",
        "image_10.jpg",
        "image_11.jpg",
        "image_12.jpg",
        "image_13.jpg",
        "image_14.jpg",
        "image_15.jpg",
        "image_16.jpg",
        "image_17.jpg",
        "image_18.jpg",
        "image_19.jpg",
        "image_20.jpg",
        "image_21.jpg"
    ];


    let portraitIndex = 0;
    let portraitInterval = null;


    // ----------------------------------------
    // PRELOAD IMAGES
    // ----------------------------------------

    portraitImages.forEach((src) => {

        const img = new Image();

        img.src = src;

    });


    // ----------------------------------------
    // SHOW NEXT IMAGE
    // ----------------------------------------

    function showNextPortrait() {

        portraitIndex =
            (portraitIndex + 1) %
            portraitImages.length;

        portraitsImage.src =
            portraitImages[portraitIndex];

    }


    // ----------------------------------------
    // START SLIDESHOW
    // ----------------------------------------

    function startPortraitSlideshow() {

        if (portraitInterval !== null) {
            return;
        }


        // Always begin with image_6.jpg
        portraitIndex = 0;

        portraitsImage.src =
            portraitImages[0];


        portraitInterval = setInterval(() => {

            showNextPortrait();

        }, 500);

    }


    // ----------------------------------------
    // STOP + RESET
    // ----------------------------------------

    function stopPortraitSlideshow() {

        if (portraitInterval !== null) {

            clearInterval(portraitInterval);

            portraitInterval = null;

        }


        // Always return to image_6.jpg
        portraitIndex = 0;

        portraitsImage.src =
            portraitImages[0];

    }


    // ========================================
    // DESKTOP — HOVER
    // ========================================

    portraitsCard.addEventListener(
        "mouseenter",
        () => {

            // Only run hover behavior
            // on devices that support hover
            if (!window.matchMedia("(hover: hover)").matches) {
                return;
            }

            startPortraitSlideshow();

        }
    );


    portraitsCard.addEventListener(
        "mouseleave",
        () => {

            if (!window.matchMedia("(hover: hover)").matches) {
                return;
            }

            stopPortraitSlideshow();

        }
    );


    // ========================================
    // MOBILE / TOUCH — TAP
    // ========================================

    portraitsCard.addEventListener(
        "click",
        () => {

            // Don't run tap behavior
            // on real mouse/hover devices
            if (window.matchMedia("(hover: hover)").matches) {
                return;
            }


            if (portraitInterval !== null) {

                stopPortraitSlideshow();

            } else {

                startPortraitSlideshow();

            }

        }
    );


    // ========================================
    // RESET ON SCREEN SIZE CHANGE
    // ========================================

    window.addEventListener("resize", () => {

        stopPortraitSlideshow();

    });

});