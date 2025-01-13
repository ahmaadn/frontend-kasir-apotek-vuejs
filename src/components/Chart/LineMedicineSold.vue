<script setup>
import {
   Chart as ChartJS,
   Title,
   Tooltip,
   Legend,
   LineElement,
   CategoryScale,
   LinearScale,
   PointElement,
} from 'chart.js'
import { Line } from 'vue-chartjs'
import { useStats } from '@/stores/stats'
import { ref, onMounted } from 'vue'
import dayjs from 'dayjs'

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend)

const loaded = ref(false)
const statsStore = useStats()
const chartData = ref({
   labels: [],
   datasets: [
      {
         label: 'Total Medicines Sold',
         backgroundColor: 'rgba(102, 187, 106, 0.2)',
         borderColor: '#66BB6A',
         data: [],
         fill: true,
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
         text: 'Total Medicines Sold for the Last 7 Days',
      },
   },
}

const fetchChartData = async () => {
   loaded.value = false
   const last7DaysReport = await statsStore.last7DaysReportSales()
   chartData.value.labels = last7DaysReport.map((report) =>
      dayjs(report.summarydate).format('MMM D'),
   )
   chartData.value.datasets[0].data = last7DaysReport.map((report) => report.totalmedicinessold)
   loaded.value = true
}

onMounted(fetchChartData)
</script>

<template>
   <Line v-if="loaded" :data="chartData" :options="options" />
</template>
