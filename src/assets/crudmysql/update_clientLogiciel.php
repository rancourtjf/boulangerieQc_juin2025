<?php
header("Content-Type: application/json; charset=UTF_8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: PUT,HEAD,GET,POST,DELETE");

$data = json_decode(file_get_contents("php://input"));

$dossierCommandesWeb = htmlspecialchars(trim($data->dossierCommandesWeb));
//$dossierCommandesWeb='boulangerieqc';

require "mysqlUserLogin.php";

$method = $_SERVER['REQUEST_METHOD'];

if ($method == "OPTIONS") {
    die();
}

try {
    $conn = new PDO("mysql:host=$db_host;dbname=$db_name", $db_username, $db_password);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    // echo "Connection à la base de donnée faite! dans update_factureObj";
    // echo "data=".$data
} catch (PDOException $e) {
    echo "Connection n'a pu être faite: " . $e->getMessage();
}

try {

    $id = htmlspecialchars(trim($data->id));
    $courriel = htmlspecialchars(trim($data->courriel));
    $nomBoulangerie = $data->nomBoulangerie;
    $actifBoolean = htmlspecialchars(trim($data->actifBoolean));
    $prenom = htmlspecialchars(trim($data->prenom));
    $nomFamille = htmlspecialchars(trim($data->nomFamille));
    $telephone = htmlspecialchars(trim($data->telephone));
    $rue = htmlspecialchars(trim($data->rue));
    $ville = htmlspecialchars(trim($data->ville));
    $codePostal = htmlspecialchars(trim($data->codePostal));

    $dateDebut = htmlspecialchars(trim($data->dateDebut));
    $dateFin = htmlspecialchars(trim($data->dateFin));
    $identifiant = htmlspecialchars(trim($data->identifiant));
    $logoBoulangerie = htmlspecialchars(trim($data->logoBoulangerie));
    $emailEnvoiAuBoulanger = htmlspecialchars(trim($data->emailEnvoiAuBoulanger));

    $host = htmlspecialchars(trim($data->host));
    $user = htmlspecialchars(trim($data->user));
    $password = htmlspecialchars(trim($data->password));
    $port = htmlspecialchars(trim($data->port));
    $logfile = htmlspecialchars(trim($data->logfile));

    $serveurFTP = htmlspecialchars(trim($data->serveurFTP));
    $userFTP = htmlspecialchars(trim($data->userFTP));
    $passwordFTP = htmlspecialchars(trim($data->passwordFTP));
    $site_web_documents = htmlspecialchars(trim($data->site_web_documents));
    $user_site_web = htmlspecialchars(trim($data->user_site_web));

    $pwd_site_web = htmlspecialchars(trim($data->pwd_site_web));
    $serveurFTP_bkup = htmlspecialchars(trim($data->serveurFTP_bkup));
    $userFTP_bkup = htmlspecialchars(trim($data->userFTP_bkup));
    $pwdFTPbkup = htmlspecialchars(trim($data->pwdFTPbkup));
    $dataFile4DD = htmlspecialchars(trim($data->dataFile4DD));

    $dataFile4DIndx = htmlspecialchars(trim($data->dataFile4DIndx));
    $depotListePrixClients = htmlspecialchars(trim($data->depotListePrixClients));
    $userFTPDepot = htmlspecialchars(trim($data->userFTPDepot));
    $pwdFTPDepot = htmlspecialchars(trim($data->pwdFTPDepot));
    $serveurFTPListePrixClients = htmlspecialchars(trim($data->serveurFTPListePrixClients));

    $serveurFTPSansFTP = htmlspecialchars(trim($data->serveurFTPSansFTP));
    $passwordFTPHash = htmlspecialchars(trim($data->passwordFTPHash));
    $serveurFTPSansFTP_bkup = htmlspecialchars(trim($data->serveurFTPSansFTP_bkup));
    $pwdFTPbkup_Hash = htmlspecialchars(trim($data->pwdFTPbkup_Hash));
    $db_host_mysql = htmlspecialchars(trim($data->db_host_mysql));

    $db_name_mysql = htmlspecialchars(trim($data->db_name_mysql));
    $db_username_mysql = htmlspecialchars(trim($data->db_username_mysql));
    $db_password_mysql = htmlspecialchars(trim($data->db_password_mysql));
    $repertoireBoulangerie = htmlspecialchars(trim($data->repertoireBoulangerie));
    $db_host_mysql_boulangerieqc = htmlspecialchars(trim($data->db_host_mysql_boulangerieqc));

    $db_name_mysql_boulangerieqc = htmlspecialchars(trim($data->db_name_mysql_boulangerieqc));
    $db_username_mysql_boulangerieqc = htmlspecialchars(trim($data->db_username_mysql_boulangerieqc));
    $db_password_mysql_boulangerieqc = htmlspecialchars(trim($data->db_password_mysql_boulangerieqc));
    $suiviDeProjetGoogle = htmlspecialchars(trim($data->suiviDeProjetGoogle));

    $fetch_post = "SELECT * FROM clientLogicielBoulangerieqc WHERE id=:id";
    $fetch_stmt = $conn->prepare($fetch_post);
    $fetch_stmt->bindValue(':id', $id, PDO::PARAM_INT);
    $fetch_stmt->execute();

    if ($fetch_stmt->rowCount() > 0) :
 
           $row = $fetch_stmt->fetch(PDO::FETCH_ASSOC);
           $courriel = isset($data->courriel) ? $data->courriel : $row['courriel'];
           $nomBoulangerie = isset($data->nomBoulangerie) ? $data->nomBoulangerie : $row['nomBoulangerie'];
           $actifBoolean = isset($data->actifBoolean) ? $data->actifBoolean : $row['actifBoolean'];
           $prenom = isset($data->prenom) ? $data->prenom : $row['prenom'];

           $nomFamille = isset($data->nomFamille) ? $data->nomFamille : $row['nomFamille'];
           $telephone = isset($data->telephone) ? $data->telephone : $row['telephone'];
           $rue = isset($data->rue) ? $data->rue : $row['rue'];
           $ville = isset($data->ville) ? $data->ville : $row['ville'];
           $codePostal = isset($data->codePostal) ? $data->codePostal : $row['codePostal'];

           $dateDebut = isset($data->dateDebut) ? $data->dateDebut : $row['dateDebut'];
           $dateFin = isset($data->dateFin) ? $data->dateFin : $row['dateFin'];
           $identifiant = isset($data->identifiant) ? $data->identifiant : $row['identifiant'];
           $logoBoulangerie = isset($data->logoBoulangerie) ? $data->logoBoulangerie : $row['logoBoulangerie'];
           $emailEnvoiAuBoulanger = isset($data->emailEnvoiAuBoulanger) ? $data->emailEnvoiAuBoulanger : $row['emailEnvoiAuBoulanger'];

           $host = isset($data->host) ? $data->host : $row['host'];
           $user = isset($data->user) ? $data->user : $row['user'];
           $password = isset($data->password) ? $data->password : $row['password'];
           $port = isset($data->port) ? $data->port : $row['port'];
           $logfile = isset($data->logfile) ? $data->logfile : $row['logfile'];

           $serveurFTP = isset($data->serveurFTP) ? $data->serveurFTP : $row['serveurFTP'];
           $userFTP = isset($data->userFTP) ? $data->userFTP : $row['userFTP'];
           $passwordFTP = isset($data->passwordFTP) ? $data->passwordFTP : $row['passwordFTP'];
           $site_web_documents = isset($data->site_web_documents) ? $data->site_web_documents : $row['site_web_documents'];
           $user_site_web = isset($data->user_site_web) ? $data->user_site_web : $row['user_site_web'];

           $pwd_site_web = isset($data->pwd_site_web) ? $data->pwd_site_web : $row['pwd_site_web'];
           $serveurFTP_bkup = isset($data->serveurFTP_bkup) ? $data->serveurFTP_bkup : $row['serveurFTP_bkup'];
           $userFTP_bkup = isset($data->userFTP_bkup) ? $data->userFTP_bkup : $row['userFTP_bkup'];
           $pwdFTPbkup = isset($data->pwdFTPbkup) ? $data->pwdFTPbkup : $row['pwdFTPbkup'];
           $dataFile4DD = isset($data->dataFile4DD) ? $data->dataFile4DD : $row['dataFile4DD'];

           $dataFile4DIndx = isset($data->dataFile4DIndx) ? $data->dataFile4DIndx : $row['dataFile4DIndx'];
           $depotListePrixClients = isset($data->depotListePrixClients) ? $data->depotListePrixClients : $row['depotListePrixClients'];
           $userFTPDepot = isset($data->userFTPDepot) ? $data->userFTPDepot : $row['userFTPDepot'];
           $pwdFTPDepot = isset($data->pwdFTPDepot) ? $data->pwdFTPDepot : $row['pwdFTPDepot'];
           $serveurFTPListePrixClients = isset($data->serveurFTPListePrixClients) ? $data->serveurFTPListePrixClients : $row['serveurFTPListePrixClients'];

           $serveurFTPSansFTP = isset($data->serveurFTPSansFTP) ? $data->serveurFTPSansFTP : $row['serveurFTPSansFTP'];
           $passwordFTPHash = isset($data->passwordFTPHash) ? $data->passwordFTPHash : $row['passwordFTPHash'];
           $serveurFTPSansFTP_bkup = isset($data->serveurFTPSansFTP_bkup) ? $data->serveurFTPSansFTP_bkup : $row['serveurFTPSansFTP_bkup'];
           $pwdFTPbkup_Hash = isset($data->pwdFTPbkup_Hash) ? $data->pwdFTPbkup_Hash : $row['pwdFTPbkup_Hash'];
           $db_host_mysql = isset($data->db_host_mysql) ? $data->db_host_mysql : $row['db_host_mysql'];

           $db_name_mysql = isset($data->db_name_mysql) ? $data->db_name_mysql : $row['db_name_mysql'];
           $db_username_mysql = isset($data->db_username_mysql) ? $data->db_username_mysql : $row['db_username_mysql'];
           $db_password_mysql = isset($data->db_password_mysql) ? $data->db_password_mysql : $row['db_password_mysql'];
           $repertoireBoulangerie = isset($data->repertoireBoulangerie) ? $data->repertoireBoulangerie : $row['repertoireBoulangerie'];
           $db_host_mysql_boulangerieqc = isset($data->db_host_mysql_boulangerieqc) ? $data->db_host_mysql_boulangerieqc : $row['db_host_mysql_boulangerieqc'];

           $db_name_mysql_boulangerieqc = isset($data->db_name_mysql_boulangerieqc) ? $data->db_name_mysql_boulangerieqc : $row['db_name_mysql_boulangerieqc'];
           $db_username_mysql_boulangerieqc = isset($data->db_username_mysql_boulangerieqc) ? $data->db_username_mysql_boulangerieqc : $row['db_username_mysql_boulangerieqc'];
           $db_password_mysql_boulangerieqc = isset($data->db_password_mysql_boulangerieqc) ? $data->db_password_mysql_boulangerieqc : $row['db_password_mysql_boulangerieqc'];
           $suiviDeProjetGoogle = isset($data->suiviDeProjetGoogle) ? $data->suiviDeProjetGoogle : $row['suiviDeProjetGoogle'];
           endif;


    $query = "UPDATE clientLogicielBoulangerieqc SET 
courriel= :courriel,
nomBoulangerie=:nomBoulangerie,
actifBoolean=:actifBoolean, 
prenom=:prenom,
nomFamille=:nomFamille,
telephone=:telephone,
rue=:rue,
ville=:ville,
codePostal=:codePostal,
 dateDebut=:dateDebut,
 dateFin=:dateFin,
 identifiant=:identifiant,
 logoBoulangerie=:logoBoulangerie,
 emailEnvoiAuBoulanger=:emailEnvoiAuBoulanger,
 host=:host,
 user=:user,
 password=:password,
 port=:port,
 logfile=:logfile,
 serveurFTP=:serveurFTP,
 userFTP=:userFTP,
 passwordFTP=:passwordFTP,
 site_web_documents=:site_web_documents,
 user_site_web=:user_site_web,
pwd_site_web=:pwd_site_web,
serveurFTP_bkup=:serveurFTP_bkup,
userFTP_bkup=:userFTP_bkup,
pwdFTPbkup=:pwdFTPbkup,
dataFile4DD=:dataFile4DD,
dataFile4DIndx=:dataFile4DIndx,
depotListePrixClients=:depotListePrixClients,
userFTPDepot=:userFTPDepot,
pwdFTPDepot=:pwdFTPDepot,
serveurFTPListePrixClients=:serveurFTPListePrixClients,
serveurFTPSansFTP=:serveurFTPSansFTP,
passwordFTPHash=:passwordFTPHash,
serveurFTPSansFTP_bkup=:serveurFTPSansFTP_bkup,
pwdFTPbkup_Hash=:pwdFTPbkup_Hash,
db_host_mysql=:db_host_mysql,
db_name_mysql=:db_name_mysql,
db_username_mysql=:db_username_mysql,
db_password_mysql=:db_password_mysql,
repertoireBoulangerie=:repertoireBoulangerie,
db_host_mysql_boulangerieqc=:db_host_mysql_boulangerieqc,
db_name_mysql_boulangerieqc=:db_name_mysql_boulangerieqc,
db_username_mysql_boulangerieqc=:db_username_mysql_boulangerieqc,
db_password_mysql_boulangerieqc=:db_password_mysql_boulangerieqc,
suiviDeProjetGoogle=:suiviDeProjetGoogle WHERE id=:id ";


    $stmt = $conn->prepare($query);
    $stmt->bindValue(':id', $id, PDO::PARAM_STR);
    $stmt->bindValue(':courriel', $courriel, PDO::PARAM_STR);
    $stmt->bindValue(':nomBoulangerie', $nomBoulangerie, PDO::PARAM_STR);
    $stmt->bindValue(':actifBoolean', $actifBoolean, PDO::PARAM_STR);
    $stmt->bindValue(':prenom', $prenom, PDO::PARAM_STR);

    $stmt->bindValue(':nomFamille', $nomFamille, PDO::PARAM_STR);
    $stmt->bindValue(':telephone', $telephone, PDO::PARAM_STR);
    $stmt->bindValue(':rue', $rue, PDO::PARAM_STR);
    $stmt->bindValue(':ville', $ville, PDO::PARAM_STR);
    $stmt->bindValue(':codePostal', $codePostal, PDO::PARAM_STR);

    $stmt->bindValue(':dateDebut', $dateDebut, PDO::PARAM_STR);
    $stmt->bindValue(':dateFin', $dateFin, PDO::PARAM_STR);
    $stmt->bindValue(':identifiant', $identifiant, PDO::PARAM_STR);
    $stmt->bindValue(':logoBoulangerie', $logoBoulangerie, PDO::PARAM_STR);
    $stmt->bindValue(':emailEnvoiAuBoulanger', $emailEnvoiAuBoulanger, PDO::PARAM_STR);

    $stmt->bindValue(':host', $host, PDO::PARAM_STR);
    $stmt->bindValue(':user', $user, PDO::PARAM_STR);
    $stmt->bindValue(':password', $password, PDO::PARAM_STR);
    $stmt->bindValue(':port', $port, PDO::PARAM_STR);
    $stmt->bindValue(':logfile', $logfile, PDO::PARAM_STR);


    $stmt->bindValue(':serveurFTP', $serveurFTP, PDO::PARAM_STR);
    $stmt->bindValue(':userFTP', $userFTP, PDO::PARAM_STR);
    $stmt->bindValue(':passwordFTP', $passwordFTP, PDO::PARAM_STR);
    $stmt->bindValue(':site_web_documents', $site_web_documents, PDO::PARAM_STR);
    $stmt->bindValue(':user_site_web', $user_site_web, PDO::PARAM_STR);

    $stmt->bindValue(':pwd_site_web', $pwd_site_web, PDO::PARAM_STR);
    $stmt->bindValue(':serveurFTP_bkup', $serveurFTP_bkup, PDO::PARAM_STR);
    $stmt->bindValue(':userFTP_bkup', $userFTP_bkup, PDO::PARAM_STR);
    $stmt->bindValue(':pwdFTPbkup', $pwdFTPbkup, PDO::PARAM_STR);
    $stmt->bindValue(':dataFile4DD', $dataFile4DD, PDO::PARAM_STR);

    $stmt->bindValue(':dataFile4DIndx', $dataFile4DIndx, PDO::PARAM_STR);
    $stmt->bindValue(':depotListePrixClients', $depotListePrixClients, PDO::PARAM_STR);
    $stmt->bindValue(':userFTPDepot', $userFTPDepot, PDO::PARAM_STR);
    $stmt->bindValue(':pwdFTPDepot', $pwdFTPDepot, PDO::PARAM_STR);
    $stmt->bindValue(':serveurFTPListePrixClients', $serveurFTPListePrixClients, PDO::PARAM_STR);
   
    $stmt->bindValue(':serveurFTPSansFTP', $serveurFTPSansFTP, PDO::PARAM_STR);
    $stmt->bindValue(':passwordFTPHash', $passwordFTPHash, PDO::PARAM_STR);
    $stmt->bindValue(':serveurFTPSansFTP_bkup', $serveurFTPSansFTP_bkup, PDO::PARAM_STR);
    $stmt->bindValue(':pwdFTPbkup_Hash', $pwdFTPbkup_Hash, PDO::PARAM_STR);
    $stmt->bindValue(':db_host_mysql', $db_host_mysql, PDO::PARAM_STR);

    $stmt->bindValue(':db_name_mysql', $db_name_mysql, PDO::PARAM_STR);
    $stmt->bindValue(':db_username_mysql', $db_username_mysql, PDO::PARAM_STR);
    $stmt->bindValue(':db_password_mysql', $db_password_mysql, PDO::PARAM_STR);
    $stmt->bindValue(':repertoireBoulangerie', $repertoireBoulangerie, PDO::PARAM_STR);
    $stmt->bindValue(':db_host_mysql_boulangerieqc', $db_host_mysql_boulangerieqc, PDO::PARAM_STR);

    $stmt->bindValue(':db_name_mysql_boulangerieqc', $db_name_mysql_boulangerieqc, PDO::PARAM_STR);
    $stmt->bindValue(':db_username_mysql_boulangerieqc', $db_username_mysql_boulangerieqc, PDO::PARAM_STR);
    $stmt->bindValue(':db_password_mysql_boulangerieqc', $db_password_mysql_boulangerieqc, PDO::PARAM_STR);
    $stmt->bindValue(':suiviDeProjetGoogle', $suiviDeProjetGoogle, PDO::PARAM_STR);

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
