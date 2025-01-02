<script setup>
import 'vue3-easy-data-table/dist/style.css'
import '@/assets/css/table.css'
import 'vue-select/dist/vue-select.css'

import { TableFilter, TablePagination } from '@/components/Table'
import { listMedicines } from '@/lib/api/medicine'
import { onMounted, ref } from 'vue'
import { toast } from 'vue-sonner'
import { formatDate, currency } from '@/lib/utils'
import { getCategoryMedicine } from '@/lib/api/category'
import { computed } from 'vue'

const loading = ref(false)
const medicines = ref([])
const dataTable = ref()
const selected = ref([])
const categories = ref([])
const filterItems = computed(() => {
   if (selected.value.length === 0) {
      return medicines.value
   }
   return medicines.value.filter((medicine) => {
      return medicine.categories.some((category) => {
         return selected.value.includes(category.categoryID)
      })
   })
})

const options = {
   checkbox: {
      label: 'Avalailable Stock',
      options: ['Available', 'Out Stock'],
      filtered: function (items, checked) {
         return items.filter((item) => {
            return checked.includes(item.stock == 0 ? 'Out Stock' : 'Available')
         })
      },
   },
   search: {
      default: '',
      filtered: function (items, search) {
         return items.filter((item) => {
            return item.medicineName.toLowerCase().includes(search.toLowerCase())
         })
      },
   },
}

const headers = [
   { text: 'Name', value: 'medicineName', sortable: true, fixed: false, width: 300 },
   { text: 'Brand', value: 'brand', width: 100 },
   { text: 'harga', value: 'price', sortable: true, width: 150 },
   { text: 'Stock', value: 'stock', sortable: true, width: 100 },
   { text: 'Unit', value: 'unit', width: 100 },
   { text: 'Created at', value: 'createdat' },
   { text: 'Updated at', value: 'updatedat' },
   { text: 'Aksi', value: 'action' },
]

const fetchMedicines = async () => {
   loading.value = true
   await listMedicines()
      .then((response) => {
         const { data, message } = response.data
         medicines.value = data
         toast.success(message)
      })
      .catch((error) => {
         console.log(error)
      })
   loading.value = false
}

const loadCategory = async () => {
   await getCategoryMedicine()
      .then((res) => {
         const { data } = res.data
         categories.value = data
      })
      .catch((err) => {
         console.log(err)
      })
   loading.value = false
}

onMounted(async () => {
   await fetchMedicines()
   await loadCategory()
})
</script>

<template>
   <div class="p-6 space-y-6">
      <v-select
         multiple
         v-model="selected"
         label="categoryname"
         placeholder="Select Category"
         :options="categories"
         :reduce="(category) => category.categoryid"
         :loading="loading"
         :disabled="loading"
      />
      <TableFilter
         :options="options"
         v-model:items="filterItems"
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
            <template #item-medicineName="{ medicineName, stock }">
               <div class="flex flex-row gap-1">
                  <p class="font-semibold">{{ medicineName }}</p>
                  <span
                     v-if="stock == 0"
                     class="badge badge-sm badge-primary bg-primary/20 badge-outline"
                  >
                     Out Stock
                  </span>
               </div>
            </template>
            <template #item-createdat="{ createdat }">
               {{ formatDate(createdat) }}
            </template>
            <template #item-updatedat="{ updatedat }">
               {{ formatDate(updatedat) }}
            </template>
            <template #item-price="{ price }">
               {{ currency(price) }}
            </template>
            <template #item-action="item">
               <slot name="action" :item="item"> </slot>
            </template>
         </EasyDataTable>
      </TableFilter>
      <TablePagination v-model:dataTable="dataTable" />
   </div>
</template>
