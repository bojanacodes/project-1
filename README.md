# ![General Assembly logo](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png) Project #1: A grid-based game

## Technical Requirements

* **Render a game in the browser**
* **Design logic for winning** & **visually display which player won**
* **Include separate HTML / CSS / JavaScript files**
* Stick with **KISS (Keep It Simple Stupid)** and **DRY (Don't Repeat Yourself)** principles
* Use **JavaScript** for **DOM manipulation**
* **Deploy your game online**, where the rest of the world can access it
* Use **semantic markup** for HTML and CSS (adhere to best practices)

## Game Requirements

* The game should be playable for two players on the same computer, taking turns to make their moves
* The winner should be displayed when the game is over

## Game Rules

![ultimate-tic-tac-toe](https://media.git.generalassemb.ly/user/15120/files/db8afa00-fec9-11e8-8a65-d0df35a7d6ce)

Ultimate Tic Tac Toe is a variation on the classic children's game. In this version, each cell of the Tic Tac Toe board is a game of Tic Tac Toe. Winning a smaller game, places that player's token (X or O) in the larger game's cell.

The first player can choose any of the smaller boards to start on. Whichever cell they choose will determine the board that the opponent will play on. If the board is completed, the opponent can choose any board to play on.

The aim is to win the larger Tic Tac Toe game.


## Overview and Concept

As part of my GA course, I was tasked with delivering a first project which was a grid-based game. I picked Tic Tac Toe out of the suggested list, and decided to go for a simple design. A fellow student suggested Flat Icon, which was perfect - I loved the space icons and that became my theme.

The game is available to play here: https://bojanacodes.github.io/project-1/


## Technologies Used

* HTML
* CSS
* JavaScript
* Google Fonts
* Flat Icon

## Approach taken

The global grid consisted of 9 local grids. Each of these local grids contained 9 cells. I used a for loop to create the global grid, and a for loop again to create the local grids. Each local grid and each cell was labelled from 0-8.

![grid game plan](https://i.imgur.com/eToyyuE.png)



```
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
```

A player moves by clicking on a cell. I created a counter to keep track of the two players' moves. Odd and even numbers represented the two players. I used classes to track them in the code, and to display a different icon visually using CSS where the player had placed their move (odds = o-class = UFO and evens = x-class = shuttle).



```
.x-class {
  background-image: url(images/shuttle.jpg);
  background-size: cover;
}

.o-class {
  background-image: url(images/ufo.jpg);
  background-size: cover;
}
```

I wrote a rule so that if a player placed their move in, for example, cell 0 of a local grid, which means that the next move has to be played somewhere in local grid 0 (local grid 0 is the target grid). All grids other than the target grid become 'blocked', as do all cells in the target grid which already have a UFO or astronaut on them from previous moves. 'Blocking' means the cell appeared greyed out visually using CSS. The cells which can be played have the default cell background (starry blue).
 
![Ultimate Space Tic Tac Toe mid-game view](https://i.imgur.com/J8aAOuo.png)


If the target grid has already been won or is full, then the player can play their move in any blank cell in any grid (blank as in without a UFO or shuttle already played on it). This is an example from the game rules code:

```
document.querySelectorAll('.local-grid').forEach(grid => {
          const cellsToChange = Array.from(grid.querySelectorAll('.cell'))
          if (grid.getAttribute('id') !== `grid${targetNumber}`) { //block all grids EXCEPT target grid
            cellsToChange.forEach(cell => {
              cell.classList.remove('active')
              cell.classList.add('blocked')
            })
```

I wrote functions to check if either player had successfully completed a row or column or diagonal in a local grid. If they had, then all the cells in that grid would be marked with their icon, as well as the local grid itself.  

```
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
```

I added similar equivalent functions to check if either player had completed a row, column or diagonal in the global grid, i.e. winning the global grid. If they had, a pop-up appears declaring the winner. I also added a function which checked for a tie, and which could display a pop-up for this case.

```
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
```

![Game win view](https://i.imgur.com/ccP6x3X.png)


## Challenges and wins

Getting all the logic in the correct order took a couple of attempts as there was a lot of repetition in the function checking for row/column/diagonal wins. This was an opportunity to simplify and refactor the code, which I found tricky at first. 

I was really pleased with the end result - the game works correctly and I love the icons. This was my first ever coding project, and it felt incredible to have made a working game after just a few weeks on the bootcamp. I learned a lot about planning and breaking down steps, and I loved this process. One really helpful conclusion from this experience was to not worry about feeling 100% confident about the code, just to keep testing and trying and checking the result. Setting bright colours and thick borders helped with the testing process. 

## Future features

* Using local storage to track scores
* Tracking scores from players playing online remotely
* Creating a single player version






