
// Naive approach. Extend with error cases
export default (res = {}) => {
  if (res.id === 'access_denied') {
    return true
  }

  return false
}
