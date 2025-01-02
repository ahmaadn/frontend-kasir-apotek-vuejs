import request from '../request'

export async function listMedicines(config = {}) {
   return await request('/medicine', {
      method: 'GET',
      ...config,
   })
}

export async function medicineDetail(medicineId, config = {}) {
   return await request(`/medicine/${medicineId}`, {
      method: 'GET',
      ...config,
   })
}

export async function medicineByCategory(categoryId, config = {}) {
   return await request(`/medicine/category/${categoryId}`, {
      method: 'GET',
      ...config,
   })
}

export async function addMedicine(data, config = {}) {
   return await request('/medicine/add', {
      method: 'POST',
      data,
      ...config,
   })
}

export async function restockMedicine(data, config = {}) {
   return await request('/medicine/restock', {
      method: 'POST',
      data,
      ...config,
   })
}
