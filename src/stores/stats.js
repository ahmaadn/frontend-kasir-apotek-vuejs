import { reportSales, reportStock } from '@/lib/api/report'
import { defineStore } from 'pinia'
import dayjs from 'dayjs'

export const useStats = defineStore('stateStore', {
   state: () => ({
      count_medicine: 0,
      count_employes: 0,
      report_sales: [
         {
            summaryid: 0,
            summarydate: '2025-01-13',
            totalincome: 0,
            totalmedicinessold: 0,
            totaltransactions: 0,
            topmedicine: ['string'],
            totalcashpayments: 0,
            totalqrispayments: 0,
            cashpaymentcount: 0,
            qristransactioncount: 0,
            createdat: '2025-01-13T06:39:53.195Z',
            updatedat: '2025-01-13T06:39:53.195Z',
         },
      ],
      report_stock: [
         {
            recordDate: '2025-01-13',
            medicines: [
               {
                  medicineid: 'string',
                  stockin: 0,
                  stockout: 0,
                  remainingStock: 0,
               },
            ],
         },
      ],
   }),
   actions: {
      async initial() {},
      async fetchReportSales() {
         await reportSales().then((response) => {
            const { data } = response.data
            this.report_sales = data
         })
      },
      async fetchReportStock() {
         await reportStock().then((response) => {
            const { data } = response.data
            this.report_stock = data
         })
      },

      async last7DaysReportStock(refresh = false) {
         if (!this.report_stock.length || refresh) {
            await this.fetchReportStock()
         }
         const today = dayjs()
         const last7Days = []
         for (let i = 0; i < 7; i++) {
            last7Days.push(today.subtract(i, 'day').format('YYYY-MM-DD'))
         }
         const last7DaysReport = this.report_stock.filter((report) =>
            last7Days.includes(report.recordDate),
         )
         return last7DaysReport
      },

      async todayReportStock(refresh = false) {
         if (!this.report_stock.length || refresh) {
            await this.fetchReportStock()
         }
         const today = dayjs().format('YYYY-MM-DD')
         const todayStock = this.report_stock.find((report) => report.recordDate === today)
         return todayStock
            ? todayStock.medicines.reduce((total, medicine) => total + medicine.stockin, 0)
            : 0
      },

      async todayReportSales(refresh = false) {
         if (!this.report_sales.length || refresh) {
            await this.fetchReportSales()
         }
         const today = dayjs().format('YYYY-MM-DD')
         const todayReport = this.report_sales.filter((report) => report.summarydate === today)
         return todayReport.length ? todayReport[0] : {}
      },

      async last7DaysReportSales(refresh = false) {
         if (!this.report_sales.length || refresh) {
            await this.fetchReportSales()
         }
         const today = dayjs()
         const last7Days = []
         for (let i = 0; i < 7; i++) {
            last7Days.push(today.subtract(i, 'day').format('YYYY-MM-DD'))
         }
         const last7DaysReport = this.report_sales.filter((report) =>
            last7Days.includes(report.summarydate),
         )
         return last7DaysReport
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
