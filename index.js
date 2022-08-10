
// RIGHT JSSSSS

// gridElement
const gameIntro = document.getElementById('div-intro');
const gameGrid = document.getElementById('div-grid');
const startBtn = document.getElementById('btn-startgame');
const nextLvl = document.getElementById('btn-nextLvl');

const liLevelArray = document.querySelectorAll('li.level');


// gridColumns, gridRows
const gridHeight = 10;
const gridWidth = 10;

// cells has all the grid's cells
let cells = [];
// Player first position
let currentPosition = 12;
let currentExit = 29;
// starting level
let levelCounter = 0;
let levels=[];
let damageCounter=0;


//START BUTTON
startBtn.addEventListener('click', (e) =>{
    gameIntro.classList.add('no-display');
    gameGrid.classList.remove('no-display');
    startTheGame();
});

//TRY AGAIN BUTTON
// tryAgainBtn.addEventListener('click', (e) => {
//     displayTryAgain.classList.add('no-display');
//     restartGame();
// });

//GAME START
function startTheGame() {
    createTheGrid();
    levelUnlocked();
    startBtn.remove();
    displayPlayer();
    displayKey(currentExit);
    levels[levelCounter].displayObstacles();
    hideGrid();
}

//CREATE GRID (from given height and width)
function createTheGrid() {
    for(let i=0; i<gridHeight * gridWidth; i++){
        const div = document.createElement('div');
        div.classList.add('cell')
        div.dataset.index = i;
        gameGrid.append(div);
        cells.push(div);
    }
}

function levelUnlocked(){
    liLevelArray[levelCounter].innerHTML=`🔦 Level ${levelCounter}`;
    liLevelArray[levelCounter].classList.add('frame');
    if(levelCounter>0){
        liLevelArray[levelCounter-1].innerHTML=`✅ Level ${levelCounter-1}`;
        liLevelArray[levelCounter-1].classList.remove('frame');

    }
}

//DECIDE PLAYER INITIAL POSITION 
function displayPlayer(){
    const myPosition = cells[currentPosition];
    myPosition.classList.add('player')
}

//DECIDE EXIT POSITION
function displayKey(position){
    cells[position].classList.add('exit')
}

//HIDE MAP
function hideGrid(){
    setTimeout(refreshHiddenClass, 5000);
}

function refreshHiddenClass(){
    for (let i=0; i<cells.length ; i++){
        if(cells[i].classList.contains('exit')){
            continue;
        
        } else if(cells[i].classList.contains('player')){
            cells[i].classList.remove('hidden');

        } else if(!cells[i].classList.contains('hidden')){
            cells[i].classList.add('hidden');
        }
            
    }
}



//LEVELS
class Level {
    constructor(obstacles, playerPosition, exitPosition){
        this.obstacles = obstacles;
        this.position = playerPosition;
        this.exitPosition = exitPosition;
       // this.enemies = enemies;
       // this.playerPosition = playerPosition
       
       this.cells = cells;
    }

    displayObstacles(){
        for(let cellIndex of this.obstacles){
            cells[cellIndex].classList.add('obstacle');
        }
    }

    resetPlayerPosition(){
        currentPosition = this.position ;
    }

}

//levels is an array of class Level(map)
function addLevel(level){
    levels.push(level);
}

//Init map of lvl 0
const map0 =    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
                10,         14,            19,
                20,         24,   26,27, 
                30,         34,   36,37,   39,
                40,         44,            49,
                50,         54,   56,57,58,59,
                60,         64,            69,
                70,   72,73,74,75,76,77,   79,
                80,                        89,
                90,91,92,93,94,95,96,97,98,99]

const lvl0 = new Level(map0, 12, 29);
addLevel(lvl0);

//Init map of lvl 1
const map1 =    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
                10,            15,         19,
                    22,23,               29,
                30,            35,36,      39,
                40,      43,44,            49,
                50,51,               57,58,59,
                60,         64,65,         69,
                70,            75,         79,
                80,   82,      85,         89,
                90,91,92,93,94,95,96,97,   99]

const lvl1 = new Level(map1, 20, 98); 
addLevel(lvl1);




//MOVE
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
        countDamage();
        return;
    }

    removePlayer();
    currentPosition = newPosition;
    displayPlayer();
    refreshHiddenClass();
    
    if(checkWin(newPosition)){
        nextLevel();
    }
    console.log(cells[currentPosition]);
}

//IF PLAYER CAN'T GO THERE -> true
function cannotMove(index){
    if(cells[index].classList.contains('obstacle')){
        return true;
    }
}

//REMOVE PLAYER from previous position each time we change its position
function removePlayer(){
    cells[currentPosition].classList.remove('player');
}

//COUNT DAMAGE: - increment counter
//              - if counter > 5 -> gameOver();
function countDamage(){
    damageCounter++;
    console.log(damageCounter);
    if(damageCounter>4){
        gameOver();
    }
}


//GAME OVER: show message, ask restart or no 
function gameOver(){
    cells[currentPosition+1].classList.add('obstacle');
    cells[currentPosition-1].classList.add('obstacle');
    cells[currentPosition-gridWidth].classList.add('obstacle');
    cells[currentPosition+gridHeight].classList.add('obstacle');
    tryAgain();
}


//if WIN -> true and launch nextLevel();
function checkWin(index){
    if(cells[index].classList.contains('exit') && cells[index].classList.contains('player')){
        nextLvl.classList.remove('no-display');
        return true;
    } 
}

//NEXT LEVEL
function nextLevel(){
    levelCounter++;
    console.log(levelCounter);
   // nextLvl.addEventListener('click', (e));
}

function tryAgain(){
    const tryAgainBtn = document.getElementById('btn-tryagain');
    const displayTryAgain = document.getElementById('div-tryagain');
    displayTryAgain.classList.remove('no-display');
    //TRY AGAIN BUTTON
    tryAgainBtn.addEventListener('click', (e) => {
    displayTryAgain.classList.add('no-display');
    restartGame();
});
}

//RESTART GAME
function restartGame(){
    cells = [];
    gameGrid.innerHTML=`<!-- TRY AGAIN -->
    <div id="div-tryagain" class="no-display">
      <h1>YOU LOST !</h1>
      <p>
        Press <button id="btn-tryagain" class="">TRY AGAIN</button> to restart !
      </p>
    </div>`;
    damageCounter=0;
    levelCounter=0;
    currentPosition= 12;
    currentExit=29;
    startTheGame();
}

