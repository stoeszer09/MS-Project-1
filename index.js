let ladders = [
    [2, 38],
    [5, 14],
    [9, 31],
    [28, 84],
    [40, 42],
    [36, 44],
    [51, 67],
    [80, 100],
    [71, 90]
]
let slides = [
    [98, 78],
    [95, 75],
    [87, 24],
    [64, 60],
    [56, 53],
    [47, 26],
    [49, 11],
    [16, 6]
]

// create the board
// board needs to snake back and forth
function createBoardArray() {
    let boardArray = []
    for (let i = 10; i > 0; i--) {
        for (let j = 0; j < 10; j++) {
            if (i % 2 === 0) {
                boardArray.push(i * 10 - j)
            }
            else {
                boardArray.push((i - 1) * 10 + j + 1)
            }
        }
    }
    return boardArray
}
function createBoard() {
    createBoardArray().forEach((value) => {
        let checker = document.createElement('div')
        checker.classList.add('box')
        checker.id = value
        if(value %2 === 0) {
            checker.style.backgroundColor = 'cornsilk'
        } else {
            checker.style.backgroundColor = 'seagreen'
        }
        checker.textContent = value
        document.querySelector('.board').append(checker)
    })
}


// roll the die
function rollDice() {
    let number = Math.floor(Math.random() * 6) + 1
    document.querySelector("#diceImage").src = `./assets/dice/dice${number}.png`
    return number
}


// Add player images to screen
function addUserImage(src) {
    let newPlayer = document.createElement('img')
    newPlayer.src = `./assets/${src}/static.gif` // Will need a parameter on function to switch to different characters
    newPlayer.style.position = 'absolute'
    newPlayer.style.width = '35px'
    newPlayer.style.height = '40px'

    document.getElementById('1').append(newPlayer)
    newPlayer.style.zIndex = 1;
    newPlayer.position = 1
    return newPlayer
}

// Computer's Turn
function computerTurn() {
    let roll = rollDice()
    playerMovement(roll, computer)
}

// character movement function for left, right, up, down
function playerMovement(roll, player) {
    let currentPosition = player.position
    let newPosition = currentPosition + roll
    if (newPosition < 101) {
        newPosition = ladderOrChuteCheck(newPosition)
        player.position = newPosition
        document.getElementById(newPosition).append(player)
    }
    if (newPosition === 100) {
        gameWin(player)
    }
    updateScore(player)
}

function updateScore(player) {
    if (player.isHuman) {
        document.querySelector('#userPosition').textContent = player.position
    } else {
        document.querySelector('#computerPosition').textContent = player.position
    }
}


// the roll the dice button function that moves the whole game forward
function rollButtonClick() {
    let roll = rollDice()
    // move character based on the roll
    // player clicks roll - button needs to disappear so it can't be clicked again
    playerMovement(roll, user)

    // computer's turn
    // need to make sure every computer has a turn
    if(!user.win) {
        computerTurn()
    }

    // roll button reappears
}

// When the game is won
function gameWin(player) {
    let header = document.querySelector('h1')
    if (player.isHuman) {
        header.textContent = "Congratulations! You womped that computer!"
        player.win = true
    } else {
        header.textContent = "The odds were not in your favor, sorry."
    }
    newGame(header)
}

// New Game Set up
function newGame(header) {
    document.querySelector('#rollButton').style.display = 'none'

    let newGame = document.createElement('button')
    newGame.textContent = "New Game"
    document.querySelector('#rollArea').append(newGame)

    newGame.addEventListener('click', function() {
        user.position = 1
        computer.position = 1
        updateScore(user)
        updateScore(computer)
        user.win = false
        document.getElementById('1').append(user)
        document.getElementById('1').append(computer)
        header.textContent = 'New Game'

        document.querySelector('#rollButton').style.display = 'inline-block'

        newGame.remove()
    })
}

// Setting up the game
createBoard()
let user = addUserImage('greenCharacter')
user.isHuman = true
let computer = addUserImage('redCharacter')
document.querySelector('#rollButton').addEventListener('click', rollButtonClick)

// check if on bottom of ladder or top of chute
// returns ladder or chute if on either
// returns false if not
function ladderOrChuteCheck(newPosition) {
    ladders.forEach(function(element) {
        if (element[0] === newPosition) {
            newPosition = element[1]
        }
    })
    slides.forEach(function(element) {
        if (element[0] === newPosition) {
            newPosition = element[1]
        }
    })
    return newPosition
}

function slideDown() {

}

function climbLadder() {

}
