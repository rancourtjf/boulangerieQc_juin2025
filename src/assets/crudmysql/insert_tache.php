<?php
header("Content-Type: application/json; charset=UTF_8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: PUT,HEAD,GET,POST,OPTIONS,DELETE,PATCH");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

//insert_tache.php

// Activez tous les rapports d'erreurs
error_reporting(E_ALL);
ini_set('display_errors', 1);

$data = json_decode(file_get_contents("php://input"));

$dossierCommandesWeb = htmlspecialchars(trim($data->dossierCommandesWeb));
$descriptif = htmlspecialchars(trim($data->descriptif));
$datePrevue = htmlspecialchars(trim($data->datePrevue));
$dateDebut = htmlspecialchars(trim($data->datePrevue));
$dateFin = htmlspecialchars(trim($data->datePrevue));
$jourSemaine = htmlspecialchars(trim($data->jourSemaine));
$nomEquipe = htmlspecialchars(trim($data->nomEquipe));


//$date_actuelle = date('Y-m-d H:i:s');

require "mysqlUserLogin.php";

try {
    $conn = new PDO("mysql:host=$db_host;dbname=$db_name", $db_username, $db_password);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
   echo "Connection à la base de donnée faite!";

    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(200);
        exit;
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'error' => true,
        'message' => $e->getMessage(),
        'file' => $e->getFile(),
        'line' => $e->getLine()
    ]);
    exit();
}

try {

    $query = "INSERT INTO taches(
descriptif,
datePrevue,
dateDebut,
dateFin,
jourSemaine,
nomEquipe
    ) 
    VALUES(
:descriptif,
:datePrevue,
:dateDebut,
:dateFin,
:jourSemaine,
:nomEquipe
    )";

    $stmt = $conn->prepare($query);


    $stmt->bindValue(':descriptif', $descriptif, PDO::PARAM_STR);
    $stmt->bindValue(':datePrevue', $datePrevue, PDO::PARAM_STR);
    $stmt->bindValue(':dateDebut', $dateDebut, PDO::PARAM_STR);
    $stmt->bindValue(':dateFin', $dateFin, PDO::PARAM_STR);
    $stmt->bindValue(':jourSemaine', $jourSemaine, PDO::PARAM_STR);
    $stmt->bindValue(':nomEquipe', $nomEquipe, PDO::PARAM_STR);


    if ($stmt->execute()) {

        http_response_code(201);
        echo json_encode([
            'success' => 1,
            'message' => 'Data insere avec succes dans taches.'
        ]);
        exit;
    }

    echo json_encode([
        'success' => 0,
        'message' => 'There is some problem in data inserting'
    ]);
    exit;
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'error' => true,
        'message' => $e->getMessage(),
        'file' => $e->getFile(),
        'line' => $e->getLine()
    ]);
    exit();
}
