const fecha = document.querySelector('#fecha');
const formularioTarea = document.querySelector('#formulario-tarea');
const agregarTarea = document.querySelector('#agregar-tarea');
const listaDeTareas = document.querySelector('#lista-de-tareas');

let tareas = JSON.parse(localStorage.getItem("tareas")) || []; 

const FECHA = new Date();
fecha.innerHTML = FECHA.toLocaleDateString('es-AR', {weekday: 'long', month: 'long',  day:'numeric'})

formularioTarea.addEventListener("submit", function(event) {
    event.preventDefault();
    const tarea = {
        texto: agregarTarea.value, 
        realizada: false
    }; 
    tareas.push(tarea);
    agregarTarea.value = "";
    mostrarTareas();
})

function mostrarTareas() {
    listaDeTareas.innerHTML = ""; 
    for (const tarea of tareas) {
        const tareaParticular = document.createElement("div"); 
        tareaParticular.classList.add("tarea-particular"); 
        if (tarea.realizada) {
            tareaParticular.classList.add("tarea-realizada"); 
        }
    tareaParticular.innerHTML = 
    `
        <span>${tarea.texto}</span>
        <div>
            <button class="btn-tarea-realizada">Listo</button>
            <button class="btn-tarea-eliminada">Eliminar</button>
        </div>    
    `;
    const btnTareaRealizada = tareaParticular.querySelector(".btn-tarea-realizada");
    btnTareaRealizada.addEventListener("click", function () {
        tarea.realizada = !tarea.realizada;
        mostrarTareas();
    });
    const btnTareaEliminada = tareaParticular.querySelector(".btn-tarea-eliminada"); 
    btnTareaEliminada.addEventListener("click", function() {
        const indexDeTarea = tareas.indexOf(tarea);
        tarea.splice(indexDeTarea, 1); 
        mostrarTareas();
    })
    listaDeTareas.appendChild(tareaParticular);
    }
    localStorage.setItem("tareas", JSON.stringify(tareas));
}

mostrarTareas();