<?php
header("Content-Type: application/json; charset=UTF_8");
header("Access-Control-Allow-Origin: *");
//header("Access-Control-Allow-Origin: http://localhost:4200");
//header("Access-Control-Allow-Origin: https://www.boulangerieqc.com/students/crydmysql/insert.php");
//header("Access-Control-Allow-Origin: https://www.boulangerieqc.com");
header("Access-Control-Allow-Methods: POST,PUT,GET,DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");


$data = json_decode(file_get_contents("php://input"));

$dossierCommandesWeb = htmlspecialchars(trim($data->dossierCommandesWeb));
echo 'DossierCommandesWeb='.$dossierCommandesWeb;

require "mysqlUserLogin.php";


try {
    $conn = new PDO("mysql:host=$db_host;dbname=$db_name", $db_username, $db_password);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
     echo "Connection à la base de donnée faite!";
} catch (PDOException $e) {
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
    $nom = htmlspecialchars(trim($data->nom));
    // $emailUserWeb = isset($data->$emailUserWeb) ? $data->$emailUserWeb : $row['emailUserWeb'];
    // $motPasseWeb = isset($data->$motPasseWeb) ? $data->$motPasseWeb : $row['motPasseWeb'];
    $emailUserWeb = htmlspecialchars(trim($data->emailUserWeb));
    $motPasseWeb = htmlspecialchars(trim($data->motPasseWeb));
    $prenomContact = htmlspecialchars(trim($data->prenomContact));
    $nomContact = htmlspecialchars(trim($data->nomContact));
    $regroupement = htmlspecialchars(trim($data->regroupement));
    $idComptable = htmlspecialchars(trim($data->idComptable));
    $frais_transport = htmlspecialchars(trim($data->frais_transport));
    $activation_Frais_transport = htmlspecialchars(trim($data->activation_Frais_transport));
    $qteMincommande = htmlspecialchars(trim($data->qteMincommande));
    $achat_minimum_sans_frais = htmlspecialchars(trim($data->achat_minimum_sans_frais));
    $version = htmlspecialchars(trim($data->version));

    $escompte_baguette = htmlspecialchars(trim($data->escompte_baguette));
    $escompte_painBlanc = htmlspecialchars(trim($data->escompte_painBlanc));
    $escompte_painsspeciaux = htmlspecialchars(trim($data->escompte_painsspeciaux));
    $escompte_patisserie = htmlspecialchars(trim($data->escompte_patisserie));
    $escompte_viennoiserie = htmlspecialchars(trim($data->escompte_viennoiserie));

    $query = "INSERT INTO client(
    idclient,
    courriel,
    googlemap,
    adresse,
    ville,
    codepostal,
    telephone,
    nom,
    emailUserWeb,
    motPasseWeb,
    prenomContact,
    nomContact,
    regroupement,
    idComptable,
    frais_transport,
    activation_Frais_transport,
    qteMincommande,
    achat_minimum_sans_frais,
    version,
    escompte_baguette,
    escompte_painBlanc,
    escompte_painsspeciaux,
    escompte_patisserie,
    escompte_viennoiserie
    ) 
    VALUES(
:idclient,
 :courriel,
 :googlemap,
 :adresse,
 :ville,
 :codepostal,
 :telephone,
 :nom,
 :emailUserWeb,
 :motPasseWeb,
 :prenomContact,
 :nomContact,
 :regroupement,
 :idComptable,
 :frais_transport,
 :activation_Frais_transport,
 :qteMincommande,
 :achat_minimum_sans_frais,
 :version,
:escompte_baguette,
:escompte_painBlanc,
:escompte_painsspeciaux,
:escompte_patisserie,
:escompte_viennoiserie
    )";

    $stmt = $conn->prepare($query);

    $stmt->bindValue(':idclient', $idclient, PDO::PARAM_STR);
    $stmt->bindValue(':courriel', $courriel, PDO::PARAM_STR);
    $stmt->bindValue(':googlemap', $googlemap, PDO::PARAM_STR);
    $stmt->bindValue(':adresse', $adresse, PDO::PARAM_STR);
    $stmt->bindValue(':ville', $ville, PDO::PARAM_STR);
    $stmt->bindValue(':codepostal', $codepostal, PDO::PARAM_STR);
    $stmt->bindValue(':telephone', $telephone, PDO::PARAM_STR);
    $stmt->bindValue(':nom', $nom, PDO::PARAM_STR);
    $stmt->bindValue(':emailUserWeb', $emailUserWeb, PDO::PARAM_STR);
    $stmt->bindValue(':motPasseWeb', $motPasseWeb, PDO::PARAM_STR);
    $stmt->bindValue(':prenomContact', $prenomContact, PDO::PARAM_STR);
    $stmt->bindValue(':nomContact', $nomContact, PDO::PARAM_STR);
    $stmt->bindValue(':regroupement', $regroupement, PDO::PARAM_STR);
    $stmt->bindValue(':idComptable', $idComptable, PDO::PARAM_STR);
    $stmt->bindValue(':frais_transport', $frais_transport, PDO::PARAM_STR);
    $stmt->bindValue(':activation_Frais_transport', $activation_Frais_transport, PDO::PARAM_STR);
    $stmt->bindValue(':qteMincommande', $qteMincommande, PDO::PARAM_STR);
    $stmt->bindValue(':achat_minimum_sans_frais', $achat_minimum_sans_frais, PDO::PARAM_STR);
    $stmt->bindValue(':version', $version, PDO::PARAM_STR);

    $stmt->bindValue(':escompte_baguette', $version, PDO::PARAM_STR);
    $stmt->bindValue(':escompte_painBlanc', $version, PDO::PARAM_STR);
    $stmt->bindValue(':escompte_painsspeciaux', $version, PDO::PARAM_STR);
    $stmt->bindValue(':escompte_patisserie', $version, PDO::PARAM_STR);
    $stmt->bindValue(':escompte_viennoiserie', $version, PDO::PARAM_STR);

    if ($stmt->execute()) {

        http_response_code(201);
        echo json_encode([
            'success' => 1,
            'message' => 'Data insere avec succes.'
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
