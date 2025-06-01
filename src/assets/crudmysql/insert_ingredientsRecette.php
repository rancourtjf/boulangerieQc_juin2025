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
    $nom = htmlspecialchars(trim($data->nom));
    $quantite_r = htmlspecialchars(trim($data->quantite_r));
    $unite_a = htmlspecialchars(trim($data->unite_a));
    $recette_id = htmlspecialchars(trim($data->recette_id));

    $nom_recette = htmlspecialchars(trim($data->nom_recette));
    $Liste_prix_id = htmlspecialchars(trim($data->Liste_prix_id));
    $qteunite = htmlspecialchars(trim($data->qteunite));
    $Cout_r = htmlspecialchars(trim($data->Cout_r));
    $commentaires = htmlspecialchars(trim($data->commentaires));

    $Prix_vente_client_r = htmlspecialchars(trim($data->Prix_vente_client_r));
    $id_recette_sec = htmlspecialchars(trim($data->id_recette_sec));
    $masquage_sur_etiquette = htmlspecialchars(trim($data->masquage_sur_etiquette));


    $query = "INSERT INTO ingredientsRecette(
ID_4D,
nom,
quantite_r,
unite_a,
recette_id,
nom_recette,
Liste_prix_id,
qteunite,
Cout_r,
commentaires,
Prix_vente_client_r,
id_recette_sec,
masquage_sur_etiquette
)
    VALUES(:ID_4D,
    :nom,
    :quantite_r,
    :unite_a,
    :recette_id,
:nom_recette,
:Liste_prix_id,
:qteunite,
:Cout_r,
:commentaires,
:Prix_vente_client_r,
:id_recette_sec,
:masquage_sur_etiquette)";

    $stmt = $conn->prepare($query);

    $stmt->bindValue(':ID_4D', $ID_4D, PDO::PARAM_STR);
    $stmt->bindValue(':nom', $nom, PDO::PARAM_STR);
    $stmt->bindValue(':quantite_r', $quantite_r, PDO::PARAM_STR);
    $stmt->bindValue(':unite_a', $unite_a, PDO::PARAM_STR);
    $stmt->bindValue(':recette_id', $recette_id, PDO::PARAM_STR);
    $stmt->bindValue(':nom_recette', $nom_recette, PDO::PARAM_STR);

    $stmt->bindValue(':Liste_prix_id', $Liste_prix_id, PDO::PARAM_STR);
    $stmt->bindValue(':qteunite', $qteunite, PDO::PARAM_STR);
    $stmt->bindValue(':Cout_r', $Cout_r, PDO::PARAM_STR);
    $stmt->bindValue(':commentaires', $commentaires, PDO::PARAM_STR);
    $stmt->bindValue(':Prix_vente_client_r', $Prix_vente_client_r, PDO::PARAM_STR);

    $stmt->bindValue(':id_recette_sec', $id_recette_sec, PDO::PARAM_STR);
    $stmt->bindValue(':masquage_sur_etiquette', $masquage_sur_etiquette, PDO::PARAM_STR);


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

