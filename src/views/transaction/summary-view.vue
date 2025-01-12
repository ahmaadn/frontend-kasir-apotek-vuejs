<script setup>
import { FormInput } from '@/components/Form'
import { useMedicineStore } from '@/stores/medicine'
import { useCartStore } from '@/stores/cart'
import { currency } from '@/lib/utils'

const medicine = useMedicineStore()
const cartStore = useCartStore()
</script>

<template>
   <main class="rounded">
      <div class="md:grid grid-cols-[1fr_40%] gap-6 flex flex-col">
         <div class="card bg-base-100 shadow border rounded">
            <div class="card-body">
               <div class="py-4 px-6 flex flex-row justify-between items-center">
                  <h1 class="md:text-2xl text-lg font-medium">Informasi pembeli</h1>
               </div>
               <div>
                  <FormInput />
                  <FormInput />
                  <FormInput />
               </div>
            </div>
         </div>
         <div class="card bg-base-100 shadow border rounded">
            <div class="card-body">
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
               <div class="divide-y"></div>
               <div class="grid grid-cols-2 text-sm">
                  <p>Total Harga</p>
                  <p class="text-end">Rp 300000</p>
               </div>
            </div>
         </div>
      </div>
   </main>
</template>
