async function init() {
  const res = await fetch('2024/05/input.txt')
  const input = await res.text()

  // Split the text file into an array of lines
  const pageRulesRegex = /\d{1,}\|\d{1,}/g
  const pageRules = input.match(pageRulesRegex)
  pageRules.forEach((pageRule, i) => {
    pageRules[i] = pageRule.split('|')
  })

  const pageOrdersRegex = /(\d{1,},){1,}\d{1,}/g
  const pageOrders = input.match(pageOrdersRegex)

  let solutionPart1 = 0
  const incorrectOrders = []

  pageOrders.forEach((pageOrder) => {
    const splittedPageOrder = pageOrder.split(',')
    let correct = true
    for (i = 0; i < pageRules.length; i++) {
      const firstIndex = splittedPageOrder.findIndex(
        (number) => number === pageRules[i][0]
      )
      const secondIndex = splittedPageOrder.findIndex(
        (number) => number === pageRules[i][1]
      )
      if (firstIndex !== -1 && secondIndex !== -1 && secondIndex < firstIndex) {
        //Specific line for part 2
        incorrectOrders.push(splittedPageOrder)

        correct = false
        break
      }
    }
    if (correct) {
      solutionPart1 += parseInt(
        splittedPageOrder[(splittedPageOrder.length - 1) / 2]
      )
    }
  })
  console.log(solutionPart1)

  let solutionPart2 = 0

  incorrectOrders.forEach((incorrectOrder) => {
    for (i = 0; i < pageRules.length; i++) {
      const firstIndex = incorrectOrder.findIndex(
        (number) => number === pageRules[i][0]
      )
      const secondIndex = incorrectOrder.findIndex(
        (number) => number === pageRules[i][1]
      )
      if (firstIndex !== -1 && secondIndex !== -1 && secondIndex < firstIndex) {
        const oldFirst = incorrectOrder[firstIndex]
        const oldSecond = incorrectOrder[secondIndex]
        incorrectOrder[firstIndex] = oldSecond
        incorrectOrder[secondIndex] = oldFirst
        i = 0
      }
    }
    solutionPart2 += parseInt(incorrectOrder[(incorrectOrder.length - 1) / 2])
  })
  console.log(solutionPart2)
}

init()
