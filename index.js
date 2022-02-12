// create the board
function createBoard() {
    for (let i = 100; i > 0; i--) {
        let checker = document.createElement('div')
        checker.classList.add('box')
        checker.textContent = i
        document.querySelector('.board').append(checker)
    }
}
createBoard()

// Land exactly on 100 to win. No overshooting.
function checkWin() {
    
}

// roll the die
function rollDice() {
    let number = Math.floor(Math.random() * 6) + 1
    document.querySelector("#diceImage").src = `./assets/dice${number}.png`
}

// character movement function for left, right, up, down
function playerMovement() {

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

// gameplay: 
// player clicks roll - button needs to disappear so it can't be clicked again
// event handler for the roll async/await
// after character figure done moving
// computer automatically goes next
// roll button reappears