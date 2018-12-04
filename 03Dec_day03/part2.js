function coorRange(arr) {
  return arr.reduce((acc, claim) => {
    const id = claim.match(/(.*)\s@/)[1]
    const coordinate = claim.match(/@\s(.*)(?=:\s)/)[1].split(',')
    const size = claim.match(/:\s(.*)/)[1].split('x')
    acc[id] = {
      x: [parseInt(coordinate[0]), parseInt(coordinate[0]) + parseInt(size[0]) - 1],
      y: [parseInt(coordinate[1]), parseInt(coordinate[1]) + parseInt(size[1]) - 1]
    }
    return acc
  }, {})
}

function isOverlapped(arr1, arr2) {
  return !(arr1[1] < arr2[0] || arr2[1] < arr1[0])
}

function getIsolatedIndex (claimSize) {
  let isolatedCount = 0
  for(let i = 0; i < claimSize.length; i++) {
    isolatedCount = 0
    for(let j = 0; j < claimSize.length; j++) {
      if (i === j) {
        isolatedCount += 1
        continue
      }

      const overlappedX = isOverlapped(claimSize[i].x, claimSize[j].x)
      const overlappedY = isOverlapped(claimSize[i].y, claimSize[j].y)

      if (!overlappedX || !overlappedY) {
        isolatedCount += 1
      } else {
        break
      }

    }
    if(isolatedCount === claimSize.length) return i
  }
}

function getIsolatedId (data) {
  const claimArr = data.split('\n')
  const claimSizeById = coorRange(claimArr)
  const claimIds = Object.keys(claimSizeById)
  const claimSize = Object.values(claimSizeById)
  const isolatedIndex = getIsolatedIndex(claimSize)

  return claimIds[isolatedIndex]
}
