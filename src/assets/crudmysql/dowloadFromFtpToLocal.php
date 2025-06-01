<?php
header("Content-Type: application/json; charset=UTF_8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST,PUT,GET,DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");


$data = json_decode(file_get_contents("php://input"));

$dossierCommandesWeb = htmlspecialchars(trim($data->dossier));

require "mysqlUserLogin.php";


try {
    $conn = new PDO("mysql:host=$db_host;dbname=$db_name", $db_username, $db_password);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    //echo "Connection à la base de donnée faite!";
} catch (PDOException $e) {
    echo "Connection n'a pu être faite: " . $e->getMessage();
}

$remote_file = htmlspecialchars(trim($data->remote_file)); // Chemin du fichier sur le serveur FTP
//$remote_file = '/chemin/vers/le/fichier/à/télécharger.txt';  // Chemin du fichier sur le serveur FTP

// Chemin de destination sur le serveur local
$local_file = htmlspecialchars(trim($data->local_file)); // Chemin du fichier sur le serveur FTP
//$local_file = '/chemin/vers/le/dossier/de/destination/fichier_local.txt';

// // Connexion au serveur FTP
// $ftp_conn = ftp_connect($server);
// if (!$ftp_conn) {
//     die('Erreur de connexion au serveur FTP');
// }

// // Authentification avec nom d'utilisateur et mot de passe
// $login = ftp_login($ftp_conn, $username, $password);
// if (!$login) {
//     die('Erreur d\'authentification FTP');
// }

// Tentative de téléchargement du fichier
if (ftp_get($ftp_conn, $local_file, $remote_file, FTP_BINARY)) {
    echo "Le fichier $remote_file a été téléchargé avec succès et enregistré sous $local_file";
} else {
    echo "Erreur lors du téléchargement du fichier $remote_file";
}

// Fermeture de la connexion FTP
ftp_close($ftp_conn);
?>
