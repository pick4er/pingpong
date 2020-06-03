import getRequestId from './getRequestId'

export default (reqOrRes = {}) => {
  const { action } = reqOrRes
  if (action) {
    return action
  }

  const reqId = getRequestId(reqOrRes)
  if (reqId) {
    return reqId
  }

  return undefined
}
