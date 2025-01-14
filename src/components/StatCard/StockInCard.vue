<script setup>
import { ref, onMounted } from 'vue'
import { useStats } from '@/stores/stats'
import BasicCard from './BasicCard.vue'

const statsStore = useStats()
const stockInToday = ref(0)

const fetchStockInToday = async () => {
   stockInToday.value = await statsStore.todayReportStock()
}

onMounted(fetchStockInToday)
</script>

<template>
   <BasicCard
      title="Stok Hari Ini"
      :value="stockInToday"
      icon="mdi:warehouse"
      class="text-primary"
   />
</template>
