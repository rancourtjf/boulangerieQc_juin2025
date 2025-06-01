<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: PUT,HEAD,GET,POST,DELETE");

header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$method = $_SERVER['REQUEST_METHOD'];

// if ($method == "OPTIONS") {
//     die();
// }


// if ($_SERVER['REQUEST_METHOD'] !== 'DELETE') :
//     http_response_code(405);
//     echo json_encode([
//         'success' => 0,
//         'message' => 'Bad Reqeust detected. HTTP method should be DELETE',
//     ]);
//     exit;
// endif;

$data = json_decode(file_get_contents("php://input"));
    
// $db_host = htmlspecialchars(trim($data->db_host));
// $db_name = htmlspecialchars(trim($data->db_name));
// $db_username = htmlspecialchars(trim($data->db_username));
// $db_password = htmlspecialchars(trim($data->db_password));

$dossierCommandesWeb = htmlspecialchars(trim($data->dossierCommandesWeb));

require "mysqlUserLogin.php";


try {
    $conn = new PDO("mysql:host=$db_host;dbname=$db_name", $db_username, $db_password);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "Connection à la base de donnée faite!";
  } catch(PDOException $e) {
    echo "Connection n'a pu être faite: " . $e->getMessage();
  }


$ID_recette = htmlspecialchars(trim($data->ID_recette));
$nomDepotListePrix = htmlspecialchars(trim($data->nomDepotListePrix));

if (!isset($ID_recette)) {
    echo json_encode(['success' => 0, 'message' => 'Please provide the post ID_recette.']);
    exit;
}

try {

    $fetch_post = "SELECT * FROM recettes WHERE ID_recette =:ID_recette AND nomDepotListePrix=:nomDepotListePrix";
    $fetch_stmt = $conn->prepare($fetch_post);
    $fetch_stmt->bindValue(':ID_recette', $ID_recette, PDO::PARAM_INT);
    $fetch_stmt->bindValue(':nomDepotListePrix', $nomDepotListePrix, PDO::PARAM_INT);
    $fetch_stmt->execute();

    if ($fetch_stmt->rowCount() > 0) :

        $delete_post = "DELETE FROM `recettes` WHERE ID_recette =:ID_recette AND nomDepotListePrix=:nomDepotListePrix";
        $delete_post_stmt = $conn->prepare($delete_post);
        $delete_post_stmt->bindValue(':ID_recette', $ID_recette,PDO::PARAM_INT);
        $delete_post_stmt->bindValue(':nomDepotListePrix', $nomDepotListePrix,PDO::PARAM_INT);


        if ($delete_post_stmt->execute()) {

            echo json_encode([
                'success' => 1,
                'message' => 'Record Deleted successfully'
            ]);
            exit;
        }

        echo json_encode([
            'success' => 0,
            'message' => 'Could not delete. Something went wrong.'
        ]);
        exit;

    else :
        echo json_encode(['success' => 0, 'message' => 'Invalid ID. No posts found by the ID.']);
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