
<?php

// $ftp_server = '184.107.112.43';
//$ftp_server = "198.72.104.27";
// $ftp_user_name = 'croissantdelune@boulangerieqc.com';
// $ftp_user_pass = '$2y$10$CAWnSRpHtQzRES3bAi2op.TEvwzhgIPWdrqKHoxLs0HzgO/oKnN1e';
// $ftp_user_passUnHash = 'Lune2023$';

$hash = $_GET["passwordHash"];
echo $hash. "<br>";
$password =$_GET["password"];
echo $password . "<br>";

//echo $hash . "<br>";
//echo $password . "<br>";

$passVerifBool = password_verify ( $password , $hash ) ;
echo "resultat de la comparaison : " . $passVerifBool;
if($passVerifBool==1){
    echo "<br><hr>a verification du mot de passe est bonne";  
}
else{
    echo "<br><hr>a verification du mot de passe n\'est pas bonne!";
}
?>




