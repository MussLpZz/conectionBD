// helpers.js - funciones comunes para fetch y mensajes
export async function postData(url = '', data = {}) {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return response.json();
}

export function showMessage(msg, type = 'info') {
  const mensaje = document.getElementById('mensaje');
  if (!mensaje) return;

  mensaje.textContent = msg;
  mensaje.className = type === 'success' 
    ? 'text-green-600 text-center mt-4' 
    : type === 'error' 
      ? 'text-red-600 text-center mt-4' 
      : 'text-gray-700 text-center mt-4';
}
