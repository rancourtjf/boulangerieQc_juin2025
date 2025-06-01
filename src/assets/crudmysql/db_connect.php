<?php
header("Content-Type: application/json; charset=UTF_8");
header("Access-Control-Allow-Origin: *");
//header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Methods: PUT, GET, POST, delete");

header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");


class Operations
{
 
    //private $db_host = '184.107.112.43';
    private $db_host = '198.72.104.27';
    private $db_name = 'rancour_facture';
    private $db_username = 'rancour_boulangerieqc';
    private $db_password = 'voZqec-wufro7-ribjyf';
 
    public function dbConnection()
    {
        try {
            $conn = new PDO('mysql:host=' . $this->db_host . ';dbname=' . $this->db_name, $this->db_username, $this->db_password);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $conn;
        } catch (PDOException $e) {
            echo "Connection error " . $e->getMessage();
            exit;
        }
    }
}
