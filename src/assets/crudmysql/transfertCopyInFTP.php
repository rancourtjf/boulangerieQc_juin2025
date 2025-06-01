<?php
header("Content-Type: application/json; charset=UTF_8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST,PUT,GET,DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

//transfertCopyInFTP.php
$data = json_decode(file_get_contents("php://input"));


$dossierCommandesWeb = htmlspecialchars(trim($data->dossierCommandesWeb));
$nomDocument = htmlspecialchars(trim($data->nomDocument));
$depot=htmlspecialchars(trim($data->depot));
$sourceFTP=htmlspecialchars(trim($data->sourceFTP));

echo "dossierCommandesWeb=" . $dossierCommandesWeb;
echo "nomDocument=" . $nomDocument;
echo "....sourceFTP=".$sourceFTP;

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


//envoi dans le dossier client
$destinationDir = '../../clients/'.$depot.'/factures/';

$destinationFile = $destinationDir . $nomDocument;

if(file_exists($sourceFTP)){
    echo 'la source existe  <br>';
  
        // Attempt to move the file
        if (copy($sourceFTP, $destinationFile)) {
            echo "Fichier copié dans dossier client.";
        } else {
            echo "Fichier non copié dans le dossier client.";
        }
}
else{
   
    echo 'la source nest pas à cet endroit<br>';
}


