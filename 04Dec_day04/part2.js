function mostfrequentEle(arr) {
  let mostfrequent
  let frequency
  const recordObj = {}
  for (let i = 0; i < arr.length; i++) {
    recordObj[arr[i]] = recordObj[arr[i]] ? recordObj[arr[i]] + 1 : 1
    if (!mostfrequent || frequency < recordObj[arr[i]]) {
      mostfrequent = arr[i]
      frequency = recordObj[arr[i]]
    }
  }
  return { mostfrequent, frequency }
}

function mostFrequentMin(logDetail) {
  const allMins = logDetail.sleepFrame.reduce((acc, frame) => {
    const startMin = frame[0].match(/:(.*)/)[1]
    const endMin = frame[1].match(/:(.*)/)[1]
    const everyMins = _.range(startMin, endMin)
    acc.push(...everyMins)
    return acc
  }, [])

  return mostfrequentEle(allMins)
}

function classifyDetails(logs) {
  let currentGuard
  let sleepTime

  return logs.reduce((acc, log) => {
    const guardArr = log.details.match(/#\d+/)
    const isSleep = (/asleep/).test(log.details)
    const guard = guardArr ? guardArr[0] : currentGuard
    currentGuard = guard

    if (!acc[guard]) {
      acc[guard] = {
        sleepFrame: [],
        guard
      }
    }

    if (sleepTime) acc[guard].sleepFrame.push([sleepTime, log.time])
    sleepTime = isSleep && log.time

    return acc
  }, {})
}

function mostFrequentGuard(guardsFrequency) {
  let mostFrequentG = {}

  for ( let j = 0; j < guardsFrequency.length; j++) {
    const frequencyInfo = {
      ...mostFrequentMin(guardsFrequency[j]),
      guard: guardsFrequency[j].guard
    }

    if (!mostFrequentG.frequency || frequencyInfo.frequency > mostFrequentG.frequency) {
      mostFrequentG = frequencyInfo
    }
  }
  return mostFrequentG
}

function getFrequentMin(data) {
  const timeLogs = data.split('\n')
  const chronoLogs = timeLogs.map((timeLog) => {
    const [full, time, details, ...others] = timeLog.match(/\[(.*)\]\s(.*)/)
    return {
      time,
      details
    }
  })

  chronoLogs.sort(function (a, b) {
    return new Date(a.time) - new Date(b.time)
  })
  const detailsByGuard = classifyDetails(chronoLogs)
  const logDetails = Object.values(detailsByGuard)

  return mostFrequentGuard(logDetails)
}

getFrequentMin(data)