
// RIGHT JSSSSS

// gridElement
const gameIntro = document.getElementById('div-intro');
const gameGrid = document.getElementById('div-grid');

const lives = document.querySelectorAll('.lives');

const startBtn = document.getElementById('btn-startgame');
const nextLvlBtn = document.getElementById('btn-nextLvl');

const liLevelArray = document.querySelectorAll('li.level');

// gridColumns, gridRows
const gridHeight = 10;
const gridWidth = 10;

// cells has all the grid's cells
let cells = [];
// Player first position
let playerPosition = 61;
let exitPosition = 49;
// starting level
let levelCounter = 0;
let levels=[];
let damageCounter=0;

let isDone= false;


//START BUTTON
startBtn.addEventListener('click', (e) =>{
    gameIntro.classList.add('no-display');
    gameGrid.classList.remove('no-display');
    startTheGame();
});

//GAME START
function startTheGame() {
    nextLvlBtn.classList.add('no-display');
    createTheGrid();
    levelUnlocked();
    startBtn.remove();
    resetPlayerAndExit();
    displayPlayer();
    displayExit();
    levels[levelCounter].displayObstacles();
    console.log(levels[levelCounter])
    hideGrid();
}

//CREATE GRID (from given height and width)
function createTheGrid() {
    cells=[];
    gameGrid.innerHTML=`<!-- TRY AGAIN -->
    <div id="div-tryagain" class="no-display">
        <h1>YOU LOST !</h1>
        <p>
            Press <button id="btn-tryagain" class="">TRY AGAIN</button> to restart !
        </p>
    </div>`;

    for(let i=0; i<gridHeight * gridWidth; i++){
        const div = document.createElement('div');
        div.classList.add('cell')
        div.dataset.index = i;
        gameGrid.append(div);
        cells.push(div);
    }
}

function levelUnlocked(){

    if(levelCounter==0){
        for(let i=1; i<liLevelArray.length; i++){
            liLevelArray[i].innerHTML=`🔒 Level ${i}`;
            liLevelArray[i].classList.remove('frame');
        }
    }
    liLevelArray[levelCounter].innerHTML=`🔦 Level ${levelCounter}`;
    liLevelArray[levelCounter].classList.add('frame');
    if(levelCounter>0){
        liLevelArray[levelCounter-1].innerHTML=`✅ Level ${levelCounter-1}`;
        liLevelArray[levelCounter-1].classList.remove('frame');

    }
}

function resetPlayerAndExit(){
    playerPosition = levels[levelCounter].playerPosition;
    exitPosition = levels[levelCounter].exitPosition;
}

//DECIDE PLAYER INITIAL POSITION 
function displayPlayer(){
    const myPosition = cells[playerPosition];
    myPosition.classList.add('player')
}

//DECIDE EXIT POSITION
function displayExit(){
    cells[exitPosition].classList.add('exit')
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
    constructor(obstacles, playerPos, exitPos){
        this.obstacles = obstacles;
        this.playerPosition = playerPos;
        this.exitPosition = exitPos;
        //this.enemies = enemies;
        //this.cells = cells;
    }

    displayObstacles(){
        for(let cellIndex of this.obstacles){
            cells[cellIndex].classList.add('obstacle');
        }
    }

    // resetPlayerPosition(){
    //     playerPosition = this.playerPosition ;
    // }

}

//levels is an array of class Level(map)
function addLevel(level){
    levels.push(level);
}

//Init map of lvl 0
const map0 =    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
                10,                        19,
                20,                        29,
                30,                        39,
                40,
                50,                        59,
                60,                        69,
                70,                        79,
                80,                        89,
                90,91,92,93,94,95,96,97,98,99]

const lvl0 = new Level(map0, 61, 49); 
addLevel(lvl0);

//Init map of lvl 1
const map1 =    [0, 1,    3, 4, 5, 6, 7, 8, 9,
                10,         14,            19,
                20,         24,   26,27, 
                30,         34,   36,37,   39,
                40,         44,            49,
                50,         54,   56,57,58,59,
                60,         64,            69,
                70,   72,73,74,75,76,77,   79,
                80,                        89,
                90,91,92,93,94,95,96,97,98,99]

const lvl1 = new Level(map1, 2, 29);
addLevel(lvl1);

//Init map of lvl 2
const map2 =    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
                10,            15,         19,
                      22,23,               29,
                30,            35,36,      39,
                40,      43,44,            49,
                50,51,               57,58,59,
                60,         64,65,         69,
                70,            75,         79,
                80,   82,      85,         89,
                90,91,92,93,94,95,96,97,   99]

const lvl2 = new Level(map2, 20, 98); 
addLevel(lvl2);

console.log(levels);


//MOVE
document.addEventListener('keydown', (event) => {

    switch (event.key) {
        case 'ArrowUp':
            movePlayer(playerPosition - gridHeight)
            break;

        case 'ArrowDown':
            movePlayer(playerPosition + gridHeight)
            break;
        case 'ArrowLeft':
            if(playerPosition % 10 !== 0) {
                movePlayer(playerPosition -1);
            }
            break;
        case 'ArrowRight':
            if((playerPosition+1) % 10 !== 0) {
                movePlayer(playerPosition +1);
            }
            break;
    }
});

function movePlayer (newPosition) {
    console.log('Level: ',levelCounter)
    if (newPosition < 0 || newPosition > 99) {
        return console.error('Invalid Move!');
    }

    if (cannotMove(newPosition)){ 
        countDamage();
        return;
    }

    removePlayer();
    playerPosition = newPosition;
    displayPlayer();
    refreshHiddenClass();
    
    if(checkWin(newPosition)){
        console.log(newPosition,checkWin(newPosition))
        nextLvlBtn.classList.remove('no-display');

    }
}
nextLvlBtn.addEventListener('click',(e) => {
    nextLevel();
    isDone = false;
});

//IF PLAYER CAN'T GO THERE -> true
function cannotMove(index){
    if(cells[index].classList.contains('obstacle')){
        return true;
    }
}

//REMOVE PLAYER from previous position each time we change its position
function removePlayer(){
    cells[playerPosition].classList.remove('player');
}

function removeExit(){
    console.log(`removing 'exit' class from cell ${exitPosition}`);
    cells[exitPosition].classList.remove('exit');
    
}

//COUNT DAMAGE: - increment counter
//              - if counter > 5 -> gameOver();
function countDamage(){
    if(!isDone){
        damageCounter++;
        if(damageCounter>=0 && damageCounter<5){
            lives[damageCounter].classList.add('no-display');
            lives[damageCounter+5].classList.remove('no-display');
            console.log("lives:",damageCounter)
        } else {
            gameOver();
        }
    }
}

function setLives(){
    if(damageCounter>=0 && damageCounter<5){
        lives[damageCounter].classList.add('no-display');
        lives[damageCounter+5].classList.remove('no-display');
    }
}


//GAME OVER: show message, ask restart or no 
function gameOver(){
    blockPlayer();
    tryAgain();
}

function blockPlayer(){
    cells[playerPosition+1].classList.add('obstacle');
    cells[playerPosition-1].classList.add('obstacle');
    cells[playerPosition-gridWidth].classList.add('obstacle');
    cells[playerPosition+gridHeight].classList.add('obstacle');
}


//if WIN -> true and launch nextLevel();
function checkWin(){
    console.trace(playerPosition, exitPosition)
    if(cells[playerPosition].classList.contains('exit') && cells[exitPosition].classList.contains('player')){
        isDone=true;
        nextLvlBtn.classList.remove('no-display');
        blockPlayer();

        return true;
    } 
}

//NEXT LEVEL
function nextLevel(){
    removeExit();
    levelCounter++;
    console.log("level counter:",levelCounter);
    removePlayer();
    resetPlayerAndExit();
    startTheGame();
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
    damageCounter=0;
    levelCounter=0;
    playerPosition;
    exitPosition;
    startTheGame();
}

