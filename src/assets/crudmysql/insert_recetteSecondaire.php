<?php
header("Content-Type: application/json; charset=UTF_8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

$data = json_decode(file_get_contents("php://input"));

$dossierCommandesWeb = htmlspecialchars(trim($data->dossierCommandesWeb));

require "mysqlUserLogin.php";

try {
    $conn = new PDO("mysql:host=$db_host;dbname=$db_name", $db_username, $db_password);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  // echo "Connection à la base de donnée faite!";

  } catch(PDOException $e) {
    echo "Connection n'a pu être faite: " . $e->getMessage();
  }

try {

    $ID_4D = htmlspecialchars(trim($data->ID_4D));
    $nom_recette_sec = htmlspecialchars(trim($data->nom_recette_sec));
    $id_recette_sec = htmlspecialchars(trim($data->id_recette_sec));
    $id_recette_master = htmlspecialchars(trim($data->id_recette_master));
    $qte_Kg = htmlspecialchars(trim($data->qte_Kg));

    $poids_total_recette_base = htmlspecialchars(trim($data->poids_total_recette_base));
    $pate_principale_b = htmlspecialchars(trim($data->pate_principale_b));

    $query = "INSERT INTO recetteSecondaire(
ID_4D,
nom_recette_sec,
id_recette_sec,
id_recette_master,
qte_Kg,
poids_total_recette_base,
pate_principale_b
)
    VALUES(:ID_4D,
    :nom_recette_sec,
    :id_recette_sec,
    :id_recette_master,
    :qte_Kg,
    :poids_total_recette_base,
    :pate_principale_b)";

    $stmt = $conn->prepare($query);

    $stmt->bindValue(':ID_4D', $ID_4D, PDO::PARAM_INT);
    $stmt->bindValue(':nom_recette_sec', $nom_recette_sec, PDO::PARAM_STR);
    $stmt->bindValue(':id_recette_sec', $id_recette_sec, PDO::PARAM_INT);
    $stmt->bindValue(':id_recette_master', $id_recette_master, PDO::PARAM_INT);
    $stmt->bindValue(':qte_Kg', $qte_Kg, PDO::PARAM_STR);

    $stmt->bindValue(':poids_total_recette_base', $poids_total_recette_base, PDO::PARAM_STR);
    $stmt->bindValue(':pate_principale_b', $pate_principale_b, PDO::PARAM_STR);

    if ($stmt->execute()) {

        http_response_code(201);
        echo json_encode([
            'success' => 1,
            'message' => 'Data insere avec succes message.'
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
        'error' => true,
        'message' => $e->getMessage(),
        'file' => $e->getFile(),
        'line' => $e->getLine()
    ]);
    exit();
}

