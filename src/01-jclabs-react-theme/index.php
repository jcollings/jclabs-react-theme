<!DOCTYPE html>
<html lang="<?php language_attributes(); ?>">

<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title><?php wp_title(); ?></title>
    <?php wp_head(); ?>
</head>

<body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
    <?php wp_footer(); ?>
</body>

</html>