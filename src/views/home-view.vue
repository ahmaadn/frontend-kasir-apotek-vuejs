<script setup>
import { EmployeeCard, MedicineCard, IncomeCard, StockInCard } from '@/components/StatCard'
import { useUserStore } from '@/stores/user'
import { ReportTransaction } from '@/components/Report'
import { BarTransaction, LineMedicineSold } from '@/components/Chart'

const useUser = useUserStore()
</script>
<template>
   <main class="flex gap-4 flex-col">
      <section class="flex md:flex-row gap-4 w-full flex-col">
         <div v-if="useUser.isAdmin" class="stats shadow w-full">
            <EmployeeCard />
         </div>
         <div v-if="useUser.isAdmin || useUser.isCashier" class="stats shadow w-full">
            <IncomeCard />
         </div>
         <div v-if="useUser.isAdmin || useUser.isWarehouse" class="stats shadow w-full">
            <StockInCard />
         </div>
         <div class="stats shadow w-full">
            <MedicineCard />
         </div>
      </section>
      <section
         class="flex flex-col md:grid grid-cols-2 gap-4"
         v-if="useUser.isAdmin || useUser.isCashier"
      >
         <div class="card bg-base-100 rounded shadow p-0">
            <div class="card-body p-6">
               <BarTransaction />
            </div>
         </div>
         <div class="card bg-base-100 rounded shadow p-0">
            <div class="card-body p-6">
               <LineMedicineSold />
            </div>
         </div>
      </section>
      <section v-if="useUser.isAdmin || useUser.isCashier">
         <ReportTransaction />
      </section>
   </main>
</template>
