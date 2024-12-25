import request from '../request'

export function loginWithJWT(data, config = {}) {
   return request('/auth/login', {
      method: 'POST',
      data,
      ...config,
   })
}

export function getUserList(config = {}) {
   return request('/user', {
      method: 'GET',
      config,
   })
}

export function createUser(data, config = {}) {
   return request('/user/add', {
      method: 'POST',
      data,
      ...config,
   })
}
