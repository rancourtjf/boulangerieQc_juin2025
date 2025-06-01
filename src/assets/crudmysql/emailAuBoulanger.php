<?php
header("Content-Type: application/json; charset=UTF_8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

//  createCommande(csv:File,to:string,subject:string,message:string,from:string,date:Date) {

// recipient email address
//$to = $_POST['to'];
$to = "info@boulangerieqc.com";

// subject of the email
//$subject = $_POST['subject'];
$subject = "Envoi de ma commande";

$urlTelechargement = "https://www.file.io";

// message body
//$message = $_POST['message'];
$message = 'test';

$from = "jflevis2019@gmail.com";

// boundary
$boundary = uniqid();

// header information
$headers = "From:".$from."\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: multipart/mixed; boundary=\".$boundary.\"\r\n";

// // attachment
// $file = $_FILES["attachment"]["tmp_name"];
// $filename = $_FILES["attachment"]["name"];
// $attachment = chunk_split(base64_encode(file_get_contents($file)));

// message with attachment
// $message = "--".$boundary."\r\n";
// $message .= "Content-Type: text/plain; charset=UTF-8\r\n";
// $message .= "Content-Transfer-Encoding: base64\r\n\r\n";
// $message .= chunk_split(base64_encode($message));
// $message .= "--".$boundary."\r\n";
// $message .= "Content-Type: application/octet-stream; name=\"".$filename."\"\r\n";
// $message .= "Content-Transfer-Encoding: base64\r\n";
// $message .= "Content-Disposition: attachment; filename=\"".$filename."\"\r\n\r\n";
// $message .= $attachment."\r\n";
// $message .= "--".$boundary."--";

// send email
if (mail($to, $subject, $message, $headers)) {
    echo "Envoi par courriel de la commande avec succès.";
} else {
    echo "Le courriel avec sa commande n'a pu être envoyé";
}
?>