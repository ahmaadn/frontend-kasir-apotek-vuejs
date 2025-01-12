import request from '../request'

export async function createTransaction(data, ...config) {
   return await request('/transaction/create', {
      method: 'POST',
      data,
      ...config,
   })
}
