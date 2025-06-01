<?php

// voir code upload avec input html
//https://www.w3schools.com/php/php_file_upload.asp
//https://www.tutorialspoint.com/php/php_file_uploading.htm

$ftp_server = "184.107.112.43";
$ftp_server = "198.72.104.27";
$ftp_user_name = "rancour";
$ftp_user_pass = "pUAR3exd(A";
$file= $_GET["localFile"];

// Mise en place d'une connexion basique
$ftp = ftp_ssl_connect($ftp_server);

// Identification avec un nom d'utilisateur et un mot de passe
$login_result = ftp_login($ftp, $ftp_user_name, $ftp_user_pass);
if (!$login_result) {
    // PHP aura déjà soulevé un message de niveau E_WARNING dans ce cas
    die("can't login");
}
echo ftp_pwd($ftp);

//
// Charge un fichier

$remote_file = 'test.csv';

if (ftp_put($ftp, $remote_file, $file, FTP_ASCII)) {
    echo "Le fichier $file a été déposé avec succès\n";
   } else {
    echo "Il y a eu un problème lors du dépot du fichier $file\n";
   }

// Fermeture de la connexion SSL
ftp_close($ftp);
?>




