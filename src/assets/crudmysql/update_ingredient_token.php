<?php
header("Content-Type: application/json; charset=UTF_8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST,PUT,GET,DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

//update_clientObj.php
$data = json_decode(file_get_contents("php://input"));


$dossierCommandesWeb = htmlspecialchars(trim($data->dossierCommandesWeb));
$ID = htmlspecialchars(trim($data->ID));

require "mysqlUserLogin.php";

try {
    $conn = new PDO("mysql:host=$db_host;dbname=$db_name", $db_username, $db_password);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    //   echo "Connection à la base de donnée faite!";
} catch (PDOException $e) {
    echo "Connection n'a pu être faite: " . $e->getMessage();
}


try {

    $ID = htmlspecialchars(trim($data->ID));
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
    $limite_alerte_kg = htmlspecialchars(trim($data->limite_alerte_kg));
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

    $quantite_par_sac_en_kg_r = htmlspecialchars(trim($data->quantite_par_sac_en_kg_r));
    $unite_a = htmlspecialchars(trim($data->unite_a));


    $fetch_post = "SELECT * FROM `ingredients` WHERE ID=:ID";
    $fetch_stmt = $conn->prepare($fetch_post);
    $fetch_stmt->bindValue(':ID', $data->$ID, PDO::PARAM_INT);
    $fetch_stmt->execute();

    if ($fetch_stmt->rowCount() > 0):
        //echo 'AAA';
        $row = $fetch_stmt->fetch(PDO::FETCH_ASSOC);
        $ID = isset($data->$ID) ? $data->$ID : $row['ID'];
        $allergene_a = isset($data->$allergene_a) ? $data->$allergene_a : $row['allergene_a'];
        $categorie = isset($data->$categorie) ? $data->$categorie : $row['categorie'];
        $coeffprixvente = isset($data->$coeffprixvente) ? $data->$coeffprixvente : $row['coeffprixvente'];
        $date_modif_stock = isset($data->$date_modif_stock) ? $data->$date_modif_stock : $row['date_modif_stock'];

        $date_modification = isset($data->$date_modification) ? $data->$date_modification : $row['date_modification'];
        $description_fournisseur = isset($data->$description_fournisseur) ? $data->$description_fournisseur : $row['description_fournisseur'];
        $fournisseur_a = isset($data->$fournisseur_a) ? $data->$fournisseur_a : $row['fournisseur_a'];
        $fournisseurId_el = isset($data->$fournisseurId_el) ? $data->$fournisseurId_el : $row['fournisseurId_el'];
        $id_categorie_ingredient = isset($data->$id_categorie_ingredient) ? $data->$id_categorie_ingredient : $row['id_categorie_ingredient'];

        $IdFournIngrBest = isset($data->$IdFournIngrBest) ? $data->$IdFournIngrBest : $row['IdFournIngrBest'];
        $ingredient_description_a = isset($data->$ingredient_description_a) ? $data->$ingredient_description_a : $row['ingredient_description_a'];
        $inventaire_b = isset($data->$inventaire_b) ? $data->$inventaire_b : $row['inventaire_b'];
        $limite_alerte_kg = isset($data->$limite_alerte_kg) ? $data->$limite_alerte_kg : $row['limite_alerte_kg'];
        $masquage_sur_etiquette = isset($data->$masquage_sur_etiquette) ? $data->$masquage_sur_etiquette : $row['masquage_sur_etiquette'];

        $nbr_sacs = isset($data->$nbr_sacs) ? $data->$nbr_sacs : $row['nbr_sacs'];
        $no_code_ingr_fournisseur_a = isset($data->$no_code_ingr_fournisseur_a) ? $data->$no_code_ingr_fournisseur_a : $row['no_code_ingr_fournisseur_a'];
        $nom_ingredient_a = isset($data->$nom_ingredient_a) ? $data->$nom_ingredient_a : $row['nom_ingredient_a'];
        $nomIngrFournisseur = isset($data->$nomIngrFournisseur) ? $data->$nomIngrFournisseur : $row['nomIngrFournisseur'];
        $prix_au_kilo_r = isset($data->$prix_au_kilo_r) ? $data->$prix_au_kilo_r : $row['prix_au_kilo_r'];

        $prix_par_sac_r = isset($data->$prix_par_sac_r) ? $data->$prix_par_sac_r : $row['prix_par_sac_r'];
        $prixdevente = isset($data->$prixdevente) ? $data->$prixdevente : $row['prixdevente'];
        $produit_allergisant_b = isset($data->$produit_allergisant_b) ? $data->$produit_allergisant_b : $row['produit_allergisant_b'];
        $qte_en_stock_kg = isset($data->$qte_en_stock_kg) ? $data->$qte_en_stock_kg : $row['qte_en_stock_kg'];
        $qteOptimale = isset($data->$qteOptimale) ? $data->$qteOptimale : $row['qteOptimale'];
        $quantite_par_sac_en_kg_r = isset($data->$quantite_par_sac_en_kg_r) ? $data->$quantite_par_sac_en_kg_r : $row['quantite_par_sac_en_kg_r'];
        $unite_a = isset($data->$unite_a) ? $data->$unite_a : $row['unite_a'];

    endif;


    $query = "UPDATE  ingredients SET
    coeffprixvente=:coeffprixvente,
    categorie=:categorie,
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

        WHERE ID=:ID";


    $stmt = $conn->prepare($query);

    $stmt->bindValue(':ID', $ID, PDO::PARAM_STR);
    $stmt->bindValue(':coeffprixvente', $coeffprixvente, PDO::PARAM_STR);
    $stmt->bindValue(':categorie', $categorie, PDO::PARAM_STR);
    $stmt->bindValue(':date_modif_stock', $date_modif_stock, PDO::PARAM_STR);

    $stmt->bindValue(':date_modification', $date_modification, PDO::PARAM_STR);
    $stmt->bindValue(':description_fournisseur', $description_fournisseur, PDO::PARAM_STR);
    $stmt->bindValue(':fournisseur_a', $fournisseur_a, PDO::PARAM_STR);
    $stmt->bindValue(':fournisseurId_el', $fournisseurId_el, PDO::PARAM_STR);
    $stmt->bindValue(':id_categorie_ingredient', $id_categorie_ingredient, PDO::PARAM_STR);

    $stmt->bindValue(':IdFournIngrBest', $IdFournIngrBest, PDO::PARAM_STR);
    $stmt->bindValue(':ingredient_description_a', $ingredient_description_a, PDO::PARAM_STR);
    $stmt->bindValue(':inventaire_b', $inventaire_b, PDO::PARAM_STR);
    $stmt->bindValue(':limite_alerte_kg', $limite_alerte_kg, PDO::PARAM_STR);
    $stmt->bindValue(':masquage_sur_etiquette', $masquage_sur_etiquette, PDO::PARAM_STR);

    $stmt->bindValue(':nbr_sacs', $nbr_sacs, PDO::PARAM_STR);
    $stmt->bindValue(':no_code_ingr_fournisseur_a', $no_code_ingr_fournisseur_a, PDO::PARAM_STR);
    $stmt->bindValue(':nom_ingredient_a', $nom_ingredient_a, PDO::PARAM_STR);
    $stmt->bindValue(':nomIngrFournisseur', $nomIngrFournisseur, PDO::PARAM_STR);
    $stmt->bindValue(':prix_au_kilo_r', $prix_au_kilo_r, PDO::PARAM_STR);

    $stmt->bindValue(':prix_par_sac_r', $prix_par_sac_r, PDO::PARAM_STR);
    $stmt->bindValue(':prixdevente', $prixdevente, PDO::PARAM_STR);
    $stmt->bindValue(':produit_allergisant_b', $produit_allergisant_b, PDO::PARAM_STR);
    $stmt->bindValue(':qte_en_stock_kg', $qte_en_stock_kg, PDO::PARAM_STR);
    $stmt->bindValue(':qteOptimale', $qteOptimale, PDO::PARAM_STR);
    $stmt->bindValue(':quantite_par_sac_en_kg_r', $quantite_par_sac_en_kg_r, PDO::PARAM_STR);
    $stmt->bindValue(':unite_a', $unite_a, PDO::PARAM_STR);

    if ($stmt->execute()) {

        http_response_code(201);
        echo json_encode([
            'success' => 1,
            'message' => 'Donnees mises a jour= ' . $ID
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
        'success' => 0,
        'message' => $e->getMessage()
    ]);
    exit;
}
