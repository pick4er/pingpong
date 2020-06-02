// Naive approach. Extend with new error cases
export default (res = {}) => {
  if (res.id === 'access_denied') {
    return true
  }

  if (res.id === 'error/auth/failed') {
    return true
  }

  return false
}
