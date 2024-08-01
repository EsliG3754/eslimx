<?php

/**
 *
 * Dispara el correo electrónico
 *
 * @param data: contenido del formulario
 *
 */

function notificacion_correo($data)
{
    $email = \Config\Services::email();

    $correo = '';

    //print_r($data);

    if (isset($data['nominador_fisica_correo'])) {
        $correo = $data['nominador_fisica_correo'];
        //
    } else if (isset($data['nominador_moral_email'])) {
        $correo = $data['nominador_moral_email'];
        //
    } else if (isset($data['nominador_sociedad_correo'])) {
        $correo = $data['nominador_sociedad_correo'];
        //
    } else if (isset($data['nominador_colectivo_email'])) {
        $correo = $data['nominador_colectivo_email'];
        //
    }

    if (!empty($correo)) {
        $email->setFrom('reconocimientofranciscotenamaxtli2022@cedhj.org.mx', 'Comisión Estatal de Derechos Humanos Jalisco');
        $email->setTo($correo);
        $email->setSubject('Tu folio de nominación Tenamaxtli 2022');
        $email->setMessage(view('galardon/correo', $data));
        if ($email->send()) {
            //echo "Correo enviado!";
        } else {
            echo $email->printDebugger();
            return false;
        }
    } else {
        //echo 'No se pudo enviar el correo';
    }
}

/**
 * @param int $key id para la carpeta donde se va guardar el archivo
 * @param string $carpeta nombre de la carpeta donde se va a guardar
 * @param $file archivo que se va subir
 */
function subir_archivo($key, $file, $carpeta, $nombre_archivo = '')
{
    helper('security');

    //Guarda el pdf
    //var_dump($file);exit();
    //var_dump($nombre_archivo);exit();
    if ($file != null) {
        if (file_exists($file)) { //Si suben pdf
            if ($nombre_archivo == '') {
                $filename = date("Ymdhis") . "." . $file->getExtension();
            } else {
                $filename = $nombre_archivo . "."  . $file->getExtension();
            }

            $filename =  sanitize_filename($filename);
            $carpeta = "documentos/$carpeta/$key/";

            if (!file_exists($carpeta)) { //Crear carpeta si no existe
                if (mkdir($carpeta, 0777, true)) {
                    if (is_dir($carpeta)) {
                        // Directory created successfully
                    } else {
                        // Failed to create directory
                        echo 'Error al crear la carpeta';
                    }
                } else {
                    // Failed to create directory
                    echo 'Error al crear la carpeta';
                }
            }

            //echo FCPATH . $carpeta. $filename; exit();
            $ruta = FCPATH . $carpeta;
            if ($file->move($ruta, $filename)) {
                return $carpeta . $filename;
            } else {
                return '';
            }
        }
    }
}

function is_camscanner($filePath)
{
    require_once(FCPATH.'../vendor/autoload.php');

    // Verificar si el archivo es un PDF
    $finfo = finfo_open(FILEINFO_MIME_TYPE);
    $mime = finfo_file($finfo, FCPATH.$filePath);
    finfo_close($finfo);

    if ($mime != 'application/pdf') {
        // Si el archivo no es un PDF, retorna falso
        return false;
    }

    $parser = new \Smalot\PdfParser\Parser();
    try {
        $pdf    = $parser->parseFile(FCPATH.$filePath);
        $details = $pdf->getDetails();

        // Chequea si el campo 'Author' existe y si su valor es 'CamScanner'
        return isset($details['Author']) && $details['Author'] == 'CamScanner';

    } catch (\Smalot\PdfParser\Exception $e) {
        // Si el archivo no es un PDF válido, retorna falso
        return false;
    } catch (\Exception $e) {
        // Si ocurre una excepción diferente, también retorna falso
        return false;
    }
}
