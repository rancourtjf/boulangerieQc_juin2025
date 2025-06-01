<?php

//ftpUserLogin.php


define("IPSERVEURFUNIO", "198.72.104.27");

switch ($dossierCommandesWeb) {

  case "bkupboulangerieqc":

    $ftp_server = IPSERVEURFUNIO;
    $ftp_server = '198.72.104.27';
    $ftp_user_name = 'bkupboulangerieqc@boulangerieqc.com';
    $ftp_user_pass = 'xyhdyv-kexreK-nogpi6';
    echo 'le ftp_server=' . $ftp_server;
    echo 'le ftp_user_name=' . $ftp_user_name;
    break;

  case "croissantdelune":

    $ftp_server = IPSERVEURFUNIO;
    $ftp_server = '198.72.104.27';
    //184.107.112.27:21
    $ftp_user_name = 'croissant@lecroissantdelune.ca';
    $ftp_user_pass = 'LuneLevis2025';
    $ftp_user_name = 'croissantdelune@boulangerieqc.com';
    $ftp_user_pass = 'LuneLevis2025';
 
    echo 'connection avec croissantdelune FTP croissantdelune@boulangerieqc.com';
    break;
    case "croissantTest":

      $ftp_server = IPSERVEURFUNIO;
      $ftp_server = '198.72.104.27';
      //184.107.112.27:21
      $ftp_user_name = 'croissantTest@boulangerieqc.com';
      $ftp_user_pass = 'LuneLevis2025';

      echo 'connection avec croissantTest FTP croissantTest@boulangerieqc.com';
      break;
  case "stefoycuisine":

    $ftp_server = IPSERVEURFUNIO;
    $ftp_server = '198.72.104.27';
    $ftp_user_name = 'stefoycuisine@boulangerieqc.com';
    $ftp_user_pass = 'Poxwe3-wehvoh-posroj';
    echo 'le ftp_server=' . $ftp_server;
    echo 'le ftp_user_name=' . $ftp_user_name;
    echo 'le ftp_user_pass=' . $ftp_user_pass;

    break;
  case "lesvraiesrichesses":

    $ftp_server = IPSERVEURFUNIO;
    $ftp_server = '198.72.104.27';
    $ftp_user_name = 'lesvraiesrichesses@boulangerieqc.com';
    $ftp_user_pass = 'xyz-kexreK-nogpi6';
    echo 'connection avec lesvraiesrichesses FTP lesvraiesrichesses@boulangerieqc.com';
    break;
    case "painsetroses":

      $ftp_server = IPSERVEURFUNIO;
      $ftp_server = '198.72.104.27';
      $ftp_user_name = 'painsetroses@boulangerieqc.com';
      $ftp_user_pass = 'kypzot-bodsac-5sumWe';
      echo 'connection avec painsetroses FTP painsetroses@boulangerieqc.com';
      break;
  case "listeprixclients":

   $ftp_server = IPSERVEURFUNIO;
   $ftp_server = '198.72.104.27';
    $ftp_user_name = 'listeprixclients@boulangerieqc.com';
    $ftp_user_pass = 'purtak-wiMgar-8womhe';
    break;
  case "boulangerieqctest":

    $ftp_server = IPSERVEURFUNIO;
    $ftp_server = '198.72.104.27';
    $ftp_user_name = 'boulangerieqctest@boulangerieqc.com';
    $ftp_user_pass = 'Josephine$2024';
    break;
  case "boulangerieqcMain":

   $ftp_server = IPSERVEURFUNIO;
   $ftp_server = '198.72.104.27';
    $ftp_user_name = 'rancour';
    $ftp_user_pass = 'pUAR3exd(A';
    echo 'le ftp_server=' . $ftp_server;
    echo 'le ftp_user_pass=' . $ftp_user_name;
    break;
  default:
    echo "pas de dossierCommandesWeb entré dans connection!";
}
