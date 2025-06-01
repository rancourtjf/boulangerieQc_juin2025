<?php
header("Content-Type: application/json; charset=UTF_8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

//insert_factureSortie.php

$data = json_decode(file_get_contents("php://input"));

$dossierCommandesWeb = htmlspecialchars(trim($data->dossierCommandesWeb));

require "mysqlUserLogin.php";


try {
    $conn = new PDO("mysql:host=$db_host;dbname=$db_name", $db_username, $db_password);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    //echo "Connection à la base de donnée faite!";
  } catch(PDOException $e) {
    echo "Connection n'a pu être faite: " . $e->getMessage();
  }

try {
    $idclient = htmlspecialchars(trim($data->idclient));
    $id_impression_facture = htmlspecialchars(trim($data->id_impression_facture));
    $type_facture = htmlspecialchars(trim($data->type_facture));
    $montant = htmlspecialchars(trim($data->montant));
    $livree = htmlspecialchars(trim($data->livree));
    $date_paiement = htmlspecialchars(trim($data->date_paiement));
    $url_facture = htmlspecialchars(trim($data->url_facture));
    $nom_facture = htmlspecialchars(trim($data->nom_facture));
    $total_est_paye = htmlspecialchars(trim($data->total_est_paye));
    $dossierClassement=htmlspecialchars(trim($data->dossierClassement));


    $query = "INSERT INTO facture(
    idclient,
  id_impression_facture,
    type_facture,
    montant,
    livree,
    date_paiement,
    url_facture,
    nom_facture,
    total_est_paye,
    dossierClassement
    ) 
    VALUES(
:idclient,
:id_impression_facture,
 :type_facture,
 :montant,
 :livree,
 :date_paiement,
 :url_facture,
 :nom_facture,
 :total_est_paye,
 :dossierClassement
    )";
 
    $stmt = $conn->prepare($query);
 
    $stmt->bindValue(':idclient', $idclient, PDO::PARAM_STR);
    $stmt->bindValue(':id_impression_facture', $id_impression_facture, PDO::PARAM_STR);
    $stmt->bindValue(':type_facture', $type_facture, PDO::PARAM_STR);
    $stmt->bindValue(':montant', $montant, PDO::PARAM_STR);
    $stmt->bindValue(':livree', $livree, PDO::PARAM_STR);
    $stmt->bindValue(':date_paiement', $date_paiement, PDO::PARAM_STR);
    $stmt->bindValue(':url_facture', $url_facture, PDO::PARAM_STR);
    $stmt->bindValue(':nom_facture', $nom_facture, PDO::PARAM_STR);
    $stmt->bindValue(':total_est_paye', $total_est_paye, PDO::PARAM_STR);
    $stmt->bindValue(':dossierClassement', $dossierClassement, PDO::PARAM_STR);
    

    if ($stmt->execute()) {
 
        http_response_code(201);
        echo json_encode([
            'success' => 1,
            'message' => 'Data Inserted Successfully.'
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
        'success' => 0,
        'message' => $e->getMessage()
    ]);
    exit;
}
