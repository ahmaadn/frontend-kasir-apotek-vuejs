<script setup>
import { MedicineTable, MedicineRestock, MedicineDeleteDialog } from '@/components/Medicine'
</script>
<template>
   <main class="bg-base-100 shadow border rounded divide-y">
      <div class="py-4 px-6 flex flex-row justify-between items-center">
         <h1 class="md:text-2xl text-lg font-medium">Daftar Obat Saat Ini</h1>
         <router-link :to="{ name: 'AddMedicine' }" class="btn btn-success btn-sm text-white">
            Tambah Obat
         </router-link>
      </div>
      <MedicineTable>
         <template #action="{ item }">
            <div class="flex flex-row gap-2">
               <MedicineDeleteDialog :id="item.medicineID" />
               <router-link
                  :to="{ name: 'UpdateMedicine', params: { id: item.medicineID } }"
                  class="btn btn-xs btn-warning"
                  >Edit</router-link
               >
               <MedicineRestock :medicineid="item.medicineID" :medicinename="item.medicineName" />
            </div>
         </template>
      </MedicineTable>
   </main>
</template>
