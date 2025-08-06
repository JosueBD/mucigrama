document.addEventListener('DOMContentLoaded', () => {

    // --- ELEMENTOS DEL HTML ---
    const botonesPuzle = document.querySelectorAll('.boton-puzle');
    const contenedorSeleccion = document.getElementById('seleccion-puzle');
    const contenedorMucigrama = document.getElementById('contenedor-mucigrama');
    const gridContainer = document.getElementById('grid-container');
    const titleElement = document.getElementById('mucigrama-title');
    const horizontalCluesContainer = document.getElementById('horizontal-clues');
    const verticalCluesContainer = document.getElementById('vertical-clues');
    const botonVerificar = document.getElementById('boton-verificar');
    const botonLimpiar = document.getElementById('boton-limpiar');
    const botonVolver = document.getElementById('boton-volver');

    let crosswordData = {};
    let currentDirection = 'horizontal'; // 'horizontal' o 'vertical'
    
    // --- Lógica del Menú Principal ---
    botonesPuzle.forEach(boton => {
        boton.addEventListener('click', () => {
            const nombrePuzle = boton.dataset.puzle;
            iniciarMucigrama(nombrePuzle);
        });
    });

    botonVolver.addEventListener('click', () => {
        contenedorMucigrama.classList.add('hidden');
        contenedorSeleccion.classList.remove('hidden');
    });

    botonLimpiar.addEventListener('click', limpiarCrucigrama);
    botonVerificar.addEventListener('click', verificarRespuestas);
    
    // --- Función Principal ---
    function iniciarMucigrama(nombrePuzle) {
        contenedorSeleccion.classList.add('hidden');
        contenedorMucigrama.classList.remove('hidden');
        gridContainer.innerHTML = '';
        horizontalCluesContainer.innerHTML = '';
        verticalCluesContainer.innerHTML = '';

        fetch(`data/${nombrePuzle}.json`)
            .then(response => response.json())
            .then(data => {
                crosswordData = data;
                titleElement.textContent = crosswordData.titulo;
                generateGrid();
                displayClues();
                // No cargamos progreso para permitir una experiencia limpia cada vez
            });
    }

    // --- Nuevas Funciones de Botones ---
    function limpiarCrucigrama() {
        const cells = document.querySelectorAll('.cell:not(.black)');
        cells.forEach(cell => {
            cell.value = '';
            cell.style.backgroundColor = 'white'; // Limpiar colores de verificación
        });
    }

    function verificarRespuestas() {
        const solution = crosswordData.solucion;
        const cells = document.querySelectorAll('.cell:not(.black)');
        cells.forEach(cell => {
            const [_, row, col] = cell.id.split('-');
            if (cell.value !== '') {
                if (cell.value.toUpperCase() === solution[row][col]) {
                    cell.style.backgroundColor = '#d4edda'; // Verde para correcto
                } else {
                    cell.style.backgroundColor = '#f8d7da'; // Rojo para incorrecto
                }
            } else {
                 cell.style.backgroundColor = 'white'; // Blanco si está vacío
            }
        });
    }

    // --- Funciones de la Rejilla ---
    function generateGrid() {
        const solution = crosswordData.solucion;
        gridContainer.style.gridTemplateColumns = `repeat(${solution[0].length}, 30px)`;
        solution.forEach((row, rowIndex) => {
            row.forEach((cell, colIndex) => {
                const input = document.createElement('input');
                input.type = 'text';
                input.maxLength = 1;
                input.id = `cell-${rowIndex}-${colIndex}`;
                input.classList.add('cell');

                if (cell === '0') {
                    input.classList.add('black');
                    input.disabled = true;
                } else {
                    // --- EVENTOS MEJORADOS ---
                    input.addEventListener('input', handleInput);
                    input.addEventListener('click', handleClick);
                    input.addEventListener('keydown', handleKeyDown); // Para navegación con flechas
                }
                gridContainer.appendChild(input);
            });
        });
    }
    
    // --- Lógica de Interacción Mejorada ---
    function handleClick(e) {
        const clickedCell = e.target;
        // Si hacemos clic en la misma celda, cambiamos de dirección
        if (document.activeElement === clickedCell) {
            currentDirection = (currentDirection === 'horizontal') ? 'vertical' : 'horizontal';
        } else {
            currentDirection = 'horizontal'; // Por defecto, horizontal
        }
        highlightWord(clickedCell);
    }
    
    function handleInput(e) {
        e.target.value = e.target.value.toUpperCase();
        const [_, row, col] = e.target.id.split('-');
        
        // --- Avance automático del cursor ---
        let nextCell;
        if (currentDirection === 'horizontal') {
            nextCell = document.getElementById(`cell-${row}-${parseInt(col) + 1}`);
        } else {
            nextCell = document.getElementById(`cell-${parseInt(row) + 1}-${col}`);
        }
        
        if (nextCell && !nextCell.disabled) {
            nextCell.focus();
        }
    }

    function handleKeyDown(e) {
        // Navegación con flechas
        const [_, rowStr, colStr] = e.target.id.split('-');
        let row = parseInt(rowStr), col = parseInt(colStr);
        let nextElement;

        if (e.key === 'ArrowUp') nextElement = document.getElementById(`cell-${row - 1}-${col}`);
        else if (e.key === 'ArrowDown') nextElement = document.getElementById(`cell-${row + 1}-${col}`);
        else if (e.key === 'ArrowLeft') nextElement = document.getElementById(`cell-${row}-${col - 1}`);
        else if (e.key === 'ArrowRight') nextElement = document.getElementById(`cell-${row}-${col + 1}`);
        else if (e.key === 'Backspace' && e.target.value === '') {
            if (currentDirection === 'horizontal') nextElement = document.getElementById(`cell-${row}-${col - 1}`);
            else nextElement = document.getElementById(`cell-${row - 1}-${col}`);
        }

        if (nextElement && !nextElement.disabled) {
            nextElement.focus();
            e.preventDefault();
        }
    }

    function highlightWord(cell) {
        // Lógica para resaltar la palabra activa (opcional, pero mejora la UX)
        // Puedes añadirla si quieres que la palabra actual se vea diferente
    }

    function displayClues() {
        // ... (Esta función no necesita cambios)
        for (const key in crosswordData.pistas) {
            const [number, direction] = key.split('-');
            const clueText = crosswordData.pistas[key];
            const clueElement = document.createElement('p');
            clueElement.innerHTML = `<b>${number}.</b> ${clueText}`;
            if (direction === 'horizontal') {
                horizontalCluesContainer.appendChild(clueElement);
            } else {
                verticalCluesContainer.appendChild(clueElement);
            }
        }
    }
});
