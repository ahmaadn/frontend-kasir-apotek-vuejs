<script setup>
import { FormInput, FormCheckboxCard, FormSelect } from '@/components/Form'
import { Icon } from '@iconify/vue'
import { ref, computed } from 'vue'

const props = defineProps(['options'])
const items = defineModel('items', { required: true })
const dataTable = defineModel('dataTable', { required: true })

const search = ref(props.options?.search.default || '')
const checked = ref(props.options?.checkbok.default || [])

const selectOptions = computed(() => dataTable.value?.rowsPerPageOptions)
const selected = computed(() => dataTable.value?.rowsPerPageActiveOption)

const updateRowsPerPageSelect = (e) => {
   dataTable.value.updateRowsPerPageActiveOption(Number(e.target.value))
}

const onReset = () => {
   dataTable.value.updateRowsPerPageActiveOption(dataTable.value?.rowsPerPageOptions[0])
   search.value = ''
   checked.value = []
}

const filteredEmployeeList = () => {
   let filtered = items.value

   if (search.value) {
      filtered = props.options.search.filtered(filtered, search.value)
   }

   if (checked.value.length > 0) {
      filtered = props.options.checkbok.filtered(filtered, checked.value)
   }
   return filtered
}
</script>

<template>
   <main class="flex flex-col gap-4">
      <div class="flex flex-row gap-4 justify-between w-full flex-wrap">
         <FormInput
            placeholder="Cari nama Pegawai"
            name="search"
            class="w-full md:max-w-sm"
            iconLeft="mdi:search"
            v-model="search"
         />
         <FormCheckboxCard
            label="Filter Role"
            class="dropdown-end"
            :items="['Admin', 'Pengelola Gudang', 'Kasir']"
            v-model="checked"
         />
      </div>
      <div class="flex flex-row gap-4 justify-between w-full flex-wrap">
         <div class="inline-flex text-sm text-nowrap items-center gap-x-4 font-normal">
            <span>Rows per page</span>
            <FormSelect
               :options="selectOptions"
               :selected="selected"
               @change="updateRowsPerPageSelect"
            />
         </div>
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
