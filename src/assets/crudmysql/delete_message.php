<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: PUT,HEAD,GET,POST,OPTIONS,DELETE");

header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$method = $_SERVER['REQUEST_METHOD'];

if ($method == "OPTIONS") {
    die();
}


$data = json_decode(file_get_contents("php://input"));


$dossierCommandesWeb = htmlspecialchars(trim($data->dossierCommandesWeb));
$id1Boulangerie = htmlspecialchars(trim($data->id1Boulangerie));   

require "mysqlUserLogin.php";

try {
    $conn = new PDO("mysql:host=$db_host;dbname=$db_name", $db_username, $db_password);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "Connection à la base de donnée faite!";
  } catch(PDOException $e) {
    echo "Connection n'a pu être faite: " . $e->getMessage();
  }

$id1Boulangerie= htmlspecialchars(trim($data->id1Boulangerie));
$dossier = htmlspecialchars(trim($data->dossier));

echo '$id1Boulangerie='.$id1Boulangerie;
echo ' $dossier='.$dossier;

if (!isset($id1Boulangerie)) {
    echo json_encode(['success' => 0, 'message' => 'Please provide the post id.']);
    exit;
}


try {

    $fetch_post = "SELECT * FROM messageSiteWeb WHERE id1Boulangerie=:id1Boulangerie AND dossier =:dossier";
    $fetch_stmt = $conn->prepare($fetch_post);
    $fetch_stmt->bindValue(':id1Boulangerie', $id1Boulangerie, PDO::PARAM_INT);
    $fetch_stmt->bindValue(':dossier', $dossier, PDO::PARAM_INT);
    $fetch_stmt->execute();

    if ($fetch_stmt->rowCount() > 0) :

        $delete_post = "DELETE FROM `messageSiteWeb` WHERE id1Boulangerie=:id1Boulangerie AND dossier =:dossier";
        $delete_post_stmt = $conn->prepare($delete_post);
        $delete_post_stmt->bindValue(':id1Boulangerie', $id1Boulangerie,PDO::PARAM_INT);
        $delete_post_stmt->bindValue(':dossier', $dossier,PDO::PARAM_INT);

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