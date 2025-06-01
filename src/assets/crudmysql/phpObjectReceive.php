<?php
if(isset($_POST)){
$data = file_get_contents("php://input");
//$user = json_decode($data, true); // return array
$user = json_decode($data); // returns an object

// do whatever we want with the users array.
echo $user;
}
?>



 <!-- // $json = '{
  //    "title": "PHP",
  //    "site": "GeeksforGeeks"
  //}';
  //$data = json_decode($json);
  //echo $data->title;
  //echo "\n";
  //echo $data->site; -->

