<script setup>
import 'vue3-easy-data-table/dist/style.css'
import '@/assets/css/table.css'
import 'vue-select/dist/vue-select.css'

import { TableFilter, TablePagination } from '@/components/Table'
import SelectCategory from '../SelectCategory.vue'
import { ref } from 'vue'
import { computed } from 'vue'
import { currency } from '@/lib/utils'

const loading = defineModel('loading', { default: false })
const dataTable = ref()
const selected = ref([])
const mediciness = defineModel('mediciness', { required: true })

const filterItems = computed(() => {
   if (selected.value.length === 0) {
      return mediciness.value
   }
   return mediciness.value.filter((medicine) => {
      return medicine.categories.some((category) => {
         return selected.value.includes(category.categoryID)
      })
   })
})

const options = {
   checkbox: {
      label: 'Avalailable',
      options: ['Available', 'Deleted'],
      filtered: function (items, checked) {
         return items.filter((item) => {
            return checked.includes(item.isDeleted ? 'Deleted' : 'Available')
         })
      },
   },
   search: {
      default: '',
      filtered: function (items, search) {
         return items.filter((item) => {
            return item.medicinename.toLowerCase().includes(search.toLowerCase())
         })
      },
   },
}

const headers = [
   { text: 'Name', value: 'medicinename', sortable: true, fixed: false, width: 300 },
   { text: 'Brand', value: 'brand' },
   { text: 'harga', value: 'price', sortable: true },
   { text: 'Amount', value: 'amount', sortable: true },
   { text: 'Unit', value: 'unit' },
]

const onReset = () => {
   selected.value = []
}

const deletedClass = (item) => {
   return item.isDeleted ? 'line-through italic' : ''
}
</script>

<template>
   <div class="p-6 space-y-6">
      <SelectCategory v-model:selected="selected" />
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
            :body-row-class-name="deletedClass"
            hide-footer
            show-index
         >
            <template #loading>
               <span class="loading loading-infinity loading-lg"></span>
            </template>
            <template #item-medicinename="{ medicinename, isDeleted }">
               <div class="flex flex-row gap-1">
                  <p class="font-semibold">{{ medicinename }}</p>
                  <div v-if="isDeleted" class="!no-underline !not-italic">
                     <span class="badge badge-sm badge-error bg-error/20 badge-outline">
                        Deleted
                     </span>
                  </div>
               </div>
            </template>
            <template #item-price="{ price }">
               {{ currency(price) }}
            </template>
         </EasyDataTable>
      </TableFilter>
      <TablePagination v-model:dataTable="dataTable" />
   </div>
</template>
