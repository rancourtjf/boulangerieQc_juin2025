<?php
header("Content-Type: application/json; charset=UTF_8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
//header("Access-Control-Allow-Origin: https://www.boulangerieqc.com");
//header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Methods: PUT, GET, POST, PATCH,DELETE");

//viewProdRecettesObj.php permet de récupérer les recettes pour une journée de production donnée


$dossierCommandesWeb=$_GET["dossierCommandesWeb"];
$dossierCommandesWeb=htmlspecialchars(trim($dossierCommandesWeb));


$dateProd = $_GET["dateProd"];
$dateProd=htmlspecialchars(trim($dateProd));

require "mysqlUserLogin.php";

$categorie = 'recettes';

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

   //$sql = "SELECT * FROM `Production` WHERE dateProd= $dateProd";
   $sql = "SELECT * FROM `Production` WHERE categorie != ''";

  // $sql = "SELECT * FROM `Production`";

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
            'message' => 'Pas de recette trouvée!',
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
