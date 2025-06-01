<?php
header("Content-Type: application/pdf");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST,PUT,GET");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Content-Disposition: form-data; name='file'; filename='file.pdf'");

//transfertPdfSimple.php

require "functions.php";

$local_dir="/Users/jf/Documents/boulangerie4Dv19/BoulangerieQc4D/documentsWeb/FacturationQuotidienne/2024-05-30";
///Users/jf/Documents/boulangerie4Dv19/BoulangerieQc4D/documentsWeb/FacturationQuotidienne/2024-05-30/jjjj_13357_ID_190_2024-05-30.pdf
$scanned_directory = clean_scandir($local_dir);
pre_r($scanned_directory);


    // $file = $_FILES['file'];
    // echo '$FILE='.$file;
    // if (isset($_FILES['file']) && $_FILES['file']['error'] == 0) {
    //     $uploadDir = '../boulangerieqc/upload/';
    //     $uploadFile = $uploadDir . basename($_FILES['file']['name']);

    //     if (move_uploaded_file($_FILES['file']['tmp_name'], $uploadFile)) {
    //         echo "Le fichier a été téléchargé avec succès.\n";
    //     } else {
    //         echo "Échec du téléchargement du fichier.\n";
    //     }
    // } else {
    //     echo "Aucun fichier n'a été envoyé ou une erreur est survenue lors de l'envoi.\n";
    // }

?>