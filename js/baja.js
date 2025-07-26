document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  const mensajeError = document.getElementById('mensajeError');
  const nombreSpan = document.getElementById('nombreMargarita');
  const btnEliminar = document.getElementById('btnEliminar');

  if (!id) {
    mensajeError.textContent = "ID de margarita no proporcionado.";
    mensajeError.classList.remove('hidden');
    btnEliminar.disabled = true;
    return;
  }

  async function cargarNombre() {
    try {
      const res = await fetch(`/srv/margarita_obtener.php?id=${id}`);
      const data = await res.json();

      if (data.error) throw new Error(data.error);

      nombreSpan.textContent = data.nombre || 'Desconocido';
    } catch (err) {
      mensajeError.textContent = err.message;
      mensajeError.classList.remove('hidden');
      btnEliminar.disabled = true;
    }
  }

  cargarNombre();

  btnEliminar.addEventListener("click", async () => {
    if (!confirm("¿Estás seguro de que quieres eliminar esta margarita?")) return;

    try {
      const res = await fetch(`/srv/margarita_baja.php?id=${id}`, {
        method: "POST"
      });

      const data = await res.json();

      if (data.success) {
        window.location.href = "/vista/margarita_lista.html";
      } else {
        throw new Error(data.error || "No se pudo eliminar");
      }
    } catch (err) {
      mensajeError.textContent = err.message;
      mensajeError.classList.remove('hidden');
    }
  });
});
