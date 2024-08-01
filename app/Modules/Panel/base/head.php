<?php $session = session(); ?>
<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta name="organization" content="CEDHJ" />
    <meta name="lang" content="es-ES" />

    <title>
        <?php
        $titulo_pagina = "&nbsp;|&nbsp;" . $ruta;
        echo 'ESLIMX' . $titulo_pagina;
        ?>
    </title>

    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700" rel="stylesheet" />

    <!-- Nucleo Icons -->
    <link href="<?= base_url('/assets_panel/css/nucleo-icons.css'); ?>" rel="stylesheet" />
    <link href="<?= base_url('/assets_panel/css/nucleo-svg.css'); ?>" rel="stylesheet" />

    <!-- Font Awesome -->
    <script src="https://kit.fontawesome.com/42d5adcbca.js" crossorigin="anonymous"></script>

    <!-- Flatpckr -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css">
    <link rel="stylesheet" href='<?= base_url("vendors/flatpickr/4.6.9/themes/material_red.min.css") ?>'>

    <!-- CSS -->
    <link href="<?= base_url('/assets_panel/css/dashboard.css?v=') . date('YmdHis'); ?>" rel="stylesheet" />
    <link rel="stylesheet" href="<?= base_url("/assets_web/css/panel_web.css?v=") . date('YmdHis');; ?>">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.13/css/select2.min.css" integrity="sha512-nMNlpuaDPrqlEls3IX/Q56H36qvBASwb3ipuo3MxeWbsQB1881ox0cRv7UPTgBlriqoynt35KjEwgGUeUXIPnw==" crossorigin="anonymous" referrerpolicy="no-referrer" />

    <?php
    if (!empty($css)) {
        foreach ($css as $estilo) {
            echo link_tag($estilo['src']);
        }
    }
    ?>

    <!-- Favicon -->
    <link rel="apple-touch-icon" sizes="76x76" href="<?= base_url("assets_web/img/favicon/apple-touch-icon.png") ?>">
    <link rel="icon" type="image/png" sizes="32x32" href="<?= base_url("assets_web/img/favicon/favicon-32x32.png") ?>">
    <link rel="icon" type="image/png" sizes="16x16" href="<?= base_url("assets_web/img/favicon/favicon-16x16.png") ?>">
    <link rel="manifest" href="<?= base_url("assets_web/img/favicon/site.webmanifest") ?>">
    <link rel="mask-icon" href="<?= base_url("assets_web/img/favicon/safari-pinned-tab.svg") ?>" color="#6e56a0">
    <meta name="msapplication-TileColor" content="#603cba">
    <meta name="theme-color" content="#ffffff">

</head>