const nav = document.querySelector("#nav");
const abrir = document.querySelector("#abrir");
const cerrar = document.querySelector("#cerrar");

abrir.addEventListener("click", () =>{
    nav.classList.add("visible");
    
})

cerrar.addEventListener("click", () =>{
    nav.classList.remove("visible");
    
})

const btnLeft = document.querySelector(".btn-left");
const btnRight = document.querySelector(".btn-right");
const slider = document.querySelector("#slider");//posiciones div class con id slider
const sliderSections = document.querySelectorAll(".slider-section");//array de todas las secciones que contienen las imagenes

let posicion = 0;//valor del desplazamiento en porcentaje se actualiza en cada avance o retorceso
let contador = 0; //indice de la imagen actual
let desplazamiento = 100 / sliderSections.length;//porcentaje de desplazamiento necesario para pasar de una posicion a la siguiente en el carrousel

btnRight.addEventListener("click", () => moveToRight());//escucha el evento al hacer click en el boton derecho 
btnLeft.addEventListener("click", () => moveToLeft());//escucha el evento al hacer click en el boton izquierdo

setInterval(() => {//ejecuta repetidamente una función  a intervalos especificados
    moveToRight();//seg llama a la funcion cada 3 se
}, 3000);

function moveToRight() {
    if (contador >= sliderSections.length-1) {//si el indice de la imagen alcanza el ultivo valor, en este ejercicio es 5 , se resetea la posicion y el contador el carrousel vuelve a empezar
        posicion = 0;
        contador = 0;
        slider.style.transition = "none"; //"salta" a la primera imagen sin la animación de deslizamiento. En CSS el estilo para el div carrouseles es: transition: transform 0.5s ease-in-out. Aqui lo trae a travez de la variable slider que es un array con el querySelectorAll con la id slider. 
    } else {
        contador++;//incrementa el indice en 1 avanzando hasta la siguiente imagen
        posicion += desplazamiento;//aumenta el desplazamiento en un ancho de imagen 
    }
    slider.style.transform = `translateX(-${posicion}%)`;//translateX(-${posicion}%) desplaza el contenedor slider horizontalmente hacia la izquierda un porcentaje equivalente al ancho de una imagen
}

function moveToLeft() {
    if (contador <= 0) {//Si el carrousel esta en primera imagen
        posicion = 100 - desplazamiento;//se actualiza posicion se traslada a la ultima imagen
        contador = sliderSections.length - 1;//el indice es el de la ultima imagen
    } else {
        contador--;//el contador disminuye en 1
        if (contador === 0) {
            posicion = 0;
        } else { //si el contador no esta en 0 , no estamos en la primera imagen entosces se produce el decremento 
            posicion -= desplazamiento;
        }
    }
    slider.style.transform = `translateX(-${posicion}%)`;
}