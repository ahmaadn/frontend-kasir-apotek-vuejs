import { getbatchMedicine, listBatchMedicine } from '@/lib/api/medicine'
import { defineStore } from 'pinia'

export const useBatchMedicine = defineStore('batchMedicineStore', {
   state: () => ({
      batch: [],
      detailBatch: {},
   }),
   getters: {
      getBatch: (state) => state.batch,
   },
   actions: {
      setBatch(values) {
         this.batch = values
      },
      clearBatch() {
         this.batch = []
      },
      async fetchBatch() {
         await listBatchMedicine().then((response) => this.setBatch(response.data))
      },
      async getDetailBatch(id) {
         // Cache??
         if (this.detailBatch[id] === undefined) {
            await getbatchMedicine(id)
               .then((response) => {
                  const { data } = response.data
                  this.detailBatch[id] = data
               })
               .catch((error) => console.error(error))
         }
         return this.detailBatch[id]
      },
   },
})
