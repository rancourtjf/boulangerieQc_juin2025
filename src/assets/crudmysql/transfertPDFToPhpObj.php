<?php
header("Content-Type: application/json; charset=UTF_8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST,PUT,GET,DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

//transfertPDFToPhpObj.php

$data = json_decode(file_get_contents("php://input"));
$dossierCommandesWeb = htmlspecialchars(trim($data->dossierCommandesWeb));
echo "dossierCommandesWeb=".$dossierCommandesWeb;


$pdfFileEncode = $data->pdfFileEncode;


$nomDocument = htmlspecialchars(trim($data->nomDocument));
$depot = htmlspecialchars(trim($data->depot));
$dateCommandeSlash = htmlspecialchars(trim($data->dateCommandeSlash));
$cheminDossierClassement = htmlspecialchars(trim($data->cheminDossierClassement));
$dossierClassement = htmlspecialchars(trim($data->dossierClassement));
$sourceFTP = htmlspecialchars(trim($data->sourceFTP));

// Définir le chemin du répertoire uploadPDF
$uploadDir = "../../uploadPDF";

// Créer le répertoire s'il n'existe pas
if (!file_exists($uploadDir)) {
    if (!mkdir($uploadDir, 0777, true)) {
        die(json_encode(["error" => "Impossible de créer le répertoire uploadPDF"]));
    }
}

// Vérification du fichier PDF encodé
if (empty($pdfFileEncode)) {
    die(json_encode(["error" => "Le fichier encodé en base64 est vide !"]));
}

$decodedBlobData = base64_decode($pdfFileEncode);
if ($decodedBlobData === false) {
    die(json_encode(["error" => "Impossible de décoder le fichier PDF."]));
}

// Assurer l'extension .pdf
if (pathinfo($nomDocument, PATHINFO_EXTENSION) !== 'pdf') {
    $nomDocument .= ".pdf";
}

// Créer le fichier temporaire dans le répertoire uploadPDF
$tempFile = $uploadDir . '/' . uniqid() . '_' . $nomDocument;

echo "tempFile= ".$tempFile;

// Sauvegarder le fichier
if (file_put_contents($tempFile, $decodedBlobData) === false) {
    die(json_encode(["error" => "Impossible de créer le fichier temporaire."]));
}




try {
    // Votre code pour utiliser le fichier temporaire ici
    // ...

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
    
    //$mainDir = "../../".$cheminDossierClassement;
    $mainDir = "../../".$cheminDossierClassement;
 
    echo 'mainDir='.$mainDir;
    
    
    if (!is_dir($clientDir)) {
        mkdir($clientDir, 0755, true);
    }
    if (!is_dir($mainDir)) {
        mkdir($mainDir, 0755, true);
    }
    
    if (!copy($tempFile, $clientDir . $nomDocument)) {
        // ftp_close($ftp);
       // unlink($tempFile);

       
        die(json_encode(["error" => "Échec de la copie dans le dossier client."]));
    }


    
    $destinationDir = '../../'.$cheminDossierClassement;
    
    echo '$destinationDir ='.$destinationDir ;
    
    $destinationFile = $destinationDir . $nomDocument;
    
        if (!is_dir($destinationDir)) {
            mkdir($destinationDir, 0755, true);
        }
         // Attempt to move the file
         if (!copy($tempFile, $destinationFile)) {
            echo "Fichier transféré dans le dossier principal";
            if (file_exists($tempFile)) {
                unlink($tempFile);
            }
        } else {
            echo "Fichier non transféré dans le dossier principal";
        }
    
    
    // Nettoyage
    ftp_close($ftp);
    // Une fois le traitement terminé, supprimer le fichier
    if (file_exists($tempFile)) {
        if (!unlink($tempFile)) {
            error_log("Impossible de supprimer le fichier temporaire : " . $tempFile);
        }
    }

    echo json_encode(["success" => true, "message" => "Fichier traité avec succès"]);
} catch (Exception $e) {
    // En cas d'erreur, on s'assure quand même de supprimer le fichier
    if (file_exists($tempFile)) {
        unlink($tempFile);
    }
    die(json_encode(["error" => $e->getMessage()]));
}