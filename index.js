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
        let imageHolder = document.createElement('div')
        imageHolder.classList.add('imageHolder')

        if(value %2 === 0) {
            checker.style.backgroundColor = '#DAAD86'
            imageHolder.style.backgroundColor = '#DAAD86'
        } else {
            checker.style.backgroundColor = '#8D8741'
            imageHolder.style.backgroundColor = '#8D8741'
        }
        checker.textContent = value
        document.querySelector('.board').append(checker)
        checker.append(imageHolder)
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
    newPlayer.style.position = 'relative'
    newPlayer.style.width = '35px'
    newPlayer.style.height = '40px'
    newPlayer.style.opacity = '0.8'

    let checker = document.getElementById('1')
    let imageHolder = checker.querySelector('.imageHolder')
    imageHolder.append(newPlayer)
    newPlayer.style.zIndex = 1;
    newPlayer.position = 1
    return newPlayer
}

// Computer's Turn
async function computerTurn() {
    let roll = rollDice()
    await playerMovement(roll, computer)
}

// character movement function for left, right, up, down
async function playerMovement(roll, player) {
    document.querySelector('#rollButton').style.display = 'none'
    let currentPosition = player.position
    let newPosition = currentPosition
    if (newPosition + roll < 101) {
        for (let i = 0; i < roll; i++) {
            newPosition++
            player.position = newPosition
            document.getElementById(newPosition).append(player)

            await sleep(500)
        }
        newPosition = ladderOrSlideCheck(newPosition)
        if(newPosition !== player.position){
            player.position = newPosition
            document.getElementById(newPosition).append(player)
            await sleep(500)
        }
    }
    updateScore(player)
    if (newPosition === 100) {
        gameWin(player)
    }
}

function updateScore(player) {
    if (player.isHuman) {
        document.querySelector('#userPosition').textContent = player.position
    } else {
        document.querySelector('#computerPosition').textContent = player.position
    }
}


// the roll the dice button function that moves the whole game forward
async function rollButtonClick() {
    let roll = rollDice()
    await playerMovement(roll, user)

    // computer's turn
    if(!user.win) {
        currentPlayerName(computer)
        await computerTurn()
        if (!computer.win){
            document.querySelector('#rollButton').style.display = 'inline-block'
            currentPlayerName(user)
        }
    }
}

// When the game is won
function gameWin(player) {
    document.querySelector('#rollButton').style.display = 'none'
    let header = document.querySelector('h1')
    player.win = true
    if (player.isHuman) {
        header.textContent = "Congratulations! You destroyed SkyNet!"
    } else {
        header.textContent = "The odds were not in your favor, sorry."
    }
    newGame(header, player)
}

// New Game Set up
function newGame(header, player) {
    let newGame = document.createElement('button')
    newGame.textContent = "New Game"
    newGame.classList = "button"
    document.querySelector('#rollArea').append(newGame)

    newGame.addEventListener('click', function() {
        player.win = false
        user.position = 1
        computer.position = 1
        updateScore(user)
        updateScore(computer)
        user.win = false
        document.getElementById('1').append(user)
        document.getElementById('1').append(computer)
        header.textContent = 'It is your turn'

        document.querySelector('#rollButton').style.display = 'inline-block'

        newGame.remove()
    })
}

// check if on bottom of ladder or top of slide
// returns the new position on top of ladder or bottom of slide
function ladderOrSlideCheck(newPosition) {
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

function sleep(time) {
    return new Promise(resolve => setTimeout(resolve, time))
}

function currentPlayerName(player) {
    let header = document.querySelector('#currentPlayer')
    if (player.isHuman) {
        header.textContent = "It is your turn"
    } else {
        header.textContent = "It is the computer's turn"
    }
}

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
    [48, 26],
    [49, 11],
    [16, 6]
]

createBoard()
let user = addUserImage('greenCharacter')
user.isHuman = true
let computer = addUserImage('redCharacter')
document.querySelector('#rollButton').addEventListener('click', rollButtonClick)