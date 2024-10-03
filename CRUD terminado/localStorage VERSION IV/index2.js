function updateTablaUsuarios() { 
	//selecciona el elemento por la id y lo almacena en una variable 
  const tablaUsuarios = document.getElementById("tablaUsuarios");
  //le asigno a la tabla un valor de cadena vacio, elimino filas(tr), celdas(td)  
  tablaUsuarios.innerHTML = "";
  //obtengo la info contenida en el local storage, la convierto de string a array con parse y el resultado es un array usuarios
  
  let usuarios = JSON.parse(localStorage.getItem("users")) || [];
  //itero sobre el array para cada user de usuarios le inserto a la tabla de usuarios una fila (tr) con celdas (td) que obtengo de los elementos del array que son objetos, ademas le agrego dos botones  
    usuarios.forEach(user => {//utilizo un template sting 
      tablaUsuarios.innerHTML += `
        <tr>
          <td>${user.nombre}</td>
          <td>${user.email}</td>
          <td>${user.edad}</td>
          <td><button class="eliminar">Eliminar</button></td>
          <td><button class="editar">Editar</button></td>
        </tr>
        `;

    });//cierre del forEach
}//cierre de la funcion updateTablaUsuarios()
//se invoca la funcion para que se renderice la tabla
updateTablaUsuarios();
//evento Guardar , se agrega el evento al boton guardar del form en el html
document.getElementById("guardar").addEventListener("click", (event) => {
    let nombre = document.getElementById("nombre").value;
    let email = document.getElementById("email").value;
    let edad = document.getElementById("edad").value;
    let emailEnEdicion = document.getElementById("email").getAttribute("data-en-edicion");// esta linea sirve para la edicion de un usuario, utilizamos el mail como identificacion y suponemos que sera unica

    let usuarios = JSON.parse(localStorage.getItem("users")) || [];//obtengo la informacion del local storage me queda en forma de un array llamado usuarios
    
    if (emailEnEdicion) { //si emailEnEdicion no es nulo el ususario existe y estamos en modo edicion 
      for (let i = 0; i < usuarios.length; i++) {//itero sobre el array usuarios
        if (usuarios[i].email === emailEnEdicion) {//se sobreescriben los datos cuando se encuentra que el mail de la fila que se pretende editar es igual al mail del usuario existente
          usuarios[i].nombre = nombre;
          usuarios[i].edad = edad;
          break; 
        }//cierre del if
      }//cierre del bucle
      document.getElementById("email").removeAttribute("data-en-edicion");//se saca el atributo para una hacer posible una edicion posterior
    } else { //no se esta editando, esta con un nuevo usuario para agregar
      for (let i = 0; i < usuarios.length; i++) {
        if (usuarios[i].email === email) { //si es verdadero no se esta en modo edicion y no se deberia poder agregar el usuario nuevamente
          alert("El usuario ya existe");
          return; // se corta el bucle
        }
      }
        // dado que no existe se agraga al array usuarios
        usuarios.push({ nombre, email, edad });
    }
		//lo agrega al local Storage
    localStorage.setItem("users", JSON.stringify(usuarios));

    updateTablaUsuarios();// se renderiza la tabla
		//se limpia los campos del input
    document.getElementById("nombre").value = '';
    document.getElementById("email").value = '';
    document.getElementById("edad").value = '';   

});
//el objeto evento, se agraga a toda la tabla captura todos los click de la tabla 
document.getElementById("tablaUsuarios").addEventListener("click", (event) => {
    let button = event.target;//al elemento que disparo el evento lo llamamos boton, lo guardamos en la variable button
    let row = button.parentNode.parentNode;//sabemos que estamos en una tabla y llamamos row a la fila donde esta el boton, el primer parentNode de button es td, la celda y el segundo es tr la fila. tr contiene a td y td contiene a button.
    let mail = row.cells[1].textContent;//antes de borrar la fila obtengo el contenido de la segunda celda de la fila que es el mail del usuario, eso me permitira en el local storage filtar a los usuarios cuyo mail no coincida con el de la fila
    
    
    if (event.target.className === "eliminar") {//si bien es en toda la tabla se especifica que es en el elemento de la clase eliminar, el boton que creamos al renderizar la tabla. event.target es una propiedad del objeto event. target se refiere al elemento HTML que disparó el evento, es decir, el elemento sobre el cual se hizo clic
        
        row.remove();//borramos la fila, pero aun existe en el local storage, la eliminamos de la renderizacion

        let usuarios = JSON.parse(localStorage.getItem("users"));
        let nuevosUsuarios = usuarios.filter(user => user.email !== mail); // creo un nuevo array donde solo quedan los usuarios que no tienen el mail igual al de la fila eliminada  
        localStorage.setItem("users", JSON.stringify(nuevosUsuarios));//mi nuevo array (nuevosUsuarios)lo llevo al local storage y es ahora usuarios
        

        updateTablaUsuarios();//renderizo la tabla de nuevo
			

    
    } else if (event.target.className === "editar") {        

        let usuarios = JSON.parse(localStorage.getItem("users"));
        let usuarioParaEditar = usuarios.find(user => user.email === mail);
        //hago que los campos de input se vuelvan a completar con los valores del usuario donde se hizo click
        document.getElementById("nombre").value = row.cells[0].textContent;
        document.getElementById("email").value = row.cells[1].textContent;
        document.getElementById("edad").value = row.cells[2].textContent;

        // Asigno el atributo "data-en-edicion" al input de email
        document.getElementById("email").setAttribute("data-en-edicion", mail);
        // devuelve una referncia al elemento input con id email, le agrego el atributo data-en-edicion, para otorgarle una caracteristica adicional un atributo personalizado que se puede usar para almacenar información extra en un elemento HTML sin alterar su apariencia ni comportamiento predeterminado y a ese atributo le doy el valor de mail que es el valor de la celda 1 del la fila donde se produjo el evento
        
        //a partir de aca retoma la secuencia del evento agregar
        

        }
});

