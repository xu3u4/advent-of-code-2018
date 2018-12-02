function clearResult(obj) {
  const objKeys = Object.keys(obj)

  for (let i = 0; i < objKeys.length; i++) {
    obj[objKeys[i]] = undefined
  }
  return obj
}

function findIdsDiffByOne() {
  const arrayOfId = ids.split('\n')
  let result = {
    diffIdx: undefined,
    id1: undefined,
    id2: undefined
  }
  let breakLoop = false

  for (let i = 0; i < arrayOfId.length; i++) {
    for (let j = i + 1; j < arrayOfId.length; j++) {
      result = clearResult(result)
      breakLoop = false
      const firstid = arrayOfId[i]
      const secondid = arrayOfId[j]
      
      for (let k = 0; k < firstid.length; k++) {
        if (firstid[k] !== secondid[k]) {
          if (result.diffIdx) {
            // more than one different letters
            breakLoop = true
            break
          } else {
            result.diffIdx = k
            result.id1 = firstid
            result.id2 = secondid
          }
        }
      }

      if (!breakLoop) break
    }

    if (!breakLoop) break
  }
}