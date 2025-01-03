<script setup>
import { ref } from 'vue'
import { onMounted } from 'vue'
import { useCategoryStore } from '@/stores/category'

const selected = defineModel('selected', { type: Array, required: true, default: [] })
const loading = ref(false)
const useCategory = useCategoryStore()

onMounted(async () => {
   if (useCategory.categories.length === 0) {
      loading.value = true
      await useCategory.fetchCategories()
      loading.value = false
   }
})
</script>

<template>
   <v-select
      multiple
      v-model="selected"
      label="categoryname"
      placeholder="Select Category"
      :options="useCategory.categories"
      :reduce="(category) => category.categoryid"
      :loading="loading"
      :disabled="loading"
   />
</template>

<style>
.vs__selected {
   @apply badge badge-success rounded-sm text-white badge-lg gap-x-0.5 px-3;
}
</style>
