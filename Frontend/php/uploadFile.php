<?php
// uploadFile.php will be called as ajax-request when the button "upload" (index.html) was clicked
// manipulate the base64 encoded image to remove metadata
$img = $_POST['imgBase64'];
$fk = strpos($img, ",");
$img = substr($img, $fk+1);
$img = str_replace(' ', '+', $img);

// decode the base64 image
$fileData = base64_decode($img);

// hashing the imagedata -> precise recognition of image, prevents double upload of a picture in smartContract
$pname = md5($fileData);

// save the image as jpg
$fileName = $pname . '.jpg';
chdir("../../pictures");
file_put_contents($fileName, $fileData);

// return the link to the saved picture on server
echo json_encode($fileName);
?>