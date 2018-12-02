function findTripleNDouble(ids) {
  const arrayOfId = ids.split('\n')

  let triple = 0
  let double = 0

  for (let i = 0; i < arrayOfId.length; i++) {
    const idArr = arrayOfId[i].split('')
    const idEleCount = {}

    for (let j = 0; j < idArr.length; j++) {
      if(idEleCount[idArr[j]]) {
        idEleCount[idArr[j]] = idEleCount[idArr[j]] + 1
      } else {
        idEleCount[idArr[j]] = 1
      }
    }

    const frequency = Object.values(idEleCount)
    if(frequency.includes(3)) triple += 1
    if(frequency.includes(2)) double += 1
  }

  return triple*double
}