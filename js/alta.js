document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formAlta");
  if (!form) return;

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const datos = {
      nombre: document.getElementById("nombre").value.trim(),
      precio: parseFloat(document.getElementById("precio").value),
      ingredientes: document.getElementById("ingredientes").value.trim(),
      disponible: document.getElementById("disponible").checked ? 1 : 0
    };

    try {
      const res = await fetch('/srv/margarita_alta.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos)
      });

      const data = await res.json();

      const mensaje = document.getElementById('mensaje');
      if (data.success) {
        mensaje.textContent = 'Margarita agregada correctamente.';
        mensaje.className = 'text-green-600 text-center mt-4';
        setTimeout(() => {
          window.location.href = '/vista/margarita_lista.html';
        }, 1500);
      } else {
        throw new Error(data.error || 'Error desconocido');
      }
    } catch (error) {
      const mensaje = document.getElementById('mensaje');
      mensaje.textContent = error.message;
      mensaje.className = 'text-red-600 text-center mt-4';
    }
  });
});
