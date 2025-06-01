<?php
header("Content-Type: application/json; charset=UTF_8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST,PUT,GET,DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

//transfertFichierToFTP.php

// Activer l'affichage des erreurs pour le débogage
error_reporting(E_ALL);
ini_set('display_errors', 1);

$data = json_decode(file_get_contents("php://input"));


$dossierCommandesWeb = htmlspecialchars(trim($data->dossierCommandesWeb));
$depot=htmlspecialchars(trim($data->depot));
$nomDocument = htmlspecialchars(trim($data->nomDocument));
$pdfFileEncode = htmlspecialchars(trim($data->pdfFileEncode));

$decodedBlobData = base64_decode($pdfFileEncode);

$file = fopen($nomDocument, 'wb');
fwrite($file, $decodedBlobData);
fclose($file);

$uploadFile =  basename($file["pdf_file"]["name"]);
echo "le nom du fichier est: ".$uploadFile;

require "ftpUserLogin.php";
// // Mise en place d'une connexion basique
$ftp = ftp_ssl_connect($ftp_server);

// // Identification avec un nom d'utilisateur et un mot de passe
$login_result = ftp_login($ftp, $ftp_user_name, $ftp_user_pass);
if (!$login_result) {
    //     // PHP aura déjà soulevé un message de niveau E_WARNING dans ce cas
    die("login ne peut pas être fait");
} else {
    echo "Le login s'est bien fait";
}
$mode = ftp_pasv($ftp, TRUE);

$source = $nomDocument;
$destinationDir = '../../clients/'.$depot;
$destinationFile = $destinationDir . $nomDocument;

if(file_exists($source)){
    echo 'la source existe  <br>';
    if (!is_dir($destinationDir)) {
        mkdir($destinationDir, 0755, true);
    }
        // Attempt to move the file
        if (rename($source, $destinationFile)) {
            echo "Fichier copié dans dossier client.";
        } else {
            echo "Fichier non copié dans le dossier client.";
        }
}
else{
   
    echo 'la source nest pas à cet endroit<br>';
}




