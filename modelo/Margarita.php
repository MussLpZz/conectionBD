<?php
require_once __DIR__ . '/../conexion.php';

class Margarita {
    private $pdo;

    public function __construct() {
        global $pdo;
        $this->pdo = $pdo;
    }

    public function listar() {
        $stmt = $this->pdo->query("SELECT id_margarita, nombre, precio, ingredientes, disponible FROM margarita");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function obtenerPorId($id) {
        $stmt = $this->pdo->prepare("SELECT * FROM margarita WHERE id_margarita = ?");
        $stmt->execute([$id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function agregar($nombre, $precio, $ingredientes, $disponible) {
        $stmt = $this->pdo->prepare("INSERT INTO margarita (nombre, precio, ingredientes, disponible) VALUES (?, ?, ?, ?)");
        return $stmt->execute([$nombre, $precio, $ingredientes, $disponible]);
    }

    public function modificar($id, $nombre, $precio, $ingredientes, $disponible) {
        $stmt = $this->pdo->prepare("UPDATE margarita SET nombre=?, precio=?, ingredientes=?, disponible=? WHERE id_margarita=?");
        return $stmt->execute([$nombre, $precio, $ingredientes, $disponible, $id]);
    }

    public function eliminar($id) {
        $stmt = $this->pdo->prepare("DELETE FROM margarita WHERE id_margarita=?");
        return $stmt->execute([$id]);
    }
}
?>
