<script setup>
import { FormInput, FormCheckboxCard } from '@/components/Form'
import TableOptionRows from './TableOptionRows.vue'
import { Icon } from '@iconify/vue'
import { onMounted } from 'vue'

const props = defineProps({
   options: {
      type: Object,
      required: true,
   },
})

const items = defineModel('items', { required: true })
const dataTable = defineModel('dataTable', { required: true })
const search = defineModel('search', { default: '' })
const checked = defineModel('checked', { default: [] })
const emit = defineEmits(['reset'])

const onReset = () => {
   dataTable.value.updateRowsPerPageActiveOption(dataTable.value?.rowsPerPageOptions[0])
   search.value = props.options?.search.reset || ''
   checked.value = props.options?.search.reset || []
   emit('reset')
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

onMounted(() => {
   if (props.options?.search.default) {
      search.value = props.options.search.default
   }
   if (props.options?.checkbox.default) {
      checked.value = props.options.checkbox.default
   }
})
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
            placeholder="Search"
            icon-left="mdi:search"
            v-model="search"
            :show-error="false"
         />
         <FormCheckboxCard
            v-if="!options.checkbox.hide"
            class="dropdown-end"
            :label="options.checkbox.label"
            :items="options.checkbox.options"
            v-model="checked"
         />
      </div>
      <div class="flex flex-row gap-4 justify-between w-full flex-wrap">
         <TableOptionRows v-model:data-table="dataTable" />
         <button class="btn btn-sm btn-outline border-base-300 shadow" @click="onReset">
            <Icon icon="mdi:filter-minus-outline" width="18" height="18" />
            Reset
         </button>
      </div>
      <slot :items="filteredEmployeeList()" :search="search" :checked="checked"></slot>
   </main>
</template>
