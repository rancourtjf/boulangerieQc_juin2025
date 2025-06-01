<?php
function code()
{
	echo("on est das BoulangerieQc_ProgWebH22");
	echo "<br> 0= réussi, 1= taille du fichier trop grande selon php.ini";
	echo "<br> 2= taille du fichier trop grande selon formulaire, 3= partiellement transmis, 4= fichier non transmis";
}	
//chemin pour l'enregistrement du fichier
// E:/Mes Document/2F7/upload/
$dirBoulangerie = $_GET("boulangerie");
$dir = "../../clients/" . $dirBoulangerie . "commandesWeb";    
//si le fichier existe
if (isset($_FILES["fichier"])){
	echo "Upload du fichier ". $_FILES["fichier"]["name"] . " dans ". $dir;
}
//copie du fichier du dossier temporaire au bon endroit
if ( @copy($_FILES["fichier"]["tmp_name"],$dir.$_FILES["fichier"]["name"])){
	echo "Transmission réussis!!!<BR>dans le dossier ".$dir." <P>";
	echo "Code d'erreur=".$_FILES["fichier"]["error"];
	code();
}
else {
	echo "Transmission non-réussis !@%*&**¾*$!<P>";
	echo "Code d'erreur=".$_FILES["fichier"]["error"];
	code();
}

?>
<HTML>

<HEAD>
    <TITLE>Fichier de test</TITLE>
</HEAD>

<BODY>
    <div class="flex justify-center">

        <div class="flex justify-center">
	<a href=" upload.html">Page upload.html</a>
        </div>
    </div>
</BODY>

</HTML>