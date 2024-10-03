
const nombreInput = document.getElementById("nombre");
const edadInput = document.getElementById("edad");
const emailInput = document.getElementById("email");
const botonAgregar = document.getElementById("agregar");
const tabla = document.getElementById("tabla");
const tbody = document.getElementById("tbody");

let usuarios =  JSON.parse(localStorage.getItem("usuarios")) || [];

botonAgregar.addEventListener("click", (e)=> {
  const nombre = nombreInput.value;
  const edad = edadInput.value;
  const email = emailInput.value;

  if(nombre && edad && email){
    let usuario = {nombre, edad, email}; 
    usuarios.push(usuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    rellenarTabla();


    nombreInput.value = '';
    edadInput.value = '';
    emailInput.value = '';

  }else {
    alert("Algunos datos estan incompletos")
  }
})


function rellenarTabla() {
  
  tbody.innerHTML = '';
  usuarios.forEach((usuario, index) => {
    const fila = document.createElement("tr");
    const nombreCelda =document.createElement("td");
    const edadCelda =document.createElement("td");
    const emailCelda =document.createElement("td");
    const accionCelda =document.createElement("td");
    const botonEditar = document.createElement("button");
    const botonEliminar = document.createElement("button");

    nombreCelda.textContent =usuario.nombre;
    edadCelda.textContent =usuario.edad;
    emailCelda.textContent =usuario.email;
    botonEditar.textContent ="Editar";
    botonEliminar.textContent ="Eliminar";

    botonEditar.classList.add("boton");
    botonEliminar.classList.add("boton");

    botonEditar.addEventListener("click",  (e) => {
      editarUsuario(index);

    })

    botonEliminar.addEventListener("click",  (e) => {
      eliminarUsuario(index);

    })

    accionCelda.appendChild(botonEditar);
    accionCelda.appendChild(botonEliminar);

    fila.appendChild(nombreCelda);
    fila.appendChild(edadCelda);
    fila.appendChild(emailCelda);
    fila.appendChild(accionCelda);

    tbody.appendChild(fila);

      
  })


 }


function editarUsuario(index){
  const usuario = usuarios[index];
  nombreInput.value = usuario.nombre;
  edadInput.value = usuario.edad;
  emailInput.value = usuario.email;
  usuarios.splice(index, 1);
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
  rellenarTabla();
}

function eliminarUsuario(index){
  usuarios.splice(index, 1);
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
  rellenarTabla();

}


rellenarTabla();