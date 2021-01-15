const globalGrid = document.querySelector('.global-grid')
const width = 3
const globalGridArray = []



for (let i = 0; i < width ** 2; i++) {
  const localGrid = document.createElement('div') 
  localGrid.classList.add('local-grid')
  globalGrid.appendChild(localGrid)
  globalGridArray.push(localGrid)
  localGrid.style.width = `${100 / width}%`
  localGrid.style.height = `${100 / width}%`
}



globalGridArray.forEach((localGrid) => {
  for (let i = 0; i < width ** 2; i++) {
    const cell = document.createElement('div') 
    cell.classList.add('cell')
    localGrid.appendChild(cell)
    const localGridArray = []
    localGridArray.push(cell)
    cell.style.width = `${100 / width}%`
    cell.style.height = `${100 / width}%`
  }
})

 





