async function init() {
  const res = await fetch('2024/06/input.txt')
  const input = await res.text()

  const grid = input.split('\r\n')
  grid.forEach((line, i) => {
    grid[i] = line.split('')
  })

  const originalPositions = part1(grid)

  const startTime = new Date()
  part2(grid, originalPositions)
  const endTime = new Date()
  console.log((endTime - startTime) / 1000)
}

function move(grid, direction, guardColumn, guardRow) {
  switch (direction) {
    case 'up':
      if (guardRow - 1 < 0 || grid[guardRow - 1][guardColumn] !== '#') {
        guardRow--
      } else {
        direction = 'right'
      }
      break

    case 'right':
      if (
        guardColumn + 1 >= grid[0].length ||
        grid[guardRow][guardColumn + 1] !== '#'
      ) {
        guardColumn++
      } else {
        direction = 'down'
      }
      break

    case 'down':
      if (
        guardRow + 1 >= grid.length ||
        grid[guardRow + 1][guardColumn] !== '#'
      ) {
        guardRow++
      } else {
        direction = 'left'
      }
      break

    case 'left':
      if (guardColumn - 1 < 0 || grid[guardRow][guardColumn - 1] !== '#') {
        guardColumn--
      } else {
        direction = 'up'
      }
      break
  }
  return { direction, guardColumn, guardRow }
}

function findGuard(grid) {
  for (i = 0; i < grid.length; i++) {
    for (j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === '^') {
        return { i, j }
      }
    }
  }
  return
}

function isOnGrid(grid, guardRow, guardColumn) {
  return (
    guardRow >= 0 &&
    guardRow < grid.length &&
    guardColumn >= 0 &&
    guardColumn < grid[0].length
  )
}

function part1(grid) {
  let { i: guardRow, j: guardColumn } = findGuard(grid)
  let direction = 'up'
  const distinctPositions = new Set()

  while (isOnGrid(grid, guardRow, guardColumn)) {
    distinctPositions.add(guardRow + ',' + guardColumn)
    ;({ direction, guardRow, guardColumn } = move(
      grid,
      direction,
      guardColumn,
      guardRow
    ))
  }
  return [...distinctPositions].map((element) => {
    const splittedElement = element.split(',')
    return { x: parseInt(splittedElement[0]), y: parseInt(splittedElement[1]) }
  })
}

function part2(grid, originalPositions) {
  let solutionPart2 = 0
  originalPositions.forEach((position) => {
    let { i: guardRow, j: guardColumn } = findGuard(grid)
    if (position.x !== guardRow || position.y !== guardColumn) {
      let direction = 'up'
      const distinctPositions = new Set()
      grid[position.x][position.y] = '#'
      while (isOnGrid(grid, guardRow, guardColumn)) {
        if (
          !distinctPositions.has(guardRow + ',' + guardColumn + ',' + direction)
        ) {
          distinctPositions.add(guardRow + ',' + guardColumn + ',' + direction)
        } else {
          solutionPart2++
          break
        }
        ;({ direction, guardRow, guardColumn } = move(
          grid,
          direction,
          guardColumn,
          guardRow
        ))
      }
      grid[position.x][position.y] = '.'
    }
  })

  console.log(solutionPart2)
}

init()
