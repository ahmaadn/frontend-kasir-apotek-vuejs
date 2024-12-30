<script setup>
import 'vue3-easy-data-table/dist/style.css'
import '@/assets/css/table.css'

import { TableFilter, TablePagination } from '@/components/Table'
import { getCategoryMedicine } from '@/lib/api/category'
import { onMounted, ref } from 'vue'
import { toast } from 'vue-sonner'

const options = {
   checkbox: {
      hide: true,
   },
   search: {
      default: '',
      filtered: function (items, search) {
         return items.filter((item) => {
            return (
               item.categoryname.toLowerCase().includes(search.toLowerCase()) ||
               item.categorydescription.toLowerCase().includes(search.toLowerCase())
            )
         })
      },
   },
}

const headers = [
   { text: 'ID', value: 'categoryid' },
   { text: 'Name', value: 'categoryname', sortable: true, fixed: false, width: 300 },
   { text: 'description', value: 'categorydescription' },
]

const dataTable = ref()
const categories = ref([])

const loadCategory = async () => {
   await getCategoryMedicine()
      .then((res) => {
         const data = res.data
         categories.value = data.data
         toast.success(data.message)
         console.log(data)
      })
      .catch((err) => {
         console.log(err)
      })
}

onMounted(loadCategory)
</script>
<template>
   <div class="bg-base-100 shadow border rounded">
      <div class="py-4 px-6 flex flex-row justify-between items-center">
         <h1 class="md:text-2xl text-lg font-medium">Daftar Kategori Obat Saat Ini</h1>
         <button class="btn btn-success btn-sm text-white">Tambah</button>
      </div>
      <div class="p-6 space-y-6">
         <TableFilter
            :options="options"
            v-model:dataTable="dataTable"
            v-model:items="categories"
            v-slot="{ items }"
         >
            <EasyDataTable
               ref="dataTable"
               :headers="headers"
               :items="items"
               hide-footer
               show-index
            ></EasyDataTable>
         </TableFilter>
         <TablePagination v-model:dataTable="dataTable" />
      </div>
   </div>
</template>
