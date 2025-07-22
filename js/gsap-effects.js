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

//==========Card Effect with Responsive Mobile Safari Fixes

gsap.registerPlugin(ScrollTrigger)

window.addEventListener("DOMContentLoaded", () => {

    /* LENIS SMOOTH SCROLL (OPTIONAL) */
    lenis = new Lenis({
        autoRaf: true,
    })
    /* LENIS SMOOTH SCROLL (OPTIONAL) */

    gsap.to('.scroll', {
        autoAlpha:0,
        duration:0.2,
        scrollTrigger: {
            trigger:'.mwg_effect003',
            start:'top top',
            end:'top top-=1',
            toggleActions: "play none reverse none"
        }
    })

    const pinHeight = document.querySelector('.mwg_effect003 .pin-height')
    const circles = document.querySelectorAll('.circle')

    gsap.fromTo('.mwg_effect003 .circles', {
        y: '5%' // The `circles` div starts at 5% of its height on the y-axis
    }, {
        y: '-5%', // And ends at -5% of its height on the y-axis
        ease: 'none',
        scrollTrigger: {
            trigger: pinHeight, // Monitor the position of pin-height
            start: 'top top',
            end: 'bottom bottom',
            pin: '.mwg_effect003 .container', // Pin the container in place
            scrub: true // Progress linked to scrolling
        }
    })

    // Calculate half of the fan range
    let angle = 6; 
        halfRange = (circles.length - 1) * angle / 2,
        rot = -halfRange

    const distPerCard = (pinHeight.clientHeight - window.innerHeight) / circles.length
        
    circles.forEach( (circle, index) => {
        
        gsap.to(circle, {
            rotation: rot, // The circle starts at 0° and ends at the `rot` value
            ease: 'power1.out',
            scrollTrigger: {
                trigger: pinHeight, // Monitor the position of pin-height
                // Animation starts at distPerCard * the index of the card
                start: 'top top-=' + (distPerCard) * index,
                // And lasts exactly for distPerCard
                end: '+=' + (distPerCard),
                scrub: true // Progress linked to scrolling
            }  
        })
        gsap.to(circle.querySelector('.card'), {
            // Optional: Apply 'rot' to the card to enhance the rotation effect
            rotation: rot,
            y: '-50%', // Positions the card in the center of the viewport
            ease: 'power1.out',
            scrollTrigger: {
                trigger: pinHeight, // Monitor the position of pin-height
                // Animation starts at distPerCard * the index of the card
                start: 'top top-=' + (distPerCard) * index,
                // And lasts exactly for distPerCard
                end: '+=' + (distPerCard),
                scrub: true // Progress linked to scrolling
            }  
        })

        rot += angle
    })
})