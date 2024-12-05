async function init() {
  const res = await fetch('2024/03/input.txt')
  const input = await res.text()

  // Split the text file into an array of lines
  const lines = input.split('\r\n')
  let solutionPart1 = 0
  const mulRegex = /mul\(\d{1,3},\d{1,3}\)/g
  const numberRegex = /\d{1,3}/g
  lines.forEach((line) => {
    const mults = line.match(mulRegex)
    mults.forEach((mult) => {
      const multNumbers = mult.match(numberRegex)
      solutionPart1 += multNumbers[0] * multNumbers[1]
    })
  })

  console.log(solutionPart1)

  let solutionPart2 = 0
  const mulRegexWithDo = /mul\(\d{1,3},\d{1,3}\)|do\(\)|don't\(\)/g
  let isEnabled = true
  lines.forEach((line) => {
    const mults = line.match(mulRegexWithDo)
    mults.forEach((mult) => {
      if (mult === "don't()") {
        isEnabled = false
      } else if (mult === 'do()') {
        isEnabled = true
      } else if (isEnabled) {
        const multNumbers = mult.match(numberRegex)
        solutionPart2 += multNumbers[0] * multNumbers[1]
      }
    })
  })

  console.log(solutionPart2)
}

init()
