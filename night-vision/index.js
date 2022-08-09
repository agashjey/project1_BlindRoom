
// RIGHT JSSSSS

// gridElement
const gameGrid = document.querySelector('#game-grid')
const startButton = document.getElementById('start-game')

// gridColumns, gridRows
const gridHeight = 10;
const gridWidth = 10;

// cells has all the grid's cells
const cells = [];
// Player first position
let currentPosition = 12;
// starting level
let level = 0;


startButton.addEventListener('click', startTheGame())

function startTheGame() {
    createTheGrid();
}

function createTheGrid() {
    for(let i=0; i<gridHeight * gridWidth; i++){
        const div = document.createElement('div');
        div.classList.add('cell')
        div.dataset.index = i;
        gameGrid.append(div);
        cells.push(div);
    }
    displayPlayer();
    displayKey(29);
}

function displayPlayer(){
    const myPosition = cells[currentPosition];
    console.log(myPosition);
    myPosition.classList.add('player')
}

document.addEventListener('keydown', (event) => {
    console.log('I pressed:', event.key);

    switch (event.key) {
        case 'ArrowUp':
            movePlayer(currentPosition - gridHeight)
            break;

        case 'ArrowDown':
            movePlayer(currentPosition + gridHeight)
            break;
        case 'ArrowLeft':
            if(currentPosition % 10 !== 0) {
                movePlayer(currentPosition -1);
            }
            break;
        case 'ArrowRight':
            if((currentPosition+1) % 10 !== 0) {
                movePlayer(currentPosition +1);
            }
            break;
    }
});


function movePlayer (newPosition) {
    if (newPosition < 0 || newPosition > 99) {
        return console.error('Invalid Move!');
    }

    removePlayer();
    currentPosition = newPosition;
    displayPlayer();

    console.log(cells[currentPosition]);
}

function removePlayer(){
    cells[currentPosition].classList.remove('player');
}

function displayKey(position){
    cells[position].classList.add('key');
}

