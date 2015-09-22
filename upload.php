<?php
$uploaddir = '/var/www/html/uploads/';

$field = "upload_files";
if ( is_array($_FILES[$field]['name']) ) {
  $filenames = $_FILES[$field]['name'];
  $tmpPaths  = $_FILES[$field]['tmp_name'];
} else {
  $filenames = array($_FILES[$field]['name']);
  $tmpPaths  = array($_FILES[$field]['tmp_name']);
}
foreach ($filenames as $key => $name) {
  $tmpPath = $tmpPaths[$key];
  $uploadfile = $uploaddir . $name;
  $result = move_uploaded_file($tmpPath, $uploadfile);
  if ( $result ) {
    var_export(array("status"=>"success","path"=>$uploadfile));
  } else {
    var_export(array("status"=>"error","path"=>$uploadfile));
  }
}
