<?php
header("Content-Type: application/json; charset=UTF_8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST,PUT,GET,DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");


$data = json_decode(file_get_contents("php://input"));


$dossierCommandesWeb=htmlspecialchars(trim($data->dossierCommandesWeb));
$idclient = htmlspecialchars(trim($data->idclient));

require "mysqlUserLogin.php";

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
    $nom = htmlspecialchars(trim($data->nom));
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


    $fetch_post = "SELECT * FROM `client` WHERE idclient=:idclient";
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
           $nom = isset($data->$nom) ? $data->$nom : $row['nom'];
           $emailUserWeb = isset($data->$emailUserWeb) ? $data->$emailUserWeb : $row['emailUserWeb'];
           $motPasseWeb = isset($data->$motPasseWeb) ? $data->$motPasseWeb : $row['motPasseWeb'];
           $prenomContact = isset($data->$prenomContact) ? $data->$prenomContact : $row['prenomContact'];
           $nomContact = isset($data->$nomContact) ? $data->$nomContact : $row['nomContact'];
           $regroupement = isset($data->$regroupement) ? $data->$regroupement : $row['regroupement'];
           $idComptable = isset($data->$idComptable) ? $data->$idComptable : $row['regroupement'];
           $frais_transport = isset($data->$frais_transport) ? $data->$frais_transport : $row['frais_transport'];
           $activation_Frais_transport = isset($data->$activation_Frais_transport) ? $data->$activation_Frais_transport : $row['activation_Frais_transport'];
           $qteMincommande = isset($data->$qteMincommande) ? $data->$qteMincommande : $row['qteMincommande'];
           $achat_minimum_sans_frais = isset($data->$achat_minimum_sans_frais) ? $data->$achat_minimum_sans_frais : $row['achat_minimum_sans_frais'];
           $version = isset($data->$version) ? $data->$version : $row['version'];

           $version = isset($data->$escompte_baguette) ? $data->$escompte_baguette : $row['escompte_baguette'];
           $version = isset($data->$escompte_painBlanc) ? $data->$escompte_painBlanc : $row['escompte_painBlanc'];
           $version = isset($data->$escompte_painsspeciaux) ? $data->$escompte_painsspeciaux : $row['escompte_painsspeciaux'];
           $version = isset($data->$escompte_patisserie) ? $data->$escompte_patisserie : $row['escompte_patisserie'];
           $version = isset($data->$escompte_viennoiserie) ? $data->$escompte_viennoiserie : $row['escompte_viennoiserie'];

        endif;


    $query = "UPDATE  client SET
        idclient=:idclient,
        courriel=:courriel,
        googlemap= :googlemap,
        adresse= :adresse,
        ville= :ville,
        codepostal= :codepostal,
        telephone= :telephone,
        nom=:nom,
        emailUserWeb=:emailUserWeb,
        motPasseWeb=:motPasseWeb,
        prenomContact=:prenomContact,
        nomContact=:nomContact,
        regroupement=:regroupement,
        idComptable=:idComptable,
        frais_transport=:frais_transport,
        activation_Frais_transport=:activation_Frais_transport,
        qteMincommande=:qteMincommande,
        achat_minimum_sans_frais=:achat_minimum_sans_frais, 
        version=:version,
        escompte_baguette=:escompte_baguette,
        escompte_painBlanc=:escompte_painBlanc,
        escompte_painsspeciaux=:escompte_painsspeciaux,
        escompte_patisserie=:escompte_patisserie,
        escompte_viennoiserie=:escompte_viennoiserie
         WHERE idclient=:idclient";
     

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

    $stmt->bindValue(':escompte_baguette', $escompte_baguette, PDO::PARAM_STR);
    $stmt->bindValue(':escompte_painBlanc', $escompte_painBlanc, PDO::PARAM_STR);
    $stmt->bindValue(':escompte_painsspeciaux', $escompte_painsspeciaux, PDO::PARAM_STR);
    $stmt->bindValue(':escompte_patisserie', $escompte_patisserie, PDO::PARAM_STR);
    $stmt->bindValue(':escompte_viennoiserie', $escompte_viennoiserie, PDO::PARAM_STR);

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
