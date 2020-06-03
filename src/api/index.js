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

export const loginCredentialsRequest = () =>
  sendsay.request({
    action: 'pong',
  })

export const apiRequest = (req = {}) => sendsay.request(req)

export const logout = () => sendsay.request({
  action: 'logout'
})
