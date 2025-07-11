<?php
require_once __DIR__ . '/../modelo/Margarita.php';

if (!isset($_GET['id'])) {
    header('Location: margarita_lista.php');
    exit;
}

$id = $_GET['id'];
$margarita = new Margarita();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['confirmar']) && $_POST['confirmar'] === 'Sí') {
        $margarita->eliminar($id);
    }
    header('Location: margarita_lista.php');
    exit;
}

$registro = $margarita->obtenerPorId($id);
if (!$registro) {
    header('Location: margarita_lista.php');
    exit;
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Eliminar Margarita</title>
</head>
<body>
    <h1>Eliminar Margarita</h1>
    <p>¿Seguro que quieres eliminar la margarita: <strong><?= htmlspecialchars($registro['nombre']) ?></strong>?</p>
    <form method="POST">
        <button type="submit" name="confirmar" value="Sí">Sí, eliminar</button>
        <button type="submit" name="confirmar" value="No">No, cancelar</button>
    </form>
    <br>
    <a href="margarita_lista.php">Regresar al listado</a>
</body>
</html>
