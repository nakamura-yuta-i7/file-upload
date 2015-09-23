<?php
$dir = "/var/www/html/uploads/";
unlink($dir . $_GET["filename"]);
