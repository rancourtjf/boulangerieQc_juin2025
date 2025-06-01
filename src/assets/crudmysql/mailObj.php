<?php
header("Content-Type: application/json; charset=UTF_8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: PUT,HEAD,GET,POST,DELETE");
//header("Access-Control-Allow-Origin: http://localhost:4200");
//header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


//$data = json_decode(file_get_contents("php://input"));

$response = new stdClass();
$response = file_get_contents('php://input');
$decodedText = html_entity_decode($response);
$data = json_decode('[' . $decodedText . ']', true);

$varNom = $_POST['varNom'];    


$varTo = htmlspecialchars(trim($data->varTo));
$varFrom = htmlspecialchars(trim($data->varFrom));
//$messageAjout = htmlspecialchars(trim($data->messageAjout));
$dateLundi= htmlspecialchars(trim($data->dateLundi));
//$varNom= htmlspecialchars(trim($data->varNom));
$varInvendus= htmlspecialchars(trim($data->varInvendus));
echo "varInvendus=".$varInvendus;
$lienURL= htmlspecialchars(trim($data->lienURL));
$varURL= htmlspecialchars(trim($data->varURL));
$varDate= htmlspecialchars(trim($data->varDate));

$message="";

$to=$varTo;

echo '$to=' . $varTo;
echo 'varNom=' . $varNom;
echo 'varDate=' . $varDate;
echo 'varURL=' . $varURL;


$subject = "Ma commande du " . $varDate ." " . $varNom . "..." . $varInvendus ;
// Message

$message = '
<html>
<head>
  <title>Commande à ma boulangerie</title>
</head>
<body>
  <p>MailObj...Voici ma commande à télécharger de la semaine du lundi ' . $varDate . '</p>
  <div>' . $varURL . '</div
  <h2>' . $varInvendus. '</h2>

  <p>Le lien de téléchargement fonctionne une seule fois et est réservé au boulanger qui réalisera votre commande! <br><hr>' . $messageAjout . 

 ' .<br><footer> Votre client: ' . $varNom . '</footer>
</body>
</html>
';
echo $messageAjout;
//https://www.w3schools.in/php/examples/send-email-with-attachment
//https://www.codexworld.com/send-email-with-attachment-php/


$headers .= "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
$headers .= "From: " . $varFrom . "\r\n" ."CC: info@boulangerieqc.com,".$varFrom . "\r\n";
$headers .= "Content-Type: multipart/mixed; boundary=\".$boundary.\"\r\n";

// send email
if (mail($to, $subject, $message, $headers)) {
  echo " Envoi par courriel de la commande avec succès à: " .$varTo;
  echo '' . $varInvendus;
} else {
  echo "Le courriel avec sa commande n'a pu être envoyé";
}
?>
