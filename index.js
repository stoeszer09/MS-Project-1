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
function addPlayerImage() {
    let newPlayer = document.createElement('img')
    newPlayer.src = './assets/greenCharacter/static.gif' // Will need a parameter on function to switch to different characters
    newPlayer.style.position = 'absolute'
    newPlayer.style.width = '35px'
    newPlayer.style.height = '40px'

    document.getElementById('1').append(newPlayer)
    newPlayer.style.zIndex = 1;

    return newPlayer
}

// Computer's Turn
function computerTurn() {
    let roll = rollDice()
}

// character movement function for left, right, up, down
function playerMovement() {
    let direction = null

    function movePlayer() {

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

// Land exactly on 100 to win. No overshooting.
function checkWin() {
    
}

// Setting up the game
async function gameSetup() {
    await createBoard()
    addPlayerImage() // will need to create as many players as were chosen. Starting with 2 to begin with as default.
}

gameSetup()

document.querySelector('#rollButton').addEventListener('click', async function () {
    let movement = rollDice()
    // move character based on the roll
    // player clicks roll - button needs to disappear so it can't be clicked again

    
    // computer's turn
    // need to make sure every computer has a turn
    computerTurn()

    // roll button reappears
})
