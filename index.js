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
            checker.style.backgroundColor = 'gray'
        } else {
            checker.style.backgroundColor = 'blue'
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
// check if on bottom of ladder or top of chute
// returns ladder or chute if on either
// returns false if not
function ladderOrChuteCheck() {

}

function slideDown() {

}

function climbLadder() {

}

// 
function gameWin(player) {
    let header = document.querySelector('h1')
    if (player.isHuman) {
        header.textContent = "Congratulation! You womped that computer!"
        player.win = true
    } else {
        header.textContent = "The odds were not in your favor, sorry."
    }
    let button = document.querySelector('#rollButton')
    button.textContent = "New Game"
    button.addEventListener('click', function() {
        user.position = 1
        computer.position = 1
        document.getElementById('1').append(user)
        document.getElementById('1').append(computer)
        header.textContent = 'New Game'
    })

}
// Setting up the game


createBoard()
let user = addUserImage('greenCharacter')
user.isHuman = true
let computer = addUserImage('redCharacter')


document.querySelector('#rollButton').addEventListener('click', async function () {
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
})
