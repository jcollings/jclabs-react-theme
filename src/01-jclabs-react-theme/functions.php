<?php
function jcrt_enqueue_scripts()
{
    $version = '1.0.0';
    if (defined('WP_DEBUG') && WP_DEBUG === true) {
        $version = time();
    }

    wp_enqueue_script('theme', get_stylesheet_directory_uri() . '/dist/js/bundle.js', array('jquery'), $version, true);
    wp_enqueue_style('theme', get_stylesheet_directory_uri() . '/dist/css/style.bundle.css', array(), $version);

    $config = array(
        // TODO: Add any theme variables needed in react
    );
    wp_localize_script('theme', 'wp_config', $config);
}
add_action('wp_enqueue_scripts', 'jcrt_enqueue_scripts');
