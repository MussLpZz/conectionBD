document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const form = document.getElementById('formulario');

  if (!id) {
    alert('ID de margarita no especificado.');
    window.location.href = '/vista/margarita_lista.html';
    return;
  }

  // Cargar datos actuales para autocompletar el formulario
  fetch(`../srv/margarita_obtener.php?id=${id}`)
    .then(res => res.json())
    .then(data => {
      if (data && data.id_margarita) {
        document.getElementById('nombre').value = data.nombre;
        document.getElementById('precio').value = data.precio;
        document.getElementById('ingredientes').value = data.ingredientes;
        document.getElementById('disponible').checked = data.disponible == 1;
      } else {
        alert('Margarita no encontrada');
        window.location.href = '/vista/margarita_lista.html';
      }
    })
    .catch(err => {
      console.error('Error al cargar la margarita:', err);
      alert('Error al cargar los datos de la margarita.');
    });

  // Manejar envío del formulario para modificar
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const datos = {
      id_margarita: id,
      nombre: form.nombre.value.trim(),
      precio: parseFloat(form.precio.value),
      ingredientes: form.ingredientes.value.trim(),
      disponible: form.disponible.checked ? 1 : 0
    };

    fetch('../srv/margarita_modificar.php', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(datos)
    })
      .then(res => res.json())
      .then(response => {
        if (response.success) {
          alert('Margarita modificada correctamente.');
          window.location.href = '/vista/margarita_lista.html';
        } else {
          alert(response.error || 'Error al modificar la margarita.');
        }
      })
      .catch(err => {
        console.error('Error al modificar:', err);
        alert('Error de red al modificar.');
      });
  });
});
