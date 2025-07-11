<?php
require_once __DIR__ . '/../modelo/Margarita.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nombre = $_POST['nombre'];
    $precio = $_POST['precio'];
    $ingredientes = $_POST['ingredientes'];
    $disponible = isset($_POST['disponible']) ? 1 : 0;

    $margarita = new Margarita();
    if ($margarita->agregar($nombre, $precio, $ingredientes, $disponible)) {
        header('Location: margarita_lista.php');
        exit;
    } else {
        $error = "Error al agregar la margarita";
    }
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Alta de Margarita</title>
</head>
<body>
    <h1>Alta de Margarita</h1>
    <form method="POST">
        Nombre: <input type="text" name="nombre" required><br><br>
        Precio: <input type="number" step="0.01" name="precio" required><br><br>
        Ingredientes:<br>
        <textarea name="ingredientes" rows="4" cols="50" required></textarea><br><br>
        Disponible: <input type="checkbox" name="disponible" checked><br><br>
        <button type="submit">Guardar</button>
    </form>
    <?php if (!empty($error)) echo "<p style='color:red;'>$error</p>"; ?>
    <br>
    <a href="margarita_lista.php">Regresar al listado</a>
</body>
</html>
