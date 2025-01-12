<script setup>
import 'vue3-easy-data-table/dist/style.css'
import '@/assets/css/table.css'
import 'vue-select/dist/vue-select.css'

import { TableFilter, TablePagination } from '@/components/Table'
import { onMounted, ref } from 'vue'
import { formatDate, currency } from '@/lib/utils'
import { useTransactionStore } from '@/stores/transaction'
import TransactionDetail from './TransactionDetail.vue'

const loading = ref(false)
const dataTable = ref()
const selected = ref([])
const useTransaction = useTransactionStore()

const options = {
   checkbox: {
      hide: true,
   },
   search: {
      default: '',
      filtered: function (items, search) {
         return items.filter((item) => {
            return item.buyername.includes(search.toLowerCase())
         })
      },
   },
}

const headers = [
   { text: 'Tanggal', value: 'trdate', sortable: true, fixed: false },
   { text: 'Total harga', value: 'total' },
   { text: 'Metode', value: 'payment', sortable: true },
   { text: 'Kembalian', value: 'change', sortable: true },
   { text: 'Dibayar', value: 'amount_given' },
   { text: 'Pembeli', value: 'buyername' },
   // { text: 'Petugas Kasir', value: 'kasir' },
   { text: 'Petugas Kasir', value: 'action' },
]

const onReset = () => {
   selected.value = []
}

onMounted(async () => {
   loading.value = true
   await useTransaction.fetchHistotyTransaction()
   loading.value = false
})
</script>

<template>
   <div class="p-6 space-y-6">
      <TableFilter
         :options="options"
         v-model:items="useTransaction.histories"
         v-model:dataTable="dataTable"
         v-slot="{ items }"
         @reset="onReset"
      >
         <EasyDataTable
            ref="dataTable"
            :headers="headers"
            :items="items"
            :loading="loading"
            hide-footer
            show-index
         >
            <template #loading>
               <span class="loading loading-infinity loading-lg"></span>
            </template>
            <template #item-trdate="item">
               {{ formatDate(item.trdate) }}
            </template>
            <template #item-total="{ total }">
               {{ currency(total) }}
            </template>
            <template #item-payment="{ payment }">
               <span
                  class="badge badge-sm badge-outline"
                  :class="{
                     'badge-primary bg-primary/20': payment == 'qris',
                     'badge-secondary bg-secondary/20': payment == 'cash',
                  }"
               >
                  {{ payment }}
               </span>
            </template>
            <template #item-amount_given="{ amount_given }">
               {{ currency(amount_given) }}
            </template>
            <template #item-buyername="{ buyername }">
               <span class="text-center">
                  {{ buyername || '-' }}
               </span>
            </template>
            <template #item-price="{ price }">
               {{ currency(price) }}
            </template>
            <template #item-action="item">
               <TransactionDetail :id="item.trid" />
            </template>
         </EasyDataTable>
      </TableFilter>
      <TablePagination v-model:dataTable="dataTable" />
   </div>
</template>
