import request from '../request'

export async function listCategories(config = {}) {
   return await request('/medicine/category', {
      method: 'GET',
      ...config,
   })
}

export async function createCategories(data, config = {}) {
   return await request('/medicine/category/add', {
      method: 'POST',
      data,
      ...config,
   })
}
