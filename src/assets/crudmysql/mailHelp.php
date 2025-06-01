<?php

$newNom =$_GET["nom"];
$varFrom =$_GET["varFrom"];
$to = "info@boulangerieqc.com";
$sujet = $_GET["sujet"];
$message = $_GET["message"];


$messageAjout = "Voici une demande d'aide à BoulangerieQc <br>";
$messageAjout = $messageAjout  . ' <br>son mom: ' . $newNom . '<br>';
$messageAjout = $messageAjout . ' son courriel: ' . $varFrom . '<br>';
$messageAjout =$messageAjout . 'le sujet ' . $sujet . '<br>';
$messageAjout =$messageAjout . 'le message ' . $message . '<br>';
$date = new DateTime('now');
$result = $date->format('Y-m-d H:i:s');
$subject = $sujet;
// Message
$message = '
<html>
<head>
  <title>Nouveau client web</title>
</head>
<body>

  <p>' . $messageAjout . '</p><hr><br>

 <footer> Votre boulangerie client: ' . $varFrom . '</footer>
</body>
</html>
';


$headers .= "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
$headers .= "From: " . $_GET["varFrom"] . "\r\n" ."CC: info@boulangerieqc.com". "\r\n";
$headers .= "Content-Type: multipart/mixed; boundary=\".$boundary.\"\r\n";


// send email
if (mail($to, $subject, $message, $headers)) {
  echo " Envoi par courriel de votre demande à: <br>" . $to . "<br><hr>Nous communiquerons avec vous dans les plus brefs délais.";

} else {
  echo "Le courriel avec votre demande n'a pu être envoyé";
}
?>