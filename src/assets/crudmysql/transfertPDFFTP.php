<?php
header("Content-Type: application/json; charset=UTF_8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST,PUT,GET,DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
//transfertPDFFTP.php

//header("Content-Disposition: form-data; name='file'; filename='file.pdf'");


//$data = json_decode(file_get_contents("php://input"));

$dossierCommandesWeb = $_GET["dossierCommandesWeb"];
$pdfFileEncode= $_GET["pdfFileEncode"];
$nomDocument= $_GET["nomDocument"];
$depot= $_GET["depot"];
$dateCommandeSlash= $_GET["dateCommandeSlash"];
$cheminDossierClassement= $_GET["cheminDossierClassement"];
$dossierClassement= $_GET["dossierClassement"];



echo "dossierCommandesWeb=" . $dossierCommandesWeb;
echo "nomDocument=" . $nomDocument;
$decodedBlobData = base64_decode($pdfFileEncode);

$file = fopen($nomDocument, 'wb');
fwrite($file, $decodedBlobData);
fclose($file);



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


$uploadDir = "../".$dossierCommandesWeb."/";
$uploadFile = $uploadDir . basename($file["pdf_file"]["name"]);

$source = $nomDocument;
$destination = $uploadDir . $nomDocument;
//envoi dans le dossier client
//$destinationDir = '../../client/boulangerieqc/factures/;
$destinationDir = '../../clients/'.$depot.'/factures/';

$destinationFile = $destinationDir . $nomDocument;

if(file_exists($source)){
    echo 'la source existe  <br>';
    if (!is_dir($destinationDir)) {
        mkdir($destinationDir, 0755, true);
    }
        // Attempt to move the file
        if (copy($source, $destinationFile)) {
            echo "Fichier copié dans dossier client.";
        } else {
            echo "Fichier non copié dans le dossier client.";
        }
}
else{
   
    echo 'la source nest pas à cet endroit<br>';
}

// envoi dans le dossier ftp principal
//$destinationDir = '../../'.$dossierCommandesWeb.'/'.$dossierClassement.$dateCommandeSlash;
$destinationDir = '../../'.$cheminDossierClassement;

echo '$destinationDir ='.$destinationDir ;

$destinationFile = $destinationDir . $nomDocument;

    if (!is_dir($destinationDir)) {
        mkdir($destinationDir, 0755, true);
    }
     // Attempt to move the file
     if (rename($source, $destinationFile)) {
        echo "Fichier transféré dans le dossier principal";
    } else {
        echo "Fichier non transféré dans le dossier principal";
    }



