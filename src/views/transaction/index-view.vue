<script setup>
import { MedicineTable } from '@/components/Medicine'
import { AddToCart } from '@/components/Transaction'
import { useMedicineStore } from '@/stores/medicine'

const medicine = useMedicineStore()
</script>

<template>
   <main class="bg-base-100 shadow border rounded divide-y">
      <div class="py-4 px-6 flex flex-row justify-between items-center">
         <h1 class="md:text-2xl text-lg font-medium">Daftar Obat Saat Ini</h1>
         <button class="btn btn-success btn-sm text-white" @click="medicine.fetchMediciness()">
            Refresh
         </button>
      </div>
      <MedicineTable>
         <template #action="{ item }">
            <AddToCart :item="item" />
         </template>
      </MedicineTable>
   </main>
</template>
