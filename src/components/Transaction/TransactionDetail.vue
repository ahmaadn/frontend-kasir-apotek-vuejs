<script setup>
import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogTitle } from '@headlessui/vue'
import { currency, formatDate } from '@/lib/utils'
import { useMedicineStore } from '@/stores/medicine'
import { ref } from 'vue'
import { useTransactionStore } from '@/stores/transaction'

const props = defineProps({ id: String })
const useMedicine = useMedicineStore()
const useTransaction = useTransactionStore()
const transaction = ref({})
const medicines = ref({})
const open = ref(false)
const loading = ref(false)

const closeModal = () => {
   open.value = false
}

const openModal = async () => {
   loading.value = true
   if (!useMedicine.mediciness.length) {
      await useMedicine.fetchMediciness()
   }
   transaction.value = await useTransaction.detailTransaction(props.id)
   medicines.value = transaction.value.medicines.map((medicineData) => {
      let medicine = useMedicine.getMedicineById(medicineData.medicineid)
      if (medicine.length >= 1) {
         return {
            ...medicineData,
            ...medicine[0],
         }
      }
      return medicineData
   })
   loading.value = false
   open.value = true
}
</script>

<template>
   <div class="flex items-center justify-center">
      <button class="btn btn-xs btn-success text-white" @click="openModal" :disabled="loading">
         Detail
      </button>
   </div>
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
                     <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900 pb-3">
                        Riwayat pembelian
                     </DialogTitle>
                     <div class="grid grid-cols-[20%_1fr] gap-x-1">
                        <p>Nota id</p>
                        <p>: {{ transaction.trid }}</p>
                        <p>Kasir</p>
                        <p>: {{ transaction.userid }}</p>
                        <p>Tanggal</p>
                        <p>: {{ formatDate(transaction.trdate) }}</p>
                        <p>Pembeli</p>
                        <p>: {{ transaction.buyername || '-' }}</p>
                     </div>
                     <div class="divider"></div>
                     <div
                        v-for="(medicine, index) in medicines"
                        :key="index"
                        class="grid grid-cols-3 gap-x-2"
                     >
                        <p>{{ medicine.medicineName }}</p>
                        <p class="text-center">{{ medicine.amount }}x</p>
                        <p class="text-end">{{ currency(medicine.price * medicine.amount) }}</p>
                     </div>
                     <div class="divider"></div>
                     <div class="grid grid-cols-2">
                        <p>Total</p>
                        <p class="font-normal text-end">
                           {{ currency(transaction.total) }}
                        </p>
                        <p>Dibayar</p>
                        <p class="font-normal text-end">
                           {{ currency(transaction.total + transaction.change) }}
                        </p>
                        <p>Kembalian</p>
                        <p class="font-normal text-end">
                           {{ currency(transaction.change) }}
                        </p>
                     </div>

                     <div class="mt-4">
                        <button
                           type="button"
                           class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                           @click="closeModal"
                        >
                           Kembali
                        </button>
                     </div>
                  </DialogPanel>
               </TransitionChild>
            </div>
         </div>
      </Dialog>
   </TransitionRoot>
</template>
