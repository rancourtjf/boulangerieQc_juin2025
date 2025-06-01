<?php
header("Content-Type: application/json; charset=UTF_8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST,PUT,GET,DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");


$data = json_decode(file_get_contents("php://input"));

// $db_host = htmlspecialchars(trim($data->db_host));
// $db_name = htmlspecialchars(trim($data->db_name));
// $db_username = htmlspecialchars(trim($data->db_username));
// $db_password = htmlspecialchars(trim($data->db_password));


$dossierCommandesWeb = htmlspecialchars(trim($data->dossierCommandesWeb));

require "mysqlUserLogin.php";

try {
    $conn = new PDO("mysql:host=$db_host;dbname=$db_name", $db_username, $db_password);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    //echo "Connection à la base de donnée faite!";
} catch (PDOException $e) {
    echo "Connection n'a pu être faite: " . $e->getMessage();
}


try {
    $chemin = htmlspecialchars(trim($data->chemin));
    echo "chemin=".$chemin;
    $dateProd = htmlspecialchars(trim($data->dateProd));
    $categorie = htmlspecialchars(trim($data->categorie));
    $idProd = htmlspecialchars(trim($data->idProd));
    $nomDocument = htmlspecialchars(trim($data->nomDocument));

    $query = "INSERT INTO Production(
    chemin,
    dateProd,
    categorie,
    idProd,
    nomDocument
    ) 
    VALUES(
    :chemin,
    :dateProd,
    :categorie,
    :idProd,
    :nomDocument
    )";

    $stmt = $conn->prepare($query);

    $stmt->bindValue(':chemin', $chemin, PDO::PARAM_STR);
    $stmt->bindValue(':dateProd', $dateProd, PDO::PARAM_STR);
    $stmt->bindValue(':categorie', $categorie, PDO::PARAM_STR);
    $stmt->bindValue(':idProd', $idProd, PDO::PARAM_STR);
    $stmt->bindValue(':nomDocument', $nomDocument, PDO::PARAM_STR);


    if ($stmt->execute()) {

        http_response_code(201);
        echo json_encode([
            'success' => 1,
            'message' => 'Data Production insere avec succes.'
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
