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
        { imagen: 'icons/notas3.png', respuesta: 'DO' }, // La primera nota de esta imagen es DO
        { imagen: 'icons/notas4.png', respuesta: 'RE' }, // La primera nota de esta imagen es RE
        { imagen: 'icons/notas8.png', respuesta: 'LA' }, // La primera nota de esta imagen es LA
        { imagen: 'icons/notas6.png', respuesta: 'FA' }, // La primera nota de esta imagen es FA
        { imagen: 'icons/notas5.png', respuesta: 'MI' }, // La primera nota de esta imagen es MI
        { imagen: 'icons/notas7.png', respuesta: 'SOL' }, // La primera nota de esta imagen es SOL
        { imagen: 'icons/notas9.png', respuesta: 'SI' }, // La primera nota de esta imagen es SI
        { imagen: 'icons/notas10.png', respuesta: 'DO' }, // La primera nota de esta imagen es DO
        { imagen: 'icons/notas11.png', respuesta: 'RE' }, // La primera nota de esta imagen es RE
        { imagen: 'icons/notas12.png', respuesta: 'MI' }, // La primera nota de esta imagen es MI
        { imagen: 'icons/notas13.png', respuesta: 'FA' }, // La primera nota de esta imagen es FA
        { imagen: 'icons/notas14.png', respuesta: 'SOL' }, // La primera nota de esta imagen es SOL
        { imagen: 'icons/notas15.png', respuesta: 'LA' }, // La primera nota de esta imagen es LA
        { imagen: 'icons/notas16.png', respuesta: 'SI' }, // La primera nota de esta imagen es SI
        { imagen: 'icons/notas17.png', respuesta: 'DO' }, // La primera nota de esta imagen es DO
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
