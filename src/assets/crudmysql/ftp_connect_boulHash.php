

<?php

$ftp_server = '184.107.112.43';
$ftp_server = "198.72.104.27";
$ftp_user_name = 'croissantdelune@boulangerieqc.com';
$ftp_user_pass = '$2y$10$CAWnSRpHtQzRES3bAi2op.TEvwzhgIPWdrqKHoxLs0HzgO/oKnN1e';
$ftp_user_passUnHash = 'Lune2023$';

// $ftp_server = '184.107.112.43';
// $ftp_user_name = 'lesvraiesrichesses@boulangerieqc.com';
// $ftp_user_pass = '$2y$10$u5NW4oaQlz9dxhKFdHRSR.Ea1fw.asbx/HMXCx5jlZkTd2IiGCPse';
// $ftp_user_passUnHash = 'Rock$2023';

// $ftp_server = '184.107.112.43';
// $ftp_user_name = 'bkupboulangerieqc@boulangerieqc.com';
// $ftp_user_pass = '$2y$10$zkmnwOvYxre4K4BgWFwa0.9KFufQgJJHEd46xz7jAHK/nx24a0TfK';
// $ftp_user_passUnHash = 'xyhdyv-kexreK-nogpi6';


//$ftp_server = "184.107.112.43";
//$ftp_user_name = "rancour";
//$ftp_user_pass = "pUAR3exd(A";
//-----

$hash =$ftp_user_pass;
$password =$ftp_user_passUnHash;

$passVerifBool = password_verify ( $password , $hash ) ;
//echo "resultat de la comparaison : " . $passVerifBool;
if($passVerifBool==1){
    echo "<br><hr>La verification du mot de passe est bonne et les documents seront supprimés s'ils existent.<br>";  

// Mise en place d'une connexion basique
$ftp = ftp_ssl_connect($ftp_server);

// Identification avec un nom d'utilisateur et un mot de passe
$login_result = ftp_login($ftp, $ftp_user_name, $password);
if (!$login_result) {
    // PHP aura déjà soulevé un message de niveau E_WARNING dans ce cas
   die("login ne peut pas être fait");
}

//echo "Le répertoire a supprimé est: $dir ";
//echo "le nombre de fichier est $size dont certains dossiers /. et /.. qui ne seront pas supprimés <br><hr>";
//echo "<br><hr>le repertoire choisi est: $dirRecettes <br>";

}
else{
   echo "<br><hr>la verification du mot de passe n'est pas bonne!";
}

// Fermeture de la connexion SSL
ftp_close($ftp);
?>
