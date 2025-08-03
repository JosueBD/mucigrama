// Espera a que la página se cargue para empezar
document.addEventListener('DOMContentLoaded', () => {

    // --- ELEMENTOS DEL HTML ---
    // Conectamos el JavaScript con los elementos del ejercicio en la página.
    const imagenNota = document.getElementById('imagen-nota');
    const botonesRespuesta = document.querySelectorAll('.boton-respuesta');
    const mensajeFeedback = document.getElementById('mensaje-feedback');
    const botonSiguiente = document.getElementById('boton-siguiente');

    // --- BANCO DE PREGUNTAS ---
    // Aquí guardamos nuestras preguntas. Cada una tiene una imagen y su respuesta correcta.
    // Por ahora, usamos las imágenes que ya tienes. ¡Más adelante puedes crear una imagen para cada nota!
    const preguntas = [
        { imagen: 'img/notas1.png', respuesta: 'MI' }, // La primera nota de esta imagen es MI
        { imagen: 'img/notas2.png', respuesta: 'FA' }, // La primera nota de esta imagen es FA
        { imagen: 'img/clave-de-sol.png', respuesta: 'SOL' } // La clave se centra en la nota SOL
    ];

    let preguntaActual = 0; // Para saber en qué pregunta estamos.

    // --- FUNCIONES ---

    // Esta función muestra la pregunta en la página.
    function mostrarPregunta() {
        // Ocultamos el feedback anterior y el botón de siguiente
        mensajeFeedback.textContent = '';
        botonSiguiente.style.display = 'none';
        
        // Mostramos la imagen de la pregunta actual
        imagenNota.src = preguntas[preguntaActual].imagen;

        // Habilitamos los botones de respuesta
        botonesRespuesta.forEach(boton => {
            boton.disabled = false;
        });
    }

    // Esta función se ejecuta cuando el usuario hace clic en un botón de respuesta.
    function verificarRespuesta(evento) {
        const respuestaUsuario = evento.target.textContent; // El texto del botón que se presionó (ej: "DO")
        const respuestaCorrecta = preguntas[preguntaActual].respuesta;

        // Deshabilitamos todos los botones para que no se pueda responder de nuevo
        botonesRespuesta.forEach(boton => {
            boton.disabled = true;
        });

        // Comparamos la respuesta del usuario con la correcta
        if (respuestaUsuario === respuestaCorrecta) {
            mensajeFeedback.textContent = '¡Correcto!';
            mensajeFeedback.style.color = 'green';
        } else {
            mensajeFeedback.textContent = `Incorrecto. La respuesta era ${respuestaCorrecta}.`;
            mensajeFeedback.style.color = 'red';
        }

        // Mostramos el botón "Siguiente"
        botonSiguiente.style.display = 'block';
    }

    // Esta función pasa a la siguiente pregunta
    function siguientePregunta() {
        // Avanzamos a la siguiente pregunta, o volvemos al principio si ya se acabaron
        preguntaActual = (preguntaActual + 1) % preguntas.length;
        mostrarPregunta();
    }

    // --- INICIALIZACIÓN ---
    
    // Añadimos un "escuchador" a cada botón para que llamen a la función verificarRespuesta
    botonesRespuesta.forEach(boton => {
        boton.addEventListener('click', verificarRespuesta);
    });

    // El botón "Siguiente" llama a la función siguientePregunta
    botonSiguiente.addEventListener('click', siguientePregunta);

    // Mostramos la primera pregunta cuando la página carga
    mostrarPregunta();
});
