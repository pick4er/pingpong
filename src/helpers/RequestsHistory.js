import deepClone from './deepClone'

function getRequestId(reqOrRes = {}) {
  return reqOrRes['request.id']
}

function createHistoryObject(req = {}, res = {}) {
  const reqId = getRequestId(res)

  return {
    id: reqId,
    request: req,
    response: res,
  }
}

export default class RequestsHistory {
  static limit = 2

  constructor(serializedHistory = []) {
    this.history = deepClone(serializedHistory)
  }

  addRequest(req = {}, res = {}) {
    const reqId = getRequestId(res)

    if (this.hasRequest(reqId)) {
      return this.moveRequestOnTop(reqId)
    }

    const newRequest = createHistoryObject(req, res)
    this.history = [newRequest].concat(this.history)

    if (this.history.length > RequestsHistory.limit) {
      this.removeLastRequest()
    }

    return newRequest
  }

  findRequest(reqId) {
    return this.history.find(({ key }) => key === reqId)
  }

  hasRequest(reqOrId = {}) {
    const reqId =
      typeof reqOrId === 'string'
        ? reqOrId
        : getRequestId(reqOrId)
    return !!this.findRequest(reqId)
  }

  removeLastRequest() {
    return this.history.pop()
  }

  removeRequest(reqId) {
    const index = this.history.findIndex(
      ({ id }) => id === reqId
    )
    if (!index) {
      return undefined
    }

    const requestToRemove = this.history[index]
    this.history.splice(index, 1)

    return requestToRemove
  }

  moveRequestOnTop(reqId) {
    const requestToMove = this.removeRequest(reqId)
    if (typeof requestToMove === 'undefined') {
      return undefined
    }

    this.history = [requestToMove].concat(this.history)
    return requestToMove
  }

  isEmpty() {
    return this.history.length === 0
  }

  serialize() {
    return this.history
  }
}
