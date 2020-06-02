// Naive approach. Extend with new error cases
export default (res) => {
  if (!res) {
    return undefined
  }

  let parsedRes = res
  try {
    if (typeof res === 'string') {
      parsedRes = JSON.parse(res)
    }
  } catch (e) {
    throw new Error('Res must be either string or object')
  }

  if (parsedRes.id === 'access_denied') {
    return true
  }

  if (parsedRes.id === 'error/auth/failed') {
    return true
  }

  return false
}
