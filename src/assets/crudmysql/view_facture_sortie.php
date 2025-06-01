<?php

header("Content-Type: application/json; charset=UTF_8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, PATCH,DELETE");

$dossierCommandesWeb = $_GET["dossierCommandesWeb"];
$type_facture=$_GET["type_facture"];
$id_impression_facture=$_GET["id_impression_facture"];

require "mysqlUserLogin.php";

// $id_impression_facture= htmlspecialchars(trim($data->id_impression_facture));
// $type_facture= htmlspecialchars(trim($data->type_facture));

$method = $_SERVER['REQUEST_METHOD'];

if ($method == "OPTIONS") {
    die();
}

try {
    $conn = new PDO("mysql:host=$db_host;dbname=$db_name", $db_username, $db_password);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
   // echo "Connection à la base de donnée faite!";
  } catch(PDOException $e) {
    echo "Connection n'a pu être faite: " . $e->getMessage();
  }

    //  // Définir les nouvelles permissions (par exemple, 755 pour propriétaire, lecture et exécution pour groupe et autres)
    //  $new_permissions = 0755;
    //  $ftp_folder = '../client/boulangerieqc/factures'; // chemin absolu vers le dossier sur le serveur FTP
  
    //  // Changer les permissions du dossier
    //  if (ftp_chmod($conn_id, $new_permissions, $ftp_folder)) {
    //      echo "Les permissions du dossier $ftp_folder ont été changées avec succès.";
    //  } else {
    //      echo "Erreur lors du changement des permissions du dossier $ftp_folder.";
    //  }

if (isset($id_impression_facture)) {
    $id_impression_facture = filter_var($id_impression_facture, FILTER_VALIDATE_INT, [
        'options' => [
            'default' => 'all_impression_facture',
            'min_range' => 1
        ]
    ]);
}

try {

    $sql = is_numeric($id_impression_facture) ? "SELECT * FROM `facture` WHERE id_impression_facture = '$id_impression_facture' AND type_facture= '$type_facture'" : "SELECT * FROM `facture` WHERE type_facture= '$type_facture'";

    $stmt = $conn->prepare($sql);

    $stmt->execute();

    if ($stmt->rowCount() > 0) :

        $data = null;
        if (is_numeric($id_impression_facture)) {
            $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
        } else {
            $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
        }

        echo json_encode([
            'success' => 1,
            'data' => $data,
        ]);

    else :
        echo json_encode([
            'success' => 0,
            'message' => 'Pas de fiche trouvée!',
        ]);
    endif;
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'success' => 0,
        'message' => $e->getMessage()
    ]);
    exit;
}