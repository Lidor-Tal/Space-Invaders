'use strict'

const LASER_SPEED = 80;
var gShootInterval
var gHero

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
    gBoard[gHero.pos.i][gHero.pos.j] = SKY

    // update the DOM
    renderCell(gHero.pos, SKY)

    // Move the pacman to new location:
    // update the model
    gHero.pos = nextLocation
    gBoard[gHero.pos.i][gHero.pos.j] = HERO

    // update the DOM
    renderCell(gHero.pos, HERO)

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

        default:
            return null
    }

    return nextLocation
}

// Sets an interval for shutting (blinking) the laser up towards aliens
function shoot(pos) {

    gShootInterval = setInterval(blinkLaser(pos), 500)
}

// renders a LASER at specific cell for short time and removes it
function blinkLaser(pos) {
    var newPos = { i: pos.i - 1, j: pos.j }

    var elCell = getClassName({ i: newPos.i - 1, j: newPos.j })
    var cell = document.querySelector(`.${elCell}`)

    if (newPos.i === 0) return
    if (cell.innerText === ALIEN) {
        handleAlienHit({ i: newPos.i - 1, j: newPos.j })
        return
    }
    gBoard[newPos.i][newPos.j] = LASER
    renderCell(newPos, LASER)
    gHero.isShoot = true
    setTimeout(() => {
        gBoard[newPos.i][newPos.j] = SKY
        renderCell(newPos, SKY)
        gHero.isShoot = false
        pos.i--
        blinkLaser(newPos)
    }, 75);


}


