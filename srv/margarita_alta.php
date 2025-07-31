<?php
header('Content-Type: application/json');
require_once __DIR__ . '/../modelo/Margarita.php';

$margarita = new Margarita();

$datos = json_decode(file_get_contents('php://input'), true);

if (!$datos) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Datos inválidos']);
    exit;
}

$nombre = trim($datos['nombre'] ?? '');
$precio = isset($datos['precio']) ? floatval($datos['precio']) : null;
$ingredientes = trim($datos['ingredientes'] ?? '');
$disponible = isset($datos['disponible']) ? (int)$datos['disponible'] : 0;

// Validación simple
if ($nombre === '' || $precio === null || $precio <= 0 || $ingredientes === '') {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Faltan campos obligatorios o precio inválido']);
    exit;
}

if ($margarita->agregar($nombre, $precio, $ingredientes, $disponible)) {
    echo json_encode(['success' => true]);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Error al agregar la margarita']);
}
