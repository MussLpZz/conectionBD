<?php
header('Content-Type: application/json');

require_once __DIR__ . '/../modelo/Margarita.php';

try {
    $margarita = new Margarita();
    $listado = $margarita->listar();

    echo json_encode($listado, JSON_UNESCAPED_UNICODE);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Error al obtener el listado de margaritas.']);
}

exit;
