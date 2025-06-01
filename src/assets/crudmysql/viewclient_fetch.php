<?php
header("Content-Type: application/json; charset=UTF_8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, PATCH,DELETE");

$method = $_SERVER['REQUEST_METHOD'];

if ($method == "OPTIONS") {
    die();
}

$dossierCommandesWeb=$_GET["dossierCommandesWeb"];
$idclient = $_GET["idclient"];
$jwt=$_GET["tokenAuth"];


require 'cleSecreteJWT.php';
$secretKey=recupSecretKey();
require "mysqlUserLogin.php";
require 'functions.php';

try {
    // $parsedJwt = parseJwt($jwt);
    $validateJwt=validateJwt($jwt, $secretKey);
  //   var_dump($parsedJwt);
 
 } catch (UnexpectedValueException $e) {
     $erreur='Erreur : ' . $e->getMessage();
     echo json_encode([
         'success' => 0,
         'data' => 'Erreur : ' . $e->getMessage()]);
         exit;
 }
 

try {
    $conn = new PDO("mysql:host=$db_host;dbname=$db_name", $db_username, $db_password);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  //  echo "Connection à la base de donnée faite! dans viewCLient_Obj";
  } catch(PDOException $e) {
    echo "Connection n'a pu être faite: " . $e->getMessage();
  }

if (isset($idclient)) {
    $client_id = filter_var($idclient, FILTER_VALIDATE_INT, [
        'options' => [
            'default' => 'all_client',
            'min_range' => 1
        ]
    ]);
}

try {

    $sql = is_numeric($client_id) ? "SELECT * FROM `client` WHERE idclient='$client_id'" : "SELECT * FROM `client`";

    $stmt = $conn->prepare($sql);

    $stmt->execute();

    if ($stmt->rowCount() > 0) :

        $data = null;
        if (is_numeric($client_id)) {
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