async function init() {
  const res = await fetch('2024/08/input.txt')
  const input = await res.text()

  const grid = input.split('\r\n')
  grid.forEach((line, i) => {
    grid[i] = line.split('')
  })
  let antennasPositions = new Map()
  grid.forEach((line, x) => {
    line.forEach((element, y) => {
      if (element !== '.') {
        if (!antennasPositions.has(element)) {
          antennasPositions.set(element, [])
        }
        antennasPositions.get(element)?.push({ x, y })
      }
    })
  })

  part1(grid, antennasPositions)

  part2(grid, antennasPositions)
}

function part1(grid, antennasPositions) {
  const antinodesPositions = new Set()
  for (const [_, antennaPositions] of antennasPositions) {
    const possiblePairs = [].concat(
      ...antennaPositions.map((value1, i) =>
        antennaPositions.slice(i + 1).map((value2) => {
          return { antenna1: value1, antenna2: value2 }
        })
      )
    )
    possiblePairs.forEach((pair) => {
      const xDistance = pair.antenna1.x - pair.antenna2.x
      const yDistance = pair.antenna1.y - pair.antenna2.y
      if (
        0 <= pair.antenna1.x + xDistance &&
        pair.antenna1.x + xDistance < grid.length &&
        0 <= pair.antenna1.y + yDistance &&
        pair.antenna1.y + yDistance < grid[0].length
      ) {
        antinodesPositions.add(
          Number(pair.antenna1.x + xDistance) +
            ',' +
            Number(pair.antenna1.y + yDistance)
        )
      }
      if (
        0 <= pair.antenna2.x - xDistance &&
        pair.antenna2.x - xDistance < grid.length &&
        0 <= pair.antenna2.y - yDistance &&
        pair.antenna2.y - yDistance < grid[0].length
      ) {
        antinodesPositions.add(
          Number(pair.antenna2.x - xDistance) +
            ',' +
            Number(pair.antenna2.y - yDistance)
        )
      }
    })
  }
  console.log(antinodesPositions.size)
}

function part2(grid, antennasPositions) {
  const antinodesPositions = new Set()
  for (const [_, antennaPositions] of antennasPositions) {
    const possiblePairs = [].concat(
      ...antennaPositions.map((value1, i) =>
        antennaPositions.slice(i + 1).map((value2) => {
          return { antenna1: value1, antenna2: value2 }
        })
      )
    )
    possiblePairs.forEach((pair) => {
      antinodesPositions.add(
        Number(pair.antenna1.x) + ',' + Number(pair.antenna1.y)
      )
      antinodesPositions.add(
        Number(pair.antenna2.x) + ',' + Number(pair.antenna2.y)
      )
      const xDistance = pair.antenna1.x - pair.antenna2.x
      const yDistance = pair.antenna1.y - pair.antenna2.y
      const point = { x: pair.antenna1.x, y: pair.antenna1.y }
      while (
        0 <= point.x + xDistance &&
        point.x + xDistance < grid.length &&
        0 <= point.y + yDistance &&
        point.y + yDistance < grid[0].length
      ) {
        point.x += xDistance
        point.y += yDistance
        antinodesPositions.add(Number(point.x) + ',' + Number(point.y))
      }

      point.x = pair.antenna2.x
      point.y = pair.antenna2.y

      while (
        0 <= point.x - xDistance &&
        point.x - xDistance < grid.length &&
        0 <= point.y - yDistance &&
        point.y - yDistance < grid[0].length
      ) {
        point.x -= xDistance
        point.y -= yDistance
        antinodesPositions.add(Number(point.x) + ',' + Number(point.y))
      }
    })
  }
  console.log(antinodesPositions.size)
}

init()
