



<?php 
// Initialize a file URL to the variable 

$data = json_decode(file_get_contents("php://input"));


$ftp_server = htmlspecialchars(trim($data->ftp_server));
$ftp_user_name = htmlspecialchars(trim($data->ftp_user_name));
$ftp_user_pass = htmlspecialchars(trim($data->ftp_user_pass));
$dir = htmlspecialchars(trim($data->dir));


echo 'ftp_server=' .$ftp_server ;
echo 'ftp_user_name' .$ftp_user_name ;
echo 'ftp_user_pass' . $ftp_user_pass ;
echo 'dir ='. $dir .'\n';


$dir="/Users/jf/Documents/boulangerie4Dv19/version4DBoulangerieQc/boulangerieQc/miseajour/";

//echo '$dir=' . $dir ;


// Mise en place d'une connexion basique
$ftp = ftp_ssl_connect($ftp_server);
echo '$ftp=' . $ftp;

// Mise en place d'une connexion basique
$ftp = ftp_ssl_connect($ftp_server);

// Identification avec un nom d'utilisateur et un mot de passe
$login_result = ftp_login($ftp, $ftp_user_name, $ftp_user_pass);
if (!$login_result) {

    // PHP aura déjà soulevé un message de niveau E_WARNING dans ce cas
    die("can't login");
}
else{
    echo 'login ok';
}
ftp_pasv($ftp, true);
echo "début transfert"; 


//Initialise the cURL var
$ch = curl_init();

//Get the response from cURL
//curl_setopt($ch, CURLOPT_USERPWD, $ftp_user_name . ":" . $ftp_user_pass);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

//Set the Url
curl_setopt($ch, CURLOPT_URL, 'https://www.boulangerieqc.com/bkupboulangerieqc/');

//Create a POST array with the file in it
$postData = array(
    'testData' => '@/Users/jf/Documents/boulangerie4Dv19/version4DBoulangerieQc/boulangerieQc/documentsWeb/ProductionQuotidienne/2023-10-31/Ingredients.pdf',
);
curl_setopt($ch, CURLOPT_POSTFIELDS, $postData);

// Execute the request
$response = curl_exec($ch);
echo '$response=' . $response ;
curl_close($ch); 
//This will send the contents of /path/to/file.txt up to example.org
//The important part of the above code is
ftp_close($ftp);

?>