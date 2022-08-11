
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
let damageCounter=4;

let isDone= false;

// let idTimerShow;
// let timer;
let idTimerHide;


//START BUTTON
startBtn.addEventListener('click', (e) =>{
    gameIntro.classList.add('no-display');
    gameGrid.classList.remove('no-display');
    //document.querySelector('audio').play();
    startTheGame();
});

//GAME START
function startTheGame() {
    clearInterval(idTimerHide);
    //setTimer();
    nextLvlBtn.classList.add('no-display');
    createTheGrid();
    levelUnlocked();
    startBtn.remove();
    resetPlayerAndExit();
    setClassLife();
    displayPlayer();
    displayExit();
    levels[levelCounter].displayObstacles();
    hideGrid();
}

//CREATE GRID (from given height and width)
function createTheGrid() {
    cells=[];
    gameGrid.innerHTML=`<!-- TRY AGAIN -->
    <div id="div-tryagain" class="no-display">
        <h1>YOU LOST !</h1>
        <p>
            Press <button id="btn-tryagain" class="">TRY AGAIN</button> to restart
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

//Change the icons on levels box
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
    idTimerHide = setTimeout(refreshHiddenClass, 5000);
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

//Init map of lvl 3
const map3 =    [0,    2, 3, 4, 5, 6, 7, 8, 9,
                10,                        19,
                20,21,22,23,24,25,26,27,   29,
                30,                        39,
                40,41,42,   44,45,46,47,48,49,
                50,                     58,59,
                60,61,62,63,64,65,   67,68,69,
                70,71,                  78,79,
                80,      83,      86,      89,
                90,91,   93,94,95,96,97,98,99]

const lvl3 = new Level(map3, 1, 92); 
addLevel(lvl3);

//Init map of lvl 4
const map4 =    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
                10,      13,               19,
                20,21,          25,        29,
                30,31,   33,34,35,36,37,   39,
                40,         44,            49,
                50,51,52,53,54,      57,58,59,
                60,         64,            69,
                70,   72,   74,75,76,      79,
                80,   82,                  89,
                      92,93,94,95,96,97,98,99]
const lvl4 = new Level(map4, 90, 41); 
addLevel(lvl4);

//Init map of lvl 5
const map5 =    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
                10,                        19,
                20,   22,23,24,25,26,27,   29,
                30,   32,            37,   39,
                40,   42,   44,45,   47,   49,
                50,51,52,   54,      57,   59,
                60,61,62,   64,      67,   69,
                70,   72,   74,75,76,77,   79,
                80,                        89,
                90,91,92,93,94,95,96,97,98,99]
const lvl5 = new Level(map5, 41, 65); 
addLevel(lvl5);


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
        if(damageCounter>0 && damageCounter<=4){
            lives[damageCounter--].classList.replace('life', 'no-life');
        } else {
            lives[damageCounter].classList.replace('life', 'no-life')
            gameOver();
        }
    }
}


function setClassLife(){
    lives.forEach(life => life.classList.add('life'));
}


//GAME OVER: show message, ask restart or no 
function gameOver(){
    blockPlayer();
    tryAgain();
}

function blockPlayer(){
    cells[playerPosition+1].classList.add('obstacle');
    cells[playerPosition-1].classList.add('obstacle');
    if(playerPosition>9){
        cells[playerPosition-gridWidth].classList.add('obstacle');
    }
    if(playerPosition<90){
        cells[playerPosition+gridHeight].classList.add('obstacle');
    }
}


//if WIN -> true and launch nextLevel();
function checkWin(){
    if(cells[playerPosition].classList.contains('exit') && cells[exitPosition].classList.contains('player')){
        isDone=true;
        console.log("level:",levelCounter," | levels length:", levels.length);
        nextLvlBtn.classList.remove('no-display');
        blockPlayer();
        
        if(levelCounter+1===levels.length){
            tryAgain();
        }
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
    if(isDone){
        displayTryAgain.querySelector('h1').textContent =`YOU WIN !`;
        tryAgainBtn.textContent ='PLAY AGAIN';
        tryAgainBtn.className='winner';
    } //else {
    //     displayTryAgain.querySelector('h1').textContent =`YOU LOST !`;
    //     tryAgainBtn.textContent ='TRY AGAIN';
    //     tryAgainBtn.className='loser';
    // }
    displayTryAgain.classList.remove('no-display');

    //TRY AGAIN BUTTON
    tryAgainBtn.addEventListener('click', (e) => {
        displayTryAgain.classList.add('no-display');
        isDone=false;
        restartGame();
    });
}

//RESTART GAME
function restartGame(){
    cells = [];
    damageCounter=4;
    lives.forEach(life => life.classList.replace('no-life', 'life'));
    levelCounter=0;
    playerPosition;
    exitPosition;
    isDone=false;
    startTheGame();
}

// function setTimer(){
//     timer=4;
//     document.getElementById('timer span').classList.remove('no-display');
//     idTimerShow= setInterval(() => {

//         document.getElementById('secUni').textContent = `${timer}`;
//         if(timer<=0){
//             clearInterval(idTimerShow);
//             document.getElementById('secUni').textContent = `${timer}`
//         }
//         timer--;
//     }, 1000);

//     timer=4;
// }


