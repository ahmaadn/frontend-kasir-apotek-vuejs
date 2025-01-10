<script setup>
import { MedicineBatchDetail } from '@/components/Medicine'
import { useBatchMedicine } from '@/stores/batch'
import { computed } from 'vue'
import { onMounted } from 'vue'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const loading = ref(true)
const dataBatch = ref({})
const mediciness = computed(() => dataBatch.value?.medicines || [])
const batchMedicine = useBatchMedicine()

onMounted(async () => {
   dataBatch.value = await batchMedicine.getDetailBatch(route.params.id)
   loading.value = false
})
</script>

<template>
   <div class="bg-base-100 shadow border rounded">
      <div class="py-4 px-6 flex flex-row justify-between items-center">
         <h1 class="md:text-2xl text-lg font-medium">{{ $route.meta.title }}</h1>
      </div>
      <MedicineBatchDetail
         :batch-id="route.params.id"
         v-model:mediciness="mediciness"
         v-model:loading="loading"
      ></MedicineBatchDetail>
   </div>
</template>
