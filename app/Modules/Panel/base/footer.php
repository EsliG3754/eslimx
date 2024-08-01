<footer class="footer pt-3 ">
    <div class="col-lg-6 mb-lg-0 mb-4">
        <div class="copyright text-center text-sm text-muted text-lg-start">
            © <?= date('Y'); ?>, ESLIMX
        </div>
    </div>
</footer>

</div>
</main>

<script>
    const permisos = <?= json_encode($_SESSION['permisos'] ?? '[]') ?>;
    const id_oficina_regional = <?= json_encode($_SESSION['id_oficina_regional'] ?? '') ?>;
    const id_visitaduria = <?= json_encode($_SESSION['id_visitaduria'] ?? '') ?>;

    var win = navigator.platform.indexOf('Win') > -1;
    if (win && document.querySelector('#sidenav-scrollbar')) {
        var options = {
            damping: '0.5'
        };
        Scrollbar.init(document.querySelector('#sidenav-scrollbar'), options);
    }

    const id_usuario = '<?= $_SESSION['id_usuario'] ?? null ?>';
    const nombre_usuario = '<?= ($nombres ?? '') . " " . ($ape_paterno ?? '') . " " . ($ape_materno ?? '') ?>';
</script>

<!-- Archivos JS -->
<script src="https://code.jquery.com/jquery-3.6.1.min.js" integrity="sha256-o88AwQnZB+VDvE9tvIXrMQaPlFFSUTR+nldQm1LuPXQ=" crossorigin="anonymous"></script>
<script src="<?= base_url('/assets_panel/js/core/popper.min.js') ?>"></script>
<script src="<?= base_url('/assets_panel/js/core/bootstrap.min.js') ?>"></script>
<script src="<?= base_url('/assets_panel/js/plugins/perfect-scrollbar.min.js') ?>"></script>
<script src="<?= base_url('/assets_panel/js/plugins/smooth-scrollbar.min.js') ?>"></script>
<script src="<?= base_url('/assets_panel/js/plugins/chartjs.min.js') ?>"></script>
<script src="<?= base_url('/assets_panel/js/app.js') ?>"></script>

<!-- Librería DataTable -->
<script src="https://cdn.datatables.net/1.12.1/js/jquery.dataTables.min.js"></script>
<script src="https://cdn.datatables.net/1.12.1/js/dataTables.bootstrap5.min.js"></script>
<script src="https://kit.fontawesome.com/e24b84fcaf.js"></script>

<!-- Exportar DataTable -->
<script src="https://cdn.datatables.net/buttons/2.2.3/js/dataTables.buttons.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.1.3/jszip.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.53/pdfmake.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.53/vfs_fonts.js"></script>
<script src="https://cdn.datatables.net/buttons/2.2.3/js/buttons.html5.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/flatpickr/4.6.13/flatpickr.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/dropzone/5.9.3/dropzone.min.js"></script>

<!-- Librería SweetAlert -->
<script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>

<?php
if (!empty($scripts)) {
    foreach ($scripts as $script) {
        echo script_tag($script['src']);
    }
}
?>

<!-- Github buttons -->
<script async defer src="https://buttons.github.io/buttons.js"></script>

<!-- Control Center for Soft Dashboard: parallax effects, scripts for the example pages, etc. -->
<script src="<?= base_url('/assets_panel/js/dashboard.js') ?>"></script>
</body>

</html>