<?php
header("Content-Type: application/json; charset=UTF_8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: PUT,HEAD,GET,POST,DELETE");

$data = json_decode(file_get_contents("php://input"));

// $db_host = htmlspecialchars(trim($data->db_host));
// $db_name = htmlspecialchars(trim($data->db_name));
// $db_username = htmlspecialchars(trim($data->db_username));
// $db_password = htmlspecialchars(trim($data->db_password));

$dossierCommandesWeb = htmlspecialchars(trim($data->dossierCommandesWeb));

require "mysqlUserLogin.php";

 $method = $_SERVER['REQUEST_METHOD'];

if ($method == "OPTIONS") {
    die();
}
// if ($_SERVER['REQUEST_METHOD'] !== 'PUT') :
//     http_response_code(405);
//     echo json_encode([
//         'success' => 0,
//         'message' => 'Bad Request detected! Only PUT method is allowed',
//     ]);
//     exit;
// endif;

try {
    $conn = new PDO("mysql:host=$db_host;dbname=$db_name", $db_username, $db_password);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  //  echo "Connection à la base de donnée faite! dans update_factureObj";
  } catch(PDOException $e) {
    echo "Connection n'a pu être faite: " . $e->getMessage();
  }

try {
 

    $id_commande = htmlspecialchars(trim($data->id_commande));
    $livree = htmlspecialchars(trim($data->livree));
    $datedelivraison = htmlspecialchars(trim($data->datedelivraison));
    $heuredelivraison = htmlspecialchars(trim($data->heuredelivraison));
    $date_livraison = htmlspecialchars(trim($data->date_livraison));
    $heure_livraison = htmlspecialchars(trim($data->heure_livraison));



    $fetch_post = "SELECT * FROM `facture` WHERE id_commande=:id_commande";
    $fetch_stmt = $conn->prepare($fetch_post);
    $fetch_stmt->bindValue(':id_commande', $data->id_commande, PDO::PARAM_INT);
    $fetch_stmt->execute();

    if ($fetch_stmt->rowCount() > 0) :

$update_query = "UPDATE `facture` SET  livree=:livree,
datedelivraison=:datedelivraison,
heuredelivraison=:heuredelivraison,
date_livraison=:date_livraison,
heure_livraison=:heure_livraison WHERE id_commande = :id_commande";
        $update_stmt = $conn->prepare($update_query);

        $update_stmt->bindValue(':id_commande', $data->id_commande, PDO::PARAM_INT);
        $update_stmt->bindValue(':livree', $data->livree, PDO::PARAM_INT);
        $update_stmt->bindValue(':datedelivraison', $data->datedelivraison, PDO::PARAM_INT);
        $update_stmt->bindValue(':heuredelivraison', $data->heuredelivraison, PDO::PARAM_INT);
        $update_stmt->bindValue(':date_livraison', $data->date_livraison, PDO::PARAM_INT);
        $update_stmt->bindValue(':heure_livraison', $data->heure_livraison, PDO::PARAM_INT);


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