<script setup>
import StatCard from '@/components/StatCard.vue'
import { EmployeeCard, MedicineCard } from '@/components/StatCard'
</script>
<template>
   <main class="flex gap-4 flex-col">
      <section class="flex md:flex-row gap-4 w-full flex-col">
         <!-- <div class="stats shadow">
            <EmployeeCard />
         </div> -->
         <div class="stats shadow w-full">
            <StatCard
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
