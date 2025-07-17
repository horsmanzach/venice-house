//======Text Effect on Scroll========


gsap.registerPlugin(ScrollTrigger)

window.addEventListener("DOMContentLoaded", () => {
    console.log('DOM Content Loaded');

    // Configure Lenis with proper mouse wheel settings
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smooth: true,
        mouseMultiplier: 1, // Controls mouse wheel sensitivity
        smoothTouch: false, // Disable on touch devices
        touchMultiplier: 2,
        infinite: false,
        normalizeWheel: true, // Important: normalizes wheel behavior
        wheelMultiplier: 1, // Adjust wheel speed
    });

    // Integrate Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Rest of your GSAP code...
    const words = document.querySelectorAll('.mwg_effect015 .word');
    console.log('Number of words found:', words.length);

    words.forEach((word, index) => {
        if (word.children.length > 0) {
            gsap.to(word.children, {
                yPercent: 100,
                ease: 'expo.inOut',
                scrollTrigger: {
                    trigger: word,
                    start: "bottom bottom",
                    end: "top 55%",
                    scrub: 0.4,
                }
            });
        }
    });
});


//==========Card Effect


//==========Card Effect with Mobile Safari Fixes
gsap.registerPlugin(ScrollTrigger);

// Fix viewport height issues on mobile
function setViewportHeight() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// Mobile detection
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

window.addEventListener("DOMContentLoaded", () => {
    // Set viewport height
    setViewportHeight();

    /* LENIS SMOOTH SCROLL (OPTIONAL) - Disabled on mobile */
    if (!isMobile) {
        lenis = new Lenis({
            autoRaf: true,
        });
    }

    // Force ScrollTrigger to use native scroll on mobile
    if (isMobile) {
        ScrollTrigger.config({
            autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
            ignoreMobileResize: true
        });
    }

    gsap.to('.scroll', {
        autoAlpha: 0,
        duration: 0.2,
        scrollTrigger: {
            trigger: '.mwg_effect003',
            start: 'top top',
            end: 'top top-=1',
            toggleActions: "play none reverse none"
        }
    });

    const pinHeight = document.querySelector('.mwg_effect003 .pin-height');
    const circles = document.querySelectorAll('.circle');

    gsap.fromTo('.mwg_effect003 .circles', {
        y: '5%'
    }, {
        y: '-5%',
        ease: 'none',
        scrollTrigger: {
            trigger: pinHeight,
            start: 'top top',
            end: 'bottom bottom',
            pin: '.mwg_effect003 .container',
            scrub: true,
            invalidateOnRefresh: true, // Important for mobile
            refreshPriority: -1 // Ensure this runs after layout
        }
    });

    // Calculate half of the fan range
    let angle = 6;
    let halfRange = (circles.length - 1) * angle / 2;
    let rot = -halfRange;

    // Use a function to get accurate height on mobile
    const getDistPerCard = () => {
        const pinHeightValue = pinHeight.clientHeight || pinHeight.offsetHeight;
        const windowHeight = window.innerHeight;
        return (pinHeightValue - windowHeight) / circles.length;
    };

    circles.forEach((circle, index) => {
        gsap.to(circle, {
            rotation: rot,
            ease: 'power1.out',
            scrollTrigger: {
                trigger: pinHeight,
                start: () => `top top-=${getDistPerCard() * index}`,
                end: () => `+=${getDistPerCard()}`,
                scrub: true,
                invalidateOnRefresh: true
            }
        });

        gsap.to(circle.querySelector('.card'), {
            rotation: rot,
            y: '-50%',
            ease: 'power1.out',
            scrollTrigger: {
                trigger: pinHeight,
                start: () => `top top-=${getDistPerCard() * index}`,
                end: () => `+=${getDistPerCard()}`,
                scrub: true,
                invalidateOnRefresh: true
            }
        });

        rot += angle;
    });

    // Refresh ScrollTrigger after everything is set up
    setTimeout(() => {
        ScrollTrigger.refresh();
    }, 100);
});

// Handle viewport changes
window.addEventListener('resize', () => {
    setViewportHeight();
    ScrollTrigger.refresh();
});

// Handle orientation changes on mobile
window.addEventListener('orientationchange', () => {
    setTimeout(() => {
        setViewportHeight();
        ScrollTrigger.refresh();
    }, 500);
});

// Optional: Add scroll event listener for debugging on mobile
if (isMobile) {
    let debugCount = 0;
    window.addEventListener('scroll', () => {
        debugCount++;
        if (debugCount % 10 === 0) { // Log every 10th scroll event
            console.log('Scroll position:', window.pageYOffset);
        }
    });
}