<?php
header("Content-Type: application/json; charset=UTF_8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: PUT,HEAD,GET,POST,OPTIONS,DELETE,PATCH");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Activez tous les rapports d'erreurs
error_reporting(E_ALL);
ini_set('display_errors', 1);


//$data = json_decode(file_get_contents("php://input"));

$dossierCommandesWeb =$_GET["dossierCommandesWeb"];

//$dossierCommandesWeb = htmlspecialchars(trim(string: $data->dossierCommandesWeb));

require "mysqlUserLogin.php";
try {
    $conn = new PDO("mysql:host=$db_host;dbname=$db_name", $db_username, $db_password);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);


    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(200);
        exit;
    }
} catch (PDOException $e) {
    echo "Connection n'a pu être faite: " . $e->getMessage();
}

try {

    $nomEquipe =$_GET["nomEquipe"];

   // $nomEquipe = htmlspecialchars(trim($data->nomEquipe));

    $query = "INSERT INTO equipes(
nomEquipe)
    VALUES(:nomEquipe)";

    $stmt = $conn->prepare($query);

    $stmt->bindValue(':nomEquipe', $nomEquipe, PDO::PARAM_STR);

    if ($stmt->execute()) {

        http_response_code(201);
        echo json_encode([
            'success' => 1,
            'message' => 'Data insere avec succes message.'
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
