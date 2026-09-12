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
// PREMIUM SCROLL REVEAL
// ========================================

revealElements.forEach((element) => {

    element.classList.add("fade-in");

    if (window.innerWidth <= 700) {

        element.style.transitionDelay = "0s";

    } else {

        const parent =
            element.closest(
                ".section, .about, .business, .contact"
            );

        const siblings =
            parent
                ? Array.from(
                    parent.querySelectorAll(".fade-in")
                )
                : [];

        const index =
            siblings.indexOf(element);

        element.style.transitionDelay =
            `${Math.min(Math.max(index, 0) * 0.08, 0.24)}s`;

    }

    observer.observe(element);

});



// ========================================
// HERO INTRO — CINEMATIC LOAD
// ========================================

window.addEventListener("load", () => {

    const hero = document.querySelector(".hero");
    const heroContent = document.querySelector(".hero-content");

    if (!hero || !heroContent) return;

    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

    if (reducedMotion) {

        hero.classList.add("hero-loaded");
        heroContent.classList.add("hero-loaded");

        return;

    }

    setTimeout(() => {

        hero.classList.add("hero-loaded");
        heroContent.classList.add("hero-loaded");

    }, 150);

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

            "files/image_6.jpg",
            "files/image_7.jpg",
            "files/image_8.jpg",
            "files/image_9.jpg",
            "files/image_10.jpg",
            "files/image_11.jpg",
            "files/image_12.jpg",
            "files/image_13.jpg",
            "files/image_14.jpg",
            "files/image_15.jpg",
            "files/image_16.jpg",
            "files/image_17.jpg",
            "files/image_18.jpg",
            "files/image_19.jpg",
            "files/image_20.jpg",
            "files/image_21.jpg"

        ];


        let portraitIndex = 0;

        let portraitInterval = null;


        // ----------------------------------------
        // NEXT IMAGE
        // ----------------------------------------

        function showNextPortrait() {

            portraitIndex =
                (
                    portraitIndex + 1
                ) %
                portraitImages.length;


            portraitsImage.style.opacity = "0";


            setTimeout(() => {

                portraitsImage.src =
                    portraitImages[
                        portraitIndex
                    ];

                requestAnimationFrame(() => {

                    portraitsImage.style.opacity = "1";

                });

            }, 220);

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

            portraitsImage.style.opacity = "1";

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
                    750
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

            portraitsImage.style.opacity = "1";

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

// ========================================
// VIDEO STATE POLISH
// ========================================

document.querySelectorAll(".business-video, .wedding-video").forEach((video) => {

    video.addEventListener("ended", () => {

        const card = video.closest(
            ".business-card, .reel-card"
        );

        if (!card) return;

        video.pause();
        video.currentTime = 0;

        card.classList.remove("video-playing");

    });

});
