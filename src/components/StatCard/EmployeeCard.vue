<script setup>
import { useEmployeeStore } from '@/stores/employee'
import { useStats } from '@/stores/stats'
import { onMounted } from 'vue'
import BasicCard from './BasicCard.vue'

const employee = useEmployeeStore()
const stats = useStats()
onMounted(async () => {
   if (!employee.getEmployee.length) {
      await employee.fetchEmployee()
      stats.set_count_employes(employee.getEmployee.length)
   }
})
</script>
<template>
   <BasicCard
      title="Jumlah Pegawai"
      :value="stats.count_employes"
      icon="mdi:people-group-outline"
      class="text-primary"
   />
</template>
