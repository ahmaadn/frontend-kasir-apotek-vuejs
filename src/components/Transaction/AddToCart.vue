<script setup>
import { Icon } from '@iconify/vue'
import { toast } from 'vue-sonner'
import { useCartStore } from '@/stores/cart'
import { currency, clamp } from '@/lib/utils'
import { ref } from 'vue'
import { onMounted } from 'vue'

const props = defineProps({
   item: Object,
})

const cartsStore = useCartStore()
const number = ref()

const increment = (value) => {
   const amount = number.value || 0
   number.value = clamp(amount + value, 0, props.item.stock)
}

const updateCart = () => {
   if (number.value >= 1) {
      const amount = clamp(number.value, 0, props.item.stock)

      if (amount >= 0) {
         cartsStore.addToCart(props.item.medicineID, amount, props.item)
      }
      if (amount > 0) {
         toast.success(
            `obat ${props.item.medicineName} telah dimasukkan ke keranjang sebanyak ${amount}`,
         )
      } else if (amount == 0) {
         toast.warning(`Obat ${props.item.medicineName} telah dihapus di keranjang`)
      }
      number.value = amount
   }
}
const clearCart = () => {
   cartsStore.removeCart(props.item.medicineID)
   if (number.value != 0) {
      number.value = null
      toast.warning(`Obat ${props.item.medicineName} telah dihapus di keranjang`)
   }
}

onMounted(() => {
   const carts = cartsStore.carts.filter((cart) => cart.medicineid === props.item.medicineID)
   if (carts.length == 1) {
      const cart = carts[0]
      number.value = cart.amount
   }
})
</script>
<template>
   <div @submit="onSubmit" class="flex items-center justify-end gap-4">
      <div class="inline-flex items-center gap-2 p-2">
         <button
            type="button"
            class="btn btn-circle btn-xs btn-outline btn-neutral"
            @click="increment(-1)"
         >
            <Icon icon="mdi:minus" width="24" height="24" />
         </button>
         <input
            class="w-10 rounded border-2"
            type="number"
            min="1"
            :max="props.item.stock"
            v-model="number"
         />
         <button
            type="button"
            class="btn btn-circle btn-xs btn-outline btn-neutral"
            @click="increment(1)"
         >
            <Icon icon="mdi:plus" width="24" height="24" />
         </button>
      </div>
      <div class="font-xl w-24 text-wrap">
         {{ currency((number || 0) * props.item.price) }}
      </div>
      <div class="btn btn-xs btn-warning" @click="clearCart">Clear</div>
      <div class="btn btn-xs btn-primary" @click="updateCart">Add</div>
   </div>
</template>
<style lang="css" scoped>
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
   -webkit-appearance: none;
   margin: 0;
}
/* Firefox */
input[type='number'] {
   -moz-appearance: textfield;
}
</style>
