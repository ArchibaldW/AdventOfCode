async function init() {
  const res = await fetch('2024/10/input.txt')
  const input = await res.text()
  const grid = input.split('\r\n')
  grid.forEach((line, i) => {
    grid[i] = line.split('').map(Number)
  })
  console.log(grid)
  const startingPositions = []
  grid.forEach((line, x) => {
    line.forEach((element, y) => {
      if (element === 0) {
        startingPositions.push({ x, y })
      }
    })
  })
  // part1(grid, startingPositions)

  part2(grid, startingPositions)
}

function part1(grid, startingPositions) {
  let trail = new Set()
  for (let i = 0; i < startingPositions.length; i++) {
    const position = startingPositions[i]
    solution = findNextPointPart1(
      grid,
      startingPositions[i],
      position,
      0,
      trail
    )
    console.log(trail.size)
  }
}

function findNextPointPart1(grid, startingPositions, position, value, trail) {
  console.log(position, value)
  if (value === 9) {
    trail.add(
      startingPositions.x +
        ',' +
        startingPositions.y +
        ',' +
        position.x +
        ',' +
        position.y
    )
    return trail
  }
  if (
    position.x + 1 < grid.length &&
    grid[position.x + 1][position.y] === value + 1
  ) {
    findNextPointPart1(
      grid,
      startingPositions,
      { x: position.x + 1, y: position.y },
      value + 1,
      trail
    )
  }
  if (
    position.y + 1 < grid.length &&
    grid[position.x][position.y + 1] === value + 1
  ) {
    findNextPointPart1(
      grid,
      startingPositions,
      { x: position.x, y: position.y + 1 },
      value + 1,
      trail
    )
  }
  if (0 <= position.x - 1 && grid[position.x - 1][position.y] === value + 1) {
    findNextPointPart1(
      grid,
      startingPositions,
      { x: position.x - 1, y: position.y },
      value + 1,
      trail
    )
  }
  if (0 <= position.y - 1 && grid[position.x][position.y - 1] === value + 1) {
    findNextPointPart1(
      grid,
      startingPositions,
      { x: position.x, y: position.y - 1 },
      value + 1,
      trail
    )
  }
  return trail
}

function part2(grid, startingPositions) {
  let solutionPart2 = 0
  for (let i = 0; i < startingPositions.length; i++) {
    const position = startingPositions[i]
    solutionPart2 = findNextPointPart2(grid, position, 0, solutionPart2)
    console.log(solutionPart2)
  }
}

function findNextPointPart2(grid, position, value, solutionPart2) {
  console.log(position, value)
  if (value === 9) {
    solutionPart2++
    return solutionPart2
  }
  if (
    position.x + 1 < grid.length &&
    grid[position.x + 1][position.y] === value + 1
  ) {
    solutionPart2 = findNextPointPart2(
      grid,
      { x: position.x + 1, y: position.y },
      value + 1,
      solutionPart2
    )
  }
  if (
    position.y + 1 < grid.length &&
    grid[position.x][position.y + 1] === value + 1
  ) {
    solutionPart2 = findNextPointPart2(
      grid,
      { x: position.x, y: position.y + 1 },
      value + 1,
      solutionPart2
    )
  }
  if (0 <= position.x - 1 && grid[position.x - 1][position.y] === value + 1) {
    solutionPart2 = findNextPointPart2(
      grid,
      { x: position.x - 1, y: position.y },
      value + 1,
      solutionPart2
    )
  }
  if (0 <= position.y - 1 && grid[position.x][position.y - 1] === value + 1) {
    solutionPart2 = findNextPointPart2(
      grid,
      { x: position.x, y: position.y - 1 },
      value + 1,
      solutionPart2
    )
  }
  return solutionPart2
}

init()
