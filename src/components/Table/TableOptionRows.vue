<script setup>
import { computed } from 'vue'

const dataTable = defineModel('dataTable', { required: true })
const selectOptions = computed(() => dataTable.value?.rowsPerPageOptions)
const selected = computed(() => dataTable.value?.rowsPerPageActiveOption)

const updateRowsPerPageSelect = (e) => {
   dataTable.value.updateRowsPerPageActiveOption(Number(e.target.value))
}
</script>

<template>
   <div class="inline-flex text-sm text-nowrap items-center gap-x-4 font-normal">
      <span>Rows per page</span>
      <select
         @change="updateRowsPerPageSelect"
         class="select select-bordered w-full border-base-300 select-sm shadow rounded min-w-24"
      >
         <option
            v-for="(option, index) in selectOptions"
            :key="index"
            :value="option"
            :selected="option == selected.value"
         >
            {{ option }}
         </option>
      </select>
   </div>
</template>
