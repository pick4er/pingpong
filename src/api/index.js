import Sendsay from 'sendsay-api'

const sendsay = new Sendsay();

export const loginRequest = ({ login, sublogin, password } = {}) => sendsay.login({
  login,
  sublogin,
  password,
})
