<form action="" method="post" ENCTYPE="multipart/form-data">
      <input name="fichier" type="file">
      <input name="valider" type="submit" value="valider">
</form>
 
<?php
/**
 * ressource connect_ftp ( string $host , string $user , string $password )
 * connect_ftp() opens a FTP connection to the specified host.
 * Return : a FTP stream on success or FALSE on error
 */
function connect_ftp($host, $user, $password) {
      $ftp_stream = @ftp_connect($host); // Connexion
      $login      = @ftp_login($ftp_stream, $user, $password); // Identification
       
      return !$login ? FALSE : $ftp_stream;
}
 
/**
 * bool upload_ftp ( ressource $ftp_stream, array $file [, string $upload_dir = FALSE] )
 * upload_file() puts a local file to the specified FTP server.
 * Return : TRUE on success or FALSE on failure
 */
function upload_ftp($ftp_stream, $file, $upload_dir = FALSE) {
      $destination = isset($upload_dir) ? '/' . $upload_dir . '/' . $_FILES['fichier']['name'] : '/'.$_FILES['fichier']['name']; // Génération du répertoire d'upload
       
      return ftp_put($ftp_stream, $destination, $_FILES['fichier']['tmp_name'], FTP_BINARY); // Chargement d'un fichier
}
 
if(!empty($_FILES['fichier']['name'])) {
      if($ftp_stream = connect_ftp('HOST', 'USERNAME', 'PASSWORD')) {
            if(upload_ftp($ftp_stream, $_FILES['fichier'], 'public_html')) {
                  echo "Fichier envoyé";
            } else {
                  echo "Pbm d'envoi";
            }
            ftp_close($ftp_stream); // Fermeture du flux FTP
      } else {
            echo "La connexion FTP a échoué !";
      }
}
?>