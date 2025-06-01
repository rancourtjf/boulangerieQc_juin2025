<?php
header("Content-Type: application/json; charset=UTF_8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST,PUT,GET,DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

//transfertFichiertoPhpTest.php


error_reporting(E_ALL);
ini_set('display_errors', 1);

$data = json_decode(file_get_contents("php://input"));
$dossierCommandesWeb = htmlspecialchars(trim($data->dossierCommandesWeb));
$depot = htmlspecialchars(trim($data->depot));
$nomDocument = htmlspecialchars(trim($data->nomDocument));
$pdfFileEncode = htmlspecialchars(trim($data->pdfFileEncode));

$decodedBlobData = base64_decode($pdfFileEncode);

// Utilisez le chemin complet pour éviter des problèmes de répertoire
//$cheminCompletFichier = '/chemin/vers/votre/repertoire/' . $nomDocument;
$cheminCompletFichier = '/chemin/vers/votre/repertoire/' . $nomDocument;
$destinationDir = '../../clients/'.$depot;
$cheminCompletFichier = $destinationDir . $nomDocument;


// Écrivez le fichier
if (file_put_contents($cheminCompletFichier, $decodedBlobData) === false) {
    die("Impossible d'écrire le fichier");
}

require "ftpUserLogin.php";

$ftp = ftp_ssl_connect($ftp_server);
$login_result = ftp_login($ftp, $ftp_user_name, $ftp_user_pass);

if (!$login_result) {
    die("Login impossible");
}

ftp_pasv($ftp, TRUE);

$destinationDir = '../../clients/'.$depot;

// Créez le répertoire s'il n'existe pas
if (!is_dir($destinationDir)) {
    mkdir($destinationDir, 0755, true);
}

// Utilisez ftp_put() pour uploader le fichier
if (ftp_put($ftp, $destinationDir . '/' . $nomDocument, $cheminCompletFichier, FTP_BINARY)) {
    echo "Fichier uploadé avec succès";
} else {
    echo "Échec de l'upload du fichier";
}

ftp_close($ftp);


