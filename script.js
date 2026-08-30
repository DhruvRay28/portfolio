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


revealElements.forEach((element, index) => {

    element.classList.add("fade-in");

    if (window.innerWidth <= 700) {

        element.style.transitionDelay = "0s";

    } else {

        element.style.transitionDelay =
            `${Math.min(index * 0.04, 0.2)}s`;

    }

    observer.observe(element);

});


// ========================================
// HERO INTRO
// ========================================

window.addEventListener("load", () => {

    const heroContent =
        document.querySelector(".hero-content");

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
// GLOBAL MEDIA CONTROL
//
// Only ONE thing can be active at once:
//
// - Business Reel 1
// - Business Reel 2
// - Wedding videos
// - Portrait slideshow
// ========================================

let stopPortraitSlideshowGlobal = null;


// ========================================
// STOP ALL MEDIA
// ========================================

function stopAllMedia(exceptVideo = null) {

    // ----------------------------------------
    // STOP ALL VIDEOS
    // ----------------------------------------

    document
        .querySelectorAll(
            ".business-video, .wedding-video"
        )
        .forEach((video) => {

            if (video === exceptVideo) {
                return;
            }

            video.pause();

            video.currentTime = 0;


            const card =
                video.closest(
                    ".business-card, .reel-card"
                );


            if (card) {

                card.classList.remove(
                    "video-playing"
                );

            }

        });


    // ----------------------------------------
    // STOP PORTRAITS
    // ----------------------------------------

    if (stopPortraitSlideshowGlobal) {

        stopPortraitSlideshowGlobal();

    }

}


// ========================================
// BUSINESS VIDEOS
// DESKTOP HOVER + MOBILE TAP
// ========================================

const businessCards =
    document.querySelectorAll(
        ".business-card"
    );


businessCards.forEach((card) => {

    const video =
        card.querySelector(
            ".business-video"
        );


    // Portrait card has no video
    if (!video) return;


    // ========================================
    // DESKTOP — HOVER
    // ========================================

    card.addEventListener(
        "mouseenter",
        () => {

            if (window.innerWidth <= 700) {
                return;
            }


            // Stop EVERYTHING else
            stopAllMedia(video);


            video.currentTime = 0;


            const playPromise =
                video.play();


            if (playPromise !== undefined) {

                playPromise.catch(() => {});

            }

        }
    );


    // ========================================
    // DESKTOP — LEAVE
    // ========================================

    card.addEventListener(
        "mouseleave",
        () => {

            if (window.innerWidth <= 700) {
                return;
            }


            video.pause();

            video.currentTime = 0;

        }
    );


    // ========================================
    // MOBILE — TAP
    // ========================================

    card.addEventListener(
        "click",
        () => {

            if (window.innerWidth > 700) {
                return;
            }


            // START
            if (video.paused) {

                // Stop portraits
                // Stop other reels
                stopAllMedia(video);


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


            // STOP
            else {

                video.pause();

                video.currentTime = 0;

                card.classList.remove(
                    "video-playing"
                );

            }

        }
    );

});


// ========================================
// WEDDING VIDEOS
// DESKTOP HOVER + MOBILE TAP
// ========================================

const weddingCards =
    document.querySelectorAll(
        ".reel-card"
    );


weddingCards.forEach((card) => {

    const video =
        card.querySelector(
            ".wedding-video"
        );


    if (!video) return;


    // ========================================
    // DESKTOP — HOVER
    // ========================================

    card.addEventListener(
        "mouseenter",
        () => {

            if (window.innerWidth <= 700) {
                return;
            }


            // Stop EVERYTHING else
            stopAllMedia(video);


            video.currentTime = 0;


            const playPromise =
                video.play();


            if (playPromise !== undefined) {

                playPromise.catch(() => {});

            }

        }
    );


    // ========================================
    // DESKTOP — LEAVE
    // ========================================

    card.addEventListener(
        "mouseleave",
        () => {

            if (window.innerWidth <= 700) {
                return;
            }


            video.pause();

            video.currentTime = 0;

        }
    );


    // ========================================
    // MOBILE — TAP
    // ========================================

    card.addEventListener(
        "click",
        (event) => {

            if (window.innerWidth > 700) {
                return;
            }


            // Prevent Instagram link
            event.preventDefault();


            // START
            if (video.paused) {

                // Stop EVERYTHING else
                stopAllMedia(video);


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


            // STOP
            else {

                video.pause();

                video.currentTime = 0;

                card.classList.remove(
                    "video-playing"
                );

            }

        }
    );

});


// ========================================
// PORTRAITS SLIDESHOW
//
// Desktop:
// Hover → slideshow starts
//
// Mobile:
// Tap → slideshow starts
//
// Leaving / tapping another media:
// slideshow stops
//
// Only ONE media item can run at a time.
// ========================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const portraitsCard =
            document.querySelector(
                ".portraits-card"
            );


        const portraitsImage =
            document.querySelector(
                ".portraits-image"
            );


        // ----------------------------------------
        // CHECK
        // ----------------------------------------

        if (
            !portraitsCard ||
            !portraitsImage
        ) {

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

        portraitImages.forEach(
            (src) => {

                const img =
                    new Image();

                img.src = src;

            }
        );


        // ----------------------------------------
        // NEXT IMAGE
        // ----------------------------------------

        function showNextPortrait() {

            portraitIndex =
                (
                    portraitIndex + 1
                ) %
                portraitImages.length;


            portraitsImage.src =
                portraitImages[
                    portraitIndex
                ];

        }


        // ----------------------------------------
        // START
        // ----------------------------------------

        function startPortraitSlideshow() {

            // Already running
            if (
                portraitInterval !== null
            ) {

                return;

            }


            // Always begin with image_6
            portraitIndex = 0;


            portraitsImage.src =
                portraitImages[0];


            portraitsCard.classList.add(
                "portraits-playing"
            );


            // Fast slideshow
            portraitInterval =
                setInterval(
                    () => {

                        showNextPortrait();

                    },
                    500
                );

        }


        // ----------------------------------------
        // STOP
        // ----------------------------------------

        function stopPortraitSlideshow() {

            if (
                portraitInterval !== null
            ) {

                clearInterval(
                    portraitInterval
                );

                portraitInterval = null;

            }


            // Back to image_6
            portraitIndex = 0;


            portraitsImage.src =
                portraitImages[0];


            portraitsCard.classList.remove(
                "portraits-playing"
            );

        }


        // ----------------------------------------
        // MAKE GLOBAL
        // ----------------------------------------

        stopPortraitSlideshowGlobal =
            stopPortraitSlideshow;


        // ========================================
        // DESKTOP — HOVER
        // ========================================

        portraitsCard.addEventListener(
            "mouseenter",
            () => {

                if (
                    !window
                        .matchMedia(
                            "(hover: hover)"
                        )
                        .matches
                ) {

                    return;

                }


                // Stop any reel/video
                stopAllMedia();


                // Start photos
                startPortraitSlideshow();

            }
        );


        // ========================================
        // DESKTOP — LEAVE
        // ========================================

        portraitsCard.addEventListener(
            "mouseleave",
            () => {

                if (
                    !window
                        .matchMedia(
                            "(hover: hover)"
                        )
                        .matches
                ) {

                    return;

                }


                stopPortraitSlideshow();

            }
        );


        // ========================================
        // MOBILE — TAP
        // ========================================

        portraitsCard.addEventListener(
            "click",
            () => {

                // Ignore clicks on desktop
                if (
                    window
                        .matchMedia(
                            "(hover: hover)"
                        )
                        .matches
                ) {

                    return;

                }


                // --------------------------------
                // IF ALREADY RUNNING
                // --------------------------------

                if (
                    portraitInterval !== null
                ) {

                    stopPortraitSlideshow();

                    return;

                }


                // --------------------------------
                // STOP ALL OTHER MEDIA
                // --------------------------------

                stopAllMedia();


                // --------------------------------
                // START PORTRAITS
                // --------------------------------

                startPortraitSlideshow();

            }
        );


        // ========================================
        // RESET ON RESIZE
        // ========================================

        window.addEventListener(
            "resize",
            () => {

                stopPortraitSlideshow();

            }
        );


        console.log(
            "Portrait slideshow initialized successfully."
        );

    }
);