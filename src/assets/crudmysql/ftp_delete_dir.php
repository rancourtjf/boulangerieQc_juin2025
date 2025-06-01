<?php
//ftp_delete_dir.php
$ftp_server = $_GET["host"];
$ftp_user_name = $_GET["user"];
$ftp_user_pass = $_GET["password"];
$ftp_user_passUnHash = $_GET["id"];
$dir = $_GET["directory"];
$dirRecettes =$dir . "recettes";

//$ftp_server = "184.107.112.43";
//$ftp_user_name = "rancour";
//$ftp_user_pass = "pUAR3exd(A";
//-----

$hash =$ftp_user_pass;
$password =$ftp_user_passUnHash;

$passVerifBool = password_verify ( $password , $hash ) ;
//echo "resultat de la comparaison : " . $passVerifBool;
if($passVerifBool==1){
    echo "<br><hr>La verification du mot de passe est bonne et les documents seront supprimés s'ils existent.<br>";  

// Mise en place d'une connexion basique
$ftp = ftp_ssl_connect($ftp_server);

// Identification avec un nom d'utilisateur et un mot de passe
$login_result = ftp_login($ftp, $ftp_user_name, $password);
if (!$login_result) {
    // PHP aura déjà soulevé un message de niveau E_WARNING dans ce cas
   die("login ne peut pas être fait");
}

//echo "Le répertoire a supprimé est: $dir ";
//echo "le nombre de fichier est $size dont certains dossiers /. et /.. qui ne seront pas supprimés <br><hr>";
//echo "<br><hr>le repertoire choisi est: $dirRecettes <br>";

$file_listRecettes = ftp_nlist($ftp, $dirRecettes);
$size = sizeof($file_list);
//echo "le nombre de fichier est $size dont 2 dossiers /. et /.. qui ne seront pas supprimés <br>";


foreach ($file_listRecettes as $file) {
    // try to delete $file
if (ftp_delete($ftp, $file)) {
   // echo "$file supprimé <br>";
   } else {
   // echo "ne ne pouvons supprimer ce type de fichier $file\n";
   }
}
// try to delete the directory $dir
if (ftp_rmdir($ftp, $dirRecettes)) {
   // echo "<br><strong>Suppression faite de $dirRecettes </strong><br>";
} else {
    //echo "Nous ne pouvons supprimer le répertoire $dirRecettes <br> , il n'existe probablement plus";
}

$file_list = ftp_nlist($ftp, $dir);

$size = sizeof($file_list);
//echo "le nombre de fichier est $size dont 2 dossiers /. et /.. qui ne seront pas supprimés <br><hr>";

foreach ($file_list as $file) {
    // try to delete $file
if (ftp_delete($ftp, $file)) {
    //echo "$file supprimé <br>";
   } else {
   //echo "ne ne pouvons supprimer ce type de fichier $file\n";
   }
}
// try to delete the directory $dir
if (ftp_rmdir($ftp, $dir)) {
   // echo "<br><strong>Suppression faite de $dir </strong><br>";
} else {
   // echo "Nous ne pouvons supprimer le répertoire $dir <br> , il n'existe probablement plus";
}

}
else{
   echo "<br><hr>la verification du mot de passe n'est pas bonne!";
}

// Fermeture de la connexion SSL
ftp_close($ftp);
?>
