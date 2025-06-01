<?php
header("Content-Type: application/json; charset=UTF_8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

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
try {

    $nom_recette_sec = htmlspecialchars(trim($data->nom_recette_sec));
    $id_recette_sec = htmlspecialchars(trim($data->id_recette_sec));
    $id_recette_master = htmlspecialchars(trim($data->id_recette_master));
    $qte_Kg = htmlspecialchars(trim($data->qte_Kg));

    $poids_total_recette_base = htmlspecialchars(trim($data->poids_total_recette_base));
    $pate_principale_b = htmlspecialchars(trim($data->pate_principale_b));
  

    $fetch_post = "SELECT * FROM `recetteSecondaire` WHERE ID_4D='$ID_4D'";
    $fetch_stmt = $conn->prepare($fetch_post);

    $fetch_stmt->execute();

    if ($fetch_stmt->rowCount() > 0) :


        $update_query = "UPDATE `recetteSecondaire` SET  
         nom_recette_sec=:nom_recette_sec,
         id_recette_sec=:id_recette_sec,
         id_recette_master=:id_recette_master,
         qte_Kg=:qte_Kg,
         poids_total_recette_base=:poids_total_recette_base,
         pate_principale_b=:pate_principale_b

          WHERE ID_4D=:ID_4D ";
        $update_stmt = $conn->prepare($update_query);

        $update_stmt->bindValue(':ID_4D', $ID_4D, PDO::PARAM_STR);
        $update_stmt->bindValue(':nom_recette_sec', $nom_recette_sec, PDO::PARAM_STR);
        $update_stmt->bindValue(':id_recette_sec', $id_recette_sec, PDO::PARAM_STR);
        $update_stmt->bindValue(':id_recette_master', $id_recette_master, PDO::PARAM_STR);
        $update_stmt->bindValue(':qte_Kg', $qte_Kg, PDO::PARAM_STR);
        
        $update_stmt->bindValue(':poids_total_recette_base', $poids_total_recette_base, PDO::PARAM_STR);

        $update_stmt->bindValue(':pate_principale_b', $pate_principale_b, PDO::PARAM_STR);

        if ($update_stmt->execute()) {

            echo json_encode([
                'success' => 1,
                'message' => 'Data mis a jour du ingredientsRecette' 
            ]);
            exit;
        }

        echo json_encode([
            'success' => 0,
            'message' => 'Did not udpate. Something went  wrong.'
        ]);
        exit;

    else :
        echo json_encode(['success' => 0, 'message' => 'Invalid ID. No record found by the ID_4D.']);
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
