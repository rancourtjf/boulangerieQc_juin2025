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
  /// echo "Connection à la base de donnée faite!";

  } catch(PDOException $e) {
    echo "Connection n'a pu être faite: " . $e->getMessage();
  }

try {
    $id_produit = htmlspecialchars(trim($data->id_produit));
    $categorie = htmlspecialchars(trim($data->categorie));
    $condition_taxable = htmlspecialchars(trim($data->condition_taxable));
    $consommation_temp = htmlspecialchars(trim($data->consommation_temp));
    $contenu_codebarre = htmlspecialchars(trim($data->contenu_codebarre));

    $date_ancienprixListe = htmlspecialchars(trim($data->date_ancienprixListe));
    $dateprixliste_changement = htmlspecialchars(trim($data->dateprixliste_changement));
    $descriptionProd = htmlspecialchars(trim($data->descriptionProd));
    $differenceargent = htmlspecialchars(trim($data->differenceargent));
    $differencepourcentage = htmlspecialchars(trim($data->differencepourcentage));

    $duree_de_conservation = htmlspecialchars(trim($data->duree_de_conservation));
    $id_recette = htmlspecialchars(trim($data->id_recette));
    $id_recetteSecPrincipale = htmlspecialchars(trim($data->id_recetteSecPrincipale));
    $input0_dimanche = htmlspecialchars(trim($data->input0_dimanche));
    $input0_jeudi = htmlspecialchars(trim($data->input0_jeudi));

    $input0_lundi = htmlspecialchars(trim($data->input0_lundi));
    $input0_mardi = htmlspecialchars(trim($data->input0_mardi));
    $input0_mercredi = htmlspecialchars(trim($data->input0_mercredi));
    $input0_samedi = htmlspecialchars(trim($data->input0_samedi));
    $input0_vendredi = htmlspecialchars(trim($data->input0_vendredi));

    $nom_recette = htmlspecialchars(trim($data->nom_recette));
    $nom_sac = htmlspecialchars(trim($data->nom_sac));
    $nom_variete = htmlspecialchars(trim($data->nom_variete));
    $poids_apres_cuisson = htmlspecialchars(trim($data->poids_apres_cuisson));
    $poids_avant_perte = htmlspecialchars(trim($data->poids_avant_perte));

    $poids_variete = htmlspecialchars(trim($data->poids_variete));
    $ponderation_temps = htmlspecialchars(trim($data->ponderation_temps));
    $portion_par_bacplaque = htmlspecialchars(trim($data->portion_par_bacplaque));
    $pourc_perte = htmlspecialchars(trim($data->pourc_perte));
    $prix_vente_variete = htmlspecialchars(trim($data->prix_vente_variete));

    $prixauclientsuggere = htmlspecialchars(trim($data->prixauclientsuggere));
    $prixderevient = htmlspecialchars(trim($data->prixderevient));
    $prixderevientavant = htmlspecialchars(trim($data->prixderevientavant));
    $prixKgPate = htmlspecialchars(trim($data->prixKgPate));
    $produit_dimanche = htmlspecialchars(trim($data->produit_dimanche));

    $produit_jeudi = htmlspecialchars(trim($data->produit_jeudi));
    $produit_lundi = htmlspecialchars(trim($data->produit_lundi));
    $produit_mardi = htmlspecialchars(trim($data->produit_mardi));
    $produit_mercredi = htmlspecialchars(trim($data->produit_mercredi));
    $produit_samedi = htmlspecialchars(trim($data->produit_samedi));

    $produit_special = htmlspecialchars(trim($data->produit_special));
    $produit_vendredi = htmlspecialchars(trim($data->produit_vendredi));
    $profit = htmlspecialchars(trim($data->profit));
    $qte_par_bac = htmlspecialchars(trim($data->qte_par_bac));
    $qte_par_plaque = htmlspecialchars(trim($data->qte_par_plaque));

    $sac_associe_ID = htmlspecialchars(trim($data->sac_associe_ID));
    $taxable = htmlspecialchars(trim($data->taxable));
    $url_image = htmlspecialchars(trim($data->url_image));
    $variete_poids = htmlspecialchars(trim($data->variete_poids));
    $allergene = htmlspecialchars(trim($data->allergene));
    
    $ingredients = htmlspecialchars(trim($data->ingredients));

    $query = "INSERT INTO produits(
    id_produit,
    categorie,
    condition_taxable,
    consommation_temp,
    contenu_codebarre,
    date_ancienprixListe,
   dateprixliste_changement,
   descriptionProd,
   differenceargent,
   differencepourcentage,
   duree_de_conservation,
   id_recette,
   id_recetteSecPrincipale,
   input0_dimanche,
   input0_jeudi,
   input0_lundi,
   input0_mardi,
   input0_mercredi,
   input0_samedi,
   input0_vendredi,
   nom_recette,
   nom_sac,
   nom_variete,
   poids_apres_cuisson,
   poids_avant_perte,
   poids_variete,
   ponderation_temps,
   portion_par_bacplaque,
   pourc_perte,
   prix_vente_variete,
   prixauclientsuggere,
   prixderevient,
   prixderevientavant,
   prixKgPate,
   produit_dimanche,
   produit_jeudi,
   produit_lundi,
   produit_mardi,
   produit_mercredi,
   produit_samedi,
   produit_special,
   produit_vendredi,
   profit,
   qte_par_bac,
   qte_par_plaque,
   sac_associe_ID,
   taxable,
   url_image,
   variete_poids,
   allergene,
   ingredients
    ) 
    VALUES(
    :id_produit,
    :categorie,
    :condition_taxable,
    :consommation_temp,
    :contenu_codebarre,
    :date_ancienprixListe,
    :dateprixliste_changement,
    :descriptionProd,
    :differenceargent,
    :differencepourcentage,
    :duree_de_conservation,
    :id_recette,
    :id_recetteSecPrincipale,
    :input0_dimanche,
    :input0_jeudi,
    :input0_lundi,
    :input0_mardi,
    :input0_mercredi,
    :input0_samedi,
    :input0_vendredi,
    :nom_recette,
    :nom_sac,
    :nom_variete,
    :poids_apres_cuisson,
    :poids_avant_perte,
    :poids_variete,
    :ponderation_temps,
    :portion_par_bacplaque,
    :pourc_perte,
    :prix_vente_variete,
    :prixauclientsuggere,
    :prixderevient,
    :prixderevientavant,
    :prixKgPate,
    :produit_dimanche,
    :produit_jeudi,
    :produit_lundi,
    :produit_mardi,
    :produit_mercredi,
    :produit_samedi,
    :produit_special,
    :produit_vendredi,
    :profit,
    :qte_par_bac,
    :qte_par_plaque,
    :sac_associe_ID,
    :taxable,
    :url_image,
    :variete_poids,
    :allergene,
    :ingredients
    )";
 

    $stmt = $conn->prepare($query);
 
    $stmt->bindValue(':id_produit', $id_produit, PDO::PARAM_STR);
    $stmt->bindValue(':categorie', $categorie, PDO::PARAM_STR);
    $stmt->bindValue(':condition_taxable', $condition_taxable, PDO::PARAM_STR);
    $stmt->bindValue(':consommation_temp', $consommation_temp, PDO::PARAM_STR);
    $stmt->bindValue(':contenu_codebarre', $contenu_codebarre, PDO::PARAM_STR);
    $stmt->bindValue(':date_ancienprixListe', $date_ancienprixListe, PDO::PARAM_STR);
    $stmt->bindValue(':dateprixliste_changement', $dateprixliste_changement, PDO::PARAM_STR);
    $stmt->bindValue(':descriptionProd', $descriptionProd, PDO::PARAM_STR);
    $stmt->bindValue(':differenceargent', $differenceargent, PDO::PARAM_STR);
    $stmt->bindValue(':differencepourcentage', $differencepourcentage, PDO::PARAM_STR);
    $stmt->bindValue(':duree_de_conservation', $duree_de_conservation, PDO::PARAM_STR);
    $stmt->bindValue(':id_recette', $id_recette, PDO::PARAM_STR);
    $stmt->bindValue(':id_recetteSecPrincipale', $id_recetteSecPrincipale, PDO::PARAM_STR);
    $stmt->bindValue(':input0_dimanche', $input0_dimanche, PDO::PARAM_STR);
    $stmt->bindValue(':input0_jeudi', $input0_jeudi, PDO::PARAM_STR);
    $stmt->bindValue(':input0_lundi', $input0_lundi, PDO::PARAM_STR);
    $stmt->bindValue(':input0_mardi', $input0_mardi, PDO::PARAM_STR);
    $stmt->bindValue(':input0_mercredi', $input0_mercredi, PDO::PARAM_STR);
    $stmt->bindValue(':input0_samedi', $input0_samedi, PDO::PARAM_STR);
    $stmt->bindValue(':input0_vendredi', $input0_vendredi, PDO::PARAM_STR);
    $stmt->bindValue(':nom_recette', $nom_recette, PDO::PARAM_STR);
    $stmt->bindValue(':nom_sac', $nom_sac, PDO::PARAM_STR);
    $stmt->bindValue(':nom_variete', $nom_variete, PDO::PARAM_STR);
    $stmt->bindValue(':poids_apres_cuisson', $poids_apres_cuisson, PDO::PARAM_STR);
    $stmt->bindValue(':poids_avant_perte', $poids_avant_perte, PDO::PARAM_STR);
    $stmt->bindValue(':poids_variete', $poids_variete, PDO::PARAM_STR);
    $stmt->bindValue(':ponderation_temps', $ponderation_temps, PDO::PARAM_STR);
    $stmt->bindValue(':portion_par_bacplaque', $portion_par_bacplaque, PDO::PARAM_STR);
    $stmt->bindValue(':pourc_perte', $pourc_perte, PDO::PARAM_STR);
    $stmt->bindValue(':prix_vente_variete', $prix_vente_variete, PDO::PARAM_STR);
    $stmt->bindValue(':prixauclientsuggere', $prixauclientsuggere, PDO::PARAM_STR);
    $stmt->bindValue(':prixderevient', $prixderevient, PDO::PARAM_STR);
    $stmt->bindValue(':prixderevientavant', $prixderevientavant, PDO::PARAM_STR);
    $stmt->bindValue(':prixKgPate', $prixKgPate, PDO::PARAM_STR);
    $stmt->bindValue(':produit_dimanche', $produit_dimanche, PDO::PARAM_STR);
    $stmt->bindValue(':produit_jeudi', $produit_jeudi, PDO::PARAM_STR);
    $stmt->bindValue(':produit_lundi', $produit_lundi, PDO::PARAM_STR);
    $stmt->bindValue(':produit_mardi', $produit_mardi, PDO::PARAM_STR);
    $stmt->bindValue(':produit_mercredi', $produit_mercredi, PDO::PARAM_STR);
    $stmt->bindValue(':produit_samedi', $produit_samedi, PDO::PARAM_STR);
    $stmt->bindValue(':produit_special', $produit_special, PDO::PARAM_STR);
    $stmt->bindValue(':produit_vendredi', $produit_vendredi, PDO::PARAM_STR);
    $stmt->bindValue(':profit', $profit, PDO::PARAM_STR);
    $stmt->bindValue(':qte_par_bac', $qte_par_bac, PDO::PARAM_STR);
    $stmt->bindValue(':qte_par_plaque', $qte_par_plaque, PDO::PARAM_STR);
    $stmt->bindValue(':sac_associe_ID', $sac_associe_ID, PDO::PARAM_STR);
    $stmt->bindValue(':taxable', $taxable, PDO::PARAM_STR);
    $stmt->bindValue(':url_image', $url_image, PDO::PARAM_STR);
    $stmt->bindValue(':variete_poids', $variete_poids, PDO::PARAM_STR);
    $stmt->bindValue(':allergene', $allergene, PDO::PARAM_STR);
    $stmt->bindValue(':ingredients', $ingredients, PDO::PARAM_STR);

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
