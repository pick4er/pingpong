import getRequestId from './getRequestId'

export default function createHistoryObject(
  req = {},
  res = {}
) {
  const reqId = getRequestId(res)

  return {
    id: reqId,
    request: req,
    response: res,
  }
}
