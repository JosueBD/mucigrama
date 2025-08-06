document.addEventListener('DOMContentLoaded', () => {

    // --- ELEMENTOS DEL HTML ---
    const botonesPuzle = document.querySelectorAll('.boton-puzle');
    const contenedorSeleccion = document.getElementById('seleccion-puzle');
    const contenedorMucigrama = document.getElementById('contenedor-mucigrama');
    const gridContainer = document.getElementById('grid-container');
    const titleElement = document.getElementById('mucigrama-title');
    const horizontalCluesContainer = document.getElementById('horizontal-clues');
    const verticalCluesContainer = document.getElementById('vertical-clues');
    let crosswordData = {};

    // --- FUNCIÓN PRINCIPAL: CARGAR Y CONSTRUIR EL PUZLE SELECCIONADO ---
    function iniciarMucigrama(nombrePuzle) {
        // Ocultamos el menú de selección y mostramos el contenedor del puzle
        contenedorSeleccion.classList.add('hidden');
        contenedorMucigrama.classList.remove('hidden');

        // Limpiamos la rejilla y pistas anteriores
        gridContainer.innerHTML = '';
        horizontalCluesContainer.innerHTML = '';
        verticalCluesContainer.innerHTML = '';

        fetch(`data/${nombrePuzle}.json`)
            .then(response => response.json())
            .then(data => {
                crosswordData = data;
                document.title = crosswordData.titulo;
                titleElement.textContent = crosswordData.titulo;
                generateGrid();
                displayClues();
                loadProgress();
                addKeyboardNavigation();
            })
            .catch(error => console.error("Error al cargar el mucigrama:", error));
    }

    // --- EVENTO DE LOS BOTONES ---
    // Cada botón, al ser presionado, llama a la función principal con el nombre de su puzle
    botonesPuzle.forEach(boton => {
        boton.addEventListener('click', () => {
            const nombrePuzle = boton.dataset.puzle;
            iniciarMucigrama(nombrePuzle);
        });
    });

    // --- FUNCIONES AUXILIARES (EXISTENTES Y SIN CAMBIOS) ---
    function generateGrid() {
        const solution = crosswordData.solucion;
        gridContainer.style.gridTemplateColumns = `repeat(${solution[0].length}, 30px)`;
        solution.forEach((row, rowIndex) => {
            row.forEach((cell, colIndex) => {
                const cellElement = document.createElement('input');
                cellElement.type = 'text';
                cellElement.maxLength = 1;
                cellElement.id = `cell-${rowIndex}-${colIndex}`;
                cellElement.classList.add('cell');
                if (cell === '0') {
                    cellElement.classList.add('black');
                    cellElement.disabled = true;
                } else {
                    cellElement.addEventListener('input', (e) => {
                        e.target.value = e.target.value.toUpperCase();
                        saveProgress();
                    });
                }
                gridContainer.appendChild(cellElement);
            });
        });
    }
    function displayClues() {
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
    function saveProgress() {
        const progress = {};
        const cells = document.querySelectorAll('.cell:not(.black)');
        cells.forEach(cell => {
            if (cell.value) { progress[cell.id] = cell.value; }
        });
        localStorage.setItem(crosswordData.titulo, JSON.stringify(progress));
    }
    function loadProgress() {
        const savedProgress = localStorage.getItem(crosswordData.titulo);
        if (savedProgress) {
            const progress = JSON.parse(savedProgress);
            for (const cellId in progress) {
                const cell = document.getElementById(cellId);
                if (cell) { cell.value = progress[cellId]; }
            }
        }
    }
    function addKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            const activeElement = document.activeElement;
            if (!activeElement.classList.contains('cell')) return;
            const [_, rowStr, colStr] = activeElement.id.split('-');
            let row = parseInt(rowStr);
            let col = parseInt(colStr);
            let nextCell;
            switch (e.key) {
                case 'ArrowUp': nextCell = findNextAvailableCell(row, col, -1, 0); break;
                case 'ArrowDown': nextCell = findNextAvailableCell(row, col, 1, 0); break;
                case 'ArrowLeft': nextCell = findNextAvailableCell(row, col, 0, -1); break;
                case 'ArrowRight': nextCell = findNextAvailableCell(row, col, 0, 1); break;
                default: return;
            }
            if (nextCell) {
                e.preventDefault();
                nextCell.focus();
            }
        });
    }
    function findNextAvailableCell(startRow, startCol, dRow, dCol) {
        let currentRow = startRow + dRow;
        let currentCol = startCol + dCol;
        const maxRows = crosswordData.solucion.length;
        const maxCols = crosswordData.solucion[0].length;
        while (currentRow >= 0 && currentRow < maxRows && currentCol >= 0 && currentCol < maxCols) {
            const cellId = `cell-${currentRow}-${currentCol}`;
            const cell = document.getElementById(cellId);
            if (cell && !cell.disabled) {
                return cell;
            }
            currentRow += dRow;
            currentCol += dCol;
        }
        return null;
    }
});
