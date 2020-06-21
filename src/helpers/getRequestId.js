export default function getRequestId(reqOrRes = {}) {
  return reqOrRes['request.id'] || reqOrRes.id
}
