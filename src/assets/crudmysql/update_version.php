<?php
header("Content-Type: application/json; charset=UTF_8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: PUT,HEAD,GET,POST,DELETE");
//header("Access-Control-Allow-Origin: http://localhost:4200");
//header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$data = json_decode(file_get_contents("php://input"));

$dossierCommandesWeb = htmlspecialchars(trim($data->dossierCommandesWeb));

require "mysqlUserLogin.php";

$method = $_SERVER['REQUEST_METHOD'];

if ($method == "OPTIONS") {
    die();
}
// if ($_SERVER['REQUEST_METHOD'] !== 'PUT') :
//     http_response_code(405);
//     echo json_encode([
//         'success' => 0,
//         'message' => 'Bad Request detected! Only PUT method is allowed',
//     ]);
//     exit;
// endif;

try {
    $conn = new PDO("mysql:host=$db_host;dbname=$db_name", $db_username, $db_password);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "Connection à la base de donnée faite! dans versionnage";
} catch (PDOException $e) {
    echo "Connection n'a pu être faite: " . $e->getMessage();
}

try {


    $idMaj = htmlspecialchars(trim($data->idMaj));
    $version = htmlspecialchars(trim($data->version));
    $dateMaj = htmlspecialchars(trim($data->dateMaj));
    echo 'version='.$version;
    echo 'dateMaj='.$dateMaj;

    $dateMaj = date('Y-m-d');
    echo 'dateMaj='.$dateMaj;


    $fetch_post = "SELECT * FROM `versionnage` WHERE idMaj=:idMaj";
    $fetch_stmt = $conn->prepare($fetch_post);
    $fetch_stmt->bindValue(':idMaj', $data->idMaj, PDO::PARAM_INT);
    $fetch_stmt->execute();

    if ($fetch_stmt->rowCount() > 0) :



        $update_query = "UPDATE `versionnage` SET   dateMaj=:dateMaj,version = :version WHERE idMaj = :idMaj";
      
        
        $update_stmt = $conn->prepare($update_query);


        $update_stmt->bindValue(':dateMaj', $data->dateMaj, PDO::PARAM_INT);
        $update_stmt->bindValue(':version', $data->version, PDO::PARAM_INT);
        $update_stmt->bindValue(':idMaj', $data->idMaj, PDO::PARAM_INT);


        if ($update_stmt->execute()) {

            echo json_encode([
                'success' => 1,
                'message' => 'Data mis a jour version:' . $versionLogiciel
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
        'success' => 0,
        'message' => $e->getMessage()
    ]);
    exit;
}
