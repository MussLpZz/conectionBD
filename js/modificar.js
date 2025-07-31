import { postData, showMessage } from "../lib/js/helpers.js";

document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const form = document.getElementById("formulario");

  if (!id) {
    showMessage("ID de margarita no especificado.", "error");
    setTimeout(
      () => (window.location.href = "/vista/margarita_lista.html"),
      1500
    );
    return;
  }

  try {
    const res = await fetch(`/srv/margarita_obtener.php?id=${id}`);
    const data = await res.json();

    if (!data || !data.id_margarita) {
      showMessage("Margarita no encontrada.", "error");
      setTimeout(
        () => (window.location.href = "/vista/margarita_lista.html"),
        1500
      );
      return;
    }

    form.nombre.value = data.nombre;
    form.precio.value = data.precio;
    form.ingredientes.value = data.ingredientes;
    form.disponible.checked = data.disponible == 1;
  } catch (error) {
    console.error("Error al cargar la margarita:", error);
    showMessage("Error al cargar los datos de la margarita.", "error");
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const datos = {
      id_margarita: id,
      nombre: form.nombre.value.trim(),
      precio: parseFloat(form.precio.value),
      ingredientes: form.ingredientes.value.trim(),
      disponible: form.disponible.checked ? 1 : 0,
    };

    try {
      const response = await postData("/srv/margarita_modificar.php", datos);

      if (response.success) {
        showMessage("Margarita modificada correctamente.", "success");
        setTimeout(() => {
          window.location.href = "/vista/margarita_lista.html";
        }, 1500);
      } else {
        showMessage(
          response.error || "Error al modificar la margarita.",
          "error"
        );
      }
    } catch (error) {
      console.error("Error al modificar:", error);
      showMessage("Error de red al modificar.", "error");
    }
  });
});
