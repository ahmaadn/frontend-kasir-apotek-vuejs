import { listMedicines } from '@/lib/api/medicine'
import { createPinia } from 'pinia'

export const medicineStore = createPinia('medicineStore', {
   state: () => ({
      medicines: [],
   }),
   getters: {
      getMedicinesData: (state) => state.medicines,
   },
   actions: {
      setMedicinesData(data) {
         this.medicines = data
      },
      fetchMedicinesData() {
         return new Promise((resolve, reject) => {
            listMedicines()
               .then((response) => {
                  const { data } = response.data
                  this.setMedicinesData(data)
                  resolve(response)
               })
               .catch((error) => {
                  reject(error)
               })
         })
      },
   },
})
