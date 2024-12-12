async function init() {
  const res = await fetch('2024/07/input.txt')
  const input = await res.text()

  const lines = input.split('\r\n')
  let solutionPart1 = 0
  let solutionPart2 = 0
  lines.forEach((line) => {
    const splittedLine = line.split(': ')
    const result = Number(splittedLine[0])
    const numbers = splittedLine[1].split(' ').map(Number)

    if (isLineValid(result, numbers)) {
      solutionPart1 += result
    }

    if (isLineValid(result, numbers, true)) {
      solutionPart2 += result
    }
  })

  console.log(solutionPart1)
  console.log(solutionPart2)
}

function isLineValid(value, numbers, concatenator = false) {
  if (numbers.length < 2) {
    return
  }
  if (numbers.length === 2) {
    if (
      numbers[0] * numbers[1] === value ||
      numbers[0] + numbers[1] === value ||
      Number(concatenator && numbers.join('')) === value
    ) {
      return true
    }
  }

  const lastNumber = numbers.at(-1)
  const otherNumbers = numbers.slice(0, -1)
  const inverSumValue = value - lastNumber
  const invertMultiplyValue = value / lastNumber
  if (
    inverSumValue > 0 &&
    isLineValid(inverSumValue, otherNumbers, concatenator)
  ) {
    return true
  }
  if (
    invertMultiplyValue === Math.floor(invertMultiplyValue) &&
    isLineValid(invertMultiplyValue, otherNumbers, concatenator)
  ) {
    return true
  }
  if (concatenator && String(value).endsWith(String(lastNumber))) {
    const invertContactenatorValue = Number(
      String(value).slice(0, -String(lastNumber).length)
    )
    if (isLineValid(invertContactenatorValue, otherNumbers, concatenator)) {
      return true
    }
  }

  return false
}

init()
