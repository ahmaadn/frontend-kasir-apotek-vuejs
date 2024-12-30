import request from '../request'

export async function getCategoryMedicine(config = {}) {
   return await request('/medicine/category', {
      method: 'GET',
      ...config,
   })
}
