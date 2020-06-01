// Naive approach. Extend with new error cases
export default (res = {}) => {
  if (res.id === 'access_denied') {
    return true
  }

  return false
}
