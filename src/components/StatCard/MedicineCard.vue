<script setup>
import { useMedicineStore } from '@/stores/medicine'
import { onMounted } from 'vue'
import BasicCard from './BasicCard.vue'

const medicine = useMedicineStore()
onMounted(async () => {
   if (!medicine.getMediciness.length) {
      await medicine.fetchMediciness()
   }
})
</script>
<template>
   <BasicCard
      title="Jumlah Obat"
      :value="medicine.getMediciness.length"
      icon="mdi:people-group-outline"
      class="text-primary"
   />
</template>
