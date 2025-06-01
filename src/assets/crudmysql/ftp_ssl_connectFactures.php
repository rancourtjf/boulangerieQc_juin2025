<?php

$ftp_server = "184.107.112.43";
$ftp_server = "198.72.104.27";
//$ftp_user_name = "bkupboulangerieqc@boulangerieqc.com";
//$ftp_user_pass = "xyhdyv-kexreK-nogpi6";

$ftp_user_name = "croissantdelune@boulangerieqc.com";
$ftp_user_pass = "Lune2023$";


// Mise en place d'une connexion basique
$ftp = ftp_ssl_connect($ftp_server);

// Identification avec un nom d'utilisateur et un mot de passe
$login_result = ftp_login($ftp, $ftp_user_name, $ftp_user_pass);
if (!$login_result) {
    // PHP aura déjà soulevé un message de niveau E_WARNING dans ce cas
    die("login impossible");
}

echo ftp_pwd($ftp);

//Now run ftp_nlist()
//
//
$file_list = ftp_nlist($ftp, "FacturationQuotidienne/2023-08-10/");

$size = sizeof($file_list);

// Fermeture de la connexion SSL
ftp_close($ftp);
?>

<!-- https://stackoverflow.com/questions/30872194/php-iterating-through-ftp-folder-and-create-an-html-table -->

<!DOCTYPE html>
<html>

<body>
       
    <table align="left" border="1" cellpadding="3" cellspacing="2">
        <tr>
            <td> <strong> Facturation </strong></td>
        </tr>
        <?php
   
        $racine = "https://www.boulangerieqc.com/croissantdelune/";

        foreach ($file_list as $file) {
            $link =$racine . $file;
            echo "<tr>";
           // echo "<td> $link </td>";
            echo '<td><a href='.$link.'>'.$file.'</a></td>';
            echo "</tr>";
        }
        echo '<hr>';

        ?>
    </table>
</body>

</html>