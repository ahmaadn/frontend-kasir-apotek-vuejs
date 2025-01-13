import { reportSales } from '@/lib/api/report'
import { defineStore } from 'pinia'
import dayjs from 'dayjs'

export const useStats = defineStore('stateStore', {
   state: () => ({
      count_medicine: 0,
      count_employes: 0,
      report_sales: [],
      report_stock: [],
   }),
   actions: {
      async initial() {},
      async fetchReportSales() {
         await reportSales().then((response) => {
            const { data } = response.data
            this.report_sales = data
         })
      },
      async fetchReportStock() {},

      async todayReportSales() {
         if (!this.report_sales.length) {
            await this.fetchReportSales()
         }
         const today = dayjs().format('YYYY-MM-DD')
         const todayReport = this.report_sales.filter((report) => report.summarydate === today)
         return todayReport.length ? todayReport[0] : {}
      },

      set_count_medicine(data) {
         this.count_medicine = data
      },
      set_count_employes(data) {
         this.count_employes = data
      },
   },
   persist: true,
})
