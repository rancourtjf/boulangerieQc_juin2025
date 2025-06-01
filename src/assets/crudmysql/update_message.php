<?php
header("Content-Type: application/json; charset=UTF_8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: PUT,HEAD,GET,POST,DELETE");

$data = json_decode(file_get_contents("php://input"));

$dossierCommandesWeb = htmlspecialchars(trim($data->dossierCommandesWeb));

require "mysqlUserLogin.php";

$method = $_SERVER['REQUEST_METHOD'];

if ($method == "OPTIONS") {
    die();
}

try {
    $conn = new PDO("mysql:host=$db_host;dbname=$db_name", $db_username, $db_password);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "Connection à la base de donnée faite! dans update_message";
} catch (PDOException $e) {
    echo "Connection n'a pu être faite: " . $e->getMessage();
}

try {

    $messageText = htmlspecialchars(trim($data->messageText));
    $dateMessage = htmlspecialchars(trim($data->dateMessage));
    $id1Boulangerie = htmlspecialchars(trim($data->id1Boulangerie));
    $dossier = htmlspecialchars(trim($data->dossier));

    $fetch_post = "SELECT * FROM `messageSiteWeb` WHERE id1Boulangerie=:id1Boulangerie AND dossier=:dossier";
    $fetch_stmt = $conn->prepare($fetch_post);
    $fetch_stmt->bindValue(':id1Boulangerie', $data->id1Boulangerie, PDO::PARAM_INT);
    $fetch_stmt->bindValue(':dossier', $data->dossier, PDO::PARAM_INT);
    $fetch_stmt->execute();

    if ($fetch_stmt->rowCount() > 0) :

       //$timestamp = date('Y-m-d H:i:s');
       $dateMessage = date('Y-m-d ');

        $update_query = "UPDATE `messageSiteWeb` SET   messageText=:messageText,dateMessage=:dateMessage WHERE id1Boulangerie=:id1Boulangerie AND dossier=:dossier";
        $update_stmt = $conn->prepare($update_query);


        $update_stmt->bindValue(':messageText', $data->messageText, PDO::PARAM_INT);
        $update_stmt->bindValue(':dateMessage', $data->dateMessage, PDO::PARAM_INT);


        if ($update_stmt->execute()) {

            echo json_encode([
                'success' => 1,
                'message' => 'Data mis a jour du message' 
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
