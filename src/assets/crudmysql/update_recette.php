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

try {
    $conn = new PDO("mysql:host=$db_host;dbname=$db_name", $db_username, $db_password);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "Connection à la base de donnée faite! dans update_factureObj";
  } catch(PDOException $e) {
    echo "Connection n'a pu être faite: " . $e->getMessage();
  }

  //---

  try {

    $ID_recette = htmlspecialchars(trim($data->ID_recette));
    $nom_recette = htmlspecialchars(trim($data->nom_recette));
    $ingredients = htmlspecialchars(trim($data->ingredients));
    $etapesboulange = htmlspecialchars(trim($data->etapesboulange));
    $prix_client_parkg = htmlspecialchars(trim($data->prix_client_parkg));
    $prix_total_cost_client = htmlspecialchars(trim($data->prix_total_cost_client));
    $avis_allergene = htmlspecialchars(trim($data->avis_allergene));
    $consistance = htmlspecialchars(trim($data->consistance));
    $categorie = htmlspecialchars(trim($data->categorie));
    $liste_ingredients_lineaire = htmlspecialchars(trim($data->liste_ingredients_lineaire));
    $poolish = htmlspecialchars(trim($data->poolish));
    $ingredients_poolish = htmlspecialchars(trim($data->ingredients_poolish));
    $ingredients_petrissee = htmlspecialchars(trim($data->ingredients_petrissee));
    $type_poolish = htmlspecialchars(trim($data->type_poolish));
    $duree_poolish = htmlspecialchars(trim($data->duree_poolish));
    $qtelevure_poolish = htmlspecialchars(trim($data->qtelevure_poolish));
    $cout_de_revient_reel_parkg = htmlspecialchars(trim($data->cout_de_revient_reel_parkg));
    $cout_main_oeuvre_parkg = htmlspecialchars(trim($data->cout_main_oeuvre_parkg));
    $farinepoolish = htmlspecialchars(trim($data->farinepoolish));
    $eaupoolish = htmlspecialchars(trim($data->eaupoolish));
    $levurepoolish = htmlspecialchars(trim($data->levurepoolish));
    $selpoolish = htmlspecialchars(trim($data->selpoolish));
    $grainspoolish = htmlspecialchars(trim($data->grainspoolish));
    $poolish_pourcentage = htmlspecialchars(trim($data->poolish_pourcentage));
    $grainpartie1poolish = htmlspecialchars(trim($data->grainpartie1poolish));
    $taux_hydratation = htmlspecialchars(trim($data->taux_hydratation));
    $mes_recettes = htmlspecialchars(trim($data->mes_recettes));
    $TempFerm1 = htmlspecialchars(trim($data->TempFerm1));
    $TempsFerm1 = htmlspecialchars(trim($data->TempsFerm1));
    $TempFerm2 = htmlspecialchars(trim($data->TempFerm2));
    $TempsFerm2 = htmlspecialchars(trim($data->TempsFerm2));
    $TempFerm3 = htmlspecialchars(trim($data->TempFerm3));
    $TempsFerm3 = htmlspecialchars(trim($data->TempsFerm3));
    $TempFerm4 = htmlspecialchars(trim($data->TempFerm4));
    $TempsFerm4 = htmlspecialchars(trim($data->TempsFerm4));
    $painSpecial80 = htmlspecialchars(trim($data->painSpecial80));
    $recetteBaseAssociePainSpecial = htmlspecialchars(trim($data->recetteBaseAssociePainSpecial));
    $poidstotal_pate = htmlspecialchars(trim($data->poidstotal_pate));
    $petrissage_vit1 = htmlspecialchars(trim($data->petrissage_vit1));
    $petrissage_vit2 = htmlspecialchars(trim($data->petrissage_vit2));
    $pointage_duree = htmlspecialchars(trim($data->pointage_duree));
    $rabat = htmlspecialchars(trim($data->rabat));
    $nbr_recettes_sec = htmlspecialchars(trim($data->nbr_recettes_sec));
    $pesage = htmlspecialchars(trim($data->pesage));
    $degazage = htmlspecialchars(trim($data->degazage));
    $boulage = htmlspecialchars(trim($data->boulage));
    $detenteduree = htmlspecialchars(trim($data->detenteduree));
    $faconnage = htmlspecialchars(trim($data->faconnage));
    $appret_min = htmlspecialchars(trim($data->appret_min));
    $cuissontempsapprox_min = htmlspecialchars(trim($data->cuissontempsapprox_min));
    $cuissontemperature_celcius = htmlspecialchars(trim($data->cuissontemperature_celcius));
    $prix_total_cost = htmlspecialchars(trim($data->prix_total_cost));
    $prix_recette_kgpate = htmlspecialchars(trim($data->prix_recette_kgpate));
    $taxable = htmlspecialchars(trim($data->taxable));
    $bassinage = htmlspecialchars(trim($data->bassinage));
    $date_derniere_modif = htmlspecialchars(trim($data->date_derniere_modif));
    $heure_modif = htmlspecialchars(trim($data->heure_modif));
    $temperature_de_base = htmlspecialchars(trim($data->temperature_de_base));
    $methode_commentaires = htmlspecialchars(trim($data->methode_commentaires));
    $maxFarinePetrin = htmlspecialchars(trim($data->maxFarinePetrin));
    $nomDepotListePrix = htmlspecialchars(trim($data->nomDepotListePrix));
    $url_recette_web = htmlspecialchars(trim($data->url_recette_web));


    $fetch_post = "SELECT * FROM `recettes` WHERE ID_recette=:ID_recette AND nomDepotListePrix=:nomDepotListePrix";
    $fetch_stmt = $conn->prepare($fetch_post);
    $fetch_stmt->bindValue(':ID_recette', $data->ID_recette, PDO::PARAM_INT);
    $fetch_stmt->bindValue(':nomDepotListePrix', $data->nomDepotListePrix, PDO::PARAM_INT);
    $fetch_stmt->execute();

 $update_query = "UPDATE `recettes` SET 
    ID_recette=:ID_recette,
    nom_recette=:nom_recette,
    ingredients=:ingredients,
    etapesboulange=:etapesboulange,
    prix_client_parkg=:prix_client_parkg,
    prix_total_cost_client=:prix_total_cost_client,
    avis_allergene=:avis_allergene,
    consistance=:consistance,
    categorie=:categorie,
    liste_ingredients_lineaire=:liste_ingredients_lineaire,
    poolish=:poolish,
    ingredients_poolish=:ingredients_poolish,
    ingredients_petrissee=:ingredients_petrissee,
    type_poolish=:type_poolish,
    duree_poolish=:duree_poolish,
    qtelevure_poolish=:qtelevure_poolish,
    cout_de_revient_reel_parkg=:cout_de_revient_reel_parkg,
    cout_main_oeuvre_parkg=:cout_main_oeuvre_parkg,
    farinepoolish=:farinepoolish,
    eaupoolish=:eaupoolish,
    levurepoolish=:levurepoolish,
    selpoolish=:selpoolish,
    grainspoolish=:grainspoolish,
    poolish_pourcentage=:poolish_pourcentage,
    grainpartie1poolish=:grainpartie1poolish,
    taux_hydratation=:taux_hydratation,
    mes_recettes=:mes_recettes,
    TempFerm1=:TempFerm1,
    TempsFerm1=:TempsFerm1,
    TempFerm2=:TempFerm2,
    TempsFerm2=:TempsFerm2,
    TempFerm3=:TempFerm3,
    TempsFerm3=:TempsFerm3,
    TempFerm4=:TempFerm4,
    TempsFerm4=:TempsFerm4,
    painSpecial80=:painSpecial80,
    recetteBaseAssociePainSpecial=:recetteBaseAssociePainSpecial,
    poidstotal_pate=:poidstotal_pate,
    petrissage_vit1=:petrissage_vit1,
    petrissage_vit2=:petrissage_vit2,
    pointage_duree=:pointage_duree,
    rabat=:rabat,
    nbr_recettes_sec=:nbr_recettes_sec,
    pesage=:pesage,
    degazage=:degazage,
    boulage=:boulage,
    detenteduree=:detenteduree,
    faconnage=:faconnage,
    appret_min=:appret_min,
    cuissontemperature_celcius=:cuissontemperature_celcius,
    cuissontempsapprox_min=:cuissontempsapprox_min,
    prix_total_cost=:prix_total_cost,
    prix_recette_kgpate=:prix_recette_kgpate,
    taxable=:taxable,
    bassinage=:bassinage,
    date_derniere_modif=:date_derniere_modif,
    heure_modif=:heure_modif,
    temperature_de_base=:temperature_de_base,
    methode_commentaires=:methode_commentaires,
    maxFarinePetrin=:maxFarinePetrin,
    nomDepotListePrix=:nomDepotListePrix,
    url_recette_web=:url_recette_web
 
 WHERE ID_recette=:ID_recette AND nomDepotListePrix=:nomDepotListePrix";
 
    $stmt = $conn->prepare($update_query);

    $stmt->bindValue(':ID_recette', $ID_recette, PDO::PARAM_STR);
    $stmt->bindValue(':nom_recette', $nom_recette, PDO::PARAM_STR);
    $stmt->bindValue(':ingredients', $ingredients, PDO::PARAM_STR);
    $stmt->bindValue(':etapesboulange', $etapesboulange, PDO::PARAM_STR);
    $stmt->bindValue(':prix_client_parkg', $prix_client_parkg, PDO::PARAM_STR);
    $stmt->bindValue(':prix_total_cost_client', $prix_total_cost_client, PDO::PARAM_STR);
    $stmt->bindValue(':avis_allergene', $avis_allergene, PDO::PARAM_STR);
    $stmt->bindValue(':consistance', $consistance, PDO::PARAM_STR);
    $stmt->bindValue(':categorie', $categorie, PDO::PARAM_STR);
    $stmt->bindValue(':liste_ingredients_lineaire', $liste_ingredients_lineaire, PDO::PARAM_STR);
    $stmt->bindValue(':poolish', $poolish, PDO::PARAM_STR);
    $stmt->bindValue(':ingredients_poolish', $ingredients_poolish, PDO::PARAM_STR);
    $stmt->bindValue(':ingredients_petrissee', $ingredients_petrissee, PDO::PARAM_STR);
    $stmt->bindValue(':type_poolish', $type_poolish, PDO::PARAM_STR);
    $stmt->bindValue(':duree_poolish', $duree_poolish, PDO::PARAM_STR);
    $stmt->bindValue(':qtelevure_poolish', $qtelevure_poolish, PDO::PARAM_STR);
    $stmt->bindValue(':cout_de_revient_reel_parkg', $cout_de_revient_reel_parkg, PDO::PARAM_STR);
    $stmt->bindValue(':cout_main_oeuvre_parkg', $cout_main_oeuvre_parkg, PDO::PARAM_STR);
    $stmt->bindValue(':farinepoolish', $farinepoolish, PDO::PARAM_STR);
    $stmt->bindValue(':eaupoolish', $eaupoolish, PDO::PARAM_STR);
    $stmt->bindValue(':levurepoolish', $levurepoolish, PDO::PARAM_STR);
    $stmt->bindValue(':selpoolish', $selpoolish, PDO::PARAM_STR);
    $stmt->bindValue(':grainspoolish', $grainspoolish, PDO::PARAM_STR);
    $stmt->bindValue(':poolish_pourcentage', $poolish_pourcentage, PDO::PARAM_STR);
    $stmt->bindValue(':grainpartie1poolish', $grainpartie1poolish, PDO::PARAM_STR);
    $stmt->bindValue(':taux_hydratation', $taux_hydratation, PDO::PARAM_STR);
    $stmt->bindValue(':mes_recettes', $mes_recettes, PDO::PARAM_STR);
    $stmt->bindValue(':TempFerm1', $TempFerm1, PDO::PARAM_STR);
    $stmt->bindValue(':TempsFerm1', $TempsFerm1, PDO::PARAM_STR);
    $stmt->bindValue(':TempFerm2', $TempFerm2, PDO::PARAM_STR);
    $stmt->bindValue(':TempsFerm2', $TempsFerm2, PDO::PARAM_STR);
    $stmt->bindValue(':TempFerm3', $TempFerm3, PDO::PARAM_STR);
    $stmt->bindValue(':TempsFerm3', $TempsFerm3, PDO::PARAM_STR);
    $stmt->bindValue(':TempFerm4', $TempFerm4, PDO::PARAM_STR);
    $stmt->bindValue(':TempsFerm4', $TempsFerm4, PDO::PARAM_STR);
    $stmt->bindValue(':painSpecial80', $painSpecial80, PDO::PARAM_STR);
    $stmt->bindValue(':recetteBaseAssociePainSpecial', $recetteBaseAssociePainSpecial, PDO::PARAM_STR);
    $stmt->bindValue(':poidstotal_pate', $poidstotal_pate, PDO::PARAM_STR);
    $stmt->bindValue(':petrissage_vit1', $petrissage_vit1, PDO::PARAM_STR);
    $stmt->bindValue(':petrissage_vit2', $petrissage_vit2, PDO::PARAM_STR);
    $stmt->bindValue(':pointage_duree', $pointage_duree, PDO::PARAM_STR);
    $stmt->bindValue(':rabat', $rabat, PDO::PARAM_STR);
    $stmt->bindValue(':nbr_recettes_sec', $nbr_recettes_sec, PDO::PARAM_STR);
    $stmt->bindValue(':pesage', $pesage, PDO::PARAM_STR);
    $stmt->bindValue(':degazage', $degazage, PDO::PARAM_STR);
    $stmt->bindValue(':boulage', $boulage, PDO::PARAM_STR);
    $stmt->bindValue(':detenteduree', $detenteduree, PDO::PARAM_STR);
    $stmt->bindValue(':faconnage', $faconnage, PDO::PARAM_STR);
    $stmt->bindValue(':appret_min', $appret_min, PDO::PARAM_STR);
    $stmt->bindValue(':cuissontempsapprox_min', $cuissontempsapprox_min, PDO::PARAM_STR);
    $stmt->bindValue(':cuissontemperature_celcius', $cuissontemperature_celcius, PDO::PARAM_STR);
    $stmt->bindValue(':prix_total_cost', $prix_total_cost, PDO::PARAM_STR);
    $stmt->bindValue(':prix_recette_kgpate', $prix_recette_kgpate, PDO::PARAM_STR);
    $stmt->bindValue(':taxable', $taxable, PDO::PARAM_STR);
    $stmt->bindValue(':bassinage', $bassinage, PDO::PARAM_STR);
    $stmt->bindValue(':date_derniere_modif', $date_derniere_modif, PDO::PARAM_STR);
    $stmt->bindValue(':heure_modif', $heure_modif, PDO::PARAM_STR);
    $stmt->bindValue(':temperature_de_base', $temperature_de_base, PDO::PARAM_STR);
    $stmt->bindValue(':methode_commentaires', $methode_commentaires, PDO::PARAM_STR);
    $stmt->bindValue(':maxFarinePetrin', $maxFarinePetrin, PDO::PARAM_STR);
    $stmt->bindValue(':nomDepotListePrix', $nomDepotListePrix, PDO::PARAM_STR);
    $stmt->bindValue(':url_recette_web', $url_recette_web, PDO::PARAM_STR);


    if ($stmt->execute()) {
 
        http_response_code(201);
        echo json_encode([
            'success' => 1,
            'message' => 'Donnees mises a jour dans recettes'
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
