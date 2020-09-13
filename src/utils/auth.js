import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const usernameKey = 'username'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function setUserName(value) {
  return Cookies.set(usernameKey, value)
}
export function getUserName() {
  return Cookies.get(usernameKey)
}
