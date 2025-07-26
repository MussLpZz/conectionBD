//Global
const params = new URLSearchParams(window.location.search);
const id = params.get("id");




document.getElementById("btnEliminar").addEventListener("click", async () => {
  if (!confirm("¿Seguro que quieres eliminar esta margarita?")) return;

  try {
    const res = await fetch(`/srv/margarita_baja.php?id=${id}`, {
      method: "POST",
    });

    if (res.ok) {
      window.location.href = "/vista/margarita_lista.html";
    } else {
      const errorData = await res.json();
      document.getElementById("mensajeError").textContent =
        errorData.error || "Error al eliminar.";
      document.getElementById("mensajeError").classList.remove("hidden");
    }
  } catch (e) {
    document.getElementById("mensajeError").textContent =
      "Error en la petición.";
    document.getElementById("mensajeError").classList.remove("hidden");
  }
});

cargarNombre();

//Lista
async function cargarListado() {
  try {
    const response = await fetch("/srv/margarita_lista.php");
    if (!response.ok) throw new Error("Error al cargar datos");

    const listado = await response.json();
    const contenedor = document.getElementById("listado");
    contenedor.innerHTML = "";

    if (listado.length === 0) {
      contenedor.innerHTML = "<p>No hay margaritas para mostrar.</p>";
      return;
    }

    listado.forEach((row) => {
      const div = document.createElement("div");
      div.className = "bg-white p-4 rounded-lg shadow-md";

      div.innerHTML = `
            <dt class="font-bold text-xl">${row.nombre}</dt>
            <dd class="mt-2 text-gray-700">
              Precio: $${parseFloat(row.precio).toFixed(2)} <br>
              <div class="mt-2">
                <a href="/vista/margarita_modificar.html?id=${
                  row.id_margarita
                }" class="text-yellow-500 hover:text-yellow-600">Modificar</a> |
                <a href="/vista/margarita_baja.html?id=${
                  row.id_margarita
                }" class="text-red-500 hover:text-red-600">Eliminar</a>
              </div>
            </dd>
          `;

      contenedor.appendChild(div);
    });
  } catch (error) {
    console.error(error);
    document.getElementById("listado").innerHTML =
      "<p>Error cargando los datos.</p>";
  }
}

cargarListado();

//Modificar
async function cargarDatos() {
  const response = await fetch(`/srv/margarita_obtener.php?id=${id}`);
  const data = await response.json();

  document.getElementById("nombre").value = data.nombre;
  document.getElementById("precio").value = data.precio;
  document.getElementById("ingredientes").value = data.ingredientes;
  document.getElementById("disponible").checked = data.disponible == 1;
}

document
  .getElementById("formulario")
  .addEventListener("submit", async function (e) {
    e.preventDefault();
    const datos = {
      nombre: document.getElementById("nombre").value,
      precio: document.getElementById("precio").value,
      ingredientes: document.getElementById("ingredientes").value,
      disponible: document.getElementById("disponible").checked ? 1 : 0,
    };

    const response = await fetch(`/srv/margarita_modificar.php?id=${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datos),
    });

    if (response.ok) {
      window.location.href = "/vista/margarita_lista.html";
    } else {
      alert("Error al modificar la margarita.");
    }
  });

cargarDatos();
