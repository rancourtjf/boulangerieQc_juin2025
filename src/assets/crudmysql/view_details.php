<?php
header("Content-Type: application/json; charset=UTF_8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, PATCH,DELETE");
// Activez tous les rapports d'erreurs
error_reporting(E_ALL);
ini_set('display_errors', 1);


$dossierCommandesWeb = $_GET["dossierCommandesWeb"];
$date_prod=$_GET["date_prod"];

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
  } catch(PDOException $e) {
    echo "Connection n'a pu être faite: " . $e->getMessage();
  }

// if (isset($id_detail)) {
//     $id_client = filter_var($id_client, FILTER_VALIDATE_INT, [
//         'options' => [
//             'default' => 'all_detail',
//             'min_range' => 1
//         ]
//     ]);
// }



try {
   // $sql = is_numeric($id_client) ? "SELECT * FROM `detailproduit` WHERE id_client= $id_client AND date_prod=$date_prod" : "SELECT * FROM `detailproduit` WHERE date_prod=$date_prod";
    $sql =  "SELECT * FROM `detailproduit` WHERE date_prod=$date_prod";

    $stmt = $conn->prepare($sql);
    $stmt->execute();
    if ($stmt->rowCount() > 0) :

        $data = null;
   
            $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
      
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