<?php
header("Content-Type: application/json; charset=UTF_8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST,PUT,GET");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");



$db_host = $_GET["db_host"];
$db_username = $_GET["db_username"];
$db_name = $_GET["db_name"];
$db_password = $_GET["db_password"];

$idclient = $_GET["idclient"];
$courriel = $_GET["courriel"];
$googlemap = $_GET["googlemap"];
$adresse = $_GET["adresse"];
$ville = $_GET["ville"];
$codepostal = $_GET["codepostal"];
$telephone = $_GET["telephone"];
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
    $fetch_post = "SELECT * FROM `boulanger` WHERE idclient=:idclient";
    $fetch_stmt = $conn->prepare($fetch_post);
    $fetch_stmt->bindValue(':idclient', $data->$idclient, PDO::PARAM_INT);
    $fetch_stmt->execute();

    if ($fetch_stmt->rowCount() > 0) :
        //echo 'AAA';
           $row = $fetch_stmt->fetch(PDO::FETCH_ASSOC);
           $idclient = isset($data->$idclient) ? $data->$idclient : $row['idclient'];
           $courriel = isset($data->$courriel) ? $data->$courriel : $row['courriel'];
           $googlemap = isset($data->$googlemap) ? $data->$googlemap : $row['googlemap'];
           $adresse = isset($data->$adresse) ? $data->$adresse : $row['adresse'];
           $ville = isset($data->$ville) ? $data->$ville : $row['ville'];
           $codepostal = isset($data->$codepostal) ? $data->$codepostal : $row['codepostal'];
           $telephone = isset($data->$telephone) ? $data->$telephone : $row['telephone'];
           $nom = isset($data->$nom) ? $data->$nom : $row['nom'];


           endif;

    $courriel = htmlspecialchars(trim($courriel));
    $googlemap = htmlspecialchars(trim($googlemap));
    $adresse = htmlspecialchars(trim($adresse));
    $ville = htmlspecialchars(trim($ville));
    $codepostal = htmlspecialchars(trim($codepostal));
    $telephone = htmlspecialchars(trim($telephone));
    $nom = htmlspecialchars(trim($nom));

    $query = "UPDATE  boulanger SET
        idclient=:idclient,courriel=:courriel,googlemap=:googlemap,adresse=:adresse,ville=:ville,codepostal=:codepostal,
        telephone=:telephone,nom=:nom WHERE idclient=:idclient";
 
    $stmt = $conn->prepare($query);
 
    $stmt->bindValue(':idclient', $idclient, PDO::PARAM_STR);
    $stmt->bindValue(':courriel', $courriel, PDO::PARAM_STR);
    $stmt->bindValue(':googlemap', $googlemap, PDO::PARAM_STR);
    $stmt->bindValue(':adresse', $adresse, PDO::PARAM_STR);
    $stmt->bindValue(':ville', $ville, PDO::PARAM_STR);
    $stmt->bindValue(':codepostal', $codepostal, PDO::PARAM_STR);
    $stmt->bindValue(':telephone', $telephone, PDO::PARAM_STR);
    $stmt->bindValue(':nom', $nom, PDO::PARAM_STR);

    

    if ($stmt->execute()) {
 
        http_response_code(201);
        echo json_encode([
            'success' => 1,
            'message' => 'Données mises à jour'
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
