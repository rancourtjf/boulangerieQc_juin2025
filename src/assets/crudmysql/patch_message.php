<?php
header("Content-Type: application/json; charset=UTF_8");
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE,PATCH');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

$data = json_decode(file_get_contents("php://input"));

$db_host = htmlspecialchars(trim($data->db_host));
$db_name = htmlspecialchars(trim($data->db_name));
$db_username = htmlspecialchars(trim($data->db_username));
$db_password = htmlspecialchars(trim($data->db_password));

$id1Boulangerie = htmlspecialchars(trim($data->id1Boulangerie));   
$messageText = htmlspecialchars(trim($data->messageText));  
$dateMessage = htmlspecialchars(trim($data->dateMessage));  
$dossier = htmlspecialchars(trim($data->dossier));   

try {
    $conn = new PDO("mysql:host=$db_host;dbname=$db_name", $db_username, $db_password);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "Connection à la base de donnée faite!";
    echo" id1Boulangerie=".$id1Boulangerie;
    echo" messageText=".$messageText;
    echo" dateMessage=".$dateMessage;
    echo" dossier=".$dossier;

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