async function init() {
  const res = await fetch('2024/01/input.txt')
  const input = await res.text()

  // Split the text file into an array of lines
  const firstSplitList = input.split('\r\n')

  // Split each array member (line) for recovering each left and right data and put them in two distincts arrays
  const leftList = []
  const rightList = []
  firstSplitList.forEach((element) => {
    const elementSplitted = element.split(/\s+/)
    leftList.push(elementSplitted[0])
    rightList.push(elementSplitted[1])
  })

  const leftListSorted = leftList.sort((a, b) => (a < b ? -1 : a > b ? 1 : 0))
  const rightListSorted = rightList.sort((a, b) => (a < b ? -1 : a > b ? 1 : 0))

  let solutionPart1 = 0

  for (let i = 0; i < leftListSorted.length; i++) {
    solutionPart1 += Math.abs(leftListSorted[i] - rightListSorted[i])
  }

  console.log(solutionPart1)

  let solutionPart2 = 0

  leftListSorted.forEach((leftElement) => {
    let leftElementOccurrence = 0
    rightListSorted.forEach((rightElement) => {
      if (rightElement === leftElement) {
        leftElementOccurrence++
      }
    })
    solutionPart2 += leftElementOccurrence * leftElement
  })

  console.log(solutionPart2)
}

init()