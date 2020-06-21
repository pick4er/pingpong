import getRandomId from './getRandomId'

export default function createHistoryObject(
  req = {},
  res = {}
) {
  return {
    id: getRandomId(),
    request: req,
    response: res,
  }
}
