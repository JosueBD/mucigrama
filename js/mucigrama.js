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
    let currentDirection = 'horizontal';

    // --- Lógica del Menú ---
    botonesPuzle.forEach(boton => boton.addEventListener('click', () => iniciarMucigrama(boton.dataset.puzle)));
    botonVolver.addEventListener('click', volverAlMenu);
    botonLimpiar.addEventListener('click', limpiarCrucigrama);
    botonVerificar.addEventListener('click', verificarRespuestas);
    
    function volverAlMenu() {
        contenedorMucigrama.classList.add('hidden');
        contenedorSeleccion.classList.remove('hidden');
    }

    // --- Función Principal ---
    function iniciarMucigrama(nombrePuzle) {
        contenedorSeleccion.classList.add('hidden');
        contenedorMucigrama.classList.remove('hidden');
        gridContainer.innerHTML = '';
        fetch(`data/${nombrePuzle}.json`)
            .then(response => response.json())
            .then(data => {
                crosswordData = data;
                titleElement.textContent = crosswordData.titulo;
                generateGrid();
                displayClues();
            });
    }

    // --- Funciones de Botones ---
    function limpiarCrucigrama() {
        document.querySelectorAll('.cell:not(.black)').forEach(cell => {
            cell.value = '';
            cell.style.backgroundColor = 'white';
        });
    }

    function verificarRespuestas() {
        const solution = crosswordData.solucion;
        document.querySelectorAll('.cell:not(.black)').forEach(cell => {
            const [_, row, col] = cell.id.split('-');
            if (cell.value !== '') {
                cell.style.backgroundColor = cell.value.toUpperCase() === solution[row][col] ? '#d4edda' : '#f8d7da';
            } else {
                cell.style.backgroundColor = 'white';
            }
        });
    }

    // --- Funciones de la Rejilla ---
    function generateGrid() {
        const solution = crosswordData.solucion;
        gridContainer.style.gridTemplateColumns = `repeat(${solution[0].length}, 30px)`;

        solution.forEach((row, rowIndex) => {
            row.forEach((cell, colIndex) => {
                const container = document.createElement('div');
                container.classList.add('cell-container');

                const input = document.createElement('input');
                input.type = 'text';
                input.maxLength = 1;
                input.id = `cell-${rowIndex}-${colIndex}`;
                input.dataset.row = rowIndex;
                input.dataset.col = colIndex;
                input.classList.add('cell');

                if (cell === '0') {
                    input.classList.add('black');
                    input.disabled = true;
                } else {
                    // Verificamos si esta celda es el inicio de una pista para ponerle número
                    const clue = crosswordData.pistas.find(p => p.fila === rowIndex && p.col === colIndex);
                    if (clue) {
                        const numberSpan = document.createElement('span');
                        numberSpan.classList.add('clue-number');
                        numberSpan.textContent = clue.numero;
                        container.appendChild(numberSpan);
                    }
                    input.addEventListener('input', handleInput);
                    input.addEventListener('click', handleClick);
                    input.addEventListener('keydown', handleKeyDown);
                }
                container.appendChild(input);
                gridContainer.appendChild(container);
            });
        });
    }
    
    // --- Lógica de Interacción ---
    function handleClick(e) {
        const clickedCell = e.target;
        if (document.activeElement === clickedCell) {
            currentDirection = (currentDirection === 'horizontal') ? 'vertical' : 'horizontal';
        } else {
            currentDirection = 'horizontal';
        }
        highlightWord(clickedCell);
    }
    
    function handleInput(e) {
        e.target.value = e.target.value.toUpperCase();
        advanceCursor(e.target);
    }

    function handleKeyDown(e) {
        let { row, col } = e.target.dataset;
        row = parseInt(row);
        col = parseInt(col);
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
            highlightWord(nextElement);
            e.preventDefault();
        }
    }
    
    function advanceCursor(cell) {
        let { row, col } = cell.dataset;
        let nextCell;
        if (currentDirection === 'horizontal') {
            nextCell = document.getElementById(`cell-${row}-${parseInt(col) + 1}`);
        } else {
            nextCell = document.getElementById(`cell-${parseInt(row) + 1}-${col}`);
        }
        if (nextCell && !nextCell.disabled) {
            nextCell.focus();
            highlightWord(nextCell);
        }
    }
    
    function highlightWord(activeCell) {
        document.querySelectorAll('.cell').forEach(c => c.classList.remove('highlight'));
        // (Esta función puede expandirse para colorear toda la palabra)
        activeCell.classList.add('highlight');
    }

    function displayClues() {
        horizontalCluesContainer.innerHTML = '';
        verticalCluesContainer.innerHTML = '';
        crosswordData.pistas.forEach(pista => {
            const clueElement = document.createElement('p');
            clueElement.innerHTML = `<b>${pista.numero}.</b> ${pista.texto}`;
            if (pista.direccion === 'horizontal') {
                horizontalCluesContainer.appendChild(clueElement);
            } else {
                verticalCluesContainer.appendChild(clueElement);
            }
        });
    }
});
