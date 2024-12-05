async function init() {
  const res = await fetch('2024/02/input.txt')
  const input = await res.text()

  // Split the text file into an array of lines
  const reports = input.split('\r\n')

  let solutionPart1 = 0
  let solutionPart2 = 0

  reports.forEach((report) => {
    let splitedReport = report.split(/\s+/)
    console.log(splitedReport)
    let isFirstSplittedReportSafe = isReportSafe(splitedReport)

    if (isFirstSplittedReportSafe === true) {
      solutionPart1++
      solutionPart2++
    } else {
      
      let isChangedSplittedReportSafe = false
      for (let i = 0; i < splitedReport.length; i++) {
        const newSplitedReport = [
          ...splitedReport.slice(0, i),
          ...splitedReport.slice(i + 1),
        ]
        if (isReportSafe(newSplitedReport)) {
          isChangedSplittedReportSafe = true
          break
        }
      }

      if (isChangedSplittedReportSafe === true) {
        solutionPart2++
      }
    }

    console.log(solutionPart1, solutionPart2)
  })

  console.log(solutionPart1, solutionPart2)
}

function isReportSafe(report) {
  let isReportIncreasing = report[1] - report[0] >= 0 ? true : false
  for (let i = 1; i < report.length; i++) {
    const diff = report[i] - report[i - 1]
    if (
      diff === 0 ||
      Math.abs(diff) > 3 ||
      (isReportIncreasing === true && diff < 0) ||
      (isReportIncreasing === false && diff > 0)
    ) {
      return false
    }
  }
  return true
}

init()
