<script setup>
import { Icon } from '@iconify/vue'
import { computed } from 'vue'

const dataTable = defineModel('dataTable', { required: true })

const firstPageIndex = computed(() => dataTable.value?.currentPageFirstIndex)
const lastPageIndex = computed(() => dataTable.value?.currentPageLastIndex)
const itemsLength = computed(() => dataTable.value?.clientItemsLength)

const isFirstPage = computed(() => dataTable.value?.isFirstPage)
const isLastPage = computed(() => dataTable.value?.isLastPage)

const nextPage = () => {
   dataTable.value.nextPage()
}
const prevPage = () => {
   dataTable.value.prevPage()
}
</script>

<template>
   <div class="flex md:flex-row justify-between">
      <p class="font-normal text-sm">
         Showing {{ firstPageIndex }} to {{ lastPageIndex }} of {{ itemsLength }} results
      </p>
      <ol class="flex justify-center gap-1 text-xs font-medium">
         <li>
            <button
               class="btn btn-sm btn-outline shadow btn-square border-base-300"
               :disabled="isFirstPage"
               @click="prevPage"
            >
               <span class="sr-only">Prev Page</span>
               <Icon icon="mdi:navigate-before" width="24" height="24" />
            </button>
         </li>
         <li>
            <button
               class="btn btn-sm btn-outline shadow btn-square border-base-300"
               :disabled="isLastPage"
               @click="nextPage"
            >
               <span class="sr-only">Next Page</span>
               <Icon icon="mdi:navigate-next" width="24" height="24" />
            </button>
         </li>
      </ol>
   </div>
</template>
