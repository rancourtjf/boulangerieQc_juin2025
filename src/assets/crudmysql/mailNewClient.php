<?php

$newNom =$_GET["nom"];
$courriel =$_GET["courriel"];
$id =$_GET["ID"];
$password =$_GET["password"];
$to = $_GET["varTo"];
$from = $_GET["varFrom"];

$messageAjout = "voici une nouvelle inscription à faire pour la saisie de commande web sur BoulangerieQc <br>";
$messageAjout = $messageAjout  . ' <br>son mom: ' . $newNom . '<br>';
$messageAjout = $messageAjout . ' son courriel: ' . $courriel . '<br>';
$messageAjout = $messageAjout . ' son ID: ' . $id .'<br>';
$messageAjout =$messageAjout . 'son mot de passe sera: ' . $password . '<br>';
$date = new DateTime('now');
$result = $date->format('Y-m-d H:i:s');
$subject = "nouveau client web ' . $result ";
// Message
$message = '
<html>
<head>
  <title>Nouveau client web</title>
</head>
<body>

  <p>' . $messageAjout . '</p><hr><br>

 <footer> Votre boulangerie client: ' . $from . '</footer>
</body>
</html>
';


$headers .= "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
$headers .= "From: " . $_GET["varFrom"] . "\r\n" ."CC: info@boulangerieqc.com". "\r\n";
$headers .= "Content-Type: multipart/mixed; boundary=\".$boundary.\"\r\n";


// send email
if (mail($to, $subject, $message, $headers)) {
  echo " Envoi par courriel d'un nouveau client commercial<br>" . $_GET["varTo"];

} else {
  echo "Le courriel avec sa commande n'a pu être envoyé";
}
?>