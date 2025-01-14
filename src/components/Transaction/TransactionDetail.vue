<script setup>
import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogTitle } from '@headlessui/vue'
import { currency, formatDate } from '@/lib/utils'
import html2canvas from 'html2canvas-pro'
import { jsPDF } from 'jspdf'
import { Icon } from '@iconify/vue'

defineProps({ transaction: Object, medicines: Object })
const open = defineModel('open', { default: false })

const closeModal = () => {
   open.value = false
}

const onExport = async () => {
   var element = document.getElementById('element-to-print')
   html2canvas(element).then((canvas) => {
      //$("#previewBeforeDownload").html(canvas);
      var imgData = canvas.toDataURL('image/jpeg', 1)
      var pdf = new jsPDF('p', 'mm', 'a4')
      var pageWidth = pdf.internal.pageSize.getWidth()
      var pageHeight = pdf.internal.pageSize.getHeight()
      var imageWidth = canvas.width
      var imageHeight = canvas.height

      var ratio =
         imageWidth / imageHeight >= pageWidth / pageHeight
            ? pageWidth / imageWidth
            : pageHeight / imageHeight
      pdf.addImage(imgData, 'JPEG', 0, 0, imageWidth * ratio, imageHeight * ratio)
      pdf.save('invoice.pdf')
   })
   open.value = false
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
                     class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all"
                  >
                     <DialogTitle
                        as="h3"
                        class="text-lg font-medium leading-6 text-gray-900 pb-3 pt-6 px-6"
                     >
                        Riwayat pembelian
                     </DialogTitle>
                     <div class="p-6 text-sm" id="element-to-print">
                        <div class="grid grid-cols-[20%_1fr] gap-x-1">
                           <p>Nota id</p>
                           <p>: {{ transaction.trid }}</p>
                           <p>Kasir</p>
                           <p>: {{ transaction.cashier }}</p>
                           <p>Tanggal</p>
                           <p>: {{ formatDate(transaction.trdate) }}</p>
                           <p>Pembeli</p>
                           <p>: {{ transaction.buyername || '-' }}</p>
                        </div>
                        <div class="divider"></div>
                        <div class="grid grid-cols-3 gap-x-2 mb-2 font-bold">
                           <p>Nama</p>
                           <p class="text-center">JML</p>
                           <p class="text-end">Harga</p>
                        </div>
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
                     </div>
                     <div class="mt-4 flex justify-between px-6 pb-6">
                        <button type="button" class="btn btn-sm btn-primary" @click="closeModal">
                           Kembali
                        </button>
                        <button
                           type="button"
                           class="btn btn-sm btn-success text-white"
                           @click="onExport"
                        >
                           Cetek
                           <Icon icon="mdi:invoice-add" width="20" height="20" />
                        </button>
                     </div>
                  </DialogPanel>
               </TransitionChild>
            </div>
         </div>
      </Dialog>
   </TransitionRoot>
</template>
