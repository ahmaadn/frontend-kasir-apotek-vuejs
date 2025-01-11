import { getUserList } from '@/lib/api/user'
import { defineStore } from 'pinia'

export const useEmployeeStore = defineStore('employeeStore', {
   state: () => ({
      employees: [],
      roles: {
         ADM: 'Admin',
         CSR: 'Kasir',
         WRH: 'Pengelola Gudang',
      },
   }),
   getters: {
      getEmployee: (state) => state.employees,
      getRole: (state) => state.roles,
   },
   actions: {
      setEmployees(values) {
         this.employees = values
      },
      clearEmployees() {
         this.employees = []
      },
      async fetchEmployee() {
         await getUserList().then((response) => {
            const { data } = response.data
            this.setEmployees(data)
         })
      },
   },
})
