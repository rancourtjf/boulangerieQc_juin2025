<?php
// connect and login to FTP server
//supprime le fichier dans le dossier de la boulangerie

header("Content-Type: application/json; charset=UTF_8");
//header("Content-Type:application/multipart/form-data");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST,PUT,GET,DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

//sera déterminé lors du require ftpUserLogin.php
// $ftp_server = '184.107.112.43';
// $ftp_user_name = 'boulangerieqctest@boulangerieqc.com';
// $ftp_user_pass = 'Josephine$2024';

$data = json_decode(file_get_contents("php://input"));
// 
$dossierCommandesWeb=$data->dossierCommandesWeb;
$cheminmkdir_Dossier=$data->cheminmkdir_Dossier;
$cheminRecettesDossier=$cheminmkdir_Dossier+"/recettes/";


echo "dossierCommandesWeb=".$dossierCommandesWeb;
echo 'chemin du Dossier'.$cheminmkdir_Dossier;

require "ftpUserLogin.php";

// Mise en place d'une connexion basique

// Mise en place d'une connexion basique
$ftp = ftp_ssl_connect($ftp_server);
// Identification avec un nom d'utilisateur et un mot de passe
$login_result = ftp_login($ftp, $ftp_user_name, $ftp_user_pass);
echo 'login_result='.$login_result;
if (!$login_result) {

    // PHP aura déjà soulevé un message de niveau E_WARNING dans ce cas
    die("can't login");
}

// Fermeture de la connexion SSL

$mode = ftp_pasv($ftp, TRUE);



$delete_path = '../'.$cheminmkdir_Dossier.'/recettes/';
echo 'delete_path='.$delete_path;

$dirRecettes=$delete_path;

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

$file_list = ftp_nlist($ftp, $dirRecettes);

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
if (ftp_rmdir($ftp, $dirRecettes)) {
   // echo "<br><strong>Suppression faite de $dir </strong><br>";
} 
else {
   // echo "Nous ne pouvons supprimer le répertoire $dir <br> , il n'existe probablement plus";
}

// on supprime le dossier date complet

$delete_path = '../'.$cheminmkdir_Dossier;
echo 'delete_path='.$delete_path;

$dirRecettes=$delete_path;

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

$file_list = ftp_nlist($ftp, $dirRecettes);

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
if (ftp_rmdir($ftp, $dirRecettes)) {
    echo "<br><strong>Suppression faite de $dir </strong><br>";
} 
else {
    echo "Nous ne pouvons supprimer le répertoire $dir <br> , il n'existe probablement plus";
}

// fin suppression dossier date


// Fermeture de la connexion SSL
ftp_close($ftp);
?>
