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

        const parent = element.closest(
            ".section, .about, .business, .contact"
        );

        const siblings = parent
            ? Array.from(parent.querySelectorAll(".fade-in"))
            : [];

        const index = siblings.indexOf(element);

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

    const reducedMotion = window.matchMedia(
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
// REDUCED MOTION
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
// Only ONE media item can be active:
//
// - Business Reel
// - Wedding Reel
// - Portrait Slideshow
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

            try {
                video.currentTime = 0;
            } catch (error) {
                // Ignore media reset errors
            }

            const card = video.closest(
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
//
// Desktop:
// Hover → video plays
//
// Mobile:
// Tap → video plays/stops
// ========================================

const businessCards = document.querySelectorAll(
    ".business-card"
);

businessCards.forEach((card) => {

    const video = card.querySelector(
        ".business-video"
    );

    // Portrait card has no video
    if (!video) return;


    // ========================================
    // DESKTOP — HOVER IN
    // ========================================

    card.addEventListener(
        "mouseenter",
        () => {

            if (window.innerWidth <= 700) {
                return;
            }

            stopAllMedia(video);

            video.currentTime = 0;

            const playPromise = video.play();

            if (playPromise !== undefined) {

                playPromise.catch(() => {});

            }

        }
    );


    // ========================================
    // DESKTOP — HOVER OUT
    // ========================================

    card.addEventListener(
        "mouseleave",
        () => {

            if (window.innerWidth <= 700) {
                return;
            }

            video.pause();
            video.currentTime = 0;

            card.classList.remove(
                "video-playing"
            );

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


            // --------------------------------
            // STOP
            // --------------------------------

            if (!video.paused) {

                video.pause();
                video.currentTime = 0;

                card.classList.remove(
                    "video-playing"
                );

                return;
            }


            // --------------------------------
            // START
            // --------------------------------

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
    );

});


// ========================================
// WEDDING VIDEOS
//
// Desktop:
// Hover → video plays
//
// Mobile:
// Tap → video plays/stops
// ========================================

const weddingCards = document.querySelectorAll(
    ".reel-card"
);

weddingCards.forEach((card) => {

    const video = card.querySelector(
        ".wedding-video"
    );

    if (!video) return;


    // ========================================
    // DESKTOP — HOVER IN
    // ========================================

    card.addEventListener(
        "mouseenter",
        () => {

            if (window.innerWidth <= 700) {
                return;
            }

            stopAllMedia(video);

            video.currentTime = 0;

            const playPromise = video.play();

            if (playPromise !== undefined) {

                playPromise.catch(() => {});

            }

        }
    );


    // ========================================
    // DESKTOP — HOVER OUT
    // ========================================

    card.addEventListener(
        "mouseleave",
        () => {

            if (window.innerWidth <= 700) {
                return;
            }

            video.pause();
            video.currentTime = 0;

            card.classList.remove(
                "video-playing"
            );

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


            // Prevent the card/link from navigating
            event.preventDefault();


            // --------------------------------
            // STOP
            // --------------------------------

            if (!video.paused) {

                video.pause();
                video.currentTime = 0;

                card.classList.remove(
                    "video-playing"
                );

                return;
            }


            // --------------------------------
            // START
            // --------------------------------

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
    );

});


// ========================================
// PORTRAITS SLIDESHOW
//
// Desktop:
// Hover → slideshow starts
//
// Mobile:
// Tap → slideshow starts/stops
//
// Leaving / activating another media:
// slideshow stops
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
                (portraitIndex + 1) %
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
        // START SLIDESHOW
        // ----------------------------------------

        function startPortraitSlideshow() {

            // Already running
            if (portraitInterval !== null) {
                return;
            }


            // Always begin with image_6
            portraitIndex = 0;

            portraitsImage.src =
                portraitImages[0];

            portraitsImage.style.opacity = "1";


            portraitsCard.classList.add(
                "portraits-playing"
            );


            portraitInterval =
                setInterval(
                    showNextPortrait,
                    750
                );

        }


        // ----------------------------------------
        // STOP SLIDESHOW
        // ----------------------------------------

        function stopPortraitSlideshow() {

            if (portraitInterval !== null) {

                clearInterval(
                    portraitInterval
                );

                portraitInterval = null;

            }


            // Return to image_6
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
        // DESKTOP — HOVER IN
        // ========================================

        portraitsCard.addEventListener(
            "mouseenter",
            () => {

                if (
                    !window.matchMedia(
                        "(hover: hover)"
                    ).matches
                ) {

                    return;
                }


                // Stop any other media
                stopAllMedia();

                // Start portraits
                startPortraitSlideshow();

            }
        );


        // ========================================
        // DESKTOP — HOVER OUT
        // ========================================

        portraitsCard.addEventListener(
            "mouseleave",
            () => {

                if (
                    !window.matchMedia(
                        "(hover: hover)"
                    ).matches
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
                    window.matchMedia(
                        "(hover: hover)"
                    ).matches
                ) {

                    return;
                }


                // --------------------------------
                // STOP IF ALREADY RUNNING
                // --------------------------------

                if (
                    portraitInterval !== null
                ) {

                    stopPortraitSlideshow();

                    return;
                }


                // --------------------------------
                // STOP OTHER MEDIA
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
//
// When a video naturally finishes:
// - reset video
// - remove active state
// ========================================

document
    .querySelectorAll(
        ".business-video, .wedding-video"
    )
    .forEach((video) => {

        video.addEventListener(
            "ended",
            () => {

                const card = video.closest(
                    ".business-card, .reel-card"
                );

                if (!card) return;

                video.pause();
                video.currentTime = 0;

                card.classList.remove(
                    "video-playing"
                );

            }
        );

    });


// ========================================
// SAFETY — STOP MEDIA WHEN TAB IS HIDDEN
//
// Prevents videos/slideshow from continuing
// when the user switches tabs.
// ========================================

document.addEventListener(
    "visibilitychange",
    () => {

        if (
            document.visibilityState === "hidden"
        ) {

            stopAllMedia();

        }

    }
);


// ========================================
// SAFETY — STOP MEDIA BEFORE PAGE UNLOAD
// ========================================

window.addEventListener(
    "beforeunload",
    () => {

        stopAllMedia();

    }
);

// ========================================
// MOBILE MENU
// ========================================

const mobileMenuButton =
    document.querySelector(".mobile-menu-button");

const mobileMenu =
    document.querySelector(".mobile-menu");

const mobileMenuClose =
    document.querySelector(".mobile-menu-close");

const mobileMenuLinks =
    document.querySelectorAll(".mobile-menu-nav a");


// ----------------------------------------
// OPEN MENU
// ----------------------------------------

function openMobileMenu() {

    if (!mobileMenu) return;

    mobileMenu.classList.add("active");

    document.body.classList.add("menu-open");

    mobileMenu.setAttribute("aria-hidden", "false");

    if (mobileMenuButton) {

        mobileMenuButton.classList.add("active");

        mobileMenuButton.setAttribute(
            "aria-expanded",
            "true"
        );

        mobileMenuButton.setAttribute(
            "aria-label",
            "Close menu"
        );

    }

}




// ----------------------------------------
// CLOSE MENU
// ----------------------------------------

function closeMobileMenu() {

    if (!mobileMenu) return;

    mobileMenu.classList.remove("active");

    document.body.classList.remove("menu-open");

    mobileMenu.setAttribute("aria-hidden", "true");

    if (mobileMenuButton) {

        mobileMenuButton.classList.remove("active");

        mobileMenuButton.setAttribute(
            "aria-expanded",
            "false"
        );

        mobileMenuButton.setAttribute(
            "aria-label",
            "Open menu"
        );

    }

}



// ----------------------------------------
// MENU BUTTON
// ----------------------------------------

if (mobileMenuButton) {

    mobileMenuButton.addEventListener(
        "click",
        openMobileMenu
    );

}


// ----------------------------------------
// CLOSE BUTTON
// ----------------------------------------

if (mobileMenuClose) {

    mobileMenuClose.addEventListener(
        "click",
        closeMobileMenu
    );

}


// ----------------------------------------
// CLOSE AFTER NAVIGATION
// ----------------------------------------

mobileMenuLinks.forEach((link) => {

    link.addEventListener(
        "click",
        closeMobileMenu
    );

});


// ----------------------------------------
// ESC KEY
// ----------------------------------------

document.addEventListener(
    "keydown",
    (event) => {

        if (event.key === "Escape") {

            closeMobileMenu();

        }

    }
);
