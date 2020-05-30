export default (serializable = {}) =>
  JSON.parse(JSON.stringify(serializable))
