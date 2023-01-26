'use strict'

const BOARD_SIZE = 14;
const ALIENS_ROW_LENGTH = 8
const ALIENS_ROW_COUNT = 3
const HERO = `<img src="img/spaceship.png" alt="" srcset="">`
const ALIEN = '👾'
const LASER = '⤊';

const SKY = ''

var gBoard;
var gGame = {
    isOn: true,
    aliensCount: 0,
    score: 0
}

function init() {
    gBoard = createBoard()
    createAliens(gBoard)
    createHero(gBoard)

    renderBoard(gBoard, '.board-container')
    // moveAliens()
}

function createBoard() {

    const size = 14
    const board = []

    for (var i = 0; i < size; i++) {
        board.push([])
        for (var j = 0; j < size; j++) {
            var cell = createCell()
            board[i][j] = cell
        }
    }
    return board
}

function updateScore(diff) {
    var elScore = document.querySelector('h2 span')
    gGame.score += diff
    elScore.innerText = gGame.score
}

function checkWin() {
    if (gGame.aliensCount === 0) {
        openModal('We Survived Anther Day', true)
    }
}

function openModal(text, isWin) {
    clearInterval(gLeftInterval)
    clearInterval(gLeftInterval)
    gGame.isOn = false
    var strColor = ''
    strColor += (isWin) ? 'lightgreen' : 'lightblue'

    var elModal = document.querySelector('.modal')
    var elBtn = document.querySelector('.btn')
    var gameResult = document.querySelector('.gameResult')

    gameResult.innerText = text + ' \nscore: ' + gGame.score
    elBtn.style.display = 'block'
    elModal.style.display = 'block'
    elModal.style.backgroundColor = strColor

}

function restartGame() {
    clearInterval(gIntervalAliens)
    clearInterval(gLeftInterval)
    clearInterval(gRightInterval)
    clearInterval(gShootInterval)
    gAliensTopRowIdx = 2
    gGoDown = false
    gGoRight = true

    gGame = {
        isOn: true,
        aliensCount: 0,
        score: 0
    }

    gBoard = []
    var elScore = document.querySelector('h2 span')
    var elModal = document.querySelector('.modal')

    elScore.innerText = 0
    elModal.style.display = 'none'

    init()
}

function createCell(gameObject = null) {
    return {
        type: SKY,
        gameObject: gameObject
    }
}

function updateCell(pos, gameObject = null) {
    gBoard[pos.i][pos.j].gameObject = gameObject
    var elCell = getElCell(pos);
    elCell.innerHTML = gameObject || '';
}