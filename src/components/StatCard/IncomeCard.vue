<script setup>
import { ref } from 'vue'
import BasicCard from './BasicCard.vue'
import { useStats } from '@/stores/stats'
import { onMounted } from 'vue'
import { shortCurrency } from '@/lib/utils'

const stats = useStats()
const report = ref({})
const income = ref(0)

onMounted(async () => {
   report.value = await stats.todayReportSales()
   income.value = report.value.totalincome || 0
   report.value = await stats.todayReportSales(true)
   income.value = report.value.totalincome || 0
})
</script>
<template>
   <BasicCard
      title="Pendapatan"
      :value="shortCurrency(income)"
      icon="mdi:currency-usd"
      class="text-success"
      desc="Hari Ini"
   />
</template>
