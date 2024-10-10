const botonAgregar = document.querySelector(".boton-agregar");//guardo la referencia del boton

const ul = document.querySelector("ul");//guardo la referencia de la lista
//querySelector: utiliza selectores css; flexible selecciona cualquier elemento, en el ejercicio seleccione tag y clase
//getElementById: selecciona por id (único por documento).Es mas rapido, selecciones sencillas y directas.
//inmutabilidad de la referncia, se usa const en lugar de let porque cuano se guarda un elemento del DOM en una variable, la referencia al elemento no cambia. Aunque el contenido o las propiedades del elemento puedan cambiar, la referencia en sí misma no.


botonAgregar.addEventListener("click", (e) => {//funcion flecha paso el evento como segundo argumento

  const input = document.querySelector("input").value;//guardo la referncia del input y le asigno valor
  //const text = input.value;//si le asigno el valor fuera de la funcion, solo se captura una vez

  if(input !== ""){//esto funciona siempre que el input no este vacio

    const li = document.createElement("li") //creo el elemnto de la lista
    const p = document.createElement("p")//creo el texto que va dentro del elemento
    const iconos = document.createElement("div");//crea el contenedor para los iconos 
    iconos.classList.add("iconos"); //le asigna la clase iconos

    
    const completar = document.createElement("i"); //crea el icono completar
    completar.classList.add("bi", "bi-check-lg", "icono-completar")//le asigna tres clases
    iconos.appendChild(completar);//incorpora el icono completar al div iconos

    const eliminar = document.createElement("i"); //crea el icono eliminar
    eliminar.classList.add("bi", "bi-trash3-fill", "icono-eliminar")//le asigna tres clases
    iconos.appendChild(eliminar);//incorpora el icono eliminar al div iconos

    p.textContent = input; //le asigno el valor input al texto

    li.appendChild(p);//le agrego el texto al elemento  
    li.appendChild(iconos)//incorpora el div icono al elemento

    ul.appendChild(li);//le agrego el elemento a la lista  

    document.querySelector("input").value = "";//borra el campo input

    completar.addEventListener("click", (e) => {//creo el evento para modificar tachando la tarea completada
      p.classList.toggle("completa");//le asigno una clase al parrafo solo cuando se hace click el boton de chequear. p no tiene clase, solo cuando esta completada la tarea se le asigna una clase. Con CSS se le de estilo tachado en rojo 

    })

    eliminar.addEventListener("click", (e) => {//creo el evento para eliminar
      ul.removeChild(li);
    });

    
  } else {
      alert("Ingrese una tarea pendiente");
  }


    
})

