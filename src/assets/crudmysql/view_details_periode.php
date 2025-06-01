<?php
header("Content-Type: application/json; charset=UTF_8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, PATCH,DELETE");
//view_details_periode.php


$dossierCommandesWeb = $_GET["dossierCommandesWeb"];
// La chaîne de caractères représentant la date
$startDate = $_GET["startDate"];
$endDate = $_GET["endDate"];
$id_client = $_GET["id_client"];
$unProduit = $_GET["unProduit"];


require "mysqlUserLogin.php";


$method = $_SERVER['REQUEST_METHOD'];

if ($method == "OPTIONS") {
    die();
}

try {
    $conn = new PDO("mysql:host=$db_host;dbname=$db_name", $db_username, $db_password);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
   // echo "Connection à la base de donnée faite!";
  } catch(PDOException $e) {
    echo "Connection n'a pu être faite: " . $e->getMessage();
  }


if (isset($id_detail)) {
    $id_client = filter_var($id_client, FILTER_VALIDATE_INT, [
        'options' => [
            'default' => 'all_detail',
            'min_range' => 1
        ]
    ]);
}

try {

    if($unProduit!=""){

      //  $sql = is_numeric($id_client) ? "SELECT * FROM `detailproduit` WHERE id_client= $id_client and date_Prod BETWEEN '$startDate' AND '$endDate' " : "SELECT * FROM `detailproduit` WHERE date_Prod BETWEEN '$startDate' AND '$endDate'";

      //  $sql = is_numeric($id_client) ? "SELECT * FROM `detailproduit` WHERE id_client= '$id_client' and nom_produit = '$unProduit' AND date_Prod BETWEEN '$startDate' AND '$endDate' " : "SELECT * FROM `detailproduit` WHERE  nom_produit = '$unProduit' AND date_Prod BETWEEN '$startDate' AND '$endDate'";
        $sql = ($id_client!=0) ? "SELECT * FROM `detailproduit` WHERE id_client= '$id_client' and nom_produit = '$unProduit' AND date_Prod BETWEEN '$startDate' AND '$endDate' " : "SELECT * FROM `detailproduit` WHERE  nom_produit = '$unProduit' AND date_Prod BETWEEN '$startDate' AND '$endDate'";

   
    }
    else{
      //  $sql = is_numeric($id_client) ? "SELECT * FROM `detailproduit` WHERE id_client= $id_client and date_Prod BETWEEN '$startDate' AND '$endDate' " : "SELECT * FROM `detailproduit` WHERE date_Prod BETWEEN '$startDate' AND '$endDate'";

        $sql = ($id_client!=0) ? "SELECT * FROM `detailproduit` WHERE id_client= $id_client and date_Prod BETWEEN '$startDate' AND '$endDate' " : "SELECT * FROM `detailproduit` WHERE date_Prod BETWEEN '$startDate' AND '$endDate'";
    }
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    if ($stmt->rowCount() > 0) :

        $data = null;
   
            $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
      

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