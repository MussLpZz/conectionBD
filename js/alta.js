import { postData, showMessage } from "../lib/js/helpers.js";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formAlta");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const datos = {
      nombre: document.getElementById("nombre").value.trim(),
      precio: parseFloat(document.getElementById("precio").value),
      ingredientes: document.getElementById("ingredientes").value.trim(),
      disponible: document.getElementById("disponible").checked ? 1 : 0,
    };

    try {
      const data = await postData("/srv/margarita_alta.php", datos);
      if (data.success) {
        showMessage("Margarita agregada correctamente.", "success");
        setTimeout(() => {
          window.location.href = "/vista/margarita_lista.html";
        }, 1500);
      } else {
        showMessage(data.error || "Error desconocido", "error");
      }
    } catch (error) {
      showMessage(error.message, "error");
    }
  });
});
