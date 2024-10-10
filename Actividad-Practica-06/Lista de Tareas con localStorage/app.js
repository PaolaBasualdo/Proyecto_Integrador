//referencias a los elementos del DOM
const botonAgregar = document.querySelector(".boton-agregar");
const ul = document.querySelector("ul");
const input = document.querySelector("#tarea-input");


function cargarTareas() {
  return JSON.parse(localStorage.getItem("tareas")) || []; 
}


function guardarTareas(tareas) {
  localStorage.setItem("tareas", JSON.stringify(tareas)); 
}


const tareas = cargarTareas();
tareas.forEach((tarea) => mostrarTarea(tarea)); 


botonAgregar.addEventListener("click", () => {
  const descripcion = input.value.trim();
  if (descripcion !== "") {
    const nuevaTarea = { descripcion, completada: false }; 
    tareas.push(nuevaTarea); 
    guardarTareas(tareas); 
    mostrarTarea(nuevaTarea); 
    input.value = ""; 
  } else {
    alert("Por favor, ingrese una tarea."); 
  }
});


function mostrarTarea(tarea) {
  const li = document.createElement("li");
  const p = document.createElement("p");
  const iconos = document.createElement("div");
  iconos.classList.add("iconos");

  const completar = document.createElement("i");
  completar.classList.add("bi", "bi-check-lg", "icono-completar");
  iconos.appendChild(completar);

  const eliminar = document.createElement("i");
  eliminar.classList.add("bi", "bi-trash3-fill", "icono-eliminar");
  iconos.appendChild(eliminar);

  p.textContent = tarea.descripcion; // Asignar la descripción a la tarea
  if (tarea.completada) {
    p.classList.add("completa"); // Agregar clase si la tarea está completada
  }

  li.appendChild(p);
  li.appendChild(iconos);
  ul.appendChild(li); 


  completar.addEventListener("click", () => {
    p.classList.toggle("completa");
    tarea.completada = !tarea.completada; 
    guardarTareas(tareas); 
  });

 
  eliminar.addEventListener("click", () => {
    ul.removeChild(li); 
    const index = tareas.indexOf(tarea); 
    if (index !== -1) { 
      tareas.splice(index, 1); 
      guardarTareas(tareas); 
    }
  });
}
