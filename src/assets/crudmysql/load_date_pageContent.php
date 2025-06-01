<?php
// En-têtes pour autoriser CORS (si tu travailles en localhost:4200)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

// OPTIONS pour les pré-vols CORS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Débogage PHP
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Lire le body JSON
// $data = json_decode(file_get_contents("php://input"), true);


$dossierCommandesWeb = $_GET["dossierCommandesWeb"] ?? null;

if (!$dossierCommandesWeb) {
    echo json_encode(["success" => 0, "message" => "Paramètre manquant"]);
    exit;
}

require "mysqlUserLogin.php";

$method = $_SERVER['REQUEST_METHOD'];

if ($method == "OPTIONS") {
    die();
}

try {
    $conn = new PDO("mysql:host=$db_host;dbname=$db_name", $db_username, $db_password);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);


    // echo "Connection à la base de donnée faite!";
} catch (PDOException $e) {
    echo "Connection n'a pu être faite: " . $e->getMessage();
}

try {

    $sql = "SELECT dateMAJ FROM page_content WHERE id = 1";

    $stmt = $conn->prepare($sql);

    $stmt->execute();

    if ($stmt->rowCount() > 0):

        $data = null;
        $data = $stmt->fetch(PDO::FETCH_ASSOC);
        echo json_encode([
            // 'success' => 1,
            'data' => $data,
        ]);

    else:
        echo json_encode([
            'success' => 0,
            'message' => 'Pas de fiche trouvée!',
        ]);

    endif;
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'success' => 0,
        'message' => $e->getMessage()
    ]);
    exit;
}