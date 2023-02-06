const hora = document.querySelector('#hora');
const formularioTarea = document.querySelector('#formulario-tarea');
const agregarTarea = document.querySelector('#agregar-tarea');
const listaDeTareas = document.querySelector('#lista-de-tareas');

let tareas = JSON.parse(localStorage.getItem("tareas")) || []; 

function darLaHora() {
    let fechaActual = new Date();
    let horaActual = fechaActual.getHours();
    let minutoActual = fechaActual.getMinutes();
    
    horaActual = (horaActual < 10) ? "0" + horaActual : horaActual;
    minutoActual = (minutoActual <10) ? "0" + minutoActual : minutoActual;
    hora.textContent = `${horaActual}:${minutoActual}` 
}

setInterval(darLaHora, 1000)

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
        <div class="area-lista">
            <button class="btn-tarea-realizada"><i class="fa fa-${tarea.realizada ? "check-circle" : "circle"}"></i></button>    
            <span class="texto-tarea" id="${tarea.realizada ? "realizada" :""}">${tarea.texto}</span>
            <button class="btn-tarea-eliminada"><i class="fa fa-trash"></i></button>
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
        tareas.splice(indexDeTarea, 1); 
        mostrarTareas();
    })
    listaDeTareas.appendChild(tareaParticular);
    }
    localStorage.setItem("tareas", JSON.stringify(tareas));
}

mostrarTareas();

