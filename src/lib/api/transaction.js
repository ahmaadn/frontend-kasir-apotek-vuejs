import request from '../request'

export async function createTransaction(data, ...config) {
   return await request('/transaction/create', {
      method: 'POST',
      data,
      ...config,
   })
}

export async function getTransaction(...config) {
   return await request('/transaction', {
      method: 'GET',
      ...config,
   })
}

export async function detailTransaction(id, ...config) {
   return await request(`/transaction/${id}`, {
      method: 'GET',
      ...config,
   })
}
