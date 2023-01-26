'use strict'

function renderBoard(mat, selector) {

    var strHTML = '<table><tbody>'
    for (var i = 0; i < mat.length; i++) {

        strHTML += '<tr>'
        for (var j = 0; j < mat[0].length; j++) {

            var Currcell = mat[i][j]
            const className = `cell cell-${i}-${j}`
            if (Currcell === SKY) {
                cellClass += 'sky'
            }
            strHTML += `<td class="${className}">`
            switch (Currcell.gameObject) {
                case HERO:
                    strHTML += HERO
                    break
                case ALIEN:
                    strHTML += ALIEN
                    break
            }


            strHTML += `</td>`
        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>'

    const elContainer = document.querySelector(selector)
    elContainer.innerHTML = strHTML
}


// location is an object like this - { i: 2, j: 7 }
function renderCell(location, value,) {
    // Select the elCell and set the value
    const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
    elCell.innerHTML = value
}

// Returns a new cell object. e.g.: {type: SKY, gameObject: ALIEN}
function createCell(gameObject = null) {
    return {
        type: SKY,
        gameObject: gameObject
    }
}

function getElCell(pos) {
    return document.querySelector(`.cell-${pos.i}-${pos.j}`);
}

function getClassName(location) {
    var cellClass = 'cell-' + location.i + '-' + location.j;
    return cellClass;
}

function playSound(path) {
    var audio = new Audio(path);
    audio.play()
}
