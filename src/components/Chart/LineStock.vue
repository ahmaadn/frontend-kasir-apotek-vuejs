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
   Filler,
} from 'chart.js'
import { Line } from 'vue-chartjs'
import { useStats } from '@/stores/stats'
import { ref, onMounted } from 'vue'
import dayjs from 'dayjs'

ChartJS.register(
   CategoryScale,
   LinearScale,
   LineElement,
   PointElement,
   Title,
   Tooltip,
   Legend,
   Filler,
)

const loaded = ref(false)
const statsStore = useStats()
const chartData = ref({
   labels: [],
   datasets: [
      {
         label: 'Stock Masuk',
         backgroundColor: 'rgba(66, 165, 245, 0.2)',
         borderColor: '#42A5F5',
         data: [],
         fill: true,
      },
      {
         label: 'Stock Keluar',
         backgroundColor: 'rgba(255, 99, 132, 0.2)',
         borderColor: '#FF6384',
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
         text: 'Stock Masuk dan Stock Keluar selama 7 Hari Terakhir',
      },
   },
}

const fetchChartData = async () => {
   loaded.value = false
   const last7DaysReport = await statsStore.last7DaysReportStock()
   chartData.value.labels = last7DaysReport.map((report) =>
      dayjs(report.recordDate).format('MMM D'),
   )
   chartData.value.datasets[0].data = last7DaysReport.map((report) =>
      report.medicines.reduce((total, medicine) => total + medicine.stockin, 0),
   )
   chartData.value.datasets[1].data = last7DaysReport.map((report) =>
      report.medicines.reduce((total, medicine) => total + medicine.stockout, 0),
   )
   loaded.value = true
}

onMounted(fetchChartData)
</script>

<template>
   <Line v-if="loaded" :data="chartData" :options="options" />
</template>
