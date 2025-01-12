<script setup>
import { TableTransaction } from '@/components/Transaction'
</script>
<template>
   <div class="bg-base-100 shadow border rounded">
      <div class="py-4 px-6 flex flex-row justify-between items-center">
         <h1 class="md:text-2xl text-lg font-medium">{{ $route.meta.title }}</h1>
      </div>
      <TableTransaction />
   </div>
</template>
