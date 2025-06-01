<?php

/*
* Author : https://roytuts.com
https://stackoverflow.com/questions/19617996/file-upload-without-form
fileUploadNoDownload.php
*/

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header('Content-Type: text/csv; charset=utf-8');


$racineDoc=$_GET["dossier"];
$filename=$_GET["filename"];

echo $_FILES;
echo $_FILES['file'];
echo $filename;
echo  'ceci est la racine ou sera le document= ' . $racineDoc."<br>";;
echo "le FILES au complet: ".$_FILES['file']."<br>";;
echo "Filename: " . $_FILES['file']['name']."<br>";
echo "Type : " . $_FILES['file']['type'] ."<br>";
echo "Size : " . $_FILES['file']['size'] ."<br>";
echo "Temp name: " . $_FILES['file']['tmp_name'] ."<br>";
echo "Error : " . $_FILES['file']['error'] . "<br>";


if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['file'])) {
	if (isset($_FILES['file']['name'])) {
		if (0 < $_FILES['file']['error']) {
			echo 'Erreur durant le transfert de fichier' . $_FILES['file']['error'];
		} else {
			//$upload_path = '../../clients/boulangerieqc/commandesWeb/';
			$upload_path = '../../clients/' . $racineDoc . '/commandesWeb/';
			$uploadForDownload_path = '../../clients/' . $racineDoc . '/commandesWebTemp/';
	
			//if (file_exists($upload_path . $_FILES['file']['name'])) {
                if (file_exists($upload_path . $filename)) {
			//	echo 'Le fichier existe déjà => ' . $upload_path . $_FILES['file']['name'];
                echo 'Le fichier existe déjà => ' . $upload_path . $filename;


			} else {
				if (!file_exists($upload_path)) {
					mkdir($upload_path, 0777, true);
				}
				//move_uploaded_file($_FILES['file']['tmp_name'], $upload_path . $_FILES['file']['name']);
                move_uploaded_file($_FILES['file']['tmp_name'], $upload_path . $filename);

				if (!file_exists($uploadForDownload_path)) {
					mkdir($uploadForDownload_path, 0777, true);
				}
								
				//$file = $upload_path . $_FILES['file']['name'];
				//$newfile = $uploadForDownload_path . $_FILES['file']['name'];
                $file = $upload_path . $filename;
				$newfile = $uploadForDownload_path . $filename;
				if (!copy($file, $newfile)) {
					echo "failed to copy $file...\n";
				}

				//echo 'Le fichier a été transféré avec succès=> "' . $upload_path . $_FILES['file']['name'];
                echo 'Le fichier a été transféré avec succès=> "' . $upload_path .$filename;


				 $envoiMailCommandeWebMysql="";
				// require ('insert_commandeWeb.php?fileName='+$_FILES['file']['name']+"dossier="+$racineDoc);

			}
		
		}
	} else {
		echo 'Choississez un autre fichier';
	}
	echo nl2br("\n");
}