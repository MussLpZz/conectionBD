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
          card.className = "bg-white p-4 rounded-lg shadow-md";

          card.innerHTML = `
            <dl class="text-sm">
              <div class="flex gap-2">
                <dt class="font-bold text-green-700">Nombre:</dt>
                <dd>${m.nombre}</dd>
              </div>
              <div class="flex gap-2">
                <dt class="font-bold">Precio:</dt>
                <dd>$${parseFloat(m.precio).toFixed(2)}</dd>
              </div>
              <div class="flex gap-2">
                <dt class="font-bold">Ingredientes:</dt>
                <dd>${m.ingredientes}</dd>
              </div>
              <div class="flex gap-2">
                <dt class="font-bold">Disponible:</dt>
                <dd>${m.disponible == 1 ? "Sí" : "No"}</dd>
              </div>
            </dl>
            <div class="mt-1 text-sm">
              <a href="/vista/margarita_modificar.html?id=${
                m.id_margarita
              }" class="text-blue-500 hover:underline mr-4">Modificar</a>
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
