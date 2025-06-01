<?php
header("Content-Type: application/json; charset=UTF_8");
header("Access-Control-Allow-Origin: *");
//header("Access-Control-Allow-Origin: http://localhost:4200");
//header("Access-Control-Allow-Origin: https://www.boulangerieqc.com/students/crydmysql/insert.php");
//header("Access-Control-Allow-Origin: https://www.boulangerieqc.com");
//header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

$method = $_SERVER['REQUEST_METHOD'];

if ($method == "OPTIONS") {
    die();
}

 
// if ($_SERVER['REQUEST_METHOD'] !== 'POST') :
//     http_response_code(405);
//     echo json_encode([
//         'success' => 0,
//         'message' => 'Bad Request!.Only POST method is allowed',
//     ]);
//     exit;
// endif;
 
require 'db_connect.php';
$database = new Operations();
$conn = $database->dbConnection();
 
$data = json_decode(file_get_contents("php://input"));
echo $data;

//print_r($data);
//. $_GET["varURL"]

// $date = $data->datefacture;
// $typefacture = $data->typefacture;
// $lien = $data->lien;
// $idclient = $data->idclient;
// $identifiantboulangerie = $data->identifiantboulangerie;



// $date = $_GET["datefacture"];
// $typefacture = $_GET["typefacture"];
// $lien = $_GET["lien"];
// $idclient = $_GET["idclient"];
// $identifiantboulangerie = $_GET["identifiantboulangerie"];

//$date = $data.datefacture;
//$typefacture = $data.typefacture;
//$lien = $data.lien;
//$idclient = $data.idclient;
//$identifiantboulangerie = $$data.identifiantboulangerie;//

// if (!isset($data->dateFacture;) || !isset($data->type) || !isset($data->lien)|| !isset($data->$idclient)|| !isset($data->identifiantboulangerie)) :
 
//     echo json_encode([
//         'success' => 0,
//         'message' => 'Entrez les champs obligatoires',
//     ]);
//     exit;
 
// elseif (empty(trim($data->dateFacture)) || empty(trim($data->typefacture)) || empty(trim($data->lien))|| empty(trim($data->idclient))|| empty(trim($data->identifiantboulangerie))) :
 
//     echo json_encode([
//         'success' => 0,
//         'message' => 'Les champs ne peuvent pas être vide.',
//     ]);
//     exit;
 
// endif;
 
try {
 
    // $datefacture = htmlspecialchars(trim($data->datefacture));
    // $typefacture = htmlspecialchars(trim($data->typefacture));
    // $lien = htmlspecialchars(trim($data->lien));
    // $idclient = htmlspecialchars(trim($data->idclient));
    // $identifiantboulangerie =  htmlspecialchars(trim($data->identifiantboulangerie));

    //$datefacture = htmlspecialchars(trim(date));
    //$typefacture = htmlspecialchars(trim(typefacture));
    $lien = htmlspecialchars(trim($lien));
    $idclient = htmlspecialchars(trim($idclient));
    $identifiantboulangerie =  htmlspecialchars(trim($identifiantboulangerie));

 
    $query = "INSERT INTO `factures`(
   datefacture,
   typefacture,
   lien,
   idclient,
   identifiantboulangerie
    ) 
    VALUES(
    :datefacture,
    :typefacture,
    :lien,
    :idclient,
    :identifiantboulangerie,
    )";
 
    $stmt = $conn->prepare($query);
 
    $stmt->bindValue(':datefacture', $datefacture, PDO::PARAM_STR);
    $stmt->bindValue(':typefacture', $typefacture, PDO::PARAM_STR);
    $stmt->bindValue(':lien', $lien, PDO::PARAM_STR);
    $stmt->bindValue(':idclient', $idclient, PDO::PARAM_STR);
    $stmt->bindValue(':identifiantboulangerie', $identifiantboulangerie, PDO::PARAM_STR);

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
