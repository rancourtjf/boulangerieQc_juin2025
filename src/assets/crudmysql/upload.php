<?php
  
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: PUT, GET, POST");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
        
   // $folderPath = "./uploadCommandes/";
    $folderPath = "../../uploadCommandes/";

    $file_tmp = $_FILES['file']['tmp_name'];
    echo "$file_tmp" . $file_tmp;

    $file_ext = strtolower(end(explode('.',$_FILES['file']['name'])));
    echo "$file_ext: " . $file_ext;
    $file = $folderPath . uniqid() . '.'.$file_ext;
    echo "$file: " .    $file;
   // move_uploaded_file($file_tmp, $file);
    copy($file_tmp, $file);
?>