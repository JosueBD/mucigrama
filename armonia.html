// Esperar a que toda la página HTML se cargue para empezar
document.addEventListener('DOMContentLoaded', () => {

    // --- MOTOR DE AUDIO Y FRECUENCIAS ---
    // Creamos el motor de audio UNA SOLA VEZ al inicio.
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    // Mapa de frecuencias (notas a Hertz).
    const frecuencias = {
        'DO': 261.63, 'DO#': 277.18, 'RE': 293.66, 'RE#': 311.13, 'MI': 329.63, 'FA': 349.23,
        'FA#': 369.99, 'SOL': 392.00, 'SOL#': 415.30, 'LA': 440.00, 'LA#': 466.16, 'SI': 493.88
    };

    // --- ELEMENTOS DEL HTML ---
    const textoPregunta = document.getElementById('pregunta-acorde');
    const contenedorOpciones = document.getElementById('opciones-notas');
    const botonVerificar = document.getElementById('boton-verificar');
    const mensajeFeedback = document.getElementById('mensaje-feedback-armonia');
    const botonSiguiente = document.getElementById('boton-siguiente-armonia');

    // --- BANCO DE PREGUNTAS ---
    const preguntas = [
        { tonica: 'DO', tipo: 'Mayor', solucion: ['DO', 'MI', 'SOL'] },
        { tonica: 'SOL', tipo: 'Mayor', solucion: ['SOL', 'SI', 'RE'] },
        { tonica: 'FA', tipo: 'Mayor', solucion: ['FA', 'LA', 'DO'] },
        { tonica: 'RE', tipo: 'menor', solucion: ['RE', 'FA', 'LA'] },
        { tonica: 'LA', tipo: 'menor', solucion: ['LA', 'DO', 'MI'] },
        { tonica: 'MI', tipo: 'menor', solucion: ['MI', 'SOL', 'SI'] }
    ];

    let preguntaActual = 0;
    const todasLasNotas = ['DO', 'DO#', 'RE', 'RE#', 'MI', 'FA', 'FA#', 'SOL', 'SOL#', 'LA', 'LA#', 'SI'];
    
    // --- FUNCIÓN DE AUDIO (MODIFICADA) ---
    // La función ahora usa el motor de audio que ya existe.
    function reproducirAcorde(notasDelAcorde) {
        if (!audioContext) return;
        const tiempoDeDuracion = 1;

        notasDelAcorde.forEach(nombreNota => {
            const frecuencia = frecuencias[nombreNota];
            if (!frecuencia) return;

            const oscilador = audioContext.createOscillator();
            const ganancia = audioContext.createGain();
            oscilador.type = 'sine';
            oscilador.frequency.setValueAtTime(frecuencia, audioContext.currentTime);
            ganancia.gain.setValueAtTime(0, audioContext.currentTime);
            ganancia.gain.linearRampToValueAtTime(0.5, audioContext.currentTime + 0.01);
            ganancia.gain.linearRampToValueAtTime(0, audioContext.currentTime + tiempoDeDuracion);
            oscilador.connect(ganancia);
            ganancia.connect(audioContext.destination);
            oscilador.start(audioContext.currentTime);
            oscilador.stop(audioContext.currentTime + tiempoDeDuracion);
        });
    }

    // --- FUNCIONES DEL EJERCICIO ---
    function verificarRespuesta() {
        // --- LÍNEA CLAVE AÑADIDA ---
        // Al hacer clic, si el audio estaba suspendido, lo reanudamos.
        if (audioContext.state === 'suspended') {
            audioContext.resume();
        }

        const respuestaCorrecta = preguntas[preguntaActual].solucion;
        const respuestasUsuario = [];
        contenedorOpciones.querySelectorAll('input:checked').forEach(checkbox => {
            respuestasUsuario.push(checkbox.value);
        });
        const esCorrecto = JSON.stringify(respuestaCorrecta.sort()) === JSON.stringify(respuestasUsuario.sort());
        
        if (esCorrecto) {
            mensajeFeedback.textContent = '¡Correcto!';
            mensajeFeedback.style.color = 'green';
            reproducirAcorde(respuestaCorrecta); 
        } else {
            mensajeFeedback.textContent = `Incorrecto. La respuesta era: ${respuestaCorrecta.join(' - ')}.`;
            mensajeFeedback.style.color = 'red';
        }
        
        botonSiguiente.style.display = 'block';
        botonVerificar.disabled = true;
        contenedorOpciones.querySelectorAll('input').forEach(checkbox => checkbox.disabled = true);
    }

    // ... (El resto de las funciones: mostrarPregunta, crearOpcionesDeNotas, etc. no cambian)
    function mostrarPregunta() {
        if (!textoPregunta) return;
        const pregunta = preguntas[preguntaActual];
        textoPregunta.textContent = `Construye el acorde de: ${pregunta.tonica} ${pregunta.tipo}`;
        mensajeFeedback.textContent = '';
        botonSiguiente.style.display = 'none';
        botonVerificar.disabled = false;
        contenedorOpciones.querySelectorAll('input').forEach(checkbox => {
            checkbox.checked = false;
            checkbox.disabled = false;
        });
    }
    function crearOpcionesDeNotas() {
        if (!contenedorOpciones) return;
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
    function siguientePregunta() {
        preguntaActual = (preguntaActual + 1) % preguntas.length;
        mostrarPregunta();
    }

    // --- INICIALIZACIÓN ---
    if (document.getElementById('ejercicio-armonia')) {
        crearOpcionesDeNotas();
        mostrarPregunta();
        botonVerificar.addEventListener('click', verificarRespuesta);
        botonSiguiente.addEventListener('click', siguientePregunta);
    }
});
