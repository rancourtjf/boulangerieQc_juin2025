<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: PUT,HEAD,GET,POST,DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$method = $_SERVER['REQUEST_METHOD'];


$data = json_decode(file_get_contents("php://input"));


$dossierCommandesWeb = htmlspecialchars(trim($data->dossierCommandesWeb));
$ID_4D = htmlspecialchars(trim($data->ID_4D));

require "mysqlUserLogin.php";

try {
    $conn = new PDO("mysql:host=$db_host;dbname=$db_name", $db_username, $db_password);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
   // echo "Connection à la base de donnée faite!";
  } catch(PDOException $e) {
    echo "Connection n'a pu être faite: " . $e->getMessage();
  }



if (!isset($ID_4D)) {
    echo json_encode(['success' => 0, 'message' => 'Please provide the post ID_4D.']);
    exit;
}


try {

    $fetch_post = "SELECT * FROM recetteSecondaire WHERE ID_4D =:ID_4D";
    $fetch_stmt = $conn->prepare($fetch_post);
    $fetch_stmt->bindValue(':ID_4D', $ID_4D, PDO::PARAM_STR);
    $fetch_stmt->execute();

    if ($fetch_stmt->rowCount() > 0) :

        $delete_post = "DELETE FROM `recetteSecondaire` WHERE ID_4D =:ID_4D";
        $delete_post_stmt = $conn->prepare($delete_post);
        $delete_post_stmt->bindValue(':ID_4D', $ID_4D,PDO::PARAM_STR);

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
        echo json_encode(['success' => 0, 'message' => 'Invalid ID_4D. No posts found by the ID_4D.']);
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