<?php
header("Content-Type: application/json; charset=UTF_8");
header("Access-Control-Allow-Origin: *");
//header("Access-Control-Allow-Origin: http://localhost:4200");
//header("Access-Control-Allow-Origin: https://www.boulangerieqc.com/students/crydmysql/insert.php");
//header("Access-Control-Allow-Origin: https://www.boulangerieqc.com");
header("Access-Control-Allow-Methods: POST,PUT,GET,DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");


$data = json_decode(file_get_contents("php://input"));

$dossierCommandesWeb=htmlspecialchars(trim($data->dossierCommandesWeb));

require "mysqlUserLogin.php";

$idclient = htmlspecialchars(trim($data->idclient));


try {
    $conn = new PDO("mysql:host=$db_host;dbname=$db_name", $db_username, $db_password);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
 //   echo "Connection à la base de donnée faite!";
  } catch(PDOException $e) {
    echo "Connection n'a pu être faite: " . $e->getMessage();
  }

 
try {

    $idclient = htmlspecialchars(trim($data->idclient));
    $courriel = htmlspecialchars(trim($data->courriel));
    $googlemap = htmlspecialchars(trim($data->googlemap));
    $adresse = htmlspecialchars(trim($data->adresse));
    $ville = htmlspecialchars(trim($data->ville));
    $codepostal = htmlspecialchars(trim($data->codepostal));
    $telephone = htmlspecialchars(trim($data->telephone));
    $courrielcommande = htmlspecialchars(trim($data->courrielcommande));
    $nom = htmlspecialchars(trim($data->nom));

    $courriel_retour_paye = htmlspecialchars(trim($data->courriel_retour_paye));
    $date_code_acces_d = htmlspecialchars(trim($data->date_code_acces_d));
    $date_fin_acces_d = htmlspecialchars(trim($data->date_fin_acces_d));
    $datenewVersion = htmlspecialchars(trim($data->datenewVersion));
    $debutCalendrierLundi = htmlspecialchars(trim($data->debutCalendrierLundi));
    $emailEnvoiAuBoulanger = htmlspecialchars(trim($data->emailEnvoiAuBoulanger));
    $heure_tombee_production_h = htmlspecialchars(trim($data->heure_tombee_production_h));
    $jours_conservation_FTP = htmlspecialchars(trim($data->jours_conservation_FTP));
    $monnaieCanada_b = htmlspecialchars(trim($data->monnaieCanada_b));
    $noCompteTPS = htmlspecialchars(trim($data->noCompteTPS));
    $noCompteTVQ = htmlspecialchars(trim($data->noCompteTVQ));
    $noVersion = htmlspecialchars(trim($data->noVersion));
    $ouvertlundi_b = htmlspecialchars(trim($data->ouvertlundi_b));
    $ouvertmardi_b = htmlspecialchars(trim($data->ouvertmardi_b));
    $ouvertmercredi_b = htmlspecialchars(trim($data->ouvertmercredi_b));
    $ouvert_jeudi_b = htmlspecialchars(trim($data->ouvert_jeudi_b));
    $ouvert_vendredi_b = htmlspecialchars(trim($data->ouvert_vendredi_b));
    $ouvert_samedi_b = htmlspecialchars(trim($data->ouvert_samedi_b));
    $ouvert_dimanche_b = htmlspecialchars(trim($data->ouvert_dimanche_b));
    $site_internet_a = htmlspecialchars(trim($data->site_internet_a));
    $transmissionProduitComptable = htmlspecialchars(trim($data->transmissionProduitComptable));
    $txtVersementBancaire = htmlspecialchars(trim($data->txtVersementBancaire));

    $fetch_post = "SELECT * FROM `boulanger` WHERE idclient=:idclient";
    $fetch_stmt = $conn->prepare($fetch_post);
    $fetch_stmt->bindValue(':idclient', $data->$idclient, PDO::PARAM_INT);
    $fetch_stmt->execute();

    if ($fetch_stmt->rowCount() > 0) :
        //echo 'AAA';
           $row = $fetch_stmt->fetch(PDO::FETCH_ASSOC);
           $idclient = isset($data->$idclient) ? $data->$idclient : $row['idclient'];
           $courriel = isset($data->$courriel) ? $data->$courriel : $row['courriel'];
           $googlemap = isset($data->$googlemap) ? $data->$googlemap : $row['googlemap'];
           $adresse = isset($data->$adresse) ? $data->$adresse : $row['adresse'];
           $ville = isset($data->$ville) ? $data->$ville : $row['ville'];
           $codepostal = isset($data->$codepostal) ? $data->$codepostal : $row['codepostal'];
           $telephone = isset($data->$telephone) ? $data->$telephone : $row['telephone'];
           $courrielcommande = isset($data->$courrielcommande) ? $data->$courrielcommande : $row['courrielcommande'];
           $nom = isset($data->$nom) ? $data->$nom : $row['nom'];

           $courriel_retour_paye = isset($data->$courriel_retour_paye) ? $data->$courriel_retour_paye : $row['courriel_retour_paye'];
           $date_code_acces_d = isset($data->$date_code_acces_d) ? $data->$date_code_acces_d : $row['date_code_acces_d'];
           $date_fin_acces_d = isset($data->$date_fin_acces_d) ? $data->$date_fin_acces_d : $row['date_fin_acces_d'];
           $datenewVersion = isset($data->$datenewVersion) ? $data->$datenewVersion : $row['datenewVersion'];
           $debutCalendrierLundi = isset($data->$debutCalendrierLundi) ? $data->$debutCalendrierLundi : $row['debutCalendrierLundi'];
          
           $emailEnvoiAuBoulanger = isset($data->$emailEnvoiAuBoulanger) ? $data->$emailEnvoiAuBoulanger : $row['emailEnvoiAuBoulanger'];
           $heure_tombee_production_h = isset($data->$heure_tombee_production_h) ? $data->$heure_tombee_production_h : $row['heure_tombee_production_h'];
           $jours_conservation_FTP = isset($data->$jours_conservation_FTP) ? $data->$jours_conservation_FTP : $row['jours_conservation_FTP'];
           $monnaieCanada_b = isset($data->$monnaieCanada_b) ? $data->$monnaieCanada_b : $row['monnaieCanada_b'];
           $noCompteTPS = isset($data->$noCompteTPS) ? $data->$noCompteTPS : $row['noCompteTPS'];
          
           $noCompteTVQ = isset($data->$noCompteTVQ) ? $data->$noCompteTVQ : $row['noCompteTVQ'];
           $noVersion = isset($data->$noVersion) ? $data->$noVersion : $row['noVersion'];
           $ouvertlundi_b = isset($data->$ouvertlundi_b) ? $data->$ouvertlundi_b : $row['ouvertlundi_b'];
           $ouvertmardi_b = isset($data->$ouvertmardi_b) ? $data->$ouvertmardi_b : $row['ouvertmardi_b'];
           $ouvertmercredi_b = isset($data->$ouvertmercredi_b) ? $data->$ouvertmercredi_b : $row['ouvertmercredi_b'];
          
           $ouvert_jeudi_b = isset($data->$ouvert_jeudi_b) ? $data->$ouvert_jeudi_b : $row['ouvert_jeudi_b'];
           $ouvert_vendredi_b = isset($data->$ouvert_vendredi_b) ? $data->$ouvert_vendredi_b : $row['ouvert_vendredi_b'];
           $ouvert_samedi_b = isset($data->$ouvert_samedi_b) ? $data->$ouvert_samedi_b : $row['ouvert_samedi_b'];
           $ouvert_dimanche_b = isset($data->$ouvert_dimanche_b) ? $data->$ouvert_dimanche_b : $row['ouvert_dimanche_b'];
           $site_internet_a = isset($data->$site_internet_a) ? $data->$site_internet_a : $row['site_internet_a'];

           $transmissionProduitComptable = isset($data->$transmissionProduitComptable) ? $data->$transmissionProduitComptable : $row['transmissionProduitComptable'];
           $txtVersementBancaire = isset($data->$txtVersementBancaire) ? $data->$txtVersementBancaire : $row['txtVersementBancaire'];
          
        endif;


    $query = "UPDATE  boulanger SET
        idclient=:idclient,courriel=:courriel,googlemap= :googlemap,adresse= :adresse,ville= :ville,codepostal= :codepostal,
        telephone= :telephone,courrielcommande=:courrielcommande,nom= :nom,passwordHash=:passwordHash,
    courriel_retour_paye=:courriel_retour_paye,
    date_code_acces_d=:date_code_acces_d,
    date_fin_acces_d=:date_fin_acces_d,
    datenewVersion=:datenewVersion,
    debutCalendrierLundi=:debutCalendrierLundi,
    emailEnvoiAuBoulanger=:emailEnvoiAuBoulanger,
    heure_tombee_production_h=:heure_tombee_production_h,
    jours_conservation_FTP=:jours_conservation_FTP,
    monnaieCanada_b=:monnaieCanada_b,
    noCompteTPS=:noCompteTPS,
    noCompteTVQ=:noCompteTVQ,
    noVersion=:noVersion,
    ouvertlundi_b=:ouvertlundi_b,
    ouvertmardi_b=:ouvertmardi_b,
    ouvertmercredi_b=:ouvertmercredi_b,
    ouvert_jeudi_b=:ouvert_jeudi_b,
    ouvert_vendredi_b=:ouvert_vendredi_b,
    ouvert_samedi_b=:ouvert_samedi_b,
    ouvert_dimanche_b=:ouvert_dimanche_b,
    site_internet_a=:site_internet_a,
    transmissionProduitComptable=:transmissionProduitComptable,
    txtVersementBancaire=:txtVersementBancaire WHERE idclient=:idclient";
 
    $stmt = $conn->prepare($query);
 
    $stmt->bindValue(':idclient', $idclient, PDO::PARAM_STR);
    $stmt->bindValue(':courriel', $courriel, PDO::PARAM_STR);
    $stmt->bindValue(':googlemap', $googlemap, PDO::PARAM_STR);
    $stmt->bindValue(':adresse', $adresse, PDO::PARAM_STR);
    $stmt->bindValue(':ville', $ville, PDO::PARAM_STR);
    $stmt->bindValue(':codepostal', $codepostal, PDO::PARAM_STR);
    $stmt->bindValue(':telephone', $telephone, PDO::PARAM_STR);
    $stmt->bindValue(':courrielcommande', $courrielcommande, PDO::PARAM_STR);
    $stmt->bindValue(':nom', $nom, PDO::PARAM_STR);
    $stmt->bindValue(':passwordHash', $db_password, PDO::PARAM_STR);

    $stmt->bindValue(':courriel_retour_paye', $courriel_retour_paye, PDO::PARAM_STR);
    $stmt->bindValue(':date_code_acces_d', $date_code_acces_d, PDO::PARAM_STR);
    $stmt->bindValue(':date_fin_acces_d', $date_fin_acces_d, PDO::PARAM_STR);
    $stmt->bindValue(':datenewVersion', $datenewVersion, PDO::PARAM_STR);
    $stmt->bindValue(':debutCalendrierLundi', $debutCalendrierLundi, PDO::PARAM_STR);

    $stmt->bindValue(':emailEnvoiAuBoulanger', $emailEnvoiAuBoulanger, PDO::PARAM_STR);
    $stmt->bindValue(':heure_tombee_production_h', $heure_tombee_production_h, PDO::PARAM_STR);
    $stmt->bindValue(':jours_conservation_FTP', $jours_conservation_FTP, PDO::PARAM_STR);
    $stmt->bindValue(':monnaieCanada_b', $monnaieCanada_b, PDO::PARAM_STR);
    $stmt->bindValue(':noCompteTPS', $noCompteTPS, PDO::PARAM_STR);

    $stmt->bindValue(':noCompteTVQ', $noCompteTVQ, PDO::PARAM_STR);
    $stmt->bindValue(':noVersion', $noVersion, PDO::PARAM_STR);
    $stmt->bindValue(':ouvertlundi_b', $ouvertlundi_b, PDO::PARAM_STR);
    $stmt->bindValue(':ouvertmardi_b', $ouvertmardi_b, PDO::PARAM_STR);
    $stmt->bindValue(':ouvertmercredi_b', $ouvertmercredi_b, PDO::PARAM_STR);

    $stmt->bindValue(':ouvert_jeudi_b', $ouvert_jeudi_b, PDO::PARAM_STR);
    $stmt->bindValue(':ouvert_vendredi_b', $ouvert_vendredi_b, PDO::PARAM_STR);
    $stmt->bindValue(':ouvert_samedi_b', $ouvert_samedi_b, PDO::PARAM_STR);
    $stmt->bindValue(':ouvert_dimanche_b', $ouvert_dimanche_b, PDO::PARAM_STR);
    $stmt->bindValue(':site_internet_a', $site_internet_a, PDO::PARAM_STR);

    $stmt->bindValue(':transmissionProduitComptable', $transmissionProduitComptable, PDO::PARAM_STR);
    $stmt->bindValue(':txtVersementBancaire', $txtVersementBancaire, PDO::PARAM_STR);


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
