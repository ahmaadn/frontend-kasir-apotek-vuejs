<script setup>
import { useCartStore } from '@/stores/cart'
import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogTitle } from '@headlessui/vue'
import { currency } from '@/lib/utils'

const props = defineProps({ responeMessages: Object })
const open = defineModel('open', { default: false })
const carts = useCartStore()

const closeModal = () => {
   open.value = false
   carts.clearCarts()
   carts.clearBuyer()
}
</script>

<template>
   <TransitionRoot appear :show="open" as="template">
      <Dialog as="div" class="relative z-10">
         <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100"
            leave-to="opacity-0"
         >
            <div class="fixed inset-0 bg-black/25" />
         </TransitionChild>

         <div class="fixed inset-0 overflow-y-auto">
            <div class="flex min-h-full items-center justify-center p-4 text-center">
               <TransitionChild
                  as="template"
                  enter="duration-300 ease-out"
                  enter-from="opacity-0 scale-95"
                  enter-to="opacity-100 scale-100"
                  leave="duration-200 ease-in"
                  leave-from="opacity-100 scale-100"
                  leave-to="opacity-0 scale-95"
               >
                  <DialogPanel
                     class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
                  >
                     <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">
                        Payment successful
                     </DialogTitle>
                     <div class="mt-2 text-gray-500">
                        <p>
                           {{ props.responeMessages.message }}
                        </p>
                        <p>
                           Uang Kembalian
                           <span class="font-normal">{{
                              currency(props.responeMessages.change)
                           }}</span>
                        </p>
                     </div>

                     <div class="mt-4">
                        <button
                           type="button"
                           class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                           @click="closeModal"
                        >
                           Got it, thanks!
                        </button>
                     </div>
                  </DialogPanel>
               </TransitionChild>
            </div>
         </div>
      </Dialog>
   </TransitionRoot>
</template>
