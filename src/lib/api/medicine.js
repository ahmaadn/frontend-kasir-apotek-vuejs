import request from '../request'

export async function listMediciness(config = {}) {
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

export async function createMediciness(data, config = {}) {
   return await request('/medicine/add', {
      method: 'POST',
      data,
      ...config,
   })
}

export async function restockMediciness(data, config = {}) {
   return await request('/medicine/restock', {
      method: 'POST',
      data,
      ...config,
   })
}

export async function editMedicine(id, data, config = {}) {
   return await request(`/medicine/${id}`, {
      method: 'PATCH',
      data,
      ...config,
   })
}
