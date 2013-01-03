<?php
ini_set('display_errors', '1');
$type = array_key_exists('type', $_GET)?$_GET['type']:'all';
$fmt = array_key_exists('fmt', $_GET)?$_GET['fmt']:'html';
$CSV_SEPARATOR = ";";
if ($fmt == 'csv'){
  header('Content-Type: text/csv; charset=utf-8');
  header("Content-Disposition: attachment; filename=$type.csv");
}else if ($fmt == 'txt'){
  header("Content-Type: text/plain");
}
$db = "mini_smd_dev.sqlite";
$db_table_name = 'sujeitos';
$handle = new PDO("sqlite:$db") or die("Could not open database".sqlite_error_string(sqlite_last_error($handle)));

$q = "SELECT * FROM $db_table_name;";
$header_printed = false;

$output = '';
$result = $handle->query($q);
$hidden_columns = array(
                    'id',
                    'coopWonca_a',
                    'phq2_a', 'phq2_b',
                    'gad2_a', 'gad2_b',
                    'idate3_a',
                    "cudit3_a",
                    "m3_a", "m3_b", "m3_c", "m3_d",
                    "apss3_a", "apss3_b", "apss3_c",
                    "general_result",
                    "about_tv", "about_radio", "about_bathroom", "about_cars",
                    "about_maid", "about_washingMachine", "about_dvdPlayer",
                    "about_fridge", "about_freezer", "about_instrucao_chefe"
                    );
while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
  $result_cceb =  (int)$row["about_tv"] +
                  (int)$row["about_radio"] +
                  (int)$row["about_bathroom"] +
                  (int)$row["about_cars"] +
                  (int)$row["about_maid"] +
                  (int)$row["about_washingMachine"] +
                  (int)$row["about_dvdPlayer"] +
                  (int)$row["about_fridge"] +
                  (int)$row["about_freezer"] +
                  (int)$row["about_instrucao_chefe"];
  $result_coop = (int)$row["coopWonca_a"];
  $result_phq = (int)$row["phq2_a"] + (int)$row["phq2_b"];
  $result_gad = (int)$row["gad2_a"] + (int)$row["gad2_b"];
  $result_audit = (int)$row["idate3_a"];
  $result_cudit = (int)$row["cudit3_a"];
  $result_m = (int)$row["m3_a"] + (int)$row["m3_b"] + (int)$row["m3_c"] + (int)$row["m3_d"];
  $result_apss = '';
  $result_apss .= (int)$row["apss3_a"] == 1 ? 'a' : '';
  $result_apss .= (int)$row["apss3_b"] == 1 ? 'b' : '';
  $result_apss .= (int)$row["apss3_c"] == 1 ? 'c' : '';

  $positive_coop = $result_coop >= 3;
  $positive_phq = $result_phq >= 3;
  $positive_gad = $result_gad >= 3;
  $positive_audit = $result_audit >= 2;
  $positive_cudit = $result_cudit >= 2;
  $positive_m = $result_m >= 2;
  $positive_apss = strlen($result_apss) > 0;
  $positive = ($positive_coop || $positive_phq || $positive_gad ||
              $positive_audit || $positive_cudit || $positive_m ||
              $positive_apss);

  $row['cceb_result'] = $result_cceb;
  $row['cceb_status'] =  ($result_cceb >= 0 && $result_cceb <= 13) ? '1' :
                         ( ($result_cceb >= 14 && $result_cceb <= 22) ? '2' : '3');
  $row['coop_result'] = $result_coop;
  $row['coop_status'] = $positive_coop ? 'positivo' : 'negativo';
  $row['phq_result'] = $result_phq;
  $row['phq_status'] = $positive_phq ? 'positivo' : 'negativo';
  $row['gad_result'] = $result_gad;
  $row['gad_status'] = $positive_gad ? 'positivo' : 'negativo';
  $row['audit_result'] = $result_audit;
  $row['audit_status'] = $positive_audit ? 'positivo' : 'negativo';
  $row['cudit_result'] = $result_cudit;
  $row['cudit_status'] = $positive_cudit ? 'positivo' : 'negativo';
  $row['m_result'] = $result_m;
  $row['m_status'] = $positive_m ? 'positivo' : 'negativo';
  $row['apss_result'] = $result_apss;
  $row['apss_status'] = $positive_apss ? 'positivo' : 'negativo';
  $row['general_result'] = $positive ? 'positivo' : 'negativo';

  if ($type != 'all') {
    foreach ($hidden_columns as $column_name){
      unset($row[$column_name]);
    }
    if ($type == 'negativo') {
      foreach (array( 'coop_status', 'phq_status', 'gad_status',
                      'audit_status', 'cudit_status', 'm_status', 'apss_status') as $column_name){
        unset($row[$column_name]);
      }
    }
  }
  if(! $header_printed){
    $output .= '"' . implode("\"$CSV_SEPARATOR\"", array_keys($row)) . "\"\n";
    $header_printed = true;
  }
  if ($type == 'negativo') {
    if ($positive){
      continue;
    }
  }
  $output .= '"' . implode("\"$CSV_SEPARATOR\"", array_values($row)) . "\"\n";
}
if ($fmt != 'html'){
  echo $output;
} else {
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta http-equiv="content-type" content="text/html; charset=UTF-8">
    <title>Mini SMD</title>
</head>
<body>
<h1>Download das planilhas de resultados:</h1>
<ul>
  <li><a href="?type=positivo&fmt=csv">Resultados positivos</a>(versão resumida)</li>
  <li><a href="?type=negativo&fmt=csv">Resultados negativos</a>(versão resumida)</li>
  <li><a href="?type=all&fmt=csv">Todos os resultados</a>(versão completa)</li>
</ul>
</body>
<?php
}
?>