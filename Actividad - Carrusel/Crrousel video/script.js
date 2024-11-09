const btnLeft = document.querySelector(".btn-left"),
      btnRight = document.querySelector(".btn-right"),
      slider = document.querySelector("#slider"),
      sliderSections = document.querySelectorAll(".slider-section");

let operacion = 0,
    counter = 0,
    widthImg = 100 / sliderSections.length;

// Evento para mover el carrusel hacia la derecha
btnRight.addEventListener("click", () => moveToRight());

// Evento para mover el carrusel hacia la izquierda
btnLeft.addEventListener("click", () => moveToLeft());

// Movimiento automático cada 3 segundos
setInterval(moveToRight, 3000);

function moveToRight() {
    if (counter >= sliderSections.length - 1) {
        // Reinicia el carrusel al llegar al final
        counter = 0;
        operacion = 0;
        slider.style.transition = "none";  // Cambia el estilo de slider, sin transición para evitar parpadeo
    } else {
        // Incrementa el contador y el desplazamiento
        counter++;
        operacion += widthImg;
        slider.style.transition = "all 0.6s ease";  // Activa transición
    }
    slider.style.transform = `translateX(-${operacion}%)`;
}

function moveToLeft() {
    if (counter <= 0) {
        // Va al final del carrusel si está en la primera imagen
        counter = sliderSections.length - 1;
        operacion = widthImg * (sliderSections.length - 1);
        slider.style.transition = "none";
    } else {
        // Disminuye el contador y el desplazamiento
        counter--;
        operacion -= widthImg;
        slider.style.transition = "all 0.6s ease";
    }
    slider.style.transform = `translateX(-${operacion}%)`;
}
