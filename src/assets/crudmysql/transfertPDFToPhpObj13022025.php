<?php
header("Content-Type: application/json; charset=UTF_8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST,PUT,GET,DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");


//header("Content-Disposition: form-data; name='file'; filename='file.pdf'");

//transfertPDFToPhpObj.php
$data = json_decode(file_get_contents("php://input"));


$dossierCommandesWeb = htmlspecialchars(trim($data->dossierCommandesWeb));
//$pdfFileEncode = htmlspecialchars(trim($data->pdfFileEncode));
$pdfFileEncode =$data->pdfFileEncode;
$nomDocument = htmlspecialchars(trim($data->nomDocument));
$depot=htmlspecialchars(trim($data->depot));
$dateCommandeSlash=htmlspecialchars(trim($data->dateCommandeSlash));
$cheminDossierClassement=htmlspecialchars(trim($data->cheminDossierClassement));
$dossierClassement=htmlspecialchars(trim($data->dossierClassement));
$sourceFTP=htmlspecialchars(trim($data->sourceFTP));

echo 'sourceFTp='.$sourceFTP;


if (empty($pdfFileEncode)) {
    die("Erreur : Le fichier encodé en base64 est vide !");
}

$decodedBlobData = base64_decode($pdfFileEncode);
if ($decodedBlobData === false) {
    die("Erreur : Impossible de décoder le fichier PDF.");
}
echo "dossierCommandesWeb=" . $dossierCommandesWeb;
echo "nomDocument=" . $nomDocument;


// Assure-toi que le nom du fichier a bien une extension ".pdf"
if (pathinfo($nomDocument, PATHINFO_EXTENSION) !== 'pdf') {
    $nomDocument .= ".pdf";
}

// Sauvegarde du fichier localement
$file = fopen($nomDocument, 'wb');
if ($file === false) {
    die("Erreur : Impossible de créer le fichier localement.");
}
fwrite($file, $decodedBlobData);
fclose($file);

// Sauvegarde temporaire du fichier
$tempFile = tempnam(sys_get_temp_dir(), 'PDF_');
if (file_put_contents($tempFile, $decodedBlobData) === false) {
    die(json_encode(["error" => "Impossible de créer le fichier temporaire."]));
}



require "ftpUserLogin.php";
// // Mise en place d'une connexion basique
$ftp = ftp_ssl_connect($ftp_server);

// // Identification avec un nom d'utilisateur et un mot de passe
$login_result = ftp_login($ftp, $ftp_user_name, $ftp_user_pass);
if (!$login_result) {
    //     // PHP aura déjà soulevé un message de niveau E_WARNING dans ce cas
    die("login ne peut pas être fait");
} else {
    echo "Le login s'est bien fait";
}
$mode = ftp_pasv($ftp, TRUE);

// Préparation des chemins test 8 fév 2025
$clientDir = "../../clients/$depot/factures/";

$mainDir = "../../".$cheminDossierClassement;
echo 'mainDir='.$mainDir;


if (!is_dir($clientDir)) {
    mkdir($clientDir, 0755, true);
}
if (!is_dir($mainDir)) {
    mkdir($mainDir, 0755, true);
}

if (!copy($tempFile, $clientDir . $nomDocument)) {
    ftp_close($ftp);
    unlink($tempFile);
    die(json_encode(["error" => "Échec de la copie dans le dossier client."]));
}

// Upload FTP dans le dossier principal
// if (!ftp_put($ftp, $mainDir . $nomDocument, $tempFile, FTP_BINARY)) {
//     ftp_close($ftp);
//     unlink($tempFile);
//     die(json_encode(["error" => "Échec de l'upload FTP."]));
// }

$destinationDir = '../../'.$cheminDossierClassement;

echo '$destinationDir ='.$destinationDir ;

$destinationFile = $destinationDir . $nomDocument;

    if (!is_dir($destinationDir)) {
        mkdir($destinationDir, 0755, true);
    }
     // Attempt to move the file
     if (!copy($tempFile, $destinationFile)) {
        echo "Fichier transféré dans le dossier principal";
    } else {
        echo "Fichier non transféré dans le dossier principal";
    }


// Nettoyage
ftp_close($ftp);
unlink($tempFile);

// Réponse succès
echo json_encode([
    "success" => true,
    "message" => "Fichier uploadé avec succès",
    "clientPath" => $clientDir . $nomDocument,
    "mainPath" => $mainDir . $nomDocument
]);

//suppression ci-dessous 8 fev 2025
/*
$uploadDir = "../".$dossierCommandesWeb."/";
//$uploadFile = $uploadDir . basename($file["pdf_file"]["name"]);

$uploadFile = $uploadDir . basename($nomDocument);
echo '$uploadFile='.$uploadFile;

$source = $nomDocument;
$destination = $uploadDir . $nomDocument;
//envoi dans le dossier client
//$destinationDir = '../../client/boulangerieqc/factures/;
$destinationDir = '../../clients/'.$depot.'/factures/';

$destinationFile = $destinationDir . $nomDocument;

if(file_exists($source)){
    echo 'la source existe  <br>';
    if (!is_dir($destinationDir)) {
        mkdir($destinationDir, 0755, true);
    }
        // Attempt to move the file
        if (copy($source, $destinationFile)) {
            echo "Fichier copié dans dossier client.";
        } else {
            echo "Fichier non copié dans le dossier client.";
        }
}
else{
   
    echo 'la source nest pas à cet endroit<br>';
}

// envoi dans le dossier ftp principal
//$destinationDir = '../../'.$dossierCommandesWeb.'/'.$dossierClassement.$dateCommandeSlash;
$destinationDir = '../../'.$cheminDossierClassement;

echo '$destinationDir ='.$destinationDir ;

$destinationFile = $destinationDir . $nomDocument;

    if (!is_dir($destinationDir)) {
        mkdir($destinationDir, 0755, true);
    }
     // Attempt to move the file
     if (rename($source, $destinationFile)) {
        echo "Fichier transféré dans le dossier principal";
    } else {
        echo "Fichier non transféré dans le dossier principal";
    }


*/
