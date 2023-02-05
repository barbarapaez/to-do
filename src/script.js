const fecha = document.querySelector('#fecha');
const lista = document.querySelector('#lista');
const elemento = document.querySelector('#elemento');
const input = document.querySelector('#input');
const botonEnter = document.querySelector('#boton-enter');
const check = 'fa-check-circle'; 
const uncheck ='fa-circle'; 
const lineThrough = 'line-through';
let id 
let LIST
let eliminada
let realizada

const FECHA = new Date()
fecha.innerHTML = FECHA.toLocaleDateString('es-AR', {weekday: 'long', month: 'long',  day:'numeric'})

function agregarTarea(tarea, id, realizada, eliminada) {
    if (eliminada) {return} 
    
    const REALIZADA = realizada ?check :uncheck; 
    const LINE = realizada ?lineThrough :''; 
    const elemento = 
        `
        <li id="elemento">
            <i class="fa ${REALIZADA}" data="realizada" id="${id}"></i>
            <p class="text ${LINE}"> ${tarea}</p>
            <i class="fa fa-trash de" data="eliminada" id="${id}"></i> 
        </li>
        `
    
    lista.insertAdjacentHTML("beforeend", elemento); 
}

function tareaRealizada(elemento) {
    elemento.classList.toggle(check);
    elemento.classList.toggle(uncheck);
    elemento.parentNode.querySelector('.text').classList.toggle(lineThrough);
    LIST[elemento.id].realizada = LIST[elemento.id].realizada ?false :true
}

function tareaEliminada(elemento) {
    elemento.parentNode.parentNode.removeChild(elemento.parentNode);
    LIST[elemento.id].eliminada = true; 
    console.log(LIST);
}




botonEnter.addEventListener('click', ()=> {
    const tarea = input.value; 
    if(tarea) {
        agregarTarea(tarea, id, false, false)
        LIST.push({
            nombre : tarea,
            id: id, 
            realizada: false,
            eliminada: false
        })
    }
    localStorage.setItem('TODO', JSON.stringify(LIST))
    input.value=''
    id++
})

document.addEventListener('keyup', function(event) {
    if (event.key=='Enter') {
        const tarea = input.value; 
        if(tarea) {
            agregarTarea(tarea, id, false, false)
            LIST.push({
                nombre : tarea,
                id: id, 
                realizada: false,
                eliminada: false
            })
        }
        localStorage.setItem('TODO', JSON.stringify(LIST))
        input.value=''
        id++
    }
})

lista.addEventListener('click', function(event) {
    const elemento = event.target; 
    const elementData = elemento.attributes.data.value; 

    if (elementData == 'realizada') {
        tareaRealizada(elemento);
    } else if (elementData == 'eliminada') {
        tareaEliminada(elemento);
    }
    localStorage.setItem('TODO', JSON.stringify(LIST))
})


let data = localStorage.getItem('TODO') 
if (data) {
    LIST = JSON.parse(data)
    console.log(LIST)
    id = LIST.length
    cargarLista(LIST)
} else {
    LIST = []; 
    id = 0;
}

function cargarLista(array) {
    array.forEach(function(item) {
        agregarTarea(item.nombre, item.id, item.realizada, item.eliminada);
    })
}