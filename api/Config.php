<?php 
require_once("Medoo.php");
global $url ;
$url = 'http://'.$_SERVER['SERVER_NAME'];



session_start();

use Medoo\Medoo;

$database = new Medoo([
    'type' => 'mysql',
    'host' => 'mysql-forza-mts.alwaysdata.net',
    'database' => 'forza-mts_final',
    'username' => 'forza-mts',
    'password' => '3i7od8pSY3@NmAE4'
]);


?>

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet">