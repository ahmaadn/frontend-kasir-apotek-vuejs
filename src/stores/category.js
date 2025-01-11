import { defineStore } from 'pinia'
import { listCategories, createCategories, deleteCategories } from '@/lib/api/category'
import { toast } from 'vue-sonner'

export const useCategoryStore = defineStore('categoryStore', {
   state: () => ({
      categories: [],
   }),
   actions: {
      setCategories(data) {
         this.categories = data
      },
      clearCategories() {
         this.categories = []
      },
      fetchCategories() {
         return new Promise((resolve, reject) => {
            listCategories()
               .then((response) => {
                  const { data } = response.data
                  this.setCategories(data)
                  resolve(response)
               })
               .catch((error) => {
                  reject(error)
               })
         })
      },
      async createCategories(values) {
         await createCategories(values)
            .then(async (response) => {
               const { successes, errors } = response.data
               if (successes.length) {
                  toast.success(`${successes.length} new categories successfully created`)
               }
               if (errors.length) {
                  toast.error(`${errors.length} new categories failed to be created`)
               }
               await this.fetchCategories()
            })
            .catch((error) => {
               console.error(error)
            })
      },
      async deleteCategory(id) {
         await deleteCategories(id).then(async (response) => {
            toast.success(response.data.message)
            await this.fetchCategories()
         })
      },
   },
})
