<?php
header("Content-Type: application/json; charset=UTF_8");
header("Access-Control-Allow-Origin: *");
//header("Access-Control-Allow-Origin: https://www.boulangerieqc.com");
//header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Methods: PUT, GET, POST, PATCH,DELETE");
header("Access-Control-Allow-Headers: *");
//header("Access-Control-Allow-Methods: GET");

$method = $_SERVER['REQUEST_METHOD'];

if ($method == "OPTIONS") {
    die();
}

$data = json_decode(file_get_contents("php://input"));

// $db_host = htmlspecialchars(trim($data->db_host));
// $db_name = htmlspecialchars(trim($data->db_name));
// $db_username = htmlspecialchars(trim($data->db_username));
// $db_password = htmlspecialchars(trim($data->db_password));

$dossierCommandesWeb = htmlspecialchars(trim($data->dossierCommandesWeb));

require "mysqlUserLogin.php";

$ID_recette = htmlspecialchars(trim($data->ID_recette));
$nomDepotListePrix = htmlspecialchars(trim($data->nomDepotListePrix));

try {
    $conn = new PDO("mysql:host=$db_host;dbname=$db_name", $db_username, $db_password);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  //  echo "Connection à la base de donnée faite! dans viewCLient_Obj";
  } catch(PDOException $e) {
    echo "Connection n'a pu être faite: " . $e->getMessage();
  }

if (isset($ID_recette)) {
    $ID_recette = filter_var($ID_recette, FILTER_VALIDATE_INT, [
        'options' => [
            'default' => 'all_recette',
            'min_range' => 1
        ]
    ]);
}

try {

    $sql = is_numeric($ID_recette) ? "SELECT * FROM `recettes` WHERE ID_recette='$ID_recette' AND nomDepotListePrix='$nomDepotListePrix'" : "SELECT * FROM `recettes`";

    $stmt = $conn->prepare($sql);

    $stmt->execute();

    if ($stmt->rowCount() > 0) :

        $data = null;
        if (is_numeric($ID_recette)) {
            $data = $stmt->fetch(PDO::FETCH_ASSOC);
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