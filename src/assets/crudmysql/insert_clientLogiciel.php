<?php
header("Content-Type: application/json; charset=UTF_8");
// header("Access-Control-Allow-Origin: *");
// header('Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE,PATCH');
// header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: PUT,HEAD,GET,POST,OPTIONS,DELETE,PATCH");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


$data = json_decode(file_get_contents("php://input"));

$dossierCommandesWeb = htmlspecialchars(trim($data->dossierCommandesWeb));
echo "dossierCommandesWeb=".$dossierCommandesWeb;

require "mysqlUserLogin.php";


try {
    $conn = new PDO("mysql:host=$db_host;dbname=$db_name", $db_username, $db_password);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);


    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(200);
        exit;
    }
} catch (PDOException $e) {
    echo "Connection n'a pu être faite: " . $e->getMessage();
}

try {

    $nomBoulangerie = htmlspecialchars(trim($data->nomBoulangerie));
    $courriel = htmlspecialchars(trim($data->courriel));
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

    $query = "INSERT INTO clientLogicielBoulangerieqc(
nomBoulangerie,
courriel,
actifBoolean,
prenom,
nomFamille,
telephone,
rue,
ville,
codePostal,
dateDebut,
dateFin,
identifiant,
logoBoulangerie,
emailEnvoiAuBoulanger,
host,
user,
password,
port,
logfile,
serveurFTP,
userFTP,
passwordFTP,
site_web_documents,
user_site_web,
pwd_site_web,
serveurFTP_bkup,
userFTP_bkup,
pwdFTPbkup,
dataFile4DD,
dataFile4DIndx,
depotListePrixClients,
userFTPDepot,
pwdFTPDepot,
serveurFTPListePrixClients,
serveurFTPSansFTP,
passwordFTPHash,
serveurFTPSansFTP_bkup,
pwdFTPbkup_Hash,
db_host_mysql,
db_name_mysql,
db_username_mysql,
db_password_mysql,
repertoireBoulangerie,
db_host_mysql_boulangerieqc,
db_name_mysql_boulangerieqc,
db_username_mysql_boulangerieqc,
db_password_mysql_boulangerieqc,
suiviDeProjetGoogle

    ) 
    VALUES(
:nomBoulangerie,
:courriel,
:actifBoolean,
:prenom,
:nomFamille,
:telephone,
:rue,
:ville,
:codePostal,
:dateDebut,
:dateFin,
:identifiant,
:logoBoulangerie,
:emailEnvoiAuBoulanger,
:host,
:user,
:password,
:port,
:logfile,
:serveurFTP,
:userFTP,
:passwordFTP,
:site_web_documents,
:user_site_web,
:pwd_site_web,
:serveurFTP_bkup,
:userFTP_bkup,
:pwdFTPbkup,
:dataFile4DD,
:dataFile4DIndx,
:depotListePrixClients,
:userFTPDepot,
:pwdFTPDepot,
:serveurFTPListePrixClients,
:serveurFTPSansFTP,
:passwordFTPHash,
:serveurFTPSansFTP_bkup,
:pwdFTPbkup_Hash,
:db_host_mysql,
:db_name_mysql,
:db_username_mysql,
:db_password_mysql,
:repertoireBoulangerie,
:db_host_mysql_boulangerieqc,
:db_name_mysql_boulangerieqc,
:db_username_mysql_boulangerieqc,
:db_password_mysql_boulangerieqc,
:suiviDeProjetGoogle
    )";

    $stmt = $conn->prepare($query);

    $stmt->bindValue(':nomBoulangerie', $nomBoulangerie, PDO::PARAM_STR);
    $stmt->bindValue(':courriel', $courriel, PDO::PARAM_STR);
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

    $stmt->bindValue(':db_host_mysql_boulangerieqc', $db_host_mysql_boulangerieqc, PDO::PARAM_STR);
    $stmt->bindValue(':db_name_mysql_boulangerieqc', $db_name_mysql_boulangerieqc, PDO::PARAM_STR);
    $stmt->bindValue(':db_username_mysql_boulangerieqc', $db_username_mysql_boulangerieqc, PDO::PARAM_STR);
    $stmt->bindValue(':db_password_mysql_boulangerieqc', $db_password_mysql_boulangerieqc, PDO::PARAM_STR);
    $stmt->bindValue(':suiviDeProjetGoogle', $suiviDeProjetGoogle, PDO::PARAM_STR);
  
    if ($stmt->execute()) {

        http_response_code(201);
        echo json_encode([
            'success' => 1,
            'message' => 'Data insere avec succes message.'
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
