<?php
require_once __DIR__ . '/../modelo/Margarita.php';

$margarita = new Margarita();
$listado = $margarita->listar();
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Listado de Margaritas</title>
</head>
<body>
    <h1>Listado de Margaritas</h1>
    <a href="margarita_alta.php">Agregar Margarita</a>
    
    <dl>
    <?php foreach ($listado as $row): ?>
        <dt><strong><?= htmlspecialchars($row['nombre']) ?></strong></dt>
        <dd>
            Precio: $<?= number_format($row['precio'], 2) ?> <br>
            <a href="margarita_modificar.php?id=<?= $row['id_margarita'] ?>">Modificar</a> |
            <a href="margarita_baja.php?id=<?= $row['id_margarita'] ?>" onclick="return confirm('¿Seguro que quieres eliminar?');">Eliminar</a>
        </dd>
    <?php endforeach; ?>
    </dl>

</body>
</html>
