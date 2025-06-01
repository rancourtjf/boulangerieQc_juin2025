
<?php

$path_parts = pathinfo($_FILES['monfichier']['name']); //https://www.php.net/manual/fr/function.pathinfo.php
//Date : https://www.php.net/manual/fr/function.date
move_uploaded_file($_FILES['monfichier']['tmp_name'], 'uploads/' . $path_parts['filename'].'_'.date('Ymd_His').$path_parts['extension']);

?>