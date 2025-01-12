import { createTransaction } from '@/lib/api/transaction'
import { defineStore } from 'pinia'
import { useCartStore } from './cart'
import { toast } from 'vue-sonner'

export const useTransactionStore = defineStore('transactionStore', {
   state: () => ({
      histories: [],
   }),
   actions: {
      async cretaeTransaction(buyer) {
         const cart = useCartStore()

         const medicines = cart.carts.map((cart) => ({
            medicineid: cart.medicineid,
            amount: cart.amount,
         }))
         let success = false
         let messages = {}

         await createTransaction({ ...buyer, medicines })
            .then((respones) => {
               messages = respones.data
               success = true
               toast.success(messages.message)
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
   },
})
