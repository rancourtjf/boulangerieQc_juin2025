<?php
// connect and login to FTP server
//ftp_mkdir.php
//création d'un dossier sur le serveur FTP

header("Content-Type: application/json; charset=UTF_8");
//header("Content-Type:application/multipart/form-data");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST,PUT,GET,DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

//sera déterminé lors du require ftpUserLogin.php

$data = json_decode(file_get_contents("php://input"));
// 
$dossierCommandesWeb=$data->dossierCommandesWeb;

$cheminmkdir_Dossier=$data->cheminmkdir_Dossier;

//ex:$file = "2024-05-22"; pour 22 mai 2024

echo "dossierCommandesWeb=".$dossierCommandesWeb;
echo 'chemin du dossier'.$cheminmkdir_Dossier;

require "ftpUserLogin.php";

// Mise en place d'une connexion basique
$ftp = ftp_ssl_connect($ftp_server);

// Identification avec un nom d'utilisateur et un mot de passe
$login_result = ftp_login($ftp, $ftp_user_name, $ftp_user_pass);
echo 'login_result='.$login_result;
if (!$login_result) {
    // PHP aura déjà soulevé un message de niveau E_WARNING dans ce cas
    die("can't login");
}
$mode = ftp_pasv($ftp, TRUE);

//$delete_path = '../../'.$dossierCommandesWebclients. '/'.$typeDocument.'/'.$file;
$mkdir_path = '../'.$cheminmkdir_Dossier;
echo 'mkdir_path='.$mkdir_path;

// try to create directory $dir

if (!is_dir($mkdir_path)) {
  mkdir($mkdir_path, 0755, true);
}

if (ftp_mkdir($ftp, $mkdir_path))
  {
  echo "Successfully created $mkdir_path";
  }
else
  {
  echo "Pas d'ajout de $mkdir_path";
  }

// close connection
ftp_close($ftp);
?>