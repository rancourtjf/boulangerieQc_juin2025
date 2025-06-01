<?php
header("Content-Type: application/json; charset=UTF_8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

$data = json_decode(file_get_contents("php://input"));

$dossierCommandesWeb = htmlspecialchars(trim($data->dossierCommandesWeb));
$ID_4D=htmlspecialchars(trim($data->ID_4D));
require "mysqlUserLogin.php";

try {
    $conn = new PDO("mysql:host=$db_host;dbname=$db_name", $db_username, $db_password);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  // echo "Connection à la base de donnée faite!";

  } catch(PDOException $e) {
    echo "Connection n'a pu être faite: " . $e->getMessage();
  }
if (isset($ID_4D)) {
    $ID_4D = filter_var($ID_4D, FILTER_VALIDATE_INT, [
        'options' => [
            'default' => 'all_recetteSecondaire',
            'min_range' => 1
        ]
    ]);
}

try {

    $sql = is_numeric($ID_4D) ? "SELECT * FROM `recetteSecondaire` WHERE ID_4D='$ID_4D'" : "SELECT * FROM `recetteSecondaire`";

    $stmt = $conn->prepare($sql);

    $stmt->execute();

    if ($stmt->rowCount() > 0) :

        $data = null;
        if (is_numeric($ID_4D)) {
            $data = $stmt->fetch(PDO::FETCH_ASSOC);
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