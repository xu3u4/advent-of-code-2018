function combinations(arr1, arr2) {
  const result = []
  for(let l = 0; l < arr1.length; l++) {
    for(let k = 0; k < arr2.length; k++) {
      result.push([arr1[l], arr2[k]])
    }
  }
  return result
}

function coorRange(arr) {
  return arr.map((claim) => {
    const coordinate = claim.match(/@\s(.*)(?=:\s)/)[1].split(',')
    const size = claim.match(/:\s(.*)/)[1].split('x')
    return {
      x: [parseInt(coordinate[0]), parseInt(coordinate[0]) + parseInt(size[0]) - 1],
      y: [parseInt(coordinate[1]), parseInt(coordinate[1]) + parseInt(size[1]) - 1]
    }
  })
}

function unifyArray(arr) {
  let set = new Set(arr.map(JSON.stringify))
  return Array.from(set).map(JSON.parse)
}

function overlappedFabric(arr1, arr2) {
  if(arr1[1] < arr2[0] || arr2[1] < arr1[0]) {
    return []
  } else {
    const union = []

    for(let i = arr1[0]; i <= arr1[1]; i++) {
      for(let j = arr2[0]; j <= arr2[1]; j++) {
        if (i === j) {
          union.push(i)
        }
      }
    }
    return union
  }
}

function overlappedInches(data) {
  const claimArr = data.split('\n')
  const claimSize = coorRange(claimArr)
  const overlapped = []

  for(let i = 0; i < claimSize.length; i++) {
    for(let j = i + 1; j < claimSize.length; j++) {
      const xLen = overlappedFabric(claimSize[i].x, claimSize[j].x)
      const yLen = overlappedFabric(claimSize[i].y, claimSize[j].y)
      overlapped.push(...combinations(xLen, yLen))
    }
  }

  return unifyArray(overlapped).length
}