import request from '../request'

export function loginWithJWT(data, config = {}) {
   return request('/auth/login', {
      method: 'POST',
      data,
      ...config,
   })
}
