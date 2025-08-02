document.addEventListener('DOMContentLoaded', () => {

    // 1. DIBUJO DEL CRUCIGRAMA
    // '#' es una casilla negra. '.' es una casilla para una letra.
    const gridLayout = [
        "....10.",
        "....S..",
        ".2RITMO.",
        "9SILENCIO",
        "....A..",
        "....6TIMBRE",
        "....S..",
        "....#..",
        "8ACORDE7ESCALA",
        "....#..",
        "1MELODIA.",
        "....#..",
        "3ARMONIA.",
        "5COMPAS..",
    ];

    // 2. PALABRAS Y PISTAS
    const wordsData = [
        // Horizontales
        { num: 2, clue: "Orden y proporción en el movimiento o sucesión de los sonidos.", answer: "RITMO" },
        { num: 8, clue: "Conjunto de tres o más notas que suenan simultáneamente.", answer: "ACORDE" },
        { num: 3, clue: "Combinación de sonidos simultáneos que resultan agradables.", answer: "ARMONIA" },
        { num: 5, clue: "División de la música en partes iguales de tiempo.", answer: "COMPAS" },
        // Verticales
        { num: 10, clue: "Signos que representan los sonidos musicales.", answer: "NOTAS" },
        { num: 9, clue: "Ausencia de sonido en la música.", answer: "SILENCIO" },
        { num: 6, clue: "Cualidad del sonido que permite distinguir la fuente sonora.", answer: "TIMBRE" },
        { num: 7, clue: "Sucesión de sonidos ascendentes o descendentes.", answer: "ESCALA" },
        { num: 1, clue: "Sucesión de sonidos que forman una unidad musical.", answer: "MELODIA" },
    ];

    const gridEl = document.getElementById('crossword-grid');
    const acrossCluesEl = document.getElementById('across-clues');
    const downCluesEl = document.getElementById('down-clues');

    const grid = [];

    // 3. GENERACIÓN DEL GRID Y PISTAS
    const rows = gridLayout.length;
    const cols = gridLayout[0].length;
    gridEl.style.gridTemplateColumns = `repeat(${cols}, minmax(0, 1fr))`;
    gridEl.style.width = `min(90vw, ${cols * 40}px)`; // Responsive width

    for (let r = 0; r < rows; r++) {
        grid[r] = [];
        for (let c = 0; c < cols; c++) {
            const cellData = { row: r, col: c, el: null, input: null };
            grid[r][c] = cellData;

            const cell = document.createElement('div');
            cell.classList.add('grid-cell');

            const char = gridLayout[r][c];
            if (char === '#') {
                cell.classList.add('black');
            } else {
                const input = document.createElement('input');
                input.type = 'text';
                input.maxLength = 1;
                cellData.input = input;
                cell.appendChild(input);

                // Número de pista
                const match = gridLayout[r].substring(c).match(/^\d+/);
                if (match) {
                    const number = parseInt(match[0]);
                    const numberEl = document.createElement('div');
                    numberEl.classList.add('clue-number');
                    numberEl.textContent = number;
                    cell.appendChild(numberEl);
                }
            }
            gridEl.appendChild(cell);
            cellData.el = cell;
        }
    }

    // 4. PINTAR LISTA DE PISTAS
    wordsData.forEach(word => {
        if ([2, 8, 3, 5].includes(word.num)) {
            // Horizontales
            const li = document.createElement('li');
            li.textContent = `${word.num}. ${word.clue}`;
            acrossCluesEl.appendChild(li);
        } else {
            // Verticales
            const li = document.createElement('li');
            li.textContent = `${word.num}. ${word.clue}`;
            downCluesEl.appendChild(li);
        }
    });

    // 5. EVENTOS DE LOS BOTONES
    document.getElementById('check-button').addEventListener('click', checkAnswers);
    document.getElementById('solve-button').addEventListener('click', showSolution);
    document.getElementById('clear-button').addEventListener('click', clearGrid);

    // 6. FUNCIONES
    function checkAnswers() {
        grid.flat().forEach(cell => {
            if (!cell.input) return;
            const r = cell.row;
            const c = cell.col;
            const expectedChar = gridLayout[r][c].match(/[a-zA-Z]/) ? gridLayout[r][c].toUpperCase() : null;

            cell.el.classList.remove('correct', 'incorrect');

            if (cell.input.value && expectedChar) {
                if (cell.input.value.toUpperCase() === expectedChar) {
                    cell.el.classList.add('correct');
                } else {
                    cell.el.classList.add('incorrect');
                }
            }
        });
    }

    function showSolution() {
        grid.flat().forEach(cell => {
            if (!cell.input) return;
            const r = cell.row;
            const c = cell.col;
            const expectedChar = gridLayout[r][c].match(/[a-zA-Z]/) ? gridLayout[r][c].toUpperCase() : null;
            if (expectedChar) {
                cell.input.value = expectedChar;
                cell.el.classList.remove('incorrect');
                cell.el.classList.add('correct');
            }
        });
    }

    function clearGrid() {
        grid.flat().forEach(cell => {
            if (cell.input) {
                cell.input.value = '';
                cell.el.classList.remove('correct', 'incorrect');
            }
        });
    }
});  
