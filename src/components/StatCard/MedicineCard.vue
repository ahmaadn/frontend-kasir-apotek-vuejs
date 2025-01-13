<script setup>
import { useMedicineStore } from '@/stores/medicine'
import { onMounted } from 'vue'
import BasicCard from './BasicCard.vue'
import { useStats } from '@/stores/stats'

const medicine = useMedicineStore()
const stats = useStats()
onMounted(async () => {
   if (!medicine.getMediciness.length) {
      await medicine.fetchMediciness()
   }
   stats.set_count_medicine(medicine.getMediciness.length)
})
</script>
<template>
   <BasicCard
      title="Jumlah Obat"
      :value="stats.count_medicine"
      icon="mdi:people-group-outline"
      class="text-primary"
   />
</template>
