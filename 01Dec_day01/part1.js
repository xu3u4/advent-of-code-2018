function getFinalFrequency(changes) {
  const arrayOfChange = changes.split('\n')

  return result = arrayOfChange.reduce((acc, change) => (
    acc + parseInt(change, 10)
  ), 0)
}
