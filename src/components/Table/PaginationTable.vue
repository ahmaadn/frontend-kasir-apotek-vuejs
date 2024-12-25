<script setup>
import { Icon } from '@iconify/vue'
import { computed } from 'vue'

const dataTable = defineModel('dataTable', { required: true })

const firstPageIndex = computed(() => dataTable.value?.currentPageFirstIndex)
const lastPageIndex = computed(() => dataTable.value?.currentPageLastIndex)
const itemsLength = computed(() => dataTable.value?.clientItemsLength)

const maxPageNumber = computed(() => dataTable.value?.maxPaginationNumber)
const currentPage = computed(() => dataTable.value?.currentPaginationNumber)

const isFirstPage = computed(() => dataTable.value?.isFirstPage)
const isLastPage = computed(() => dataTable.value?.isLastPage)

const nextPage = () => {
   dataTable.value.nextPage()
}
const prevPage = () => {
   dataTable.value.prevPage()
}
const updatePage = (value) => {
   dataTable.value.updatePage(value)
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

         <li v-if="currentPage != firstPageIndex && maxPageNumber > 3">
            <button
               class="btn btn-sm btn-outline shadow btn-square border-base-300"
               :class="{
                  'btn-primary': currentPage == firstPageIndex,
                  'btn-outline': currentPage != firstPageIndex,
               }"
               @click="updatePage(1)"
            >
               {{ firstPageIndex }}
            </button>
         </li>
         <li v-for="page in maxPageNumber" v-bind:key="page">
            <button
               class="btn btn-sm shadow btn-square border-base-300"
               :class="{
                  'btn-primary': currentPage == page,
                  'btn-outline': currentPage != page,
               }"
               @click="updatePage(page)"
            >
               {{ page }}
            </button>
         </li>
         <li v-if="currentPage != lastPageIndex && maxPageNumber - 3 > 3">
            <a
               href="#"
               class="btn btn-sm btn-outline shadow btn-square border-base-300"
               :class="{
                  'btn-primary': currentPage == lastPageIndex,
                  'btn-outline': currentPage != lastPageIndex,
               }"
               >{{ lastPageIndex }}</a
            >
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
