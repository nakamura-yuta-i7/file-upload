<?php
$dir = "/var/www/html/uploads/";
$webDir = "/uploads/";
exec("ls $dir", $result);

$files = array();
foreach ($result as $key => $filename) {
	$files[] = $filename;

	echo "<a href='{$webDir}{$filename}' target='_blank'><img src='{$webDir}{$filename}' width='100px'></a><a href='./delete.php?filename={$filename}' target='_blank'>削除</a>";
}
