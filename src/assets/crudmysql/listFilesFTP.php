<?php


//$ftp_server = "184.107.112.43";
$ftp_server = "198.72.104.27";
//define("IPSERVEURFUNIO", "184.107.112.43");
//define("IPSERVEURFUNIO", "198.72.104.27");
$ftp_user_name = "rancour_boulangerieqc";
$ftp_user_pass = "voZqec-wufro7-ribjyf";

  
// Mise en place d'une connexion basique
$ftp = ftp_ssl_connect($ftp_server);
//Connect
echo "<br />Connecting to $ftp_server via FTP...";

// Identification avec un nom d'utilisateur et un mot de passe
$login_result = ftp_login($ftp, $ftp_user_name, $ftp_user_pass);
if (!$login_result) {

    // PHP aura déjà soulevé un message de niveau E_WARNING dans ce cas
    die("can't login");
}
else{
    echo 'login ok<br>';
}


//Enable PASV ( Note: must be done after ftp_login() )
//
$mode = ftp_pasv($ftp , TRUE);

//
//Now run ftp_nlist()
//
$file_list = ftp_nlist($ftp , "");
foreach ($file_list as $file)
{
  echo "<br>$file";
}

//close
ftp_close($$ftp );

?>