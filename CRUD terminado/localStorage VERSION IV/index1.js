function updateTablaUsuarios() {
    
    const tablaUsuarios = document.getElementById("tablaUsuarios");
    //selecciona el elemento por la id y lo almacena en una variable
    tablaUsuarios.innerHTML = "";
    //le asigno a la tabla un valor de cadena vacio, elimino filas(tr), celdas(td)
    let usuarios = JSON.parse(localStorage.getItem("users")) || [];
    //obtengo la info contenida en el local storage, la convierto de string a array con parse y el resultado es un array usuarios
    //itero sobre el array para cada user de usuarios le inserto a la tabla de usuarios una fila (tr) con celdas (td) que obtengo de los elementos del array que son objetos, ademas le agrego dos botones
    usuarios.forEach(user => {
        tablaUsuarios.innerHTML += `
            <tr>
                <td>${user.nombre}</td>
                <td>${user.email}</td>
                <td>${user.edad}</td>
                <td><button class="eliminar">Eliminar</button></td>
                <td><button class="editar">Editar</button></td>
            </tr>
        `;//utilizo un template literal 

    });
}
//se invoca la funcion para que se renderice la tabla
updateTablaUsuarios();
//evento Guardar , se agrega el evento al boton guardar del form en el html
document.getElementById("guardar").addEventListener("click", (event) => {
    let nombre = document.getElementById("nombre").value;//accedo el elemento del DOM con el id nombre y a su vez con la propiedad value acceso a lo que se inserto en el input. Accedo al valor actual del campo input y se lo asigno a la variable. Accedo al elemento del DOM con id="nombre", obtengo su propiedad .value (que contiene el texto ingresado por el usuario) y asigno ese valor a la variable nombre.
    let email = document.getElementById("email").value;
    let edad = document.getElementById("edad").value;

    let user = { nombre, email, edad };//objeto user

    let usuarios = JSON.parse(localStorage.getItem("users")) || [];

    usuarios.push(user);//agrego el usuario al array  

    localStorage.setItem("users", JSON.stringify(usuarios));//asegura la persistencia de la info, incorporo el nuevo usuario al local storage

    updateTablaUsuarios();// se renderiza la tabla 

    document.getElementById("nombre").value = '';//borro los valores de los input para que se puedan cargar nuevos
    document.getElementById("email").value = '';
    document.getElementById("edad").value = '';
    

    
});

//el objeto evento, se agraga a toda la tabla captura todos los click de la tabla 
document.getElementById("tablaUsuarios").addEventListener("click", (event) => {
    if (event.target.className === "eliminar") {//si bien es en toda la tabla se especifica que es en el elemento de la clase eliminar, el boton que creamos al renderizar la tabla. event.target es una propiedad del objeto event. target se refiere al elemento HTML que disparó el evento, es decir, el elemento sobre el cual se hizo clic
        let button = event.target;//al elemento que disparo el evento lo llamamos boton, lo guardamos en la variable button
        let row = button.parentNode.parentNode;//sabemos que estamos en una tabla y llamamos row a la fila donde esta el boton, el primer parentNode de button es td, la celda y el segundo es tr la fila. tr contiene a td y td contiene a button.
        let mail = row.cells[1].textContent;//antes de borrar la fila obtengo el contenido de la segunda celda de la fila que es el mail del usuario, eso me permitira en el local storage filtar a los usuarios cuyo mail no coincida con el de la fila

        row.remove();//borramos la fila, pero aun existe en el local storage, la eliminamos de la renderizacion

        let usuarios = JSON.parse(localStorage.getItem("users"));//obtengo la informacion del local storage me queda en forma de un array llamado usuarios
        let nuevosUsuarios = usuarios.filter(user => user.email !== mail); // creo un nuevo array donde solo quedan los usuarios que no tienen el mail igual al de la fila eliminada 
        localStorage.setItem("users", JSON.stringify(nuevosUsuarios));
        //mi nuevo array (nuevosUsuarios)lo llevo al local storage y es ahora usuarios

        updateTablaUsuarios();//renderizo la tabla de nuevo
    }
});

// de nuevo se aplica un eventlistenner a toda la tabla, para capturar esta vex el click en elditar
document.getElementById("tablaUsuarios").addEventListener("click", (event) => {
    if (event.target.className === "editar") {
        let button = event.target;
        let row = button.parentNode.parentNode;
        let email = row.cells[1].textContent;

        let usuarios = JSON.parse(localStorage.getItem("users"));
        let usuarioParaEditar = usuarios.find(user => user.email === email);

        document.getElementById("nombre").value = row.cells[0].textContent;
        document.getElementById("email").value = row.cells[1].textContent;
        document.getElementById("edad").value = row.cells[2].textContent;

        document.getElementById("email").setAttribute("data-editing-email", email);
    }
});