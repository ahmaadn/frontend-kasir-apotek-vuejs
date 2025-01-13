<script setup>
import 'vue3-easy-data-table/dist/style.css'
import '@/assets/css/table.css'
import 'vue-select/dist/vue-select.css'

import { TablePagination } from '@/components/Table'
import { onMounted, ref } from 'vue'
import { currency } from '@/lib/utils'
import { useTransactionStore } from '@/stores/transaction'

const loading = ref(false)
const dataTable = ref()
const useTransaction = useTransactionStore()
const historis = ref([])

const headers = [
   { text: 'Metode', value: 'payment', sortable: true },
   { text: 'Total harga', value: 'total' },
   { text: 'Dibayar', value: 'amount_given' },
   { text: 'Kembalian', value: 'change', sortable: true },
]

onMounted(async () => {
   loading.value = true
   await useTransaction.fetchHistotyTransaction()
   historis.value = await useTransaction.todayHistory()
   loading.value = false
})
</script>

<template>
   <div class="card bg-base-100 rounded shadow">
      <div class="card-body p-6">
         <div class="card-title">
            <p>Transaksi terbaru</p>
         </div>
         <EasyDataTable
            ref="dataTable"
            :headers="headers"
            :items="historis"
            :loading="loading"
            :rows-per-page="5"
            hide-footer
            show-index
         >
            <template #loading>
               <span class="loading loading-infinity loading-lg"></span>
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
            <template #item-price="{ price }">
               {{ currency(price) }}
            </template>
         </EasyDataTable>
         <TablePagination v-model:dataTable="dataTable" />
      </div>
   </div>
</template>
