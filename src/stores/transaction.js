import { createTransaction, detailTransaction, getTransaction } from '@/lib/api/transaction'
import { defineStore } from 'pinia'
import { useCartStore } from './cart'
import { toast } from 'vue-sonner'
import { useMedicineStore } from './medicine'
import dayjs from 'dayjs'

export const useTransactionStore = defineStore('transactionStore', {
   state: () => ({
      histories: [],
      dataTransaction: {},
   }),
   actions: {
      setHistoryTransaction(data) {
         this.histories = data
      },
      async todayHistory() {
         if (!this.histories.length) {
            await this.fetchHistotyTransaction()
         }
         const today = dayjs().format('YYYY-MM-DD')
         const historyToday = this.histories.filter(
            (history) => dayjs(history.trdate).format('YYYY-MM-DD') === today,
         )
         return historyToday.length ? historyToday : {}
      },
      async cretaeTransaction(buyer) {
         const cart = useCartStore()

         const medicines = cart.carts.map((cart) => ({
            medicineid: cart.medicineid,
            amount: cart.amount,
         }))
         let success = false
         let messages = {}

         await createTransaction({ ...buyer, medicines })
            .then(async (respones) => {
               messages = respones.data
               success = true
               toast.success(messages.message)

               const medicines = messages.medicines
               if (medicines.length) {
                  // menggunakan store medicine untuk mendapatkan detail obat
                  const useMedicine = useMedicineStore()
                  if (!useMedicine.mediciness) {
                     await useMedicine.fetchMediciness()
                  }
                  // menampilkan pesan setip obat yang telah dibelu
                  medicines.forEach((medicine) => {
                     const medicineData = useMedicine.getMedicineById(medicine.medicineid)
                     if (medicineData.length === 1) {
                        toast(medicineData[0].medicineName, medicine.message)
                     }
                  })
               }
            })
            .catch((error) => {
               const data = error.data
               if (data) {
                  if (error?.errors) {
                     toast.error(data.message, data.message.join(', '))
                  } else {
                     toast.error(data.message)
                  }
               }
            })
         return { success, messages }
      },
      async fetchHistotyTransaction() {
         await getTransaction().then((respones) => {
            const { data } = respones.data
            data.sort((a, b) => {
               return new Date(b.trdate) - new Date(a.trdate)
            })

            this.setHistoryTransaction(data)
         })
      },
      async detailTransaction(id) {
         if (this.dataTransaction[id] === undefined) {
            await detailTransaction(id).then((response) => {
               const { message, data } = response.data
               this.dataTransaction[id] = data
               toast.success(message)
            })
         }
         return this.dataTransaction[id]
      },
   },
})
