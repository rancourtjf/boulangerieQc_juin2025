<?php
header("Content-Type: application/json; charset=UTF_8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: PUT, GET, POST, PATCH,DELETE");

//view_fournisseurJWT.php
$data = json_decode(file_get_contents("php://input"));

$dossierCommandesWeb=$_GET["dossierCommandesWeb"];
$jwt=$_GET["tokenAuth"];

require 'cleSecreteJWT.php';
$secretKey=recupSecretKey();
require "mysqlUserLogin.php";
require 'functions.php';


$id= htmlspecialchars(trim($data->id));
$id=$_GET["id"];


$method = $_SERVER['REQUEST_METHOD'];

if ($method == "OPTIONS") {
    die();
}

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
   // echo "Connection à la base de donnée faite!";
  } catch(PDOException $e) {
    echo "Connection n'a pu être faite: " . $e->getMessage();
  }

if (isset($id)) {
    $id = filter_var($id, FILTER_VALIDATE_INT, [
        'options' => [
            'default' => 'all_fournisseur',
            'min_range' => 1
        ]
    ]);
}

try {

    $sql = is_numeric($id) ? "SELECT * FROM `fournisseurs` WHERE id= '$id' " : "SELECT * FROM `fournisseurs`";

    $stmt = $conn->prepare($sql);

    $stmt->execute();

    if ($stmt->rowCount() > 0) :

        $data = null;
        if (is_numeric($id)) {
            $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
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