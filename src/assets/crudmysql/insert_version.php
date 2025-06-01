<?php
header("Content-Type: application/json; charset=UTF_8");
header("Access-Control-Allow-Origin: *");
//header("Access-Control-Allow-Origin: http://localhost:4200");
//header("Access-Control-Allow-Origin: https://www.boulangerieqc.com");
header('Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
// old 2023-10-26 18h15

$data = json_decode(file_get_contents("php://input"));

// $db_host = htmlspecialchars(trim($data->db_host));
// $db_name = htmlspecialchars(trim($data->db_name));
// $db_username = htmlspecialchars(trim($data->db_username));
// $db_password = htmlspecialchars(trim($data->db_password));

$dossierCommandesWeb = htmlspecialchars(trim($data->dossierCommandesWeb));

require "mysqlUserLogin.php";


try {
    $conn = new PDO("mysql:host=$db_host;dbname=$db_name", $db_username, $db_password);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    //echo "Connection à la base de donnée faite!";
} catch (PDOException $e) {
    echo "Connection n'a pu être faite: " . $e->getMessage();
}



try {
    $id = htmlspecialchars(trim($data->id));
    $idMaj = htmlspecialchars(trim($data->idMaj));
    $dateMaj = htmlspecialchars(trim($data->dateMaj));   
    $version = htmlspecialchars(trim($data->version));
    $message=htmlspecialchars(trim($data->message));

    $dateMaj = date('Y-m-d');

    $query = "INSERT INTO versionnage(
    id,
    idMaj,
    dateMaj,
    version,
    message
    ) 
    VALUES(
:id,
:idMaj,
:dateMaj,
:version,
:message
    )";

    $stmt = $conn->prepare($query);

    $stmt->bindValue(':id', $id, PDO::PARAM_STR);
    $stmt->bindValue(':idMaj', $idMaj, PDO::PARAM_STR);
    $stmt->bindValue(':dateMaj', $dateMaj, PDO::PARAM_STR);
    $stmt->bindValue(':version', $version, PDO::PARAM_STR);
    $stmt->bindValue(':message', $message, PDO::PARAM_STR);

  
    if ($stmt->execute()) {

        http_response_code(201);
        echo json_encode([
            'success' => 1,
            'message' => 'Data insere avec succes versionnage.'
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
