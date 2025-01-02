<script setup>
import { ref } from 'vue'
import { getCategoryMedicine } from '@/lib/api/category'
import { onMounted } from 'vue'

const selected = defineModel('selected', { type: Array, required: true, default: [] })
const categories = ref([])
const loading = ref(false)

const fecthCategory = async () => {
   loading.value = true
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

onMounted(fecthCategory)
</script>

<template>
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
</template>

<style>
.vs__selected {
   @apply badge badge-success rounded-sm text-white badge-lg gap-x-0.5 px-3;
}
</style>
