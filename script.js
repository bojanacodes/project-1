const globalGrid = document.querySelector('.global-grid')
const width = 3
const globalGridArray = []

document.querySelector('#x-class-win').style.display = 'none'
document.querySelector('#o-class-win').style.display = 'none'
document.querySelector('#tie').style.display = 'block'


//grid maker

for (let i = 0; i < width ** 2; i++) {
  const localGrid = document.createElement('div')
  localGrid.classList.add('local-grid')
  localGrid.setAttribute('id', `grid${i}`)
  globalGrid.appendChild(localGrid)
  globalGridArray.push(localGrid)
  localGrid.style.width = `${100 / width}%`
  localGrid.style.height = `${100 / width}%`
}

globalGridArray.forEach((localGrid) => {

  for (let i = 0; i < width ** 2; i++) {
    const cell = document.createElement('div')
    cell.classList.add('cell')
    cell.setAttribute('id', `cell${i}`)
    localGrid.appendChild(cell)
    cell.style.width = `${100 / width}%`
    cell.style.height = `${100 / width}%`

  }
})

//functions checking if any local grid wins

function checkCell(currentNumber, cellName, xoClass) {
  return globalGridArray[currentNumber].querySelector(cellName).classList.contains(xoClass)
}

function checkRows(currentNumber, xoClass) {
  const isRow0Win = checkCell(currentNumber, '#cell0', xoClass) &&
    checkCell(currentNumber, '#cell1', xoClass) &&
    checkCell(currentNumber, '#cell2', xoClass)
  const isRow1Win = checkCell(currentNumber, '#cell3', xoClass) &&
    checkCell(currentNumber, '#cell4', xoClass) &&
    checkCell(currentNumber, '#cell5', xoClass)
  const isRow2Win = checkCell(currentNumber, '#cell6', xoClass) &&
    checkCell(currentNumber, '#cell7', xoClass) &&
    checkCell(currentNumber, '#cell8', xoClass)

  return isRow0Win || isRow1Win || isRow2Win

}

function checkColumns(currentNumber, xoClass) {
  const isCol0Win = checkCell(currentNumber, '#cell0', xoClass) &&
    checkCell(currentNumber, '#cell3', xoClass) &&
    checkCell(currentNumber, '#cell6', xoClass)

  const isCol1Win = checkCell(currentNumber, '#cell1', xoClass) &&
    checkCell(currentNumber, '#cell4', xoClass) &&
    checkCell(currentNumber, '#cell7', xoClass)

  const isCol2Win = checkCell(currentNumber, '#cell2', xoClass) &&
    checkCell(currentNumber, '#cell5', xoClass) &&
    checkCell(currentNumber, '#cell8', xoClass)

  return isCol0Win || isCol1Win || isCol2Win
}

function checkDiagonals(currentNumber, xoClass) {
  const isDiagonal0Win = checkCell(currentNumber, '#cell0', xoClass) &&
    checkCell(currentNumber, '#cell4', xoClass) &&
    checkCell(currentNumber, '#cell8', xoClass)

  const isDiagonal2Win = checkCell(currentNumber, '#cell2', xoClass) &&
    checkCell(currentNumber, '#cell4', xoClass) &&
    checkCell(currentNumber, '#cell6', xoClass)

  return isDiagonal0Win || isDiagonal2Win
}

function localGridCheckerForClass(currentNumber, xoClass) {
  const isWin = checkRows(currentNumber, xoClass) ||
                checkColumns(currentNumber, xoClass) ||
                checkDiagonals(currentNumber, xoClass)

  if (isWin) {
    globalGridArray[currentNumber].querySelectorAll('.cell').forEach(cell => {
      cell.classList.remove('x-class')
      cell.classList.remove('o-class')
      cell.classList.add(xoClass)
      document.querySelector(`#grid${currentNumber}`).classList.add(xoClass)
    })
  }
}

function localGridChecker(currentNumber) {
  
  localGridCheckerForClass(currentNumber, 'x-class')
  localGridCheckerForClass(currentNumber, 'o-class')
}


//functions checking if global grid win

function checkLocalGrid(gridId, xoClass) {
  const localGrid = document.querySelector(gridId)
  console.log(localGrid)
  console.log(localGrid.classList.contains(xoClass))
  return localGrid.classList.contains(xoClass)
}

function checkGlobalRows(xoClass) {
  const isRow0Win = checkLocalGrid('#grid0', xoClass) &&
    checkLocalGrid('#grid1', xoClass) &&
    checkLocalGrid('#grid2', xoClass)
  const isRow1Win = checkLocalGrid('#grid3', xoClass) &&
    checkLocalGrid('#grid4', xoClass) &&
    checkLocalGrid('#grid5', xoClass)
  const isRow2Win = checkLocalGrid('#grid6', xoClass) &&
    checkLocalGrid('#grid7', xoClass) &&
    checkLocalGrid('#grid8', xoClass)

  return isRow0Win || isRow1Win || isRow2Win
}

function checkGlobalColumns(xoClass) {
  const isCol0Win = checkLocalGrid('#grid0', xoClass) &&
  checkLocalGrid('#grid3', xoClass) &&
  checkLocalGrid('#grid6', xoClass)

  const isCol1Win = checkLocalGrid('#grid1', xoClass) &&
  checkLocalGrid('#grid4', xoClass) &&
  checkLocalGrid('#grid7', xoClass)

  const isCol2Win = checkLocalGrid('#grid2', xoClass) &&
  checkLocalGrid('#grid5', xoClass) &&
  checkLocalGrid('#grid8', xoClass)

  return isCol0Win || isCol1Win || isCol2Win
}

function checkGlobalDiagonals(xoClass) {
  const isDiagonal0Win = checkLocalGrid('#grid0', xoClass) &&
  checkLocalGrid('#grid4', xoClass) &&
  checkLocalGrid('#grid8', xoClass)

  const isDiagonal2Win = checkLocalGrid('#grid2', xoClass) &&
  checkLocalGrid('#grid4', xoClass) &&
  checkLocalGrid('#grid6', xoClass)

  return isDiagonal0Win || isDiagonal2Win
}

function globalGridCheckerForClass(xoClass) {
  const isWin = checkGlobalRows(xoClass) ||
                checkGlobalColumns(xoClass) ||
                checkGlobalDiagonals(xoClass)

  if (isWin) {
    globalGrid.querySelectorAll('.cell').forEach(cell => {
      cell.classList.remove('x-class')
      cell.classList.remove('o-class')
      cell.classList.add(xoClass)
      console.log(`${xoClass} wins`)
    })

    globalGrid.querySelectorAll('.local-grid').forEach(grid => {
      grid.classList.remove('x-class')
      grid.classList.remove('o-class')
      grid.classList.add(xoClass) 

      
    })
    
    document.querySelector(`#${xoClass}-win`).style.display = 'block' 
    
  }
  return isWin
}

function globalGridChecker() {
  const isXWin = globalGridCheckerForClass('x-class') 
  const isOWin = globalGridCheckerForClass('o-class')
  
  if (!isXWin && !isOWin && isGlobalGridBlocked()) {
    document.querySelector('#tie').style.display = 'block'
  }
  
  
}

const isGlobalGridBlocked = function() {
  const allCellsArray = Array.from(document.querySelectorAll('.cell'))

  function cellCheck(cell) {
    return cell.classList.contains('x-class') || cell.classList.contains('o-class')
  }

  return allCellsArray.every(cellCheck)

}

//game rules

document.querySelectorAll('.cell').forEach(cell => {
  cell.classList.add('active')
})

let xoCounter = 0

document.querySelectorAll('.cell').forEach(item => {
  item.addEventListener('click', event => {
    const targetNumber = event.target.getAttribute('id').charAt(4)
    const currentNumber = event.target.parentNode.getAttribute('id').charAt(4)
    function hasXOClass(cell) {
      return cell.classList.contains('x-class') || cell.classList.contains('o-class')
    }

    if (event.target.classList.contains('active')) {
      if (xoCounter % 2 === 0) {

        event.target.classList.remove('active')
        event.target.classList.add('x-class')
      } else {

        event.target.classList.remove('active')
        event.target.classList.add('o-class')
      }

      localGridChecker(currentNumber)
      globalGridChecker()

      xoCounter += 1

      const targetGrid = document.querySelector(`#grid${targetNumber}`)
      const targetGridArray = Array.from(targetGrid.querySelectorAll('.cell'))

      if (targetGridArray.every(hasXOClass)) { //if target grid is full: unblock all available cells
        document.querySelectorAll('.cell').forEach(cell => {
          if (cell.classList.contains('x-class') === false && cell.classList.contains('o-class') === false) {
            cell.classList.remove('blocked')
            cell.classList.add('active')
          }
        })
      } else { //if target grid is not full: unblock target grid and block all other cells
        document.querySelectorAll('.local-grid').forEach(grid => {
          const cellsToChange = Array.from(grid.querySelectorAll('.cell'))
          if (grid.getAttribute('id') !== `grid${targetNumber}`) { //block all grids EXCEPT target grid
            cellsToChange.forEach(cell => {
              cell.classList.remove('active')
              cell.classList.add('blocked')
            })
          } else { //unblock target grid
            cellsToChange.forEach(cell => {
              if (cell.classList.contains('x-class') === false && cell.classList.contains('o-class') === false) {
                cell.classList.remove('blocked')
                cell.classList.add('active')
              }
            })
          }
        })
      }
    }
  })
})
















