import { range, intersection } from 'lodash'

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
  return claimArr.map((claim) => {
    const coordinate = claim.match(/@\s(.*)(?=:\s)/).split(',')
    const size = claim.match(/:\s(.*)/).split('x')
    return {
      x: _.range(parseInt(coordinate[0]), parseInt(coordinate[0]) + parseInt(size[0])),
      y: _.range(parseInt(coordinate[1]), parseInt(coordinate[1]) + parseInt(size[1]))
    }
  })
}

function unifyArray(arr) {
  let set  = new Set(arr.map(JSON.stringify))
  return Array.from(set).map(JSON.parse)
}

function overlappedInches() {
  const claimArr = claims.split('\n')
  const claimSize = coorRange(claimArr)
  const overlapped = []

  for(let i = 0; i < claimSize.length; i++) {
    for(let j = i + 1; j < claimSize.length; j++) {
      const xLen = _.intersection(claimSize[i].x, claimSize[j].x)
      const yLen = _.intersection(claimSize[i].y, claimSize[j].y)

      overlapped.push(...combinations(xLen, yLen))
    }
  }

  return unifyArray(overlapped.length)
}
