async function init() {
  const res = await fetch('2024/04/input.txt')
  const input = await res.text()

  // Split the text file into an array of lines
  const grid = input.split('\r\n')
  grid.forEach((line, i) => {
    grid[i] = line.split('')
  })

  let solutionPart1 = 0
  const rows = grid.length
  const columns = grid[0].length

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      console.log(i, j, grid[i][j])
      if (grid[i][j] === 'X') {
        // Right
        if (
          columns >= j + 4 &&
          grid[i][j + 1] === 'M' &&
          grid[i][j + 2] === 'A' &&
          grid[i][j + 3] === 'S'
        ) {
          solutionPart1++
        }
        // Right/Bottom
        if (
          rows >= i + 4 &&
          columns >= j + 4 &&
          grid[i + 1][j + 1] === 'M' &&
          grid[i + 2][j + 2] === 'A' &&
          grid[i + 3][j + 3] === 'S'
        ) {
          solutionPart1++
        }
        // Bottom
        if (
          rows >= i + 4 &&
          grid[i + 1][j] === 'M' &&
          grid[i + 2][j] === 'A' &&
          grid[i + 3][j] === 'S'
        ) {
          solutionPart1++
        }
        // Left/Bottom
        if (
          rows >= i + 4 &&
          0 <= j - 3 &&
          grid[i + 1][j - 1] === 'M' &&
          grid[i + 2][j - 2] === 'A' &&
          grid[i + 3][j - 3] === 'S'
        ) {
          solutionPart1++
        }
        // Left
        if (
          0 <= j - 3 &&
          grid[i][j - 1] === 'M' &&
          grid[i][j - 2] === 'A' &&
          grid[i][j - 3] === 'S'
        ) {
          solutionPart1++
        }
        // Left/Top
        if (
          0 <= i - 3 &&
          0 <= j - 3 &&
          grid[i - 1][j - 1] === 'M' &&
          grid[i - 2][j - 2] === 'A' &&
          grid[i - 3][j - 3] === 'S'
        ) {
          solutionPart1++
        }
        // Top
        if (
          0 <= i - 3 &&
          grid[i - 1][j] === 'M' &&
          grid[i - 2][j] === 'A' &&
          grid[i - 3][j] === 'S'
        ) {
          solutionPart1++
        }
        // Right/Top
        if (
          columns >= j + 4 &&
          0 <= i - 3 &&
          grid[i - 1][j + 1] === 'M' &&
          grid[i - 2][j + 2] === 'A' &&
          grid[i - 3][j + 3] === 'S'
        ) {
          solutionPart1++
        }

        console.log(solutionPart1)
      }
    }
  }
  console.log(solutionPart1)

  let solutionPart2 = 0
  for (let i = 1; i < rows - 1; i++) {
    for (let j = 1; j < columns - 1; j++) {
      if (grid[i][j] === 'A') {
        MASCount = 0
        if (
          (grid[i + 1][j + 1] + grid[i - 1][j - 1] === 'MS' ||
            grid[i + 1][j + 1] + grid[i - 1][j - 1] === 'SM') &&
          (grid[i - 1][j + 1] + grid[i + 1][j - 1] === 'MS' ||
            grid[i - 1][j + 1] + grid[i + 1][j - 1] === 'SM')
        ) {
          solutionPart2++
        }
      }
    }
  }
  console.log(solutionPart2)
}

init()
