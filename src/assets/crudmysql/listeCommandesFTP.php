<?php

//$ftp_server = "184.107.112.43";
$ftp_server = "198.72.104.27";
$ftp_user_name = "listeprixclients@boulangerieqc.com";
$ftp_user_pass = "purtak-wiMgar-8womhe";
$dossier = $_GET["dossier"];


// Mise en place d'une connexion basique
$ftp = ftp_ssl_connect($ftp_server);
//Connect
//echo "<br />Connecting to $ftp_server via FTP...";

// Identification avec un nom d'utilisateur et un mot de passe
$login_result = ftp_login($ftp, $ftp_user_name, $ftp_user_pass);
if (!$login_result) {

    // PHP aura déjà soulevé un message de niveau E_WARNING dans ce cas
    die("can't login");
} else {
    // echo 'login ok<br>';
}


//Enable PASV ( Note: must be done after ftp_login() )
//
$mode = ftp_pasv($ftp , TRUE);

$racine = "/" . $dossier . "/commandesWeb/";

$arr = array($racine => "");
$file_list = ftp_nlist($ftp, $racine);
rsort($file_list);

echo "<style>
h2   {color: blue;}
</style><h2>Voici les fichiers de commandes Web à votre boulangerie</h2>";
foreach ($file_list as $file) {

   $filename = strtr($file, $arr);

    if (($filename == '.') || ($filename == '..') || ($filename == '.ftpquota')) {

    }
    else{
        //  get the last modified time
$buff = ftp_mdtm($ftp, $file);


if ($buff != -1) {

    $lien ="../../clients" . $file ;

    echo "<a href='" . $lien . "'>" . $filename . "</a><br>";
   // echo "...Créé le  : " . date("F d Y H:i:s", $buff) . "<br>";
}
    }
}


//close
ftp_close($ftp );
