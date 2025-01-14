<script setup>
import {
   Chart as ChartJS,
   Title,
   Tooltip,
   Legend,
   BarElement,
   CategoryScale,
   LinearScale,
} from 'chart.js'
import { Bar } from 'vue-chartjs'
import { useStats } from '@/stores/stats'
import { ref, onMounted } from 'vue'
import dayjs from 'dayjs'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const loaded = ref(false)
const statsStore = useStats()
const chartData = ref({
   labels: [],
   datasets: [
      {
         label: 'Total obat yang masuk',
         backgroundColor: '#42A5F5',
         data: [],
      },
   ],
})

const options = {
   responsive: true,
   plugins: {
      legend: {
         position: 'top',
      },
      title: {
         display: true,
         text: 'Total obat yang masuk selama 7 hari',
      },
   },
}

const fetchChartData = async () => {
   loaded.value = false
   const last7DaysReport = await statsStore.last7DaysReportStock()
   chartData.value.labels = last7DaysReport.map((report) =>
      dayjs(report.recordDate).format('MMM D'),
   )
   chartData.value.datasets[0].data = last7DaysReport.map((report) => report.medicines.length)
   loaded.value = true
}

onMounted(fetchChartData)
</script>

<template>
   <Bar v-if="loaded" :data="chartData" :options="options" />
</template>
