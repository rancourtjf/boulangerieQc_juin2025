<?php
// connect and login to FTP server
//supprime le fichier dans le dossier client de listeClient
//ftp_delete_file_listeClient.php

header("Content-Type: application/json; charset=UTF_8");
//header("Content-Type:application/multipart/form-data");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST,PUT,GET,DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");


$data = json_decode(file_get_contents("php://input"));
// 
$dossierCommandesWeb=$data->dossierCommandesWeb;
$typeDocument=$data->typeDocument;
$dateDossier=$data->dateDossier;
$file=$data->nomFile;
$cheminCompletFile=$data->cheminCompletFile;

//ex:$file = "2024-05-22"; pour 22 mai 2024

echo "dossierCommandesWeb=".$dossierCommandesWeb;
echo 'chemin du fichier'.$cheminCompletFile;

require "ftpUserLogin.php";

// Mise en place d'une connexion basique
$ftp = ftp_ssl_connect($ftp_server);

// Identification avec un nom d'utilisateur et un mot de passe
$login_result = ftp_login($ftp, $ftp_user_name, $ftp_user_pass);
if (!$login_result) {
    // PHP aura déjà soulevé un message de niveau E_WARNING dans ce cas
   die("login ne peut pas être fait");
}
else {
  echo "Le login s'est bien fait";
}
$mode = ftp_pasv($ftp, TRUE);

//$delete_path = '../../'.$dossierCommandesWebclients. '/'.$typeDocument.'/'.$file;
$delete_path = '../'.$cheminCompletFile;
echo 'delete_path='.$delete_path;

// try to delete file
if (ftp_delete($ftp, $delete_path))
  {
  echo "$file deleted";
  }
else
  {
  echo "Could not delete $file";
  }

// close connection
// ftp_close($ftp);
?>