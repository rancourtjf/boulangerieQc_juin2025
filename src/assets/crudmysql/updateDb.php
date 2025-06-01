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

echo '$dir=' . $dir ;


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


$url = 
'https://www.boulangerieqc.com/bkupboulangerieqc/miseajour/boulangerie.4DIndy'; 

// Initialize the cURL session 



// Initialize directory name where 
// file will be save 
//$dir = './'; 

// Use basename() function to return 
// the base name of file 
$file_name = basename($url); 
echo 'file_name=' .$file_name;

// Save file into file location 
$save_file_loc = $dir . $file_name; 

echo '$save_file_loc=' .$save_file_loc;

// Open file 
$fp = fopen($save_file_loc, 'wb'); 

// It set an option for a cURL transfer 

echo 'url avant init curl=' .$url;

$ch = curl_init($url);
//curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_DIGEST);
curl_setopt($ch, CURLOPT_FILE, $fp); 
curl_setopt($ch, CURLOPT_HEADER, 0); 
curl_setopt($ch, CURLOPT_USERPWD, $ftp_user_name . ":" . $ftp_user_pass);
//curl_setopt($ch, CURLOPT_TIMEOUT, 30);
//curl_setopt($ch, CURLOPT_POST, 1);
//url_setopt($ch, CURLOPT_POSTFIELDS, $payloadName);
//curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
$return = curl_exec($ch);

echo '$return= fin cURL' .$return;

// Closes a cURL session and frees all resources 
curl_close($ch); 

//test

$file_url =  
'https://www.boulangerieqc.com/bkupboulangerieqc/miseajour/boulangerie.4DIndy'; 
  
      $destination_path = "/Users/jf/Documents/boulangerie4Dv19/version4DBoulangerieQc/boulangerieQc/miseajour/boulangerie.4DIndy"; 
      $fp = fopen($destination_path, "w+");                
  
      $ch = curl_init($file_url); 
      curl_setopt($ch, CURLOPT_FILE, $fp); 
      curl_setopt($ch, CURLOPT_USERPWD, $ftp_user_name . ":" . $ftp_user_pass);
      curl_exec($ch); 
  
      $st_code = curl_getinfo($ch, CURLINFO_HTTP_CODE); 
      curl_close($ch); 
      fclose($fp); 
  
      if($st_code == 200) 
          echo 'File downloaded successfully from the server'; 
      else
          echo 'Error occur'; 

//fin test

//test2
$cinit = curl_init ($url);
curl_setopt($cinit, CURLOPT_HEADER, 0);
curl_setopt($cinit, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($cinit, CURLOPT_BINARYTRANSFER,1);
$cexec=curl_exec($cinit);
curl_close ($cinit);
if(file_exists($destination_path)){
    unlink($destination_path);
}
$fp = fopen($destination_path,'x');
$raw="";
fwrite($fp, $raw);
fclose($fp);

//fin test2




// Fermeture de la connexion SSL
ftp_close($ftp);
?>





echo "début transfert";

$dir="/Users/jf/Documents/boulangerie4Dv19/version4DBoulangerieQc/boulangerieQc/miseajour/boulangerie.4DB";

$url = 
'https://www.boulangerieqc.com/bkupboulangerieqc/miseajour/boulangerie.4DIndy'; 

// Initialize the cURL session 
$ch = curl_init($url); 

// Initialize directory name where 
// file will be save 
//$dir = './'; 
$dir = htmlspecialchars(trim($data->dir));

// Use basename() function to return 
// the base name of file 
$file_name = basename($url); 

// Save file into file location 
$save_file_loc = $dir . $file_name; 

// Open file 
$fp = fopen($save_file_loc, 'wb'); 

// It set an option for a cURL transfer 
curl_setopt($ch, CURLOPT_FILE, $fp); 
curl_setopt($ch, CURLOPT_HEADER, 0); 

// Perform a cURL session 
curl_exec($ch); 

// Closes a cURL session and frees all resources 
curl_close($ch); 

// Close file 
fclose($fp); 
echo "transfert fait";
?>
