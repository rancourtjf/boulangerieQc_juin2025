<?php
//ftp_delete_recettesPDF
//supprime le fichier dans le dossier de la boulangerie

header("Content-Type: application/json; charset=UTF_8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST,PUT,GET,DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");


$data = json_decode(file_get_contents("php://input"));
// 
$dossierCommandesWeb=$data->dossierCommandesWeb;
$cheminClientDepot=$data->cheminClientDepot;
echo 'dossierCommandesWeb et cheminClientDepot='.$dossierCommandesWeb.' '.$cheminClientDepot;

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

  $dir='../'.$cheminClientDepot.'/recettesPDF/';

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

// close connection
ftp_close($ftp);
?>