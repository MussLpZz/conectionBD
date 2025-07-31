<?php
header('Content-Type: application/json');
require_once __DIR__ . '/../modelo/Margarita.php';

$margarita = new Margarita();

$datos = json_decode(file_get_contents('php://input'), true);

if (!$datos) {
    http_response_code(400);
    echo json_encode(['error' => 'Datos inválidos']);
    exit;
}

$id = $datos['id_margarita'] ?? null;
$nombre = trim($datos['nombre'] ?? '');
$precio = isset($datos['precio']) ? floatval($datos['precio']) : 0;
$ingredientes = trim($datos['ingredientes'] ?? '');
$disponible = isset($datos['disponible']) ? (int)$datos['disponible'] : 0;

if (!$id || $nombre === '' || $precio <= 0 || $ingredientes === '') {
    http_response_code(400);
    echo json_encode(['error' => 'Faltan campos obligatorios o precio inválido']);
    exit;
}

$ok = $margarita->modificar($id, $nombre, $precio, $ingredientes, $disponible);

if ($ok) {
    echo json_encode(['success' => true]);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'No se pudo modificar']);
}
?>
