<?php
header("Content-Type: application/json; charset=UTF_8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST,PUT,GET");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");


if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['pdf_file'])) {
    echo "on entre dans le if de post";

    $uploadDir = '../../clients/boulangerieqc/upload/';
    $uploadFile = $uploadDir . basename($_FILES['file']['name']);
    

    if (move_uploaded_file($_FILES["pdf_file"]["tmp_name"], $uploadFile)) {
        echo "Le fichier ". htmlspecialchars(basename($_FILES["pdf_file"]["name"])) . " a été téléchargé avec succès.";
    } else {
        echo "Désolé, il y a eu une erreur lors du téléchargement de votre fichier.";
    }
} else {
    echo "Aucun fichier reçu.";
}
?>