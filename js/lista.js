document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("listado");
  if (!contenedor) return;

  fetch("../srv/margarita_lista.php")
    .then((res) => res.json())
    .then((data) => {
      contenedor.innerHTML = "";

      if (Array.isArray(data) && data.length > 0) {
        data.forEach((m) => {
          const card = document.createElement("div");
          card.className = "bg-white p-6 rounded-lg shadow-md";

          card.innerHTML = `
            <h2 class="text-2xl font-bold mb-2 text-green-600">${m.nombre}</h2>
            <p><strong>Precio:</strong> $${parseFloat(m.precio).toFixed(2)}</p>
            <p><strong>Ingredientes:</strong> ${m.ingredientes}</p>
            <p><strong>Disponible:</strong> ${
              m.disponible == 1 ? "Sí" : "No"
            }</p>
            <div class="mt-4 space-x-4">
              <a href="/vista/margarita_modificar.html?id=${
                m.id_margarita
              }" class="text-blue-500 hover:underline">Modificar</a>
              <a href="/vista/margarita_baja.html?id=${
                m.id_margarita
              }" class="text-red-500 hover:underline">Eliminar</a>
            </div>
          `;

          contenedor.appendChild(card);
        });
      } else {
        contenedor.innerHTML = `<p class="text-center text-gray-500">No hay margaritas registradas.</p>`;
      }
    })
    .catch((err) => {
      console.error("Error al cargar margaritas:", err);
      contenedor.innerHTML = `<p class="text-red-500 text-center">Error al cargar datos.</p>`;
    });
});
