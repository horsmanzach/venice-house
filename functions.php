<?php

function enqueue_gsap_scripts() {
    // First, let's check if the file exists
    $js_file_path = get_template_directory() . '/js/gsap-effects.js';
    
    if (!file_exists($js_file_path)) {
        // Log error for debugging
        error_log('GSAP Effects JS file not found at: ' . $js_file_path);
        return;
    }
    
    // Enqueue GSAP core library
    wp_enqueue_script(
        'gsap-core',
        'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js',
        array(),
        '3.12.2',
        true
    );
    
    // Enqueue GSAP ScrollTrigger plugin
    wp_enqueue_script(
        'gsap-scrolltrigger',
        'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js',
        array('gsap-core'),
        '3.12.2',
        true
    );
    
    // Enqueue Lenis smooth scroll
    wp_enqueue_script(
        'lenis',
        'https://cdnjs.cloudflare.com/ajax/libs/lenis/1.0.42/lenis.min.js',
        array(),
        '1.0.42',
        true
    );
    
    // Enqueue your custom GSAP effects file
    wp_enqueue_script(
        'gsap-effects',
        get_template_directory_uri() . '/js/gsap-effects.js',
        array('gsap-core', 'gsap-scrolltrigger', 'lenis'),
        filemtime($js_file_path),
        true
    );
}
add_action('wp_enqueue_scripts', 'enqueue_gsap_scripts');