<?php
header("Content-Type: application/json; charset=UTF_8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: PUT,HEAD,GET,POST,OPTIONS,DELETE,PATCH");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


$data = json_decode(file_get_contents("php://input"));

$dossierCommandesWeb = htmlspecialchars(trim($data->dossierCommandesWeb));

require "mysqlUserLogin.php";

$id1Boulangerie = htmlspecialchars(trim($data->id1Boulangerie));   
$messageText = htmlspecialchars(trim($data->messageText));  
$dateMessage = htmlspecialchars(trim($data->dateMessage));  
$dossier = htmlspecialchars(trim($data->dossier));   
$dossierCommandesWeb = htmlspecialchars(trim($data->dossierCommandesWeb));


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
  

    $query = "INSERT INTO messageSiteWeb(
  id1Boulangerie,
  messageText,
  dateMessage,
  dossier
    ) 
    VALUES(
    :id1Boulangerie,
    :messageText,
    :dateMessage,
    :dossier
    )";

    $stmt = $conn->prepare($query);

    $stmt->bindValue(':id1Boulangerie', $id1Boulangerie, PDO::PARAM_STR);
    $stmt->bindValue(':messageText', $messageText, PDO::PARAM_STR);
    $stmt->bindValue(':dateMessage', $dateMessage, PDO::PARAM_STR);
    $stmt->bindValue(':dossier', $dossier, PDO::PARAM_STR);

  
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
        'success' => 0,
        'message' => $e->getMessage()
    ]);
    exit;
}