var _ = require('lodash');

function combinations(arr1, arr2) {
  const result = []
  for(let l = 0; l < arr1.length; l++) {
    for(let k = 0; k < arr2.length; k++) {
      result.push([arr1[l], arr2[k]])
    }
  }
  return result
}

const claimArr = claims.split('\n')
const claimSizeById = claimArr.reduce((acc, claim) => {
  const splits = claim.split(' ')
  const coordi = splits[2].slice(0, -1).split(',')
  const size = splits[3].split('x')
  acc[splits[0]] = {
    x: _.range(parseInt(coordi[0]), parseInt(coordi[0])+parseInt(size[0])),
    y: _.range(parseInt(coordi[1]), parseInt(coordi[1])+parseInt(size[1]))
  }
  return acc
}, {})

const claimSize = Object.values(claimSizeById)
const claimIds = Object.keys(claimSizeById)
let isolated = []
let overlapped = []
for(let i = 0; i < claimSize.length; i++) {
  for(let j = i + 1; j < claimSize.length; j++) {
    const xLen = _.intersection(claimSize[i].x, claimSize[j].x)
    const yLen = _.intersection(claimSize[i].y, claimSize[j].y)

    if (xLen.length * yLen.length !== 0) {
      isolated.push(claimIds[i], claimIds[j])
      isolated = _.uniq(isolated)
    }

  }
}

console.log(_.difference(claimIds, isolated))