<?php
ini_set('display_errors', '1');
$type = array_key_exists('type', $_GET)?$_GET['type']:'all';
$fmt = array_key_exists('fmt', $_GET)?$_GET['fmt']:'html';
$version = array_key_exists('version', $_GET) ? $_GET['version'] : '1.2.0';
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
                    'audit3_a',
                    "cudit1_a",
                    "m3_a", "m3_b", "m3_c", "m3_d",
                    "apss3_a", "apss3_b", "apss3_c",
                    "general_result",
                    "about_tv", "about_radio", "about_bathroom", "about_cars",
                    "about_maid", "about_washingMachine", "about_dvdPlayer",
                    "about_fridge", "about_freezer", "about_instrucao_chefe"
                    );
//m3 and coopWonca are no longer used since v1.2.0 so we hide their columns from the output
$v1_2_0_hidden = array(
                    "m3_a", "m3_b", "m3_c", "m3_d","m_result","m_status",
                    "coopWonca_a", "coop_result", "coop_status"
                    );
//subject ids that might have incorrect birth dates
$suspect_ids = array(
  '1367440932831',
  '1367444372693',
  '1367444948554',
  '1368732353658',
  '1368829430023',
  '1368829625531',
  '1369079031416',
  '1369079443354',
  '1369184665053',
  '1369514246021',
  '1369515240974',
  '1369516857525',
  '1369517889207',
  '1369580867145',
  '1369581194731',
  '1369583224255',
  '1369584200983',
  '1369584555700',
  '1369585531721',
  '1369586823662',
  '1369588769574',
  '1372014645642',
  '1372015579238',
  '1372018632202',
  '1372019702467',
  '1372021915664',
  '1372450076097',
  '1372873796902',
  '1372879185517',
  '1372881810219',
  '1374612909572',
  '1377542681332',
  '1369837250649',
  '1371297642510',
  '1372009971972',
  '1372610336445',
  '1377026327296',
  '1378213461886',
  '1367524648141',
  '1369245110861',
  '1369576365847',
  '1369781296785',
  '1370099753798',
  '1370104468867',
  '1371485422396',
  '1371670715447',
  '1374681980984',
  '1378049656100',
  '1380399800727',
  '1382976036360',
  '1382976068943',
  '1386517192219',
  '1386518975329',
  '1386580905761',
  '1388504190487',
  '1388525752670',
  '1371399406968',
  '1378563567410',
  '1371298477080',
  '1378226648494',
  '1372707196462',
  '1370710998443',
  '1383506380347'
);
$row_count = 2;
$birthday_row = 'K';
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
  $result_audit = (int)$row["audit3_a"];
  $result_cudit = (int)$row["cudit1_a"];
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
  $old_positive_m = $result_m >= 3;
  $positive_m = false;
  $positive_apss = strlen($result_apss) > 0;

  //somar colunas
  // phq-result + gad-result + audit-result + cudit-result + apps3-a +apps3-b + apps3-c
  // mini-score é esta soma acima
  // mini-status 0(negativo) ou 1 (positivo)
  // <= 3 é negativo >=4 é positivo
  $mini_score = ( $result_phq +
                  $result_gad +
                  $result_audit +
                  $result_cudit +
                  (int)$row["apss3_a"] +
                  (int)$row["apss3_b"] +
                  (int)$row["apss3_c"]
                );
  $positive = ($mini_score >= 4);
  $old_positive = ($positive_coop || $positive_phq || $positive_gad ||
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
  $row['m_status'] = $old_positive_m ? 'cancelado-positivo' : 'cancelado-negativo';
  $row['apss_result'] = $result_apss;
  $row['apss_status'] = $positive_apss ? 'positivo' : 'negativo';
  $row['idade_em_2014'] = "\"=2014-YEAR($birthday_row$row_count)\"";
  $row['needs_birthdate_check'] = in_array($row["id"], $suspect_ids) ? 1 : 0;
  // $row['idade_hoje'] = "==YEAR(TODAY())-YEAR($birthday_row$row_count)";
  if ($version == '1.0.3'){
    $row['general_result'] = $old_positive ? 'positivo' : 'negativo';
  }
  $row['mini_score'] = $mini_score;
  $row['mini_status'] = $positive ? 1 : 0;

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
  }else if($version !== '1.0.3'){
    foreach ($v1_2_0_hidden as $column_name) {
      unset($row[$column_name]);
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
  } else if ($type == 'positivo') {
    if (! $positive){
      continue;
    }
  }
  $output .= '"' . implode("\"$CSV_SEPARATOR\"", array_values($row)) . "\"\n";
  $row_count += 1;
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
<h2>Planilha versão antiga (1.0.3)</h2>
<ul>
  <li><a href="?type=all&fmt=csv&version=1.0.3">Todos os resultados</a></li>
</ul>
</body>
<?php
}
?>