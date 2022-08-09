
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


startButton.addEventListener('click', startTheGame)

function startTheGame() {
    createTheGrid();
    startButton.remove();
}

//create a grid from given height and width
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
    level0.displayObstacles();
    hideGrid();
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

    if (cannotMove(newPosition)){ 
        return;
    }

    removePlayer();
    currentPosition = newPosition;
    displayPlayer();
    refreshHiddenClass();

    console.log(cells[currentPosition]);
}

function removePlayer(){
    cells[currentPosition].classList.remove('player');
}

function displayKey(position){
    cells[position].classList.add('key')
}


function hideGrid(){
    setInterval((e) => {
        refreshHiddenClass();
    }, 5000);

    const hidden = document.querySelectorAll('.hidden');
}

function refreshHiddenClass(){
    for (let i=0; i<cells.length ; i++){
        if(cells[i].classList.contains('key')){
            continue;
        
        } else if(cells[i].classList.contains('player')){
            cells[i].classList.remove('hidden');

        } else if(!cells[i].classList.contains('hidden')){
            cells[i].classList.add('hidden');
        }
            
    }
}

class Level {
    constructor(obstacles, enemies, exitPosition, playerPosition){
        this.obstacles = obstacles;
       // this.enemies = enemies;
       // this.playerPosition = playerPosition;
    }

    displayObstacles(){
        for(let cellIndex of this.obstacles){
            cells[cellIndex].classList.add('obstacle');
        }
    }
}

const borders = [0, 1,  2,  3, 4,  5, 6,  7, 8, 9,
                10,                            19,
                20,
                30,                            39,
                40,                            49,
                50,                            59,
                60,                            69,
                70,                            79,
                80,                            89,
                90,91,92,93,94,95,96,97,98,99,100]

const level0 = new Level(borders);


function cannotMove(index){
    if(cells[index].classList.contains('obstacle')){
        return true;
    }
}