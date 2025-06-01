<?php
//mailObjString.php
$to = $_GET["varTo"];
$from = $_GET["varFrom"];
$messageAjout = $_GET["messageEmail"];
$nomBoulangerie = $_GET["nomBoulangerie"];


$subject = "Ma commande du " . $_GET["varDate"] ." " . $_GET["varNom"] . "..." . $_GET["varInvendus"] ;
// Message

//on retire <div>' . $_GET["varURL"] . '</div du message ci-bas car file.io ne marche pas

$message = '
<html>
<head>
  <title>Commande à ma boulangerie</title>
</head>
<body>
<p>Voici ma commande à télécharger de la semaine du lundi ' . $_GET["varDate"] . '</p>

  <h2>' . $_GET["varInvendus"] . '</h2>

  <p>Le lien de téléchargement ci-dessous permet au boulanger de réaliser la commande dans le logiciel BoulangerieQc!  <br><hr>' . $messageAjout . 

 ' .<br><footer> Votre client: ' . $_GET["varNom"] . '</footer>
</body>
</html>=
';
echo 'varURL='.$_GET["varURL"];
echo 'messageAjout='.$messageAjout;

$headers .= "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
$headers .= "From: " . $_GET["varFrom"] . "\r\n" ."CC: info@boulangerieqc.com". "\r\n";
//$headers .= "Reply-To: " . $_GET["varFrom"] . "\r\n";
//$headers .= "From: " . $from . "\r\n" ."CC: info@boulangerieqc.com," . $from . "\r\n";

$headers .= "Content-Type: multipart/mixed; boundary=\".$boundary.\"\r\n";

// send email

  if (mail($to, $subject, $message, $headers)) {
  echo " Envoi par courriel de la commande avec succès à: " . $_GET["varTo"];
  echo '' . $_GET["varInvendus"];
  $date = date('d-m-Y H:i:s');

  $conf_subject = 'Votre commande récente du '. $_GET["varDate"] ;
  $conf_sender =$_GET["varFrom"];
  $msg = '
  <html>
  <head>
    <title>Commande du ' . $_GET["varDate"] . 'reçue le ' . $date .'</title>
  </head>
  <body>
  <p>' . $_GET["varNom"] .'. Nous avons bien reçu votre commande de la semaine du lundi ' . $_GET["varDate"] . ' le ' .$date.' pour: ' . $_GET["nomBoulangerie"] .'.</p>

  

  <br><hr><div style="color: red;">' . $messageAjout . '</div>
  
   <br><footer> Au plaisir de vous servir! </footer>
  </body>
  </html>
  ';
  $headers2 = "From: " . $_GET['varTo'] . "\r\n";
  $headers2 .= 'MIME-Version: 1.0' . "\r\n";
  $headers2 .= "Content-type:text/html;charset=UTF-8" . "\r\n";

  mail( $_GET['varFrom'], $conf_subject, $msg, $headers2 );
} else {
  echo "Le courriel avec sa commande n'a pu être envoyé";
}

?>
