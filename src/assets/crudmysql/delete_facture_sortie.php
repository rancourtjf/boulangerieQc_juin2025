<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


//delete_facture_sortie.php

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

$dossierCommandesWeb = htmlspecialchars(trim($data->dossierCommandesWeb));
$id_impression_facture = htmlspecialchars(trim($data->id_impression_facture));
$type_facture = htmlspecialchars(trim($data->type_facture));

echo ("id_impression_facture=").$id_impression_facture;
echo ("type_facture=").$type_facture;


require "mysqlUserLogin.php";



try {
    $conn = new PDO("mysql:host=$db_host;dbname=$db_name", $db_username, $db_password);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
   // echo "Connection à la base de donnée faite!";
  } catch(PDOException $e) {
    echo "Connection n'a pu être faite: " . $e->getMessage();
  }


if (!isset($id_impression_facture)) {
    echo json_encode(['success' => 0, 'message' => 'Please provide the post id_impression_facture.']);
    exit;
}


try {

    $fetch_post = "SELECT * FROM facture WHERE id_impression_facture =:id_impression_facture AND type_facture= '$type_facture'";
    $fetch_stmt = $conn->prepare($fetch_post);
    $fetch_stmt->bindValue(':id_impression_facture', $id_impression_facture, PDO::PARAM_INT);
    $fetch_stmt->execute();

    if ($fetch_stmt->rowCount() > 0) :

        $delete_post = "DELETE FROM `facture` WHERE id_impression_facture =:id_impression_facture AND type_facture= '$type_facture'";
        $delete_post_stmt = $conn->prepare($delete_post);
        $delete_post_stmt->bindValue(':id_impression_facture', $id_impression_facture,PDO::PARAM_INT);

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