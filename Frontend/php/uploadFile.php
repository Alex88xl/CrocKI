<?php
$img = $_POST['imgBase64'];
$fk = strpos($img, ",");
$img = substr($img, $fk+1);
//$img = str_replace($rep, '', $img);
$img = str_replace(' ', '+', $img);
$fileData = base64_decode($img);
//saving
$pname = md5($fileData);
$fileName = $pname . '.jpg';
chdir("../../pictures");
file_put_contents($fileName, $fileData);
echo json_encode($fileName);
?>