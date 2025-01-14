<script setup>
import 'vue3-easy-data-table/dist/style.css'
import '@/assets/css/table.css'

import { TablePagination } from '@/components/Table'
import { useBatchMedicine } from '@/stores/batch'
import { ref } from 'vue'
import { onMounted } from 'vue'
import { toast } from 'vue-sonner'
import { reportStockExport } from '@/lib/api/report'
import { Icon } from '@iconify/vue'

const batchMedicine = useBatchMedicine()
const dataTable = ref()
const loading = ref(true)
const loaded = ref(false)

const headers = [
   { text: 'batch id', value: 'batchid' },
   { text: 'Di Masukan tgl', value: 'entryat' },
   { text: 'Aksi', value: 'action' },
]

const onClick = async () => {
   toast('Waitt....')
   loaded.value = true
   await reportStockExport()
      .then((response) => {
         toast.success('Download ...')
         const url = window.URL.createObjectURL(new Blob([response.data]))
         const a = document.createElement('a')
         a.href = url
         const filename = 'report stock.xlsx'
         a.setAttribute('download', filename)
         document.body.appendChild(a)
         a.click()
         a.remove()
      })
      .catch((error) => console.error(error))
   loaded.value = false
}

onMounted(async () => {
   await batchMedicine.fetchBatch()
   loading.value = false
})
</script>
<template>
   <div class="bg-base-100 shadow border rounded">
      <div class="py-4 px-6 flex flex-row justify-between items-center">
         <h1 class="md:text-2xl text-lg font-medium">{{ $route.meta.title }}</h1>
         <button @click="onClick" :disabled="loaded" class="btn btn-success text-white btn-sm">
            Export
            <Icon icon="mdi:file-excel-outline" width="24" height="24" />
         </button>
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
