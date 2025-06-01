<?php
header("Content-Type: application/json; charset=UTF_8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST,PUT,GET,DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");


$data = json_decode(file_get_contents("php://input"));

$dossierCommandesWeb = htmlspecialchars(trim($data->dossier));

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
    $idclient = htmlspecialchars(trim($data->idclient));
    $nomClient = htmlspecialchars(trim($data->nomClient));
    $lienURL = htmlspecialchars(trim($data->lienURL));
    $nom_commandeCSV = htmlspecialchars(trim($data->nom_commandeCSV));
    $dossier = htmlspecialchars(trim($data->dossier));
    $dateLundi = htmlspecialchars(trim($data->dateLundi));
    $montant = htmlspecialchars(trim($data->montant));
    $invendus = htmlspecialchars(trim($data->invendus));
    $paye = htmlspecialchars(trim($data->paye));

   

    $query = "INSERT INTO commandeWeb(
    idclient,
    nomClient,
    lienURL,
    nom_commandeCSV,
    dossier,
    dateLundi,
    montant,
    invendus,
    paye
    ) 
    VALUES(
:idclient,
:nomClient,
:lienURL,
:nom_commandeCSV,
:dossier,
:dateLundi,
:montant,
:invendus,
:paye
    )";

    $stmt = $conn->prepare($query);

    $stmt->bindValue(':idclient', $idclient, PDO::PARAM_STR);
    $stmt->bindValue(':nomClient', $nomClient, PDO::PARAM_STR);
    $stmt->bindValue(':lienURL', $lienURL, PDO::PARAM_STR);
    $stmt->bindValue(':nom_commandeCSV', $nom_commandeCSV, PDO::PARAM_STR);
    $stmt->bindValue(':dossier', $dossier, PDO::PARAM_STR);
    $stmt->bindValue(':dateLundi', $dateLundi, PDO::PARAM_STR);
    $stmt->bindValue(':montant', $montant, PDO::PARAM_STR);
    $stmt->bindValue(':invendus', $invendus, PDO::PARAM_STR);
    $stmt->bindValue(':paye', $paye, PDO::PARAM_STR);

    if ($stmt->execute()) {

        http_response_code(201);
        echo json_encode([
            'success' => 1,
            'message' => 'Data insere avec succes.'.'paye?'.$paye
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
