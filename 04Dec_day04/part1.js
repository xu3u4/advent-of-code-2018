function durationInMin(laterTime, formerTime) {
  const diff = Math.abs(new Date(laterTime) - new Date(formerTime))
  return Math.floor((diff / 1000) / 60)
}

function classifyDetails(logs) {
  let currentGuard
  let sleepTime

  return logs.reduce((acc, log) => {
    const guardArr = log.details.match(/#\d+/)
    const isSleep = (/asleep/).test(log.details)
    const guard = guardArr ? guardArr[0] : currentGuard
    currentGuard = guard

    const sleepDuration = acc[guard] && sleepTime
      ? durationInMin(log.time, sleepTime)
      : null

    if (!acc[guard]) {
      acc[guard] = {
        sleepDuration: 0,
        sleepFrame: [],
        guard
      }
    }

    acc[guard].sleepDuration += sleepDuration
    if (sleepTime) acc[guard].sleepFrame.push([sleepTime, log.time])
    sleepTime = isSleep && log.time

    return acc
  }, {})
}

function getLongestSleep(data) {
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
  logDetails.sort((a, b) => (b.sleepDuration - a.sleepDuration))

  return logDetails[0]
}

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
  return mostfrequent
}

function mostFrequentMin(logDetail) {
  const allMins = longest.sleepFrame.reduce((acc, frame) => {
    const startMin = frame[0].match(/:(.*)/)[1]
    const endMin = frame[1].match(/:(.*)/)[1]
    const everyMins = _.range(startMin, endMin)
    acc.push(...everyMins)
    return acc
  }, [])

  return mostfrequentEle(allMins)
}


const longestSleep = getLongestSleep(llooggss)

console.log(longestSleep)
console.log(mostFrequentMin(longestSleep))
