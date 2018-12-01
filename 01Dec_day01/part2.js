function duplicatedFrequency (changes) {
  const arrayOfChange = changes.split('\n')
  const frequencies = { 0: 1 } // Starting with a frequency of zero
  let frequency = 0
  let result

  while(result === undefined) {
    for (let i = 0; i < arrayOfChange.length; i++) {
      frequency += parseInt(arrayOfChange[i], 10)
      if(frequencies[frequency] == 1) {
        result = frequency
        break;
      } else {
        frequencies[frequency] = 1
      }
    }
  }

  return result
}