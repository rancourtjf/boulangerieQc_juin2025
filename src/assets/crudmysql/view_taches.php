<?php
header("Content-Type: application/json; charset=UTF_8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, PATCH,DELETE");

// view_taches.php

$method = $_SERVER['REQUEST_METHOD'];

if ($method == "OPTIONS") {
    die();
}
$data = json_decode(file_get_contents("php://input"));

$dossierCommandesWeb=$_GET["dossierCommandesWeb"];
$jwt=$_GET["tokenAuth"];

$noEquipe=$_GET["noEquipe"];
$nomEquipe=$_GET["nomEquipe"];
//$noEquipe=htmlspecialchars(trim($data->noEquipe));


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

  if (isset($noEquipe)) {
    $noEquipe= filter_var($nomEquipe, FILTER_VALIDATE_INT, [
        'options' => [
            'default' => 'all_taches',
            'min_range' => 1
        ]
    ]);
}
$date_actuelle = date('Y-m-d');

try {

    $sql = (!($nomEquipe==="")) ? "SELECT * FROM taches WHERE nomEquipe='$nomEquipe' AND datePrevue ='$date_actuelle' OR  (fait = 0 AND datePrevue <'$date_actuelle') ORDER BY datePrevue DESC, fait DESC" : "SELECT * FROM taches ORDER BY datePrevue DESC, fait DESC";

    $stmt = $conn->prepare($sql);

    $stmt->execute();

    if ($stmt->rowCount() > 0) :
        $data = null;
        if (is_numeric($noEquipe)) {
            $data = $stmt->fetch(PDO::FETCH_ASSOC);
        } else {
            $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
        }
      
         echo json_encode([
            'success' => 1,
            'data' => $data,
            'tokenAccept'=>$validateJwt
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