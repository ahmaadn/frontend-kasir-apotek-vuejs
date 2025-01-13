<script setup>
import { EmployeeCard, MedicineCard, BasicCard } from '@/components/StatCard'
import { useUserStore } from '@/stores/user'

const useUser = useUserStore()
</script>
<template>
   <main class="flex gap-4 flex-col">
      <section class="flex md:flex-row gap-4 w-full flex-col">
         <div v-if="useUser.isAdmin" class="stats shadow">
            <EmployeeCard />
         </div>
         <div class="stats shadow w-full">
            <BasicCard
               title="Total Pendapatan"
               value="25.6K"
               icon="mdi:currency-usd"
               class="text-success"
               desc="Bulan ini"
            />
         </div>
         <div class="stats shadow w-full">
            <MedicineCard />
         </div>
      </section>
   </main>
</template>
