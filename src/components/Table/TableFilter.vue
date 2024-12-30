<script setup>
import { FormInput, FormCheckboxCard } from '@/components/Form'
import TablePerRows from './TablePerRows.vue'
import { Icon } from '@iconify/vue'
import { ref } from 'vue'

const props = defineProps({
   options: {
      type: Object,
      required: true,
   },
})

const items = defineModel('items', { required: true })
const dataTable = defineModel('dataTable', { required: true })

const search = ref(props.options?.search.default || '')
const checked = ref(props.options?.checkbox.default || [])

const onReset = () => {
   dataTable.value.updateRowsPerPageActiveOption(dataTable.value?.rowsPerPageOptions[0])
   search.value = ''
   checked.value = []
}

const filteredEmployeeList = () => {
   let filtered = items.value

   if (search.value && !props.options.search.hide) {
      filtered = props.options.search.filtered(filtered, search.value)
   }

   if (checked.value.length > 0 && !props.options.checkbox.hide) {
      filtered = props.options.checkbox.filtered(filtered, checked.value)
   }
   return filtered
}
</script>

<template>
   <main class="flex flex-col gap-4">
      <div
         v-if="!options.search.hide || !options.checkbox.hide"
         class="flex flex-row gap-4 justify-between w-full flex-wrap"
      >
         <FormInput
            v-if="!options.search.hide"
            name="search"
            class="w-full md:max-w-sm"
            placeholder="Cari nama Pegawai"
            icon-left="mdi:search"
            v-model="search"
            :show-error="false"
         />
         <FormCheckboxCard
            v-if="!options.checkbox.hide"
            class="dropdown-end"
            :label="options.checkbox.label"
            :items="['Admin', 'Pengelola Gudang', 'Kasir']"
            v-model="checked"
         />
      </div>
      <div class="flex flex-row gap-4 justify-between w-full flex-wrap">
         <TablePerRows v-model:data-table="dataTable" />
         <button class="btn btn-sm btn-outline border-base-300 shadow" @click="onReset">
            <Icon icon="mdi:filter-minus-outline" width="18" height="18" />
            Reset
         </button>
      </div>
      <slot
         :items="filteredEmployeeList()"
         :search="search"
         :checked="checked"
         :selected="selected"
      ></slot>
   </main>
</template>
