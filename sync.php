<?php
ini_set('display_errors', '1');
$db = "mini_smd_dev.sqlite";
$db_table_name = 'sujeitos';
// $handle = sqlite_open($db) or die("Could not open database".sqlite_error_string(sqlite_last_error($handle)));
$handle = new PDO("sqlite:$db") or die("Could not open database".sqlite_error_string(sqlite_last_error($handle)));
foreach ($_POST['data'] as $subject) {
  $subject['sent_by'] = $_POST['sent_by'];
  $q = "INSERT OR REPLACE INTO $db_table_name(" .
        implode(", ", array_keys($subject)) . ") VALUES('" .
        implode("', '", array_values($subject)) . "');";
  $ok = $handle->exec($q);
  // $ok = sqlite_exec($handle, $q, $error);
}
echo json_encode(array(
  "msg"=>"Dados Salvos com sucesso. $ok",
  "success"=>1,
  "received"=>$_POST['data']));
?>