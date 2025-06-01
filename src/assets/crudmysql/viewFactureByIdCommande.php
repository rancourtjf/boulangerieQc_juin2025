<?php
//header("Content-Type: application/json; charset=UTF_8");

header("Access-Control-Allow-Origin: *");
//header("Access-Control-Allow-Origin: https://www.boulangerieqc.com");
//header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Methods: PUT, GET, POST, PATCH,DELETE");
//header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: GET");


$db_host = $_GET["db_host"];
$db_username = $_GET["db_username"];
$db_name = $_GET["db_name"];
$db_password = $_GET["db_password"];

$id_commande = $_GET["id_commande"];



$method = $_SERVER['REQUEST_METHOD'];

if ($method == "OPTIONS") {
    die();
}

try {
    $conn = new PDO("mysql:host=$db_host;dbname=$db_name", $db_username, $db_password);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
   // echo "Connection à la base de donnée faite!";
  } catch(PDOException $e) {
    echo "Connection n'a pu être faite: " . $e->getMessage();
  }

if (isset($_GET['id_commande'])) {
    $client_idcommande = filter_var($_GET['id_commande'], FILTER_VALIDATE_INT, [
        'options' => [
            'default' => 'all_client',
            'min_range' => 1
        ]
    ]);
}

try {

    $sql = is_numeric($client_idcommande) ? "SELECT * FROM `facture` WHERE id_commande= $client_idcommande " : "SELECT * FROM `facture`";

    $stmt = $conn->prepare($sql);

    $stmt->execute();

    if ($stmt->rowCount() > 0) :

        $data = null;
        if (is_numeric($client_idcommande)) {
            $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
        } else {
            $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
        }

        echo json_encode([
            'success' => 1,
            'data' => $data,
        ]);

    else :
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