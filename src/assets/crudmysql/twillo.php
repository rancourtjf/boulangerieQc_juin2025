<?php
header("Content-Type: application/pdf");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST,PUT,GET");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Content-Disposition: form-data; name='file'; filename='file.pdf'");
// SID de votre compte Twilio et Auth Token
$accountSid = "AC3985ac91835cb8571b8a97fdac8c16de";
$authToken = "18cb691a47e35f3cc1a8317af6578e10";

// Numéros de téléphone




$fromPhoneNumber = "+19258544737"; // Numéro Twilio qui sert à envoyer
$toPhoneNumber = "+15819806542";  // Numéro du destinataire  par défaut cell du programmeur
// Message à envoyer par défaut
$message = "Bonjour, ceci est un message envoyé avec Twilio et PHP.";

$toPhoneNumber = $_GET["toPhoneNumber"];
$message = $_GET["message"];


// URL de l'API Twilio pour l'envoi de messages
$url = "https://api.twilio.com/2010-04-01/Accounts/$accountSid/Messages.json";

// Données à envoyer
$data = [
    'From' => $fromPhoneNumber,
    'To' => $toPhoneNumber,
    'Body' => $message
];

// Initialiser cURL
$ch = curl_init($url);

// Configuration de cURL
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true, // Retourner la réponse dans une variable
    CURLOPT_POST => true,          // Méthode POST
    CURLOPT_POSTFIELDS => http_build_query($data), // Données à envoyer
    CURLOPT_USERPWD => "$accountSid:$authToken",   // Authentification Basic
]);

// Exécuter la requête
$response = curl_exec($ch);

// Vérifier les erreurs
if ($response === false) {
    echo "Erreur cURL : " . curl_error($ch);
} else {
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    echo "Code HTTP : $httpCode\n";
    echo "Réponse : $response\n";
}

// Fermer la connexion cURL
curl_close($ch);
?>