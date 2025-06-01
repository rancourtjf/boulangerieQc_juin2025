<?php
header("Content-Type: application/json; charset=UTF_8");
header("Access-Control-Allow-Origin: *");
//header("Access-Control-Allow-Origin: http://localhost:4200");
//header("Access-Control-Allow-Origin: https://www.boulangerieqc.com/students/crydmysql/insert.php");
//header("Access-Control-Allow-Origin: https://www.boulangerieqc.com");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");


$data = json_decode(file_get_contents("php://input"));

$dossierCommandesWeb = htmlspecialchars(trim($data->dossierCommandesWeb));

require "mysqlUserLogin.php";


try {
    $conn = new PDO("mysql:host=$db_host;dbname=$db_name", $db_username, $db_password);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  //  echo "Connection à la base de donnée faite!";
} catch (PDOException $e) {
    echo "Connection n'a pu être faite: " . $e->getMessage();
}

try {
    $id_detail = htmlspecialchars(trim($data->id_detail));
    $id_production=htmlspecialchars(trim($data->id_production));
    $id_client = htmlspecialchars(trim($data->id_client));
    $nom_produit = htmlspecialchars(trim($data->nom_produit));
    $id_produit = htmlspecialchars(trim($data->id_produit));
    $quantite = htmlspecialchars(trim($data->quantite));
    $date_prod = htmlspecialchars(trim($data->date_prod));
    $no_jour = htmlspecialchars(trim($data->no_jour));
    $jour_semaine = htmlspecialchars(trim($data->jour_semaine));
    $nom_pate = htmlspecialchars(trim($data->nom_pate));
    $id_recette = htmlspecialchars(trim($data->id_recette));
    $poids_pate = htmlspecialchars(trim($data->poids_pate));
    $cout_pate = htmlspecialchars(trim($data->cout_pate));
    $prix_boutique = htmlspecialchars(trim($data->prix_boutique));
    $prix_escompte = htmlspecialchars(trim($data->prix_escompte));
    $invendus = htmlspecialchars(trim($data->invendus));
    $tot_non_taxable = htmlspecialchars(trim($data->tot_non_taxable));
    $tot_taxable = htmlspecialchars(trim($data->tot_taxable));
    $tps = htmlspecialchars(trim($data->tps));
    $tvq = htmlspecialchars(trim($data->tvq));
    $total_vente = htmlspecialchars(trim($data->total_vente));
    $id_commande = htmlspecialchars(trim($data->id_commande));
    $id_recettesec_main = htmlspecialchars(trim($data->id_recettesec_main));
    $clientRegroupement = htmlspecialchars(trim($data->clientRegroupement));
    $nom_client=htmlspecialchars(trim($data->nom_client));
    // $heureRupture=htmlspecialchars(trim($data->heureRupture));


    $query = "INSERT INTO detailproduit(
    id_detail,
    id_production,
    id_client,
    nom_produit,
    id_produit,
    quantite,
    date_prod,
    no_jour,
    jour_semaine,
    nom_pate,
    id_recette,
    poids_pate,
    cout_pate,
    prix_boutique,
    prix_escompte,
    invendus,
    tot_non_taxable,
    tot_taxable,
    tps,
    tvq,
    total_vente,
    id_commande,
    id_recettesec_main,
    clientRegroupement,
    nom_client
    ) 
    VALUES(
    :id_detail,
    :id_production,
   :id_client,
   :nom_produit,
   :id_produit,
   :quantite,
   :date_prod,
    :no_jour,
   :jour_semaine,
   :nom_pate,
   :id_recette,
   :poids_pate,
   :cout_pate,
   :prix_boutique,
   :prix_escompte,
   :invendus,
   :tot_non_taxable,
   :tot_taxable,
   :tps,
   :tvq,
   :total_vente,
   :id_commande,
    :id_recettesec_main,
    :clientRegroupement,
    :nom_client
    )";

    $stmt = $conn->prepare($query);

    $stmt->bindValue(':id_detail', $id_detail, PDO::PARAM_STR);
    $stmt->bindValue(':id_production', $id_production, PDO::PARAM_STR);
    $stmt->bindValue(':id_client', $id_client, PDO::PARAM_STR);
    $stmt->bindValue(':nom_produit', $nom_produit, PDO::PARAM_STR);
    $stmt->bindValue(':id_produit', $id_produit, PDO::PARAM_STR);
    $stmt->bindValue(':quantite', $quantite, PDO::PARAM_STR);
    $stmt->bindValue(':date_prod', $date_prod, PDO::PARAM_STR);
    $stmt->bindValue(':no_jour', $no_jour, PDO::PARAM_STR);
    $stmt->bindValue(':jour_semaine', $jour_semaine, PDO::PARAM_STR);
    $stmt->bindValue(':nom_pate', $nom_pate, PDO::PARAM_STR);
    $stmt->bindValue(':id_recette', $id_recette, PDO::PARAM_STR);
    $stmt->bindValue(':poids_pate', $poids_pate, PDO::PARAM_STR);
    $stmt->bindValue(':cout_pate', $cout_pate, PDO::PARAM_STR);
    $stmt->bindValue(':prix_boutique', $prix_boutique, PDO::PARAM_STR);
    $stmt->bindValue(':prix_escompte', $prix_escompte, PDO::PARAM_STR);
    $stmt->bindValue(':invendus', $invendus, PDO::PARAM_STR);
    $stmt->bindValue(':tot_non_taxable', $tot_non_taxable, PDO::PARAM_STR);
    $stmt->bindValue(':tot_taxable', $tot_taxable, PDO::PARAM_STR);
    $stmt->bindValue(':tps', $tps, PDO::PARAM_STR);
    $stmt->bindValue(':tvq', $tvq, PDO::PARAM_STR);
    $stmt->bindValue(':total_vente', $total_vente, PDO::PARAM_STR);
    $stmt->bindValue(':id_commande', $id_commande, PDO::PARAM_STR);
    $stmt->bindValue(':id_recettesec_main', $id_recettesec_main, PDO::PARAM_STR);
    $stmt->bindValue(':clientRegroupement', $clientRegroupement, PDO::PARAM_STR);
    $stmt->bindValue(':nom_client', $nom_client, PDO::PARAM_STR);
    // $stmt->bindValue(':heureRupture', $heureRupture, PDO::PARAM_STR);

   


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
