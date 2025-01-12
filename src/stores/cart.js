import { defineStore } from 'pinia'

export const useCartStore = defineStore('cartStore', {
   state: () => ({
      carts: [],
   }),
   getters: {
      totalPrice: (state) => {
         return state.carts.reduce((total, cart) => {
            return total + cart.amount * cart.data.price
         }, 0)
      },
   },
   actions: {
      addToCart(medicineid, amount, data) {
         const existingCart = this.carts.find((cart) => cart.medicineid === medicineid)
         if (existingCart) {
            existingCart.amount = amount
            existingCart.data = data
            if (existingCart.amount < 1) {
               this.removeCart(medicineid)
            }
         } else {
            this.carts.push({ medicineid, amount, data })
         }
      },
      removeCart(medicineid) {
         this.carts = this.carts.filter((data) => data.medicineid !== medicineid)
      },
      clearCarts() {
         this.carts = []
      },
   },
   persist: true,
})
