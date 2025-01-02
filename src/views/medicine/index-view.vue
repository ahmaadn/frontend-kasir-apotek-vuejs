<script setup>
import { MedicineTable } from '@/components/Medicine'
</script>
<template>
   <main class="bg-base-100 shadow border rounded divide-y">
      <div class="py-4 px-6 flex flex-row justify-between items-center">
         <h1 class="md:text-2xl text-lg font-medium">Daftar Pegawai Saat Ini</h1>
         <router-link to="/" class="btn btn-success btn-sm text-white"> Tambah Obat </router-link>
      </div>
      <MedicineTable>
         <template #action>
            <div class="flex flex-row gap-2">
               <button class="btn btn-xs btn-info">Restock</button>
               <button class="btn btn-xs btn-warning">Edit</button>
               <button class="btn btn-xs btn-error">Delete</button>
            </div>
         </template>
      </MedicineTable>
   </main>
</template>
