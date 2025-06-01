<?php
header("Content-Type: application/json; charset=UTF_8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");


$data = json_decode(file_get_contents("php://input"));

$dossierCommandesWeb = htmlspecialchars(trim($data->dossierCommandesWeb));

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

    $query = "INSERT INTO ingredients(
    id_liste,
    allergene_a,
    categorie,
    coeffprixvente,
    date_modif_stock,
    date_modification,
    description_fournisseur,
    fournisseur_a,
    fournisseurId_el,
    id_categorie_ingredient,
    IdFournIngrBest,
    ingredient_description_a,
    inventaire_b,
    limite_alerte_kg,
    masquage_sur_etiquette,
    nbr_sacs,
    no_code_ingr_fournisseur_a,
    nom_ingredient_a,
    nomIngrFournisseur,
    prix_au_kilo_r,
    prix_par_sac_r,
    prixdevente,
    produit_allergisant_b,
    qte_en_stock_kg,
    qteOptimale,
    quantite_par_sac_en_kg_r,
    unite_a
    ) 
    VALUES(
    :id_liste,
    :allergene_a,
    :categorie,
    :coeffprixvente,
    :date_modif_stock,
    :date_modification,
    :description_fournisseur,
    :fournisseur_a,
    :fournisseurId_el,
    :id_categorie_ingredient,
    :IdFournIngrBest,
    :ingredient_description_a,
    :inventaire_b,
    :limite_alerte_kg,
    :masquage_sur_etiquette,
    :nbr_sacs,
    :no_code_ingr_fournisseur_a,
    :nom_ingredient_a,
    :nomIngrFournisseur,
    :prix_au_kilo_r,
    :prix_par_sac_r,
    :prixdevente,
    :produit_allergisant_b,
    :qte_en_stock_kg,
    :qteOptimale,
    :quantite_par_sac_en_kg_r,
    :unite_a
    )";
 

    $stmt = $conn->prepare($query);
 
    $stmt->bindValue(':id_liste', $id_liste, PDO::PARAM_STR);
    $stmt->bindValue(':allergene_a', $allergene_a, PDO::PARAM_STR);
    $stmt->bindValue(':categorie', $categorie, PDO::PARAM_STR);
    $stmt->bindValue(':coeffprixvente', $coeffprixvente, PDO::PARAM_STR);
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
            'message' => 'Data Inserted Successfully.'
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
