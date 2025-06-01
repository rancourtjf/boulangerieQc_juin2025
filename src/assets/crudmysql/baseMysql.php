<?php

class DbMysql{
    public $db_host ;
    public $db_username ;
    public $db_name;
    public $db_password;

  // Methods
  function set_db_host($db_host) {
    $this->db_host = $db_host;
  }
  function get_db_host() {
    return $this->db_host;
  }
  function set_db_username($db_username) {
    $this->db_username = $db_username;
  }
  function get_db_username() {
    return $this->db_username;
  }
  function set_db_name ($db_name) {
    $this->db_name = $db_name;
  }
  function get_db_name () {
    return $this->db_name ;
  }
  function set_db_password ($db_password) {
    $this->db_password = $db_password;
  }
  function get_db_password () {
    return $this->db_password ;
  }
}
//boulangerie BoulangerieQc
$boulangerieqc =new DbMysql();
$boulangerieqc->set_db_host('184.107.112.43');
$boulangerieqc->set_db_name('rancour_boulangerieqc');
$boulangerieqc->set_db_password('rancour_boulangerieqcUser');
$boulangerieqc->get_db_password('maQqez-bymhoq-2bycfy');

echo "host: " . $boulangerieqc->get_db_host();
$host=$boulangerieqc->get_db_host();
$name=$boulangerieqc->get_db_name();
$user=$boulangerieqc->get_db_username();
$pwd=$boulangerieqc->get_db_password();
echo "<br>";
echo "name: " . $name;

function dbConnection()
{

}

?>
