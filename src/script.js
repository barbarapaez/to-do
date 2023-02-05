const fecha = document.querySelector('#fecha');

const FECHA = new Date()
fecha.innerHTML = FECHA.toLocaleDateString('es-AR', {weekday: 'long', month: 'long',  day:'numeric'})