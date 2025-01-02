<script setup>
import { MedicineAddForm } from '@/components/Medicine'
</script>

<template>
   <main class="bg-base-100 shadow border rounded divide-y">
      <div class="py-4 px-6">
         <h1 class="md:text-2xl text-lg font-medium">Tambah Obat</h1>
      </div>
      <div class="p-6 space-y-6">
         <MedicineAddForm />
      </div>
   </main>
</template>
