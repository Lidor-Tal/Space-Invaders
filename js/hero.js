'use strict'

const LASER_SPEED = 80;
var gShootInterval
var gHero
var gSupershootInterval
var gSuperShotCounter = 3


// creates the hero and place it on board
function createHero(board) {
    gHero = {
        pos: { i: 12, j: 5 },
        isShoot: false
    }
    board[gHero.pos.i][gHero.pos.j].gameObject = HERO

}

// Handle game keys
function onKeyDown(ev) {
    if (!gGame.isOn) return
    var nextLocation = getNextLocation(ev)
    if (!nextLocation) return
    if (nextLocation.j === -1 || nextLocation.j === gBoard[0].length) return
    const nextCell = gBoard[nextLocation.i][nextLocation.j]
    // moving from current location:
    // update the model
    // update the DOM
    updateCell(gHero.pos, SKY)

    // Move the pacman to new location:
    // update the model
    gHero.pos = nextLocation

    // update the DOM
    updateCell(gHero.pos, HERO)

}

// Move the hero right (1) or left (-1)
function getNextLocation(eventKeyboard) {

    const nextLocation = {
        i: gHero.pos.i,
        j: gHero.pos.j,
    }

    switch (eventKeyboard.key) {

        case 'ArrowLeft':
            nextLocation.j--
            break;
        case 'ArrowRight':
            nextLocation.j++
            break;
        case ' ':
            if (gHero.isShoot === true) return console.log('wait')
            shoot(nextLocation)
            return
            break;
        case 'n':
            if (gSuperShotCounter === 0) return
            if (gHero.isShoot === true) return console.log('wait')
            gSuperShotCounter--
            superShoot(nextLocation)
            return
            break
        case 'N':
            if (gSuperShotCounter === 0) return
            if (gHero.isShoot === true) return console.log('wait')
            gSuperShotCounter--
            superShoot(nextLocation)
            return
            break

        default:
            return null
    }

    return nextLocation
}

// Sets an interval for shutting (blinking) the laser up towards aliens
function shoot(pos) {
    gShootInterval = setInterval(blinkLaser(pos, LASER))
}

// renders a LASER at specific cell for short time and removes it
function blinkLaser(pos, gameObject, timer = 130) {
    var newPos = { i: pos.i - 1, j: pos.j }
    var elCell = getClassName({ i: newPos.i - 1, j: newPos.j })
    var cell = document.querySelector(`.${elCell}`)
    if (newPos.i === 0) return
    if (cell.innerText === ALIEN && gameObject === SUPER_LASER) {
        aroundCellRemover(gBoard, { i: newPos.i - 1, j: newPos.j })
        clearInterval(gSupershootInterval)
        return
    }
    if (cell.innerText === ALIEN) {
        handleAlienHit({ i: newPos.i - 1, j: newPos.j })
        clearInterval(gShootInterval)

        return
    }
    if (cell.innerText === CANDY) {
        updateCell({ i: newPos.i - 1, j: newPos.j })
        updateScore(50)
        gIsAlienFreeze = true
        console.log(gIsAlienFreeze)
        setTimeout(() => {
            gIsAlienFreeze = false
            moveAliens()
        }, 5000);
    }
    updateCell(newPos, gameObject)
    gHero.isShoot = true

    setTimeout(() => {
        pos.i--
        updateCell(newPos, null)
        gHero.isShoot = false
        blinkLaser(newPos, gameObject)
    }, timer);


}

function superShoot(pos) {
    gSupershootInterval = setInterval(blinkLaser(pos, SUPER_LASER))
    var h3Bomb = document.querySelector('.counter')
    var str = h3Bomb.innerText.slice(2)
    h3Bomb.innerText = str
}

function aroundCellRemover(board, pos) {
    var newArr = []
    for (var i = pos.i - 1; i <= pos.i + 1; i++) {
        if (i < 0 || i > board.length) continue
        for (var j = pos.j - 1; j <= pos.j + 1; j++) {
            // if (i === pos.i && j === pos.j) continue
            if (j < 0 || j >= board[0].length) continue
            var currCell = board[i][j]
            if (currCell.gameObject === ALIEN) {
                newArr.push({ i: i, j: j })
            }

        }
    }
    for (var k = 0; k < newArr.length; k++) {
        var currCell = newArr[k]
        gBoard[currCell.i][currCell.j].gameObject = null
        updateCell(currCell, null)
        updateScore(10)
        gGame.aliensCount--
    }

}



