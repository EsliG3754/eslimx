<!DOCTYPE html>
<html lang="es">

<head>

    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, minimum-scale=1.0">
    <meta name="organization" content="<?= getenv('organization') ?>" />
    <meta name="lang" content="es-ES" />
    <meta name="description" content="<?= getenv('description') ?>" />

    <title>
        <?php
        $titulo_pagina = "ESLIMX&nbsp;|&nbsp;" . $ruta;
        echo getenv('name') . $titulo_pagina;
        ?>

    </title>
    
    <!-- AOS -->
    <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">
    <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>

    <!-- Nucleo Icons -->
    <link href="<?= base_url('vendors/boostrap_lib/css/nucleo-icons.css'); ?>" rel="stylesheet" />
    <link href="<?= base_url('vendors/boostrap_lib/css/nucleo-svg.css'); ?>" rel="stylesheet" />

    <!-- Font Awesome Icons -->
    <script src="https://kit.fontawesome.com/8f570cbf28.js" crossorigin="anonymous"></script>
    <link href="<?= base_url('vendors/boostrap_lib/css/nucleo-svg.css'); ?>" rel="stylesheet" />

    <!-- CSS Dashboard -->
    <link id="pagestyle" href="<?= base_url('vendors/boostrap_lib/css/dashboard.css'); ?>" rel="stylesheet" />

    <!-- leftlet -->
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.1/dist/leaflet.css" />

    <!-- Intro Js -->
    <link href="https://unpkg.com/intro.js/minified/introjs.min.css" rel="stylesheet" type="text/css" />

    <!-- SELECT 2 -->
    <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-beta.1/dist/css/select2.min.css" rel="stylesheet" />

    <!--    Librerias Principales     -->
    <link rel="stylesheet" href="<?= base_url('assets_panel/css/base.css') ?>">

    <!-- Favicon -->
    <link rel="apple-touch-icon" sizes="76x76" href="<?= base_url("assets_panel/img/favicon/apple-touch-icon.png") ?>">
    <link rel="icon" type="image/png" sizes="32x32" href="<?= base_url("assets_panel/img/favicon/favicon-32x32.png") ?>">
    <link rel="icon" type="image/png" sizes="16x16" href="<?= base_url("assets_panel/img/favicon/favicon-16x16.png") ?>">
    <link rel="manifest" href="<?= base_url("assets_panel/img/favicon/site.webmanifest") ?>">
    <link rel="mask-icon" href="<?= base_url("assets_panel/img/favicon/safari-pinned-tab.svg") ?>" color="#6e56a0">
    <meta name="msapplication-TileColor" content="#603cba">
    <meta name="theme-color" content="#ffffff">

    <?php

    if (!empty($estilos)) {
        foreach ($estilos as $key => $estilo) {
            echo link_tag($estilo['src']);
        }
    }

    ?>

    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-YCDFJRC20S"></script>
    <script>
        window.dataLayer = window.dataLayer || [];

        function gtag() {
            dataLayer.push(arguments);
        }
        gtag('js', new Date());

        gtag('config', 'G-YCDFJRC20S');
    </script>

</head>

<body>