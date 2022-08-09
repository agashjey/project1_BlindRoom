
//BROUUILLON

let playerPosition = 12;


class GameBoard {
    constructor(width, height) {
        this.width = width
        this.height = height
        this.gameGrid = document.getElementById('game-grid');
        this.cells = this._createCells()
    }
    _createCells() { 
        const cells = [];
        const cellCount = this.width * this.height;
        
        for (let i = 0 ; i < cellCount ; i++) {
            //create a new cell
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.index = i;
            // put it in the DOM inside the grid element
            this.element.append(cell);
            cells.push(cell);
        }

        //return array of created cells
        return cells;
    }
}

const board = new GameBoard(10,10);

const player = {
    className: 'player',
    cell: playerPosition,
    show() {
        // iteration 3
        this.cells[playerPosition].classList.add('player')
       //this.cell.classList.add(this.className)
    },
  hide() {
    // iteration 3
    this.cells[playerPosition].classList.remove('player')
    //this.cell.classList.remove(this.className)
  },
  move(direction) {
    // iteration 3
    if (!this.canMove(direction)) {
      return
    }
    const cell = document.querySelectorAll('.cell');
    const currentIndex = parseInt(cell.dataset.index)
    let newIndex
    this.hide()
    
    switch (direction) {
      case 'up':
        newIndex = currentIndex - board.width
        console.log('up')
        break
      case 'down':
        newIndex = currentIndex + board.width
        console.log('down')
        break
      case 'right':
        newIndex = currentIndex + 1
        console.log('right')
        break
      case 'left':
        newIndex = currentIndex - 1
        console.log('left')
        break
    }
    this.cell = board.cells[newIndex]
    this.show()

    // after moving, check for collisions
    this._detectCollisions()
  },

  canMove(direction) {
    // hint for iteration 3: make move behaviour conditional
    const currentIndex = parseInt(cell.dataset.index)
    const column = currentIndex % board.width

    switch (direction) {
      case 'up':
        return currentIndex >= board.width
      case 'down':
        const boardSize = board.width * board.height
        return currentIndex <= boardSize - board.width
      case 'right':
        return column < board.width - 1
      case 'left':
        return column > 0
    }
  },

  _detectCollisions() {
    const foundPlug = collectibles.find(
      (collectible) => collectible.cell === this.cell
    )
    if (foundCollectible) {
      foundCollectible.collect()
    }
    // we call it at the end of this.move()
  },
}

window.addEventListener("keydown", function (event) {
    if (event.defaultPrevented) {
      return; // Ne devrait rien faire si l'événement de la touche était déjà consommé.
    }

    switch (event.code) {
      case "ArrowDown":
       console.log('arrow down')
        player.move('down');
        break;
      case "ArrowUp":
        // Faire quelque chose pour la touche "up arrow" pressée.
        player.move('up');
        break;
      case "ArrowLeft":
        // Faire quelque chose pour la touche "left arrow" pressée.
        player.move('left');
        break;
      case "ArrowRight":
        // Faire quelque chose pour la touche "right arrow" pressée.
        player.move('right');
        break;
      default:
        return; // Quitter lorsque cela ne gère pas l'événement touche.
      }})

// FUNCTIONS
function displayPlayer() {
    board.cells[playerPosition].classList.add('player')
}
  
function hidePlayer() {
    board.cells[playerPosition].classList.remove('player')
}

function movePlayer(position) {
    hidePlayer()
    playerPosition = position
    displayPlayer()
}

movePlayer(playerPosition)
