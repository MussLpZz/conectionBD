<?php
require_once __DIR__ . '/../modelo/Margarita.php';

$margarita = new Margarita();

if (!isset($_GET['id'])) {
    header('Location: margarita_lista.php');
    exit;
}

$id = $_GET['id'];
$registro = $margarita->obtenerPorId($id);

if (!$registro) {
    header('Location: margarita_lista.php');
    exit;
}

$error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nombre = $_POST['nombre'];
    $precio = $_POST['precio'];
    $ingredientes = $_POST['ingredientes'];
    $disponible = isset($_POST['disponible']) ? 1 : 0;

    if ($margarita->modificar($id, $nombre, $precio, $ingredientes, $disponible)) {
        header('Location: margarita_lista.php');
        exit;
    } else {
        $error = "Error al modificar la margarita";
    }
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Modificar Margarita</title>
</head>
<body>
    <h1>Modificar Margarita</h1>
    <form method="POST">
        Nombre: <input type="text" name="nombre" value="<?= htmlspecialchars($registro['nombre']) ?>" required><br><br>
        Precio: <input type="number" step="0.01" name="precio" value="<?= htmlspecialchars($registro['precio']) ?>" required><br><br>
        Ingredientes:<br>
        <textarea name="ingredientes" rows="4" cols="50" required><?= htmlspecialchars($registro['ingredientes']) ?></textarea><br><br>
        Disponible: <input type="checkbox" name="disponible" <?= $registro['disponible'] ? 'checked' : '' ?>><br><br>
        <button type="submit">Guardar Cambios</button>
    </form>
    <?php if (!empty($error)) echo "<p style='color:red;'>$error</p>"; ?>
    <br>
    <a href="margarita_lista.php">Regresar al listado</a>
</body>
</html>
