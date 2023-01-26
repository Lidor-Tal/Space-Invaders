'use strict'

const ALIEN_SPEED = 500;
var gIntervalAliens;
// The following two variables represent the part of the matrix (some rows)
// that we should shift (left, right, and bottom)
// We need to update those when:
// (1) shifting down and (2) last alien was cleared from row
var gAliensTopRowIdx = 2
var gAliensBottomRowIdx = ALIENS_ROW_COUNT - 1
var gIsAlienFreeze = true;

var gLeftInterval
var gRightInterval

var gGoDown = false
var gGoRight = true


function createAliens(board) {
    for (var i = 1; i < board.length; i++) {
        for (var j = 3; j < board[0].length; j++) {
            if (i < ALIENS_ROW_COUNT + 1 && j < ALIENS_ROW_LENGTH + 2) {
                gBoard[i][j].gameObject = ALIEN
                gGame.aliensCount++
            }
        }
    }
    return
}

function handleAlienHit(pos) {
    playSound('sound/hit.wav')
    updateCell(pos, SKY)
    gGame.aliensCount--
    updateScore(10)
    checkWin()
}

function moveAliens() {
    if (gAliensTopRowIdx === 11) {
        openModal('Dont worry Next Time is Yours', false)
        return
    }
    if (gGame.aliensCount === 0) {
        openModal('We Survived Anther Day', true)
        return
    }
    if (!gIsAlienFreeze) return
    if (gGoDown) {
        shiftBoardDown(gBoard, gAliensTopRowIdx)
    } else if ((gGoRight) && (!gGoDown)) {
        gRightInterval = setInterval(() => {
            (shiftBoardRight(gBoard, gAliensTopRowIdx))
        }, 750)
    } else if (gGoRight == false && gGoDown === false) {
        gLeftInterval = setInterval(() => {
            (shiftBoardLeft(gBoard, gAliensTopRowIdx))
        }, 750)
    }
    return
}

function shiftBoardRight(board, fromI) {
    //Caculate to distance between the alien and the border
    var diff = 0
    for (var j = gBoard.length - 1; j < board.length; j--) {
        var currCell = gBoard[fromI][j]
        if (currCell.gameObject === null) {
            diff++
        } else if (currCell.gameObject === ALIEN) {
            break
        }
    }

    if (diff === 0) {
        clearInterval(gRightInterval)
        gGoDown = (gGoDown) ? false : true
        moveAliens()
        return
    }

    //runs on gBoard and find alien i,j
    var locations = findAliensLocation(gBoard, fromI)

    for (var i = locations.length - 1; i >= 0; i--) {

        var cell = locations[i]
        //modal & DOM
        gBoard[cell.i][cell.j].gameObject = null
        updateCell(cell, null)
        cell.j++

        //if the Cell is hitting an ARROW
        if (gBoard[cell.i][cell.j].gameObject === LASER) {
            handleAlienHit(cell)
            clearInterval(gShootInterval)
            return
        }
        //modal & DOM
        gBoard[cell.i][cell.j].gameObject = ALIEN
        updateCell(cell, ALIEN)
    }
}

function shiftBoardLeft(board, fromI) {
    //Caculate to distance between the alien and the border
    var diff = 0
    for (var j = 0; j < board.length; j++) {
        var currCell = gBoard[fromI][j]
        if (currCell.gameObject === null) {
            diff++
        } else if (currCell.gameObject === ALIEN) {
            break
        }
    }

    if (diff === 0) {
        clearInterval(gLeftInterval)
        gGoDown = true
        moveAliens()
        return
    }
    //runs on gBoard and find alien i,j
    var locations = findAliensLocation(board, fromI)

    for (var i = 0; i < locations.length; i++) {

        var cell = locations[i]

        //modal & DOM
        gBoard[cell.i][cell.j].gameObject = null
        updateCell(cell, null)
        cell.j--

        //if the Cell is hitting an ARROW
        if (gBoard[cell.i][cell.j].gameObject === LASER) {
            handleAlienHit(cell)
            clearInterval(gShootInterval)
            return
        }
        //modal & DOM
        gBoard[cell.i][cell.j].gameObject = ALIEN
        updateCell(cell, ALIEN)
    }
}

function shiftBoardDown(board) {
    //runs on gBoard and find alien i,j
    var locations = findAliensLocation(board)

    for (var i = locations.length - 1; i >= 0; i--) {

        var cell = locations[i]
        //modal & DOM
        gBoard[cell.i][cell.j].gameObject = null
        updateCell(cell, null)

        cell.i++

        //if the Cell is hitting an ARROW
        if (gBoard[cell.i][cell.j].gameObject === LASER) {
            handleAlienHit(cell)
            clearInterval(gShootInterval)
            return
        }

        //modal & DOM
        gBoard[cell.i][cell.j].gameObject = ALIEN
        updateCell(cell, ALIEN)
    }

    clearInterval(gLeftInterval)
    if (gGoRight) {
        gGoRight = false
    } else gGoRight = true
    gGoDown = false
    gAliensTopRowIdx++
    moveAliens()
    return
}

function findAliensLocation(board) {
    var newArr = []
    for (var i = 0; i < board.length; i++) {
        var currCell = gBoard[i]
        for (var j = 0; j < board[i].length; j++) {
            var cell = currCell[j]
            if (cell.gameObject === ALIEN) {
                newArr.push({ i: i, j: j })
            }
        }
    }
    return newArr
}




