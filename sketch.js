"use strict";
// Global variables
let resolution = 2;
let grid;
let numCols;
let numRows;
let canvasDiv = document.getElementById('sketchDiv');
let gridWidth = Math.floor(canvasDiv.offsetWidth);
let gridHeight = Math.floor(canvasDiv.offsetHeight);
let editingState = 'pattern';
let currentPattern = piporTraitorPattern;


// Boolean to control running of game
let gameRunning = false

// DOM Elements
let runButton = document.getElementById("runButton");
runButton.addEventListener("click", changeState);
let stepButton = document.getElementById("stepButton");
stepButton.addEventListener("click", stepGrid);
let clearButton = document.getElementById("clearButton");
clearButton.addEventListener("click", clearGrid);
let randomButton = document.getElementById("randomButton");
randomButton.addEventListener("click", randomizeGrid);
let drawButton = document.getElementById("drawButton");
drawButton.addEventListener("click", drawingState);
let eraseButton = document.getElementById("eraseButton");
eraseButton.addEventListener("click", erasingState);

// Pattern menu DOM elements
function createPatternMenu() {
    let dropdownMenu = document.getElementById("patternDropdown");
    for (let i = 0; i < patternList.length; i++) {
        let newItem = $('<a id="fly" role="presentation" class="dropdown-item" href="#">Fly</a>"').html(patternList[i]._name).click(function() {
            editingState = 'pattern';
            currentPattern = patternList[i];
        })
        
       $('#patternDropdown').append(newItem);
    }
}

createPatternMenu();

function highlightButton(button) {
    button.setAttribute("border", "color: black;")
}

function create2dArray(cols, rows) {
    let theGrid = new Array(cols);
    for (let i = 0; i < theGrid.length; i++) {
        theGrid[i] = new Array(rows).fill(0);
    }
    return theGrid
}

function create2dArrayWithBinary(cols, rows) {
    let theArray = create2dArray(cols, rows);
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            theArray[i][j] = Math.floor(Math.random() * 2);
        }
    }
    return theArray
}

function setup() {
    numCols = Math.floor(gridWidth / resolution);
    numRows = Math.floor(gridHeight / resolution);
    grid = create2dArray(numCols, numRows);
    let canvasDiv = document.getElementById('sketchDiv');
    gridWidth = canvasDiv.offsetWidth;
    gridHeight = canvasDiv.offsetHeight*1.0;
    var canvas = createCanvas(gridWidth, gridHeight);
    canvas.parent('sketchDiv');
    
    // Select random pattern to display
    //let randomNum = Math.floor(Math.random() * patternList.length);
    //createPatternAt(Math.floor(numRows/2), Math.floor(numCols/2), patternList[randomNum]);
    
    drawGrid()
}

function drawingState() {
    editingState = 'draw';
}

function erasingState() {
    editingState = "erase";
}

function stepGrid() {
    updateGrid();
}

function clearGrid() {
    grid = create2dArray(numCols, numRows);
}

function randomizeGrid() {
    grid = create2dArrayWithBinary(numCols, numRows);
}

function resizeGrid() {
    numCols = Math.floor(gridWidth / resolution);
    numRows = Math.floor(gridHeight / resolution);
    grid = create2dArray(numCols, numRows);
}

function windowResized() {
    gridWidth = canvasDiv.offsetWidth;
    gridHeight = canvasDiv.offsetHeight;
    resizeCanvas(gridWidth, gridHeight);
    resizeGrid();
}

function getRandomColor() {
    let r = Math.floor(Math.random() * 255);
    let g = Math.floor(Math.random() * 255);
    let b = Math.floor(Math.random() * 255);
    return [r, g, b]
}

function changeState() {
    if (gameRunning == true) {
        gameRunning = false;
        runButton.innerHTML = "Run";
    } else {
        gameRunning = true;
        runButton.innerHTML = "Pause"
    }
}

function createStartStopButton() {
    if (gameRunning == true) {
        runButton = createButton('Run')
        runButton.size(gridWidth, 30)
        runButton.position(0, gridHeight+10)
        runButton.mousePressed(changeState)
    } else {
        runButton = createButton('Stop')
        runButton.size(gridWidth, 30)
        runButton.position(0, gridHeight+10)
        runButton.mousePressed(changeState)
    }
}

function draw() {
    background(0);
    if (gameRunning) {
        // Let game play out
        updateGrid()
        drawGrid()
    }
    else {
        drawGrid()
    }

}

function mouseDragged() {
    editGrid();
}

function mouseClicked() {
    editGrid();
}

function editGrid() {
    let x = Math.floor((mouseX/gridWidth) * numCols)
    let y = Math.floor((mouseY/gridHeight) * numRows)
    if (editingState == 'draw') {
        try {
            grid[x][y] = 1
            if ((x > numCols) || (y > numRows)) throw "outside bounds."
        }
        catch(err) {
        //console.log(err)
        }
    }
    else if (editingState == 'erase') {
        try {
            let eraserSize = 5
            for (let i = -eraserSize; i < eraserSize; i++) {
                for (let j = -eraserSize; j < eraserSize; j++) {
                    grid[x+i][y+j] = 0
                }
            }
            if ((x > numCols) || (y > numRows)) throw "outside bounds."
        }
        catch(err) {
        //console.log(err)
        }
    }
    else if (editingState == 'pattern') {
        try {
            createPatternAt(y, x, currentPattern);
        }
        catch(err) {
            //console.log(err);
        }
        
    }
}

function updateGrid() {
    let next = create2dArray(numCols, numRows);
    for (let i = 0; i < numCols; i++) {
        for (let j = 0; j < numRows; j++) {
            let state = grid[i][j]
            let neighbours = countNeighbours(grid, i, j)
            
            if (state == 0 && neighbours == 3) {
                next[i][j] = 1;
            } else if (state == 1 && (neighbours < 2 || neighbours > 3)) {
                next[i][j] = 0;
            } else {
                next[i][j] = state
            }
        }
    }
    grid = next;
}

function drawGrid() {
    noStroke();
    for (let i = 0; i < numCols; i++) {
        for (let j = 0; j < numRows; j++) {
            let x = i * resolution
            let y = j * resolution
            if (grid[i][j] == 1) {
                fill(0, 255, 0);
                rect(x, y, resolution, resolution);
            } 
        }
    }
}

function countNeighbours(grid, x, y) {
    let count = 0
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            let col = (x + i + numCols) % numCols;
            let row = (y + j + numRows) % numRows
            if (grid[col][row] == 1) {
                count += 1
            }
        }
    }
    count -= grid[x][y]
    return count
}
