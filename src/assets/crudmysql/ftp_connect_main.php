<?php

$ftp_server = "184.107.112.43";
$ftp_server = "198.72.104.27";
$ftp_user_name = "rancour";
$ftp_user_pass = "pUAR3exd(A";
$file= $_GET["localFile"];
$dir = $GET["directory"];


// Mise en place d'une connexion basique
$ftp = ftp_ssl_connect($ftp_server);

// Identification avec un nom d'utilisateur et un mot de passe
$login_result = ftp_login($ftp, $ftp_user_name, $ftp_user_pass);
if (!$login_result) {

    // PHP aura déjà soulevé un message de niveau E_WARNING dans ce cas
    die("can't login");
}
else{
    echo 'login ok';
}

// Fermeture de la connexion SSL
ftp_close($ftp);
?>
