<?php
header("Content-Type: application/json; charset=UTF_8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: PUT,HEAD,GET,POST,OPTIONS,DELETE,PATCH");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
//insert_fournisseur.php

$data = json_decode(file_get_contents("php://input"));

$dossierCommandesWeb = htmlspecialchars(trim($data->dossierCommandesWeb));

require "mysqlUserLogin.php";

try {
    $conn = new PDO("mysql:host=$db_host;dbname=$db_name", $db_username, $db_password);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    //  echo "Connection à la base de donnée faite!";
} catch (PDOException $e) {
    echo "Connection n'a pu être faite: " . $e->getMessage();
}

try {
    $ID4D = htmlspecialchars(trim($data->ID4D));
    $nom = htmlspecialchars(trim($data->nom));
    $courriel = htmlspecialchars(trim($data->courriel));
    $telephone = htmlspecialchars(trim($data->telephone));
    $adresse = htmlspecialchars(trim($data->adresse));
    $ville = htmlspecialchars(trim($data->ville));
    $code_postal = htmlspecialchars(trim($data->code_postal));
    $fax = htmlspecialchars(trim($data->fax));
    $prenom_responsable = htmlspecialchars(trim($data->prenom_responsable));
    $nom_responsable = htmlspecialchars(trim($data->nom_responsable));
    $noID_logicielComptable = htmlspecialchars(trim($data->noID_logicielComptable));


    $query = "INSERT INTO fournisseurs(
    ID4D,
    nom,
    courriel,
    telephone,
    adresse,
    ville,
    code_postal,
    fax,
    prenom_responsable,
    nom_responsable,
    noID_logicielComptable
    ) 
    VALUES(
  :ID4D,
    :nom,
    :courriel,
    :telephone,
    :adresse,
    :ville,
    :code_postal,
    :fax,
    :prenom_responsable,
    :nom_responsable,
    :noID_logicielComptable
    )";

    $stmt = $conn->prepare($query);

    $stmt->bindValue(':ID4D', $ID4D, PDO::PARAM_STR);
    $stmt->bindValue(':nom', $nom, PDO::PARAM_STR);
    $stmt->bindValue(':courriel', $courriel, PDO::PARAM_STR);
    $stmt->bindValue(':telephone', $telephone, PDO::PARAM_STR);
    $stmt->bindValue(':adresse', $adresse, PDO::PARAM_STR);
    $stmt->bindValue(':ville', $ville, PDO::PARAM_STR);
    $stmt->bindValue(':code_postal', $code_postal, PDO::PARAM_STR);
    $stmt->bindValue(':fax', $fax, PDO::PARAM_STR);
    $stmt->bindValue(':prenom_responsable', $prenom_responsable, PDO::PARAM_STR);
    $stmt->bindValue(':nom_responsable', $nom_responsable, PDO::PARAM_STR);
    $stmt->bindValue(':noID_logicielComptable', $noID_logicielComptable, PDO::PARAM_STR);


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
