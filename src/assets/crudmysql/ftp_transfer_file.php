<?php
//ftp_transfer_file.php

header("Content-Type: application/json; charset=UTF_8");
//header("Content-Type:application/multipart/form-data");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST,PUT,GET,DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

//$ftp_server = "184.107.112.43";
$ftp_server = "198.72.104.27";
$ftp_user_name = "listeprixclients@boulangerieqc.com";
$ftp_user_pass = "purtak-wiMgar-8womhe";

$data = json_decode(file_get_contents("php://input"));
// 
$dossierCommandesWeb=$data->dossierCommandesWeb;
echo"dossierCommandesWeb=".$dossierCommandesWeb;
$file = $data->localFile;


$ftp = ftp_ssl_connect($ftp_server);

// Identification avec un nom d'utilisateur et un mot de passe
$login_result = ftp_login($ftp, $ftp_user_name, $ftp_user_pass);
if (!$login_result) {
    // PHP aura déjà soulevé un message de niveau E_WARNING dans ce cas
    die("on ne peut se connecter");
} else {
    echo 'Login ok<br>';
    echo '$file='.$file;
}

$mode = ftp_pasv($ftp, TRUE);

//output the array stored in $file_list using foreach loop
$racine = "/boulangerieqc/testFTP/";

$remote_file = 'test.pdf';

if (ftp_put($ftp, $remote_file, $file, FTP_BINARY)) {
    echo "Le fichier $file a été déposé avec succès\n";
   } else {
    echo "Il y a eu un problème lors du dépot du fichier $file\n";
   }

// Fermeture de la connexion SSL
ftp_close($ftp);
?>

