import request from '../request'

export async function loginWithJWT(data, config = {}) {
   return await request('/auth/login', {
      method: 'POST',
      data,
      ...config,
   })
}

export async function getUserList(config = {}) {
   return await request('/user', {
      method: 'GET',
      config,
   })
}

export async function createUser(data, config = {}) {
   return await request('/user/add', {
      method: 'POST',
      data,
      ...config,
   })
}

export async function detailUser(userid, config = {}) {
   return await request(`/user/${userid}`, {
      method: 'GET',
      ...config,
   })
}

export async function updateUser(userid, data, config = {}) {
   return await request(`/user/${userid}`, {
      method: 'PATCH',
      data,
      ...config,
   })
}
