<?php
header("Content-Type: application/json; charset=UTF_8");
header("Access-Control-Allow-Origin: *");
//header("Access-Control-Allow-Origin: http://localhost:4200");
//header("Access-Control-Allow-Origin: https://www.boulangerieqc.com/students/crydmysql/insert.php");
//header("Access-Control-Allow-Origin: https://www.boulangerieqc.com");
header("Access-Control-Allow-Methods: POST");
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
    echo "Connection à la base de donnée faite!";
} catch (PDOException $e) {
    echo "Connection n'a pu être faite: " . $e->getMessage();
}

try {
    $nom_recette = htmlspecialchars(trim($data->nom_recette));
    $dateProd = htmlspecialchars(trim($data->dateProd));
    $url_recetteProd = htmlspecialchars(trim($data->url_recetteProd));

    $query = "INSERT INTO recettesProd(
    nom_recette,
    dateProd,
    url_recetteProd
    ) 
    VALUES(
        :nom_recette,
        :dateProd,
        :url_recetteProd
    )";

    $stmt = $conn->prepare($query);

    $stmt->bindValue(':nom_recette', $nom_recette, PDO::PARAM_STR);
    $stmt->bindValue(':dateProd', $dateProd, PDO::PARAM_STR);
    $stmt->bindValue(':url_recetteProd', $url_recetteProd, PDO::PARAM_STR);

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
