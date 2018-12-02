import { countBy } from 'lodash'

function findTripleNDouble(ids) {
  const arrayOfId = ids.split('\n')

  let triple = 0
  let double = 0

  for (let i = 0; i < arrayOfId.length; i++) {
    const idArr = arrayOfId[i].split('')
    const idEleCount = countBy(idArr, function(ele) {      
      return ele
    })

    const frequency = Object.values(idEleCount)
    
    if(frequency.includes(3)) triple += 1
    if(frequency.includes(2)) double += 1
  }

  return triple*double
}