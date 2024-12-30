import request from '../request'

export async function getCategoryMedicine(config = {}) {
   return await request('/medicine/category', {
      method: 'GET',
      ...config,
   })
}

export async function cretaeCategoryMedicine(data, config = {}) {
   return await request('/medicine/category/add', {
      method: 'POST',
      data,
      ...config,
   })
}
