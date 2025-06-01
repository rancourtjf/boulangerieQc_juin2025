<?php
header("Content-Type: application/json; charset=UTF_8");
header("Access-Control-Allow-Origin: *");
//header("Access-Control-Allow-Origin: http://localhost:4200");
//header("Access-Control-Allow-Origin: https://www.boulangerieqc.com/students/crydmysql/insert.php");
//header("Access-Control-Allow-Origin: https://www.boulangerieqc.com");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");



$db_host = $_GET["db_host"];
$db_username = $_GET["db_username"];
$db_name = $_GET["db_name"];
$db_password = $_GET["db_password"];

$idclient = $_GET["idclient"];
$id_commande = $_GET["id_commande"];
$type_facture = $_GET["type_facture"];
$dateProd = $_GET["dateProd"];
$montant = $_GET["montant"];
$livree = $_GET["livree"];
$date_livraison = $_GET["date_livraison"];
$heure_livraison = $_GET["heure_livraison"];
$date_paiement = $_GET["date_paiement"];
$url_facture = $_GET["url_facture"];
$nom_facture = $_GET["nom_facture"];
$jourdelasemaine = $_GET["jourdelasemaine"];


try {
    $conn = new PDO("mysql:host=$db_host;dbname=$db_name", $db_username, $db_password);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "Connection à la base de donnée faite!";
  } catch(PDOException $e) {
    echo "Connection n'a pu être faite: " . $e->getMessage();
  }

try {

    $type_facture = htmlspecialchars(trim($type_facture));
    $url_facture = htmlspecialchars(trim($url_facture));
    $nom_facture = htmlspecialchars(trim($nom_facture));
    $jourdelasemaine = htmlspecialchars(trim($jourdelasemaine));

    $query = "INSERT INTO facture(
    idclient,
    id_commande,
    type_facture,
    dateProd,
    montant,
    livree,
    date_livraison,
    heure_livraison,
    date_paiement,
    url_facture,
    nom_facture,
    jourdelasemaine
    ) 
    VALUES(
:idclient,
 :id_commande,
 :type_facture,
 :dateProd,
 :montant,
 :livree,
 :date_livraison,
 :heure_livraison,
 :date_paiement,
 :url_facture,
 :nom_facture,
 :jourdelasemaine
    )";
 
    $stmt = $conn->prepare($query);
 
    $stmt->bindValue(':idclient', $idclient, PDO::PARAM_STR);
    $stmt->bindValue(':id_commande', $id_commande, PDO::PARAM_STR);
    $stmt->bindValue(':type_facture', $type_facture, PDO::PARAM_STR);
    $stmt->bindValue(':dateProd', $dateProd, PDO::PARAM_STR);
    $stmt->bindValue(':montant', $montant, PDO::PARAM_STR);
    $stmt->bindValue(':livree', $livree, PDO::PARAM_STR);
    $stmt->bindValue(':date_livraison', $date_livraison, PDO::PARAM_STR);
    $stmt->bindValue(':heure_livraison', $heure_livraison, PDO::PARAM_STR);
    $stmt->bindValue(':date_paiement', $date_paiement, PDO::PARAM_STR);
    $stmt->bindValue(':url_facture', $url_facture, PDO::PARAM_STR);
    $stmt->bindValue(':nom_facture', $nom_facture, PDO::PARAM_STR);
    $stmt->bindValue(':jourdelasemaine', $jourdelasemaine, PDO::PARAM_STR);


    if ($stmt->execute()) {
 
        http_response_code(201);
        echo json_encode([
            'success' => 1,
            'message' => 'Data Inserted Successfully.'
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
