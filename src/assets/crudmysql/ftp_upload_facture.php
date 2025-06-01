<?php

$ftp_server = $_GET["host"];
$ftp_user_name = $_GET["user"];
$ftp_user_pass = $_GET["password"];
$ftp_user_passUnHash = $_GET["id"];
$dir = $_GET["directory"];
$dirRecettes =$dir . "recettes";
$fileName = $_GET["fileName"];


$hash =$ftp_user_pass;
$password =$ftp_user_passUnHash;

$passVerifBool = password_verify ( $password , $hash ) ;
//echo "resultat de la comparaison : " . $passVerifBool;
if($passVerifBool==1){
    echo "<br><hr>a verification du mot de passe est bonne<br>";  

// Mise en place d'une connexion basique
$ftp = ftp_ssl_connect($ftp_server);

// Identification avec un nom d'utilisateur et un mot de passe
$login_result = ftp_login($ftp, $ftp_user_name, $password);
if (!$login_result) {
    // PHP aura déjà soulevé un message de niveau E_WARNING dans ce cas
    die("login ne peut pas être fait");
}

echo "le repertoire choisi est: $dir <br>Ne tenez pas compte des messages ci-dessous car tout est bien supprimé";
//echo "le nombre de fichier est $size dont certains dossiers /. et /.. qui ne seront pas supprimés <br><hr>";
//echo "<br><hr>le repertoire choisi est: $dirRecettes <br>";

}
// Fermeture de la connexion SSL
ftp_close($ftp);
?>