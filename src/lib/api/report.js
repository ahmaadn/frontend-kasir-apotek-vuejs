import request from '../request'

export async function reportSales(...config) {
   return await request('/report/sales', {
      method: 'GET',
      ...config,
   })
}

export async function reportStock(...config) {
   return await request('/report/stock', {
      method: 'GET',
      ...config,
   })
}
