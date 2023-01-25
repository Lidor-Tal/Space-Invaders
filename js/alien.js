'use strict'

const ALIEN_SPEED = 500;
var gIntervalAliens;
// The following two variables represent the part of the matrix (some rows)
// that we should shift (left, right, and bottom)
// We need to update those when:
// (1) shifting down and (2) last alien was cleared from row
var gAliensTopRowIdx;
var gAliensBottomRowIdx;
var gIsAlienFreeze = true;



function createAliens(board) {
    for (var i = 0; i < board.length; i++) {

        for (var j = 0; j < board[0].length; j++) {

            if (i === 2 && j > 1 && j < 12) {

                board[i][j].gameObject = ALIEN
                gGame.aliensCount++
            }
        }
    }
    return
}

function handleAlienHit(pos) {
    gBoard[pos.i][pos.j] = SKY
    renderCell(pos, SKY)
    clearInterval(gShootInterval)
    gGame.aliensCount--
    updateScore(10)
    checkWin()
}

function shiftBoardRight(board, fromI, toI) {

    var locations = findAliensLocation(board, fromI)
    removeInvader(locations, fromI)
    addInvader(locations, 1)
    setTimeout(() => {

        shiftBoardRight
    }, 100);


}

function shiftBoardLeft(board, fromI, toI) { }
function shiftBoardDown(board, fromI, toI) { }
// runs the interval for moving aliens side to side and down
// it re-renders the board every time
// when the aliens are reaching the hero row - interval stops
function moveAliens() {
    if (!gIsAlienFreeze) return
    setInterval(shiftBoardRight(gBoard, 2), 1000)

}

function findAliensLocation(board, row) {
    var newArr = []
    for (var i = 1; i < board.length; i++) {
        var currCell = gBoard[row][i]
        if (currCell.gameObject === ALIEN)
            newArr.push({ i: row, j: i })
    }
    return newArr
}


function removeInvader(locations) {
    for (var i = 1; i < locations.length + 1; i++) {
        var lastCell = locations[locations.length - i]
        console.log(lastCell)
        updateCell(lastCell, null)
    }
}

function addInvader(locations, num) {
    for (var i = 1; i < locations.length + 1; i++) {
        var lastCell = locations[locations.length - i]
        lastCell.j += num
        console.log(lastCell)
        updateCell(lastCell, ALIEN)
    }
}

