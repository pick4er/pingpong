import Sendsay from 'sendsay-api'

const sendsay = new Sendsay()

sendsay.onError((error) => {
  // eslint-disable-next-line no-param-reassign
  error.isError = true
  throw new Error(JSON.stringify(error))
})

export default sendsay
