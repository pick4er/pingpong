export default function isNumeric(value) {
  return !Number.isNaN(value - parseFloat(value))
}
