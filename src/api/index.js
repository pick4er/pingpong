import Sendsay from 'sendsay-api'

export const sendsay = new Sendsay()

sendsay.onError((error) => {
  throw new Error(JSON.stringify(error))
})

export const loginRequest = ({
  login,
  sublogin,
  password,
} = {}) =>
  sendsay.login({
    login,
    sublogin,
    password,
  })

export const apiRequest = (req = {}) => sendsay.request(req)
