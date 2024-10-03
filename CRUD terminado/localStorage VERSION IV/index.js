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
//evento Guardar 
document.getElementById("guardar").addEventListener("click", () => {
    let nombre = document.getElementById("nombre").value;//accedo el elemento del DOM con el id nombre y a su vez con la propiedad value acceso a lo que se inserto en el input. Accedo al valor actual del campo input y se lo asigno a la variable. Accedo al elemento del DOM con id="nombre", obtengo su propiedad .value (que contiene el texto ingresado por el usuario) y asigno ese valor a la variable nombre.
    let email = document.getElementById("email").value;
    let edad = document.getElementById("edad").value;

    let user = { nombre, email, edad };//objeto user

    let usuarios = JSON.parse(localStorage.getItem("users")) || [];
    
    let emailExistente = usuarios.find(user => user.email === email);

    if (emailExistente) {
       
        usuarios = usuarios.map(user => user.email === email ? { nombre, email, edad } : user);
    } else {
        
        usuarios.push(user);
    }
    

    localStorage.setItem("users", JSON.stringify(usuarios));
    updateTablaUsuarios();
    document.getElementById("nombre").value = '';
    document.getElementById("email").value = '';
    document.getElementById("edad").value = '';
    

    
});


document.getElementById("tablaUsuarios").addEventListener("click", (event) => {
    if (event.target.className === "eliminar") {
        let button = event.target;
        let row = button.parentNode.parentNode;
        let mail = row.cells[1].textContent;

        row.remove();

        let usuarios = JSON.parse(localStorage.getItem("users"));
        let nuevosUsuarios = usuarios.filter(user => user.email !== mail);
        localStorage.setItem("users", JSON.stringify(nuevosUsuarios));

        updateTablaUsuarios();
    }
});

// Manejo de edición
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