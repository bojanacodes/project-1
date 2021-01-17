const globalGrid = document.querySelector('.global-grid')
const width = 3
const globalGridArray = []


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

//console.log(globalGridArray[0].querySelector('#cell5'))

document.querySelectorAll('.cell').forEach(cell => {
  cell.classList.add('active')
})



document.querySelectorAll('.cell').forEach(item => {
  item.addEventListener('click', event => {
    
    if (event.target.classList.contains('active')) {
      event.target.classList.remove('active')
      event.target.classList.add('x-class')
      
      console.log(event.target.getAttribute('id').charAt(4))
      const targetNumber = event.target.getAttribute('id').charAt(4)

      document.querySelectorAll('.local-grid').forEach(item => {
        if (item.getAttribute('id') !== `grid${targetNumber}`) {
          const blockedCells = Array.from(item.querySelectorAll('.cell'))

          blockedCells.forEach(item => {
            item.classList.remove('active')
            item.classList.add('blocked')
          })
          
        }
      })
    }
    
   
    
  })
})





  // apply XO class to cell
  //toggle event listeners?
  // remove event listener from that cell (using target?)
  // remove event listener from other boards except 1 [include full board rule (contains line-through class) => can play any board]
  // check local grid for win
  // check global grid for win
  // BONUS: apply class to those other boards or to the chosen one?




// localGridChecker Function
// if XO class is applied on 3-in-a-horizontal-row [0, 1, 2] || 3-in-a-vertical-row  [0, 3, 6] || 3-diagonally [0,4, 8]
// apply line-through class



// globalGridChecker Function
// if line-through class is applied on 3-in-a-horizontal-row [0, 1, 2] || 3-in-a-vertical-row  [0, 3, 6] || 3-diagonally [0,4, 8]


//event.target.classList.add('x-class')
//QUESTION: this class is only applied to h1 not entire cell, why? had to comment out cell.innerHTML to remove the h1










