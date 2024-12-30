<script setup>
import { ref } from 'vue'
import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogTitle } from '@headlessui/vue'

const props = defineProps({
   title: String,
   desc: String,
   loading: {
      type: Boolean,
      default: false,
   },
   btnConfirmClass: {
      type: String,
      default: 'btn btn-sm btn-success text-white shadow',
   },
   labelConfrimClass: {
      type: String,
      default: 'Konfirmasi',
   },
   btnCancelClass: {
      type: String,
      default: 'btn btn-sm btn-outline border-base-300 shadow',
   },
   labelCancelClass: {
      type: String,
      default: 'Cancel',
   },
})
const emit = defineEmits(['cancel', 'confirm'])

const isOpen = ref(false)

const closeModal = () => {
   isOpen.value = false
}
const openModal = () => {
   isOpen.value = true
}
const onCancel = () => {
   closeModal()
   emit('cancel')
}
const onConfirm = () => {
   emit('confirm', closeModal)
}
</script>

<template>
   <div class="flex items-center justify-center">
      <slot :isOpen="isOpen" :open="openModal" :close="closeModal"></slot>
   </div>
   <TransitionRoot appear :show="isOpen" as="template">
      <Dialog as="div" @close="closeModal" class="relative z-10">
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
                     class="w-full max-w-md transform overflow-hidden rounded-2xl bg-base-100 p-6 text-left align-middle shadow-xl transition-all"
                  >
                     <DialogTitle
                        as="h3"
                        class="text-lg font-medium leading-6 text-gray-900"
                        v-if="props.title"
                     >
                        {{ props.title }}
                     </DialogTitle>
                     <div class="my-2 min-h-16" v-if="props.desc">
                        <p class="text-sm">
                           {{ props.desc }}
                        </p>
                     </div>

                     <div class="flex items-center justify-between mt-1">
                        <button
                           @click="onConfirm"
                           :class="props.btnConfirmClass"
                           :disabled="props.loading"
                        >
                           {{ props.labelConfrimClass }}
                        </button>
                        <button
                           @click="onCancel"
                           :class="props.btnCancelClass"
                           :disabled="props.loading"
                        >
                           {{ props.labelCancelClass }}
                        </button>
                     </div>
                  </DialogPanel>
               </TransitionChild>
            </div>
         </div>
      </Dialog>
   </TransitionRoot>
</template>
