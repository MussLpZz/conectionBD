<?php
header('Content-Type: application/json');
require_once __DIR__ . '/../modelo/Margarita.php';

$margarita = new Margarita();

if (!isset($_GET['id'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Falta el parámetro ID']);
    exit;
}

$id = $_GET['id'];
$registro = $margarita->obtenerPorId($id);

if (!$registro) {
    http_response_code(404);
    echo json_encode(['error' => 'Margarita no encontrada']);
    exit;
}

echo json_encode($registro, JSON_UNESCAPED_UNICODE);
