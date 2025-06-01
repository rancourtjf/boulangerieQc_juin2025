<?php

//https://www.boulangerieqc.com/assets/crudmysql/listeEtats4d.php


//$ftp_server = "184.107.112.43";
$ftp_server = "198.72.104.27";
$ftp_user_name = "listeprixclients@boulangerieqc.com";
$ftp_user_pass = "purtak-wiMgar-8womhe";
//$dossier = $_GET["dossier"];
//$data = json_decode(file_get_contents("php://input"));
//echo "dossier=".$dossier
//$dossierCommandesWeb = htmlspecialchars(trim($data->dossierCommandesWeb));

//echo "dossier data=".$dossierCommandesWeb

//require "ftpUserLogin.php"

// Mise en place d'une connexion basique
$ftp = ftp_ssl_connect($ftp_server);
//Connect
//echo "<br />Connecting to $ftp_server via FTP...";

// Identification avec un nom d'utilisateur et un mot de passe
$login_result = ftp_login($ftp, $ftp_user_name, $ftp_user_pass);
if (!$login_result) {

    // PHP aura déjà soulevé un message de niveau E_WARNING dans ce cas
    die("can't login");
} else {
    // echo 'login ok<br>';
}


//Enable PASV ( Note: must be done after ftp_login() )
//
$mode = ftp_pasv($ftp, TRUE);

$racine = "/etats/";

$arr = array($racine => "");
$file_list = ftp_nlist($ftp, $racine);
rsort($file_list);

$array = array();
foreach ($file_list as $file) {

    $filename = strtr($file, $arr);

    if (($filename == '.') || ($filename == '..') || ($filename == '.ftpquota')) {
    } else {
        //  get the last modified time

        //echo $file;


        array_push($array, $filename);
    }
}
echo json_encode([
    'array' => $array
]);

//close
ftp_close($ftp);
