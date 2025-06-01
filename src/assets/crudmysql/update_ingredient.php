<?php
header("Content-Type: application/json; charset=UTF_8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: PUT,HEAD,GET,POST,DELETE");
//header("Access-Control-Allow-Origin: http://localhost:4200");
//header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

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
} catch (PDOException $e) {
    echo "Connection n'a pu être faite: " . $e->getMessage();
}

try {

    $id_liste = htmlspecialchars(trim($data->id_liste));
    $allergene_a = htmlspecialchars(trim($data->allergene_a));
    $categorie = htmlspecialchars(trim($data->categorie));
    $coeffprixvente = htmlspecialchars(trim($data->coeffprixvente));
    $date_modif_stock = htmlspecialchars(trim($data->date_modif_stock));
    $date_modification = htmlspecialchars(trim($data->date_modification));
    $description_fournisseur = htmlspecialchars(trim($data->description_fournisseur));
    $fournisseur_a = htmlspecialchars(trim($data->fournisseur_a));
    $fournisseurId_el = htmlspecialchars(trim($data->fournisseurId_el));
    $id_categorie_ingredient = htmlspecialchars(trim($data->id_categorie_ingredient));
    $IdFournIngrBest = htmlspecialchars(trim($data->IdFournIngrBest));
    $ingredient_description_a = htmlspecialchars(trim($data->ingredient_description_a));
    $inventaire_b = htmlspecialchars(trim($data->inventaire_b));
    $limite_alerte_kg = htmlspecialchars(trim($data->inventairlimite_alerte_kge_b));
    $masquage_sur_etiquette = htmlspecialchars(trim($data->masquage_sur_etiquette));
    $nbr_sacs = htmlspecialchars(trim($data->nbr_sacs));
    $no_code_ingr_fournisseur_a = htmlspecialchars(trim($data->no_code_ingr_fournisseur_a));
    $nom_ingredient_a = htmlspecialchars(trim($data->nom_ingredient_a));
    $nomIngrFournisseur = htmlspecialchars(trim($data->nomIngrFournisseur));
    $prix_au_kilo_r = htmlspecialchars(trim($data->prix_au_kilo_r));
    $prix_par_sac_r = htmlspecialchars(trim($data->prix_par_sac_r));
    $prixdevente = htmlspecialchars(trim($data->prixdevente));
    $produit_allergisant_b = htmlspecialchars(trim($data->produit_allergisant_b));
    $qte_en_stock_kg = htmlspecialchars(trim($data->qte_en_stock_kg));
    $qteOptimale = htmlspecialchars(trim($data->qteOptimale));
    $quantité_par_sac_en_kg_r = htmlspecialchars(trim($data->quantité_par_sac_en_kg_r));
    $unite_a = htmlspecialchars(trim($data->unite_a));


    $fetch_post = "SELECT * FROM `ingredients` WHERE id_liste=:id_liste";
    $fetch_stmt = $conn->prepare($fetch_post);
    $fetch_stmt->bindValue(':id_liste', $data->id_liste, PDO::PARAM_INT);
    $fetch_stmt->execute();

    if ($fetch_stmt->rowCount() > 0) :

    $update_query = "UPDATE `ingredients` SET 
    
    id_liste=:id_liste,
    allergene_a=:allergene_a,
    categorie=:categorie,
    coeffprixvente=:coeffprixvente,
    date_modif_stock=:date_modif_stock,
    date_modification=:date_modification,
    description_fournisseur=:description_fournisseur,
    fournisseur_a=:fournisseur_a,
    fournisseurId_el=:fournisseurId_el,
    id_categorie_ingredient=:id_categorie_ingredient,
    IdFournIngrBest=:IdFournIngrBest,
    ingredient_description_a=:ingredient_description_a,
    inventaire_b=:inventaire_b,
    limite_alerte_kg=:limite_alerte_kg,
    masquage_sur_etiquette=:masquage_sur_etiquette,
    nbr_sacs=:nbr_sacs,
    no_code_ingr_fournisseur_a=:no_code_ingr_fournisseur_a,
    nom_ingredient_a=:nom_ingredient_a,
    nomIngrFournisseur=:nomIngrFournisseur,
    prix_au_kilo_r=:prix_au_kilo_r,
    prix_par_sac_r=:prix_par_sac_r,
    prixdevente=:prixdevente,
    produit_allergisant_b=:produit_allergisant_b,
    qte_en_stock_kg=:qte_en_stock_kg,
    qteOptimale=:qteOptimale,
    quantite_par_sac_en_kg_r=:quantite_par_sac_en_kg_r,
    unite_a=:unite_a


   WHERE id_liste = :id_liste";

        $update_stmt = $conn->prepare($update_query);


        $update_stmt->bindValue(':id_liste', $data->id_liste, PDO::PARAM_INT);
        $update_stmt->bindValue(':id_liste', $id_liste, PDO::PARAM_STR);
        $update_stmt->bindValue(':allergene_a', $allergene_a, PDO::PARAM_STR);
        $update_stmt->bindValue(':categorie', $categorie, PDO::PARAM_STR);
        $update_stmt->bindValue(':coeffprixvente', $coeffprixvente, PDO::PARAM_STR);
        $update_stmt->bindValue(':date_modif_stock', $date_modif_stock, PDO::PARAM_STR);
        $update_stmt->bindValue(':date_modification', $date_modification, PDO::PARAM_STR);
        $update_stmt->bindValue(':description_fournisseur', $description_fournisseur, PDO::PARAM_STR);
        $update_stmt->bindValue(':fournisseur_a', $fournisseur_a, PDO::PARAM_STR);
        $update_stmt->bindValue(':fournisseurId_el', $fournisseurId_el, PDO::PARAM_STR);
        $update_stmt->bindValue(':id_categorie_ingredient', $id_categorie_ingredient, PDO::PARAM_STR);
        $update_stmt->bindValue(':IdFournIngrBest', $IdFournIngrBest, PDO::PARAM_STR);
        $update_stmt->bindValue(':ingredient_description_a', $ingredient_description_a, PDO::PARAM_STR);
        $update_stmt->bindValue(':inventaire_b', $inventaire_b, PDO::PARAM_STR);
        $update_stmt->bindValue(':limite_alerte_kg', $limite_alerte_kg, PDO::PARAM_STR);
        $update_stmt->bindValue(':masquage_sur_etiquette', $masquage_sur_etiquette, PDO::PARAM_STR);
        $update_stmt->bindValue(':nbr_sacs', $nbr_sacs, PDO::PARAM_STR);
        $update_stmt->bindValue(':no_code_ingr_fournisseur_a', $no_code_ingr_fournisseur_a, PDO::PARAM_STR);
        $update_stmt->bindValue(':nom_ingredient_a', $nom_ingredient_a, PDO::PARAM_STR);
        $update_stmt->bindValue(':nomIngrFournisseur', $nomIngrFournisseur, PDO::PARAM_STR);
        $update_stmt->bindValue(':prix_au_kilo_r', $prix_au_kilo_r, PDO::PARAM_STR);
        $update_stmt->bindValue(':prix_par_sac_r', $prix_par_sac_r, PDO::PARAM_STR);
        $update_stmt->bindValue(':prixdevente', $prixdevente, PDO::PARAM_STR);
        $update_stmt->bindValue(':produit_allergisant_b', $produit_allergisant_b, PDO::PARAM_STR);
        $update_stmt->bindValue(':qte_en_stock_kg', $qte_en_stock_kg, PDO::PARAM_STR);
        $update_stmt->bindValue(':qteOptimale', $qteOptimale, PDO::PARAM_STR);
        $update_stmt->bindValue(':quantite_par_sac_en_kg_r', $quantite_par_sac_en_kg_r, PDO::PARAM_STR);
        $update_stmt->bindValue(':unite_a', $unite_a, PDO::PARAM_STR);


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
