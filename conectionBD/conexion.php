<?php
$host = 'sql305.infinityfree.com';
$db   = 'if0_39437484_baseprueabilla';
$user = 'if0_39437484';
$pass = 'WMEsP3Xo78F0n'; 
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";

$options = [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);
} catch (PDOException $e) {
    die('Error en la conexión: ' . $e->getMessage());
}
?>