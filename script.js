const globalGrid = document.querySelector('.global-grid')
const width = 3
const globalGridArray = []

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
    //cell.innerHTML = `<h1>${i}</h1>`
    localGrid.appendChild(cell)
    cell.style.width = `${100 / width}%`
    cell.style.height = `${100 / width}%`

  }
})

//functions checking if any grid wins

function localGridChecker(currentNumber) {
  // checkRows(currentNumber, 'x-class')
  // checkRows(currentNumber, 'o-class')
  // checkColumns(currentNumber, 'x-class')
  // checkColumns(currentNumber, 'o-class')
  // checkDiagonals(currentNumber, 'x-class')
  // checkDiagonals(currentNumber, 'o-class')

  localGridCheckerForClass(currentNumber, 'x-class')
  localGridCheckerForClass(currentNumber, 'o-class')
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
      console.log(`globalGridArray${currentNumber} gains a XO class`)
      //globalGridArray[currentNumber].classList.add(xoClass) //check this
    })
  }
}

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

  // if (isRow0Win || isRow1Win || isRow2Win) {
  //   globalGridArray[currentNumber].querySelectorAll('.cell').forEach(cell => {
  //     cell.classList.add(xoClass)
  //     console.log(cell.classList)
  //     console.log(`globalGridArray${currentNumber} gains a XO class`)
  //     //globalGridArray[currentNumber].classList.add(xoClass) //check this
  //   })
  // }
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

  // if (isCol0Win || isCol1Win || isCol2Win) {
  //   globalGridArray[currentNumber].querySelectorAll('.cell').forEach(cell => {
  //     cell.classList.add(xoClass)
  //     console.log(`globalGridArray${currentNumber} gains a XO class`)
  //     //globalGridArray[currentNumber].classList.add(xoClass) //check this
  //   })
  // }
}

function checkDiagonals(currentNumber, xoClass) {
  const isDiagonal0Win = checkCell(currentNumber, '#cell0', xoClass) &&
    checkCell(currentNumber, '#cell4', xoClass) &&
    checkCell(currentNumber, '#cell8', xoClass)

  const isDiagonal2Win = checkCell(currentNumber, '#cell2', xoClass) &&
    checkCell(currentNumber, '#cell4', xoClass) &&
    checkCell(currentNumber, '#cell6', xoClass)

  return isDiagonal0Win || isDiagonal2Win

  // if (isDiagonal0Win || isDiagonal2Win) {
  //   globalGridArray[currentNumber].querySelectorAll('.cell').forEach(cell => {
  //     cell.classList.add(xoClass)
  //     console.log(`globalGridArray${currentNumber} gains a XO class`)
  //     //globalGridArray[currentNumber].classList.add(xoClass) //check this
  //   })
  // }
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


    console.log(`targetNumber is ${targetNumber}`)

    if (event.target.classList.contains('active')) {
      if (xoCounter % 2 === 0) {

        event.target.classList.remove('active')
        event.target.classList.add('x-class')
        localGridChecker(currentNumber)

      } else {

        event.target.classList.remove('active')
        event.target.classList.add('o-class')
        localGridChecker(currentNumber)

      }

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



//       document.querySelectorAll('.local-grid').forEach(grid => {
//         const cellsToChange = Array.from(grid.querySelectorAll('.cell'))
//         function hasXOClass(cell) {
//           return cell.classList.contains('x-class') || cell.classList.contains('o-class')
//         }
//         if (grid.getAttribute('id') !== `grid${targetNumber}`) { //for all grids EXCEPT target grid
//           cellsToChange.forEach(cell => {
//             cell.classList.remove('active')
//             cell.classList.add('blocked')
//           })
//           //! check this
//         } else { //for target grid - 2 options, grid full or not 
//           console.log(cellsToChange)
//           if (cellsToChange.every(hasXOClass)) { //target grid full: unblock every available cell in any grid
//             console.log("hello")
//             document.querySelectorAll('.cell').forEach(cell => {
//               if (cell.classList.contains('x-class') === false && cell.classList.contains('o-class') === false) {
//                 cell.classList.remove('blocked')
//                 cell.classList.add('active')
//               }
//             })
//           } else { //target grid not full: unblock free cells from target grid only
//             cellsToChange.forEach(cell => {
//               if (cell.classList.contains('x-class') === false && cell.classList.contains('o-class') === false) {
//                 cell.classList.remove('blocked')
//                 cell.classList.add('active')
//               }
//             })
//           }
//         }
//       })
//     }
//   })
// })








//
//event.target.classList.add('x-class')
//QUESTION: this class is only applied to h1 not entire cell, why? had to comment out cell.innerHTML to remove the h1


// function blockCell(cell) {
//   flipCell(cell, 'active', 'blocked')
// }

// function unblockCell(cell) {
//   flipCell(cell, 'blocked', 'active')
// }

// function flipCell(cell, from, to) {
//   cell.classList.remove(from)
//   cell.classList.add(to)
// }










