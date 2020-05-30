import Sendsay from 'sendsay-api'

const sendsay = new Sendsay();

function getCookie(name) {
  return (document.cookie.match(`(^|; )${name}=([^;]*)`) || 0)[2];
}

export const loginRequest = async ({ login, sublogin, password } = {}) => {
  const sessionCookie = getCookie('sendsay_session')
  if (!sessionCookie) {
    await sendsay.login({
      login,
      sublogin,
      password,
    })

    document.cookie = `sendsay_session=${sendsay.session}`
  } else {
    sendsay.session = sessionCookie
  }
}

export const apiRequest = (req = {}) => sendsay.request(req)

