<script setup>
import { FormInput, FormSelect } from '@/components/Form'
import { useCartStore } from '@/stores/cart'
import { currency } from '@/lib/utils'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { ref } from 'vue'
import { onMounted } from 'vue'
import { SuccessPayment } from '@/components/Transaction'
import { toast } from 'vue-sonner'
import { createTransaction } from '@/lib/api/transaction'

const cartStore = useCartStore()
const payment = ['cash', 'qris']
const open = ref(false)
const loading = ref(false)
const responeMessages = ref({})

const form = useForm({
   validationSchema: toTypedSchema(
      z.object({
         buyername: z.string().optional(),
         payment: z.enum(payment),
         amount_given: z.number().int().positive().min(cartStore.totalPrice),
      }),
   ),
})

const onSubmit = form.handleSubmit(async (values) => {
   loading.value = true
   cartStore.setBuyer(values)
   const medicines = cartStore.carts.map((cart) => ({
      medicineid: cart.medicineid,
      amount: cart.amount,
   }))
   await createTransaction({
      ...cartStore.buyer,
      medicines,
   })
      .then((response) => {
         open.value = true
         loading.value = false
         responeMessages.value = response.data
         toast.success(response.data.message)
         cartStore.clearCarts()
         cartStore.clearBuyer()
      })
      .catch(() => {
         loading.value = false
      })
})

onMounted(cartStore.clearBuyer)
</script>

<template>
   <main class="rounded">
      <div class="md:grid grid-cols-[1fr_40%] gap-6 flex flex-col">
         <div class="bg-base-100 shadow border rounded divide-y h-fit">
            <div class="py-4 px-6 flex flex-row justify-between items-center">
               <h1 class="md:text-2xl text-lg font-medium">Informasi pembeli</h1>
            </div>
            <form @submit="onSubmit" class="p-6 space-y-6">
               <FormInput
                  name="buyername"
                  label="Pembeli (Optional)"
                  type="text"
                  placeholder="Nama Pembeli (Optional)"
               />
               <FormSelect
                  name="payment"
                  label="Metode Pembayaran"
                  :options="payment"
                  placeholder="Metode Pembayaraan"
               />
               <FormInput
                  name="amount_given"
                  label="Uang yang diberikan"
                  type="number"
                  placeholder="Uang"
               />
               <button
                  type="submit"
                  class="btn btn-sm btn-success w-full text-white"
                  :disabled="cartStore.carts.length === 0 || loading"
               >
                  Bayar
               </button>
               <SuccessPayment :respone-messages="responeMessages" v-model:open="open" />
            </form>
         </div>
         <div class="card bg-base-100 shadow border rounded h-fit">
            <div class="card-body p-6">
               <div class="card-title">Ringkasan pesanan</div>
               <div
                  v-for="(cart, number) in cartStore.carts"
                  :key="number"
                  class="grid grid-cols-3 text-sm font-normal"
               >
                  <p>{{ cart.data.medicineName }}</p>
                  <p class="text-center">{{ cart.amount }}x</p>
                  <p class="text-end">{{ currency(cart.amount * cart.data.price) }}</p>
               </div>
               <div class="divider"></div>
               <div class="grid grid-cols-2 text-sm">
                  <p>Total Harga</p>
                  <p class="text-end">{{ currency(cartStore.totalPrice) }}</p>
               </div>
            </div>
         </div>
      </div>
   </main>
</template>
