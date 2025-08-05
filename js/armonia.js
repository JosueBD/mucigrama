// Esperar a que toda la página HTML se cargue para empezar
document.addEventListener('DOMContentLoaded', () => {

    // --- ELEMENTOS DEL HTML ---
    // Conectamos el JavaScript con los elementos de la página.
    const textoPregunta = document.getElementById('pregunta-acorde');
    const contenedorOpciones = document.getElementById('opciones-notas');
    const botonVerificar = document.getElementById('boton-verificar');
    const mensajeFeedback = document.getElementById('mensaje-feedback-armonia');
    const botonSiguiente = document.getElementById('boton-siguiente-armonia');

    // --- BANCO DE PREGUNTAS DE ACORDES ---
    // Cada objeto tiene la Tónica, el Tipo de acorde y la Solución (las notas correctas).
    const preguntas = [
        { tonica: 'DO', tipo: 'Mayor', solucion: ['DO', 'MI', 'SOL'] },
        { tonica: 'SOL', tipo: 'Mayor', solucion: ['SOL', 'SI', 'RE'] },
        { tonica: 'FA', tipo: 'Mayor', solucion: ['FA', 'LA', 'DO'] },
        { tonica: 'RE', tipo: 'menor', solucion: ['RE', 'FA', 'LA'] },
        { tonica: 'LA', tipo: 'menor', solucion: ['LA', 'DO', 'MI'] },
        { tonica: 'MI', tipo: 'menor', solucion: ['MI', 'SOL', 'SI'] }
    ];

    let preguntaActual = 0; // Para saber en qué pregunta estamos.
    const todasLasNotas = ['DO', 'DO#', 'RE', 'RE#', 'MI', 'FA', 'FA#', 'SOL', 'SOL#', 'LA', 'LA#', 'SI'];

    // --- FUNCIONES ---

    // Función para mostrar la pregunta actual en la pantalla.
    function mostrarPregunta() {
        const pregunta = preguntas[preguntaActual];
        textoPregunta.textContent = `Construye el acorde de: ${pregunta.tonica} ${pregunta.tipo}`;
        
        // Limpiamos el feedback anterior y ocultamos el botón de siguiente
        mensajeFeedback.textContent = '';
        botonSiguiente.style.display = 'none';
        botonVerificar.disabled = false;

        // Desmarcamos todas las casillas de la pregunta anterior
        contenedorOpciones.querySelectorAll('input').forEach(checkbox => {
            checkbox.checked = false;
            checkbox.disabled = false;
        });
    }

    // Función para crear las casillas de selección para cada nota.
    function crearOpcionesDeNotas() {
        todasLasNotas.forEach(nota => {
            const div = document.createElement('div');
            div.classList.add('flex', 'items-center');

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = `nota-${nota}`;
            checkbox.value = nota;
            checkbox.classList.add('mr-2');

            const label = document.createElement('label');
            label.htmlFor = `nota-${nota}`;
            label.textContent = nota;

            div.appendChild(checkbox);
            div.appendChild(label);
            contenedorOpciones.appendChild(div);
        });
    }

    // Función que se activa al presionar "Verificar".
    function verificarRespuesta() {
        const respuestaCorrecta = preguntas[preguntaActual].solucion;
        const respuestasUsuario = [];

        // Obtenemos todas las notas que el usuario seleccionó.
        contenedorOpciones.querySelectorAll('input:checked').forEach(checkbox => {
            respuestasUsuario.push(checkbox.value);
        });

        // Comparamos la respuesta del usuario con la solución.
        // Se convierte a texto (JSON.stringify) para poder comparar los dos arrays.
        const esCorrecto = JSON.stringify(respuestaCorrecta.sort()) === JSON.stringify(respuestasUsuario.sort());
        
        if (esCorrecto) {
            mensajeFeedback.textContent = '¡Correcto!';
            mensajeFeedback.style.color = 'green';
        } else {
            mensajeFeedback.textContent = `Incorrecto. La respuesta era: ${respuestaCorrecta.join(' - ')}.`;
            mensajeFeedback.style.color = 'red';
        }
        
        // Mostramos el botón "Siguiente" y deshabilitamos la verificación.
        botonSiguiente.style.display = 'block';
        botonVerificar.disabled = true;
        contenedorOpciones.querySelectorAll('input').forEach(checkbox => checkbox.disabled = true);
    }

    // Función para pasar a la siguiente pregunta.
    function siguientePregunta() {
        preguntaActual = (preguntaActual + 1) % preguntas.length; // El % hace que vuelva al inicio
        mostrarPregunta();
    }


    // --- INICIALIZACIÓN DEL EJERCICIO ---
    
    crearOpcionesDeNotas(); // Creamos los botones de las notas una sola vez.
    mostrarPregunta(); // Mostramos la primera pregunta al cargar.

    // Conectamos los botones con sus funciones.
    botonVerificar.addEventListener('click', verificarRespuesta);
    botonSiguiente.addEventListener('click', siguientePregunta);
});
