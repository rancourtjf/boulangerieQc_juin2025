<?php
header("Content-Type: application/json; charset=UTF_8");
header("Access-Control-Allow-Origin: *");

header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");


$data = json_decode(file_get_contents("php://input"));

$dossierCommandesWeb = htmlspecialchars(trim($data->dossierCommandesWeb));
$commandeWebIndiv = htmlspecialchars(trim($data->commandeWebIndiv));

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
    $idclient = htmlspecialchars(trim($data->idclient));
    $id_commande = htmlspecialchars(trim($data->id_commande));
    $googleMap = htmlspecialchars(trim($data->googleMap));
    $type_facture = htmlspecialchars(trim($data->type_facture));
    $dateProd = htmlspecialchars(trim($data->dateProd));
    $montant = htmlspecialchars(trim($data->montant));
    $livree = htmlspecialchars(trim($data->livree));
    $date_livraison = htmlspecialchars(trim($data->date_livraison));
    $heure_livraison = htmlspecialchars(trim($data->heure_livraison));
    $date_paiement = htmlspecialchars(trim($data->date_paiement));
    $url_facture = htmlspecialchars(trim($data->url_facture));
    $nom_facture = htmlspecialchars(trim($data->nom_facture));
    $jourdelasemaine = htmlspecialchars(trim($data->jourdelasemaine));
    $total_est_paye = htmlspecialchars(trim($data->total_est_paye));
    $dossierClassement = htmlspecialchars(trim($data->dossierClassement));
    $idComptable = htmlspecialchars(trim($data->idComptable));
    $prixtotalhorstaxe = htmlspecialchars(trim($data->prixtotalhorstaxe));
    $prixtotaltaxable = htmlspecialchars(trim($data->prixtotaltaxable));
    $totaltps = htmlspecialchars(trim($data->totaltps));
    $totaltvq = htmlspecialchars(trim($data->totaltvq));
    $totalBoulangerieHorsTaxes = htmlspecialchars(trim($data->totalBoulangerieHorsTaxes));
    $totalPatisserieHorsTaxes = htmlspecialchars(trim($data->totalPatisserieHorsTaxes));
    $totalMetsPrepares = htmlspecialchars(trim($data->totalMetsPrepares));
    $siteProduction = htmlspecialchars(trim($data->siteProduction));
    $commandeWebIndiv = htmlspecialchars(trim($data->commandeWebIndiv));
    $commentaires = htmlspecialchars(trim($data->commentaires));




    $query = "INSERT INTO facture(
    idclient,
    id_commande,
    googleMap,
    type_facture,
    dateProd,
    montant,
    livree,
    date_livraison,
    heure_livraison,
    date_paiement,
    url_facture,
    nom_facture,
    jourdelasemaine,
    total_est_paye,
    dossierClassement,
    idComptable,
    prixtotalhorstaxe,
    prixtotaltaxable,
    totaltps,
    totaltvq,
    totalBoulangerieHorsTaxes,
    totalPatisserieHorsTaxes,
    totalMetsPrepares,
    siteProduction,
    commandeWebIndiv,
    commentaires
    ) 
    VALUES(
:idclient,
 :id_commande,
 :googleMap,
 :type_facture,
 :dateProd,
 :montant,
 :livree,
 :date_livraison,
 :heure_livraison,
 :date_paiement,
 :url_facture,
 :nom_facture,
 :jourdelasemaine,
 :total_est_paye,
 :dossierClassement,
 :idComptable,
:prixtotalhorstaxe,
:prixtotaltaxable,
:totaltps,
:totaltvq,
:totalBoulangerieHorsTaxes,
:totalPatisserieHorsTaxes,
:totalMetsPrepares,
:siteProduction,
:commandeWebIndiv,
:commentaires

    )";

    $stmt = $conn->prepare($query);

    $stmt->bindValue(':idclient', $idclient, PDO::PARAM_STR);
    $stmt->bindValue(':id_commande', $id_commande, PDO::PARAM_STR);
    $stmt->bindValue(':googleMap', $googleMap, PDO::PARAM_STR);
    $stmt->bindValue(':type_facture', $type_facture, PDO::PARAM_STR);
    $stmt->bindValue(':dateProd', $dateProd, PDO::PARAM_STR);
    $stmt->bindValue(':montant', $montant, PDO::PARAM_STR);
    $stmt->bindValue(':livree', $livree, PDO::PARAM_STR);
    $stmt->bindValue(':date_livraison', $date_livraison, PDO::PARAM_STR);
    $stmt->bindValue(':heure_livraison', $heure_livraison, PDO::PARAM_STR);
    $stmt->bindValue(':date_paiement', $date_paiement, PDO::PARAM_STR);
    $stmt->bindValue(':url_facture', $url_facture, PDO::PARAM_STR);
    $stmt->bindValue(':nom_facture', $nom_facture, PDO::PARAM_STR);
    $stmt->bindValue(':jourdelasemaine', $jourdelasemaine, PDO::PARAM_STR);
    $stmt->bindValue(':total_est_paye', $total_est_paye, PDO::PARAM_STR);
    $stmt->bindValue(':dossierClassement', $dossierClassement, PDO::PARAM_STR);
    $stmt->bindValue(':idComptable', $idComptable, PDO::PARAM_STR);
    $stmt->bindValue(':prixtotalhorstaxe', $prixtotalhorstaxe, PDO::PARAM_STR);
    $stmt->bindValue(':prixtotaltaxable', $prixtotaltaxable, PDO::PARAM_STR);
    $stmt->bindValue(':totaltps', $totaltps, PDO::PARAM_STR);
    $stmt->bindValue(':totaltvq', $totaltvq, PDO::PARAM_STR);
    $stmt->bindValue(':totalBoulangerieHorsTaxes', $totalBoulangerieHorsTaxes, PDO::PARAM_STR);
    $stmt->bindValue(':totalPatisserieHorsTaxes', $totalPatisserieHorsTaxes, PDO::PARAM_STR);
    $stmt->bindValue(':totalMetsPrepares', $totalMetsPrepares, PDO::PARAM_STR);
    $stmt->bindValue(':siteProduction', $siteProduction, PDO::PARAM_STR);
    $stmt->bindValue(':commandeWebIndiv', $commandeWebIndiv, PDO::PARAM_STR);
     $stmt->bindValue(':commentaires', $commentaires, PDO::PARAM_STR);

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
