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

export async function reportSalesExport(...config) {
   return await request('/report/sales/export', {
      method: 'GET',
      responseType: 'blob',
      ...config,
   })
}

export async function reportStockExport(...config) {
   return await request('/report/stock/export', {
      method: 'GET',
      responseType: 'blob',
      ...config,
   })
}
