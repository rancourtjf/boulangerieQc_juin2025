<?php

//mysqlUserLogin.php
//define("IPSERVEURFUNIO", "184.107.112.43");
define("IPSERVEURFUNIO", "198.72.104.27");

switch ($dossierCommandesWeb) {
  case "boulangerieqc":
    $db_host = '184.107.112.43';
    $db_host = IPSERVEURFUNIO;
    $db_name = 'rancour_boulangerieqc';
    $db_username = 'rancour_boulangerieqcUser';
    $db_password = 'maQqez-bymhoq-2bycfy';

    break;
    case "bkupboulangerieqc":
    $db_host = '184.107.112.43';
    $db_host = IPSERVEURFUNIO;
    $db_name = 'rancour_boulangerieqc';
    $db_username = 'rancour_boulangerieqcUser';
    $db_password = 'maQqez-bymhoq-2bycfy';

      break;
  case "croissantdelune":
    $db_host = '184.107.112.43';
    $db_host = IPSERVEURFUNIO;
    $db_name = 'rancour_croissantdelune';
    $db_username = 'rancour_croissant';
    $db_password = 'covvoh-wevfug-siVti0';

    break;
    case "stefoycuisine":
      $db_host = '184.107.112.43';
      $db_host = IPSERVEURFUNIO;
      $db_name = 'rancour_stefoycuisine';
      $db_username = 'rancour_stefoycuisine';
      $db_password = 'vivmob-tijde6-mezwoR';
  
      break;
  case "lesvraiesrichesses":
    $db_host = '184.107.112.43';
    $db_host = IPSERVEURFUNIO;
    $db_name = 'rancour_vraiesrichesses';
    $db_username = 'rancour_vraiesrichesses';
    $db_password = 'Vraies$2024';

    break;
    case "painsetroses":
      $db_host = '184.107.112.43';
      $db_host = IPSERVEURFUNIO;
      $db_name = 'rancour_painsetroses';
      $db_username = 'rancour_painsetroses';
      $db_password = 'wibjaq-Toproh-vygva9';
  
      break;
    case "boulangerieqctest":
      $db_host = '184.107.112.43';
      $db_host = IPSERVEURFUNIO;
      $db_name = 'rancour_boulangerieqcTest';
      $db_username = 'rancour_boulangerieqcTest';
      $db_password = 'Josephine$2024';
  
      break;
  default:
   // echo "pas de dossierCommandesWeb entré dans connection!";
}
