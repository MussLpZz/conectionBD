<?php
header('Content-Type: application/json');
require_once __DIR__ . '/../modelo/Margarita.php';

// Solo permitir POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405); // Método no permitido
    echo json_encode(['error' => 'Método no permitido']);
    exit;
}

// Obtener el ID desde GET o POST (prioridad a POST si lo usas en el futuro)
$id = isset($_GET['id']) ? intval($_GET['id']) : (isset($_POST['id']) ? intval($_POST['id']) : 0);

if (!$id) {
    http_response_code(400);
    echo json_encode(['error' => 'ID no proporcionado']);
    exit;
}

$margarita = new Margarita();

// Verificar si existe
$existe = $margarita->obtenerPorId($id);
if (!$existe) {
    http_response_code(404);
    echo json_encode(['error' => 'Margarita no encontrada']);
    exit;
}

// Eliminar
if ($margarita->eliminar($id)) {
    echo json_encode(['success' => true]);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Error al eliminar la margarita']);
}
