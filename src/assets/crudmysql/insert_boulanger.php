<?php
header("Content-Type: application/json; charset=UTF_8");
header("Access-Control-Allow-Origin: *");
//header("Access-Control-Allow-Origin: http://localhost:4200");
//header("Access-Control-Allow-Origin: https://www.boulangerieqc.com/students/crydmysql/insert.php");
//header("Access-Control-Allow-Origin: https://www.boulangerieqc.com");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");


require 'baseMysql.php';

echo 'apres le require baseMysql.php' . $db_host;

$db_host = $_GET["db_host"];
$db_username = $_GET["db_username"];
$db_name = $_GET["db_name"];
$db_password = $_GET["db_password"];

$idclient = $_GET["idclient"];
$courriel = $_GET["courriel"];
$googlemap =$_GET["googlemap"];
$adresse = $_GET["adresse"];
$ville = $_GET["ville"];
$codepostal = $_GET["codepostal"];
$telephone = $_GET["telephone"];
$courrielcommande = $_GET["courrielcommande"];
$nom = $_GET["nom"];




try {
    $conn = new PDO("mysql:host=$db_host;dbname=$db_name", $db_username, $db_password);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "Connection à la base de donnée faite!";
  } catch(PDOException $e) {
    echo "Connection n'a pu être faite: " . $e->getMessage();
  }

 
try {


    $courriel = htmlspecialchars(trim($courriel));
    $googlemap = htmlspecialchars(trim($googlemap));
    $adresse = htmlspecialchars(trim($adresse));
    $ville = htmlspecialchars(trim($ville));
    $codepostal = htmlspecialchars(trim($codepostal));
    $telephone = htmlspecialchars(trim($telephone));
    $courrielcommande = htmlspecialchars(trim($courrielcommande));
    $nom = htmlspecialchars(trim($nom));
    $passwordHash = htmlspecialchars(trim($passwordHash));



$hash=password_hash($passwordHash, PASSWORD_DEFAULT);

    $query = "INSERT INTO boulanger(
    idclient,
    nom,
    googlemap,
    courriel,
   adresse,
   ville,
   codepostal,
   telephone,
   courrielcommande,
   passwordHash
    ) 
    VALUES(
:idclient,
 :nom,
 :googlemap,
 :courriel,
 :adresse,
 :ville,
 :codepostal,
 :telephone,
 :courrielcommande,
 :passwordHash
    )";
 
    $stmt = $conn->prepare($query);
 
    $stmt->bindValue(':idclient', $idclient, PDO::PARAM_STR);
    $stmt->bindValue(':courriel', $courriel, PDO::PARAM_STR);
    $stmt->bindValue(':googlemap', $googlemap, PDO::PARAM_STR);
    $stmt->bindValue(':adresse', $adresse, PDO::PARAM_STR);
    $stmt->bindValue(':ville', $ville, PDO::PARAM_STR);
    $stmt->bindValue(':codepostal', $codepostal, PDO::PARAM_STR);
    $stmt->bindValue(':telephone', $telephone, PDO::PARAM_STR);
    $stmt->bindValue(':courrielcommande', $courrielcommande, PDO::PARAM_STR);
    $stmt->bindValue(':nom', $nom, PDO::PARAM_STR);
    $stmt->bindValue(':passwordHash', $db_password, PDO::PARAM_STR);

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
