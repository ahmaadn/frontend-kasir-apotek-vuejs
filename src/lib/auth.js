import Cookies from 'js-cookie'

const TOKEN_KEY = 'User-Auth'

export function getToken() {
   return Cookies.get(TOKEN_KEY)
}

export function setToken(token) {
   Cookies.set(TOKEN_KEY, token, { expires: 7 })
}

export function removeToken() {
   Cookies.remove(TOKEN_KEY)
}
