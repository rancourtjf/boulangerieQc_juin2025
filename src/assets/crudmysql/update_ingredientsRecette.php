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
  

    $fetch_post = "SELECT * FROM `ingredientsRecette` WHERE ID_4D='$ID_4D'";
    $fetch_stmt = $conn->prepare($fetch_post);

    $fetch_stmt->execute();

    if ($fetch_stmt->rowCount() > 0) :



        $update_query = "UPDATE `ingredientsRecette` SET  
         nom=:nom,
         quantite_r=:quantite_r,
         unite_a=:unite_a,recette_id=:recette_id,
         nom_recette=:nom_recette,Liste_prix_id=:Liste_prix_id,
         qteunite=:qteunite,Cout_r=:Cout_r,
         commentaires=:commentaires,Prix_vente_client_r=:Prix_vente_client_r,
         id_recette_sec=:id_recette_sec,masquage_sur_etiquette=:masquage_sur_etiquette
         
          WHERE ID_4D=:ID_4D ";
        $update_stmt = $conn->prepare($update_query);

        $update_stmt->bindValue(':ID_4D', $ID_4D, PDO::PARAM_STR);
        $update_stmt->bindValue(':nom', $nom, PDO::PARAM_STR);
        $update_stmt->bindValue(':quantite_r', $quantite_r, PDO::PARAM_STR);
        $update_stmt->bindValue(':unite_a', $unite_a, PDO::PARAM_STR);
        $update_stmt->bindValue(':recette_id', $recette_id, PDO::PARAM_STR);

        $update_stmt->bindValue(':nom_recette', $nom_recette, PDO::PARAM_STR);
        $update_stmt->bindValue(':Liste_prix_id', $Liste_prix_id, PDO::PARAM_STR);
        $update_stmt->bindValue(':qteunite', $qteunite, PDO::PARAM_STR);
        $update_stmt->bindValue(':Cout_r', $Cout_r, PDO::PARAM_STR);
        $update_stmt->bindValue(':commentaires', $commentaires, PDO::PARAM_STR);

        $update_stmt->bindValue(':Prix_vente_client_r', $Prix_vente_client_r, PDO::PARAM_STR);
        $update_stmt->bindValue(':id_recette_sec', $id_recette_sec, PDO::PARAM_STR);
        $update_stmt->bindValue(':masquage_sur_etiquette', $masquage_sur_etiquette, PDO::PARAM_STR);


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
