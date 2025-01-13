<script setup>
import { ref } from 'vue'
import BasicCard from './BasicCard.vue'
import { useStats } from '@/stores/stats'
import { onMounted } from 'vue'
import { currency } from '@/lib/utils'

const stats = useStats()
const report = ref({})
const income = ref(0)

onMounted(async () => {
   report.value = await stats.todayReportSales()
   console.log(report.value)

   income.value = report.value.totalincome
})
</script>
<template>
   <BasicCard
      title="Pendapatan"
      :value="currency(income)"
      icon="mdi:currency-usd"
      class="text-success"
      desc="Hari Ini"
   />
</template>
