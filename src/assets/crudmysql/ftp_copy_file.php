<?php
$ftp_server = "184.107.112.43";
$ftp_server = "198.72.104.27";
$ftp_user_name = "listeprixclients@boulangerieqc.com";
$ftp_user_pass = "purtak-wiMgar-8womhe";
//$file= $_GET["localFile"];

// Mise en place d'une connexion basique
$ftp = ftp_ssl_connect($ftp_server);

// Identification avec un nom d'utilisateur et un mot de passe
$login_result = ftp_login($ftp, $ftp_user_name, $ftp_user_pass);
if (!$login_result) {
    // PHP aura déjà soulevé un message de niveau E_WARNING dans ce cas
    die("on ne peut se connecter");
} else {
    echo 'Login ok<br>';
}

$mode = ftp_pasv($ftp, TRUE);

//output the array stored in $file_list using foreach loop
$racine = "/boulangerieqc/commandesWeb/";
$arr = array($racine => "");
$file_list = ftp_nlist($ftp, $racine);
foreach ($file_list as $key => $dat) {
    $filename = strtr($dat, $arr);

    if (($filename == '.') || ($filename == '..') || ($filename == '.ftpquota')) {
    } else {

        $source = "../../clients" . $dat;
        echo "source:=" . $source . "<br>";
    
        $destination = "../../clients/boulangerieqc/commandesWebTraitees/" . $filename;
        echo "destination:=" . $destination . "<br><hr>";
        echo rename($source, $destination) ? "OK<br>" : "ERROR";
    }
}

ftp_close($ftp);
