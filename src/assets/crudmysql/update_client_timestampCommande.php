<?php
header("Content-Type: application/json; charset=UTF_8");
header("Access-Control-Allow-Origin: *");
//header("Access-Control-Allow-Origin: http://localhost:4200");
//header("Access-Control-Allow-Origin: https://www.boulangerieqc.com/students/crydmysql/insert.php");
//header("Access-Control-Allow-Origin: https://www.boulangerieqc.com");
header("Access-Control-Allow-Methods: POST,PUT,GET,DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");


$data = json_decode(file_get_contents("php://input"));

// $db_host = htmlspecialchars(trim($data->db_host));
// $db_name = htmlspecialchars(trim($data->db_name));
// $db_username = htmlspecialchars(trim($data->db_username));
// $db_password = htmlspecialchars(trim($data->db_password));

$dossierCommandesWeb = htmlspecialchars(trim($data->dossier));

require "mysqlUserLogin.php";

$idclient = htmlspecialchars(trim($data->idclient));


try {
    $conn = new PDO("mysql:host=$db_host;dbname=$db_name", $db_username, $db_password);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
   echo "Connection à la base de donnée faite!";
  } catch(PDOException $e) {
    echo "Connection n'a pu être faite: " . $e->getMessage();
  }

 
try {

    $idclient = htmlspecialchars(trim($data->idclient));
  
    $timestampNewCommande = date('Y-m-d H:i:s');

    $fetch_post = "SELECT * FROM `client` WHERE idclient=:idclient";
    $fetch_stmt = $conn->prepare($fetch_post);
    $fetch_stmt->bindValue(':idclient', $data->$idclient, PDO::PARAM_INT);
    $fetch_stmt->execute();

    if ($fetch_stmt->rowCount() > 0) :
        //echo 'AAA';
           $row = $fetch_stmt->fetch(PDO::FETCH_ASSOC);
           $idclient = isset($data->$idclient) ? $data->$idclient : $row['idclient'];
           endif;


    $query = "UPDATE  client SET
        timestampNewCommande=:timestampNewCommande WHERE idclient=:idclient";
 
    $stmt = $conn->prepare($query);
 
    $stmt->bindValue(':idclient', $idclient, PDO::PARAM_STR);
    $stmt->bindValue(':timestampNewCommande', $timestampNewCommande, PDO::PARAM_STR);

    if ($stmt->execute()) {
 
        http_response_code(201);
        echo json_encode([
            'success' => 1,
            'message' => 'Donnees mises a jour timestampNewCommande'
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
