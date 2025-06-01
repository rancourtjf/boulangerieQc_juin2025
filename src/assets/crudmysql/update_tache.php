<?php
header("Content-Type: application/json; charset=UTF_8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: PUT,HEAD,GET,POST,DELETE");

// Activez tous les rapports d'erreurs
error_reporting(E_ALL);
ini_set('display_errors', 1);


$data = json_decode(file_get_contents("php://input"));
$dossierCommandesWeb = htmlspecialchars(trim($data->dossierCommandesWeb));

echo ("dossierCommandesWeb=").$dossierCommandesWeb;
require "mysqlUserLogin.php";

try {
    $conn = new PDO("mysql:host=$db_host;dbname=$db_name", $db_username, $db_password);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "Connection à la base de donnée faite! dans update_message";
} catch (PDOException $e) {
    echo "Connection n'a pu être faite: " . $e->getMessage();
}

try {

    $ID = htmlspecialchars(trim($data->ID));
    $initiales = htmlspecialchars(trim($data->initiales));
    $fait = htmlspecialchars(trim($data->fait));

 

    $fetch_post = "SELECT * FROM `taches` WHERE ID=:ID";
    $fetch_stmt = $conn->prepare($fetch_post);
    $fetch_stmt->bindValue(':ID', $data->ID, PDO::PARAM_INT);
    $fetch_stmt->execute();

    if ($fetch_stmt->rowCount() > 0) :

        $update_query = "UPDATE `taches` SET   
        
   initiales=:initiales,fait=:fait WHERE ID=:ID";
        $update_stmt = $conn->prepare($update_query);


    $update_stmt->bindValue(':ID', $ID, PDO::PARAM_STR);
    $update_stmt->bindValue(':initiales', $initiales, PDO::PARAM_STR);
    $update_stmt->bindValue(':fait', $fait, PDO::PARAM_STR);


        if ($update_stmt->execute()) {

            echo json_encode([
                'success' => 1,
                'message' => 'Data mis a jour de la tache' 
            ]);
            exit;
        }

        echo json_encode([
            'success' => 0,
            'message' => 'Did not udpate. Something went  wrong.'
        ]);
        exit;

    else :
        echo json_encode(['success' => 0, 'message' => 'Invalid ID. No record found by the ID.']);
        exit;
    endif;
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
