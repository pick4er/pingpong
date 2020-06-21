export default (f) => {
  const cache = new Map()

  return (value) => {
    const strValue = JSON.stringify(value)

    if (!cache.has(strValue)) {
      cache.set(strValue, f(value))
    }

    return cache.get(strValue)
  }
}
