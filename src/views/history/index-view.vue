<script setup>
import 'vue3-easy-data-table/dist/style.css'
import '@/assets/css/table.css'

import { TablePagination } from '@/components/Table'
import { useBatchMedicine } from '@/stores/batch'
import { ref } from 'vue'
import { onMounted } from 'vue'

const batchMedicine = useBatchMedicine()
const dataTable = ref()
const loading = ref(true)

const headers = [
   { text: 'batch id', value: 'batchid' },
   { text: 'Di Masukan tgl', value: 'entryat' },
   { text: 'Aksi', value: 'action' },
]

onMounted(async () => {
   await batchMedicine.fetchBatch()
   loading.value = false
})
</script>
<template>
   <div class="bg-base-100 shadow border rounded">
      <div class="py-4 px-6 flex flex-row justify-between items-center">
         <h1 class="md:text-2xl text-lg font-medium">{{ $route.meta.title }}</h1>
      </div>
      <div class="p-6 space-y-6">
         <EasyDataTable
            ref="dataTable"
            :headers="headers"
            :items="batchMedicine.getBatch"
            :loading="loading"
            hide-footer
            show-index
         >
            <template #loading>
               <span class="loading loading-infinity loading-lg"></span>
            </template>
            <template #item-action="item">
               <router-link
                  :to="{ name: 'DetailHistoryMedicine', params: { id: item.batchid } }"
                  class="btn btn-xs btn-info"
               >
                  detail
               </router-link>
            </template>
         </EasyDataTable>
         <TablePagination v-model:dataTable="dataTable" />
      </div>
   </div>
</template>
