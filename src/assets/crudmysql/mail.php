<?php
$to = $_GET["varTo"];
$from = $_GET["varFrom"];
$messageAjout = $_GET["messageEmail"];


$subject = "Ma commande du " . $_GET["varDate"] ." " . $_GET["varNom"] . "..." . $_GET["varInvendus"] ;
// Message

$message = '
<html>
<head>
  <title>Commande à ma boulangerie</title>
</head>
<body>
  <p>Voici ma commande à télécharger de la semaine du lundi ' . $_GET["varDate"] . '</p>
  <div>' . $_GET["varURL"] . '</div
  <h2>' . $_GET["varInvendus"] . '</h2>

  <p>Le lien de téléchargement fonctionne une seule fois et est réservé au boulanger qui réalisera votre commande! <br><hr>' . $messageAjout . 

 ' .<br><footer> Votre client: ' . $_GET["varNom"] . '</footer>
</body>
</html>
';

$headers .= "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
$headers .= "From: " . $from . "\r\n" ."CC: info@boulangerieqc.com,".$from . "\r\n";
$headers .= "Content-Type: multipart/mixed; boundary=\".$boundary.\"\r\n";


// send email
if (mail($to, $subject, $message, $headers)) {
  echo " Envoi par courriel de la commande avec succès à: " . $_GET["varTo"];
  echo '' . $_GET["varInvendus"];
} else {
  echo "Le courriel avec sa commande n'a pu être envoyé";
}
?>
<!-- 
// Boundary  
$semi_rand = md5(time());  
$mime_boundary = "==Multipart_Boundary_x{$semi_rand}x";  
 
// Headers for attachment  
$headers .= "\nMIME-Version: 1.0\n" . "Content-Type: multipart/mixed;\n" . " boundary=\"{$mime_boundary}\""; 
 
// Multipart boundary  
$message = "--{$mime_boundary}\n" . "Content-Type: text/html; charset=\"UTF-8\"\n" . 
"Content-Transfer-Encoding: 7bit\n\n" . $htmlContent . "\n\n";  
 
// Preparing attachment 
if(!empty($file) > 0){ 
    if(is_file($file)){ 
        $message .= "--{$mime_boundary}\n"; 
        $fp =    @fopen($file,"rb"); 
        $data =  @fread($fp,filesize($file)); 
 
        @fclose($fp); 
        $data = chunk_split(base64_encode($data)); 
        $message .= "Content-Type: application/octet-stream; name=\"".basename($file)."\"\n" .  
        "Content-Description: ".basename($file)."\n" . 
        "Content-Disposition: attachment;\n" . " filename=\"".basename($file)."\"; size=".filesize($file).";\n" .  
        "Content-Transfer-Encoding: base64\n\n" . $data . "\n\n"; 
    } 
} 
$message .= "--{$mime_boundary}--";  -->
