<?php
header("Content-Type: application/json; charset=UTF_8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: PUT,HEAD,GET,POST,DELETE");


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
     //echo "Connection à la base de donnée faite! dans update_factureObj";
} catch (PDOException $e) {
    echo "Connection n'a pu être faite: " . $e->getMessage();
}

//---

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

    $fetch_post = "SELECT * FROM `produits` WHERE id_produit=:id_produit";
    $fetch_stmt = $conn->prepare($fetch_post);
    $fetch_stmt->bindValue(':id_produit', $data->id_produit, PDO::PARAM_INT);
    $fetch_stmt->execute();

    //     if ($fetch_stmt->rowCount() > 0) :

    //         $row = $fetch_stmt->fetch(PDO::FETCH_ASSOC);
    //         $id_produit = isset($data->$id_produit) ? $data->$id_produit : $row['id_produit'];
    //         $categorie = isset($data->$categorie) ? $data->$categorie : $row['categorie'];
    //         $condition_taxable = isset($data->$condition_taxable) ? $data->$condition_taxable : $row['condition_taxable'];
    //         $consommation_temp = isset($data->$consommation_temp) ? $data->$adresse : $row['consommation_temp'];
    //         $contenu_codebarre = isset($data->$contenu_codebarre) ? $data->$contenu_codebarre : $row['contenu_codebarre'];
    //         $date_ancienprixListe = isset($data->$date_ancienprixListe) ? $data->$date_ancienprixListe : $row['date_ancienprixListe'];
    //         $dateprixliste_changement = isset($data->$dateprixliste_changement) ? $data->$dateprixliste_changement : $row['dateprixliste_changement'];
    //         $descriptionProd = isset($data->$descriptionProd) ? $data->$nodescriptionProdm : $row['descriptionProd'];
    //         $differenceargent = isset($data->$differenceargent) ? $data->$differenceargent : $row['differenceargent'];
    //         $differencepourcentage = isset($data->$differencepourcentage) ? $data->$differencepourcentage : $row['differencepourcentage'];
    //         $duree_de_conservation = isset($data->$duree_de_conservation) ? $data->$duree_de_conservation : $row['duree_de_conservation'];
    //         $id_recette = isset($data->$id_recette) ? $data->$id_recette : $row['id_recette'];
    //         $id_recetteSecPrincipale = isset($data->$id_recetteSecPrincipale) ? $data->$id_recetteSecPrincipale : $row['id_recetteSecPrincipale'];
    //         $input0_dimanche = isset($data->$input0_dimanche) ? $data->$input0_dimanche : $row['input0_dimanche'];
    //         $input0_jeudi = isset($data->$input0_jeudi) ? $data->$input0_jeudi : $row['input0_jeudi'];
    //         $input0_lundi = isset($data->$input0_lundi) ? $data->$input0_lundi : $row['input0_lundi'];
    //         $input0_mardi = isset($data->$input0_mardi) ? $data->$input0_mardi : $row['input0_mardi'];
    //         $input0_mercredi = isset($data->$input0_mercredi) ? $data->$input0_mercredi : $row['input0_mercredi'];
    //         $input0_samedi = isset($data->$input0_samedi) ? $data->$input0_samedi : $row['input0_samedi'];
    //         $input0_vendredi = isset($data->$input0_vendredi) ? $data->$input0_vendredi : $row['input0_vendredi'];
    //         $nom_recette = isset($data->$nom_recette) ? $data->$nom_recette : $row['nom_recette'];
    //         $nom_sac = isset($data->$nom_sac) ? $data->$nom_sac : $row['nom_sac'];
    //         $nom_variete = isset($data->$nom_variete) ? $data->$nom_variete : $row['nom_variete'];
    //         $poids_apres_cuisson = isset($data->$poids_apres_cuisson) ? $data->$poids_apres_cuisson : $row['poids_apres_cuisson'];
    //         echo ' data='.$poids_avant_perte;
    //         $poids_avant_perte = isset($data->$poids_avant_perte) ? $data->$poids_avant_perte : $row['poids_avant_perte'];
    //         echo ' poids_avant_perte isset='.$poids_avant_perte;
    //         $poids_variete = isset($data->$poids_variete) ? $data->$poids_variete : $row['poids_variete'];
    //         $ponderation_temps = isset($data->$ponderation_temps) ? $data->$ponderation_temps : $row['ponderation_temps'];
    //         $portion_par_bacplaque = isset($data->$portion_par_bacplaque) ? $data->$portion_par_bacplaque : $row['portion_par_bacplaque'];
    //         $pourc_perte = isset($data->$pourc_perte) ? $data->$pourc_perte : $row['pourc_perte'];
    //         $prix_vente_variete = isset($data->$prix_vente_variete) ? $data->$prix_vente_variete : $row['prix_vente_variete'];
    //         $prixauclientsuggere = isset($data->$prixauclientsuggere) ? $data->$prixauclientsuggere : $row['prixauclientsuggere'];
    //         $prixderevient = isset($data->$prixderevient) ? $data->$prixderevient : $row['prixderevient'];
    //         $prixderevientavant = isset($data->$prixderevientavant) ? $data->$prixderevientavant : $row['prixderevientavant'];
    //         $prixKgPate = isset($data->$prixKgPate) ? $data->$prixKgPate : $row['prixKgPate'];
    //         $produit_dimanche = isset($data->$produit_dimanche) ? $data->$produit_dimanche : $row['produit_dimanche'];
    //         $produit_jeudi = isset($data->$produit_jeudi) ? $data->$produit_jeudi : $row['produit_jeudi'];
    //         $produit_lundi = isset($data->$produit_lundi) ? $data->$produit_lundi : $row['produit_lundi'];
    //         $produit_mardi = isset($data->$produit_mardi) ? $data->$produit_mardi : $row['produit_mardi'];
    //         $produit_mercredi = isset($data->$produit_mercredi) ? $data->$produit_mercredi : $row['produit_mercredi'];
    //         $produit_samedi = isset($data->$produit_samedi) ? $data->$produit_samedi : $row['produit_samedi'];
    //         $produit_special = isset($data->$produit_special) ? $data->$produit_special : $row['produit_special'];
    //         $produit_vendredi = isset($data->$produit_vendredi) ? $data->$produit_vendredi : $row['produit_vendredi'];
    //         $qte_par_bac = isset($data->$qte_par_bac) ? $data->$qte_par_bac : $row['qte_par_bac'];
    //         $qte_par_plaque = isset($data->$qte_par_plaque) ? $data->$qte_par_plaque : $row['qte_par_plaque'];
    //         $sac_associe_ID = isset($data->$sac_associe_ID) ? $data->$sac_associe_ID : $row['sac_associe_ID'];
    //         $taxable = isset($data->$taxable) ? $data->$taxable : $row['taxable'];
    //         $url_image = isset($data->$url_image) ? $data->$url_image : $row['url_image'];
    //         $variete_poids = isset($data->$variete_poids) ? $data->$variete_poids : $row['variete_poids'];

    //  endif;


    $update_query = "UPDATE `produits` SET 
    id_produit=:id_produit,
    allergene=:allergene,
    categorie=:categorie,
    condition_taxable=:condition_taxable,
    consommation_temp=:consommation_temp,
    contenu_codebarre=:contenu_codebarre,
    date_ancienprixListe=:date_ancienprixListe,
   dateprixliste_changement=:dateprixliste_changement,
   descriptionProd=:descriptionProd,
   differenceargent=:differenceargent,

   differencepourcentage=:differencepourcentage,
   duree_de_conservation=:duree_de_conservation,
   id_recette=:id_recette,
   id_recetteSecPrincipale=:id_recetteSecPrincipale,
    ingredients=:ingredients,
   input0_dimanche=:input0_dimanche,
   input0_jeudi=:input0_jeudi,
   input0_lundi=:input0_lundi,
   input0_mardi=:input0_mardi,
   input0_mercredi=:input0_mercredi,

   input0_samedi=:input0_samedi,
   input0_vendredi=:input0_vendredi,
   nom_recette=:nom_recette,
   nom_sac=:nom_sac,
   nom_variete=:nom_variete,
   poids_apres_cuisson=:poids_apres_cuisson,
   poids_avant_perte=:poids_avant_perte,
   poids_variete=:poids_variete,
   ponderation_temps=:ponderation_temps,
   portion_par_bacplaque=:portion_par_bacplaque,

   pourc_perte=:pourc_perte,
   prix_vente_variete=:prix_vente_variete,
   prixauclientsuggere=:prixauclientsuggere,
   prixderevient=:prixderevient,
   prixderevientavant=:prixderevientavant,
   prixKgPate=:prixKgPate,
   produit_dimanche=:produit_dimanche,
   produit_jeudi=:produit_jeudi,
   produit_lundi=:produit_lundi,
   produit_mardi=:produit_mardi,

   produit_mercredi=:produit_mercredi,
   produit_samedi=:produit_samedi,
   produit_special=:produit_special,
   produit_vendredi=:produit_vendredi,
   profit=:profit,
   qte_par_bac=:qte_par_bac,
   qte_par_plaque=:qte_par_plaque,
   sac_associe_ID=:sac_associe_ID,
   taxable=:taxable,
   url_image=:url_image,

   variete_poids=:variete_poids
   
 WHERE id_produit=:id_produit";

    $stmt = $conn->prepare($update_query);

    $stmt->bindValue(':id_produit', $id_produit, PDO::PARAM_STR);
    $stmt->bindValue(':allergene', $allergene, PDO::PARAM_STR);
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
    $stmt->bindValue(':ingredients', $ingredients, PDO::PARAM_STR);
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
   


    if ($stmt->execute()) {

        http_response_code(201);
        echo json_encode([
            'success' => 1,
            'message' => 'Donnees mises a jour'
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
