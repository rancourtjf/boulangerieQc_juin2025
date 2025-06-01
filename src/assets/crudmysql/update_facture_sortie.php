<?php
header("Content-Type: application/json; charset=UTF_8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: PUT,HEAD,GET,POST,DELETE");

$data = json_decode(file_get_contents("php://input"));

$dossierCommandesWeb = htmlspecialchars(trim($data->dossierCommandesWeb));

require "mysqlUserLogin.php";

$method = $_SERVER['REQUEST_METHOD'];

if ($method == "OPTIONS") {
    die();
}

try {
    $conn = new PDO("mysql:host=$db_host;dbname=$db_name", $db_username, $db_password);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    //  echo "Connection à la base de donnée faite! dans update_factureObj";
} catch (PDOException $e) {
    echo "Connection n'a pu être faite: " . $e->getMessage();
}

try {

    $id_impression_facture= htmlspecialchars(trim($data->id_impression_facture));
    $type_facture= htmlspecialchars(trim($data->type_facture));
    $dateProd= htmlspecialchars(trim($data->dateProd));
    $montant= htmlspecialchars(trim($data->montant));
    $livree = htmlspecialchars(trim($data->livree));
    $date_paiement = htmlspecialchars(trim($data->date_paiement));
    $url_facture = htmlspecialchars(trim($data->url_facture));
    $nom_facture = htmlspecialchars(trim($data->nom_facture));
    $total_est_paye = htmlspecialchars(trim($data->total_est_paye));
    $dossierClassement = htmlspecialchars(trim($data->dossierClassement));


    $fetch_post = "SELECT * FROM `facture` WHERE id_impression_facture=:id_impression_facture";
    $fetch_stmt = $conn->prepare($fetch_post);
    $fetch_stmt->bindValue(':id_impression_facture', $data->id_impression_facture, PDO::PARAM_INT);
    $fetch_stmt->execute();

    if ($fetch_stmt->rowCount() > 0) :

        $update_query = "UPDATE `facture` SET  montant=:montant,livree=:livree,date_livraison =:date_livraison,heure_livraison =:heure_livraison,
date_paiement=:date_paiement,total_est_paye=:total_est_paye
   WHERE id_commande = :id_commande";

        $update_stmt = $conn->prepare($update_query);

        //$update_stmt->bindValue(':idclient', $data->idclient, PDO::PARAM_INT);
        $update_stmt->bindValue(':  id_impression_facture', $data->  id_impression_facture, PDO::PARAM_INT);
        $update_stmt->bindValue(':type_facture', $data->type_facture, PDO::PARAM_INT);
        $update_stmt->bindValue(':dateProd', $data->dateProd, PDO::PARAM_INT);
        $update_stmt->bindValue(':montant', $data->montant, PDO::PARAM_INT);
        $update_stmt->bindValue(':livree', $data->livree, PDO::PARAM_INT);
        $update_stmt->bindValue(':date_paiement', $data->date_paiement, PDO::PARAM_INT);
        $update_stmt->bindValue(':url_facture', $data->url_facture, PDO::PARAM_INT);
        $update_stmt->bindValue(':nom_facture', $data->nom_facture, PDO::PARAM_INT);
        $update_stmt->bindValue(':total_est_paye', $data->total_est_paye, PDO::PARAM_INT);
        $update_stmt->bindValue(':dossierClassement', $data->dossierClassement, PDO::PARAM_INT);


        if ($update_stmt->execute()) {

            echo json_encode([
                'success' => 1,
                'message' => 'Data mis a jour'
            ]);
            exit;
        }

        echo json_encode([
            'success' => 0,
            'message' => 'Did not udpate. Something went  wrong.'
        ]);
        exit;

    else :
        echo json_encode(['success' => 0, 'message' => 'Invalid ID. No record found by the ID.']);
        exit;
    endif;
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'success' => 0,
        'message' => $e->getMessage()
    ]);
    exit;
}
