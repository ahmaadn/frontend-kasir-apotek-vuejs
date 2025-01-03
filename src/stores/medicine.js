import { createMediciness, listMediciness, restockMediciness } from '@/lib/api/medicine'
import { defineStore } from 'pinia'
import { toast } from 'vue-sonner'

export const useMedicineStore = defineStore('medicineStore', {
   state: () => ({
      mediciness: [],
      units: ['BOX', 'BTL', 'SACC', 'TUBE', 'STRIP', 'KAPSUL'],
   }),
   getters: {
      getUnits: (state) => state.units,
      getMediciness: (state) => state.mediciness,
   },
   actions: {
      setMediciness(data) {
         this.mediciness = data
      },
      clearMedicines() {
         this.mediciness = []
      },
      fetchMediciness() {
         return new Promise((resolve, reject) => {
            listMediciness()
               .then((response) => {
                  const { data } = response.data
                  this.setMediciness(data)
                  resolve(response)
               })
               .catch((error) => {
                  reject(error)
               })
         })
      },
      async createMediciness(values) {
         let success = false
         await createMediciness(values)
            .then(async (response) => {
               const { successes, errors } = response.data
               if (successes.length) {
                  success = true
                  toast.success(`${successes.length} new mediciness successfully created`, {
                     description: successes.join(','),
                  })
               }
               if (errors.length) {
                  success = false
                  toast.error(`${errors.length} new mediciness failed to be created`, {
                     description: errors.join(','),
                  })
               }
               await this.fetchMediciness()
            })
            .catch((error) => {
               console.error(error)
            })
         return success
      },
      async restockMediciness(values) {
         await restockMediciness(values)
            .then((response) => {
               toast.success(response.data.message)
            })
            .catch((error) => {
               console.log(error)
            })
      },
   },
})
