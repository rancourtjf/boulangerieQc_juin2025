
<?php

$password = $_GET["password"];

echo $password . "<br>";
$hash=password_hash($password, PASSWORD_DEFAULT);
echo $hash ;

$passVerifBool =password_verify ( $password , $hash ) ;
if($passVerifBool==1){
    echo "<br><hr>a verification du mot de passe est bonne";  
}
else{
    echo "<br><hr>a verification du mot de passe n\'est pas bonne!";
}

?>




