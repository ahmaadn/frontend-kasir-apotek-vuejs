<script setup>
import StatCard from '@/components/StatCard.vue'

// import type { Header, Item, ClickRowArgument } from "vue3-easy-data-table";

// omit

const showRow = (item) => {
   document.getElementById('row-clicked').innerHTML = JSON.stringify(item)
}

const headers = [
   { text: 'PLAYER', value: 'player' },
   { text: 'Action', value: 'action' },
]

const items = [
   {
      player: 'Stephen Curry',
   },
   {
      player: 'Lebron James',
   },
]
</script>
<template>
   <main class="flex gap-4 flex-col">
      <section class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
         <div class="stats shadow">
            <StatCard
               title="Jumlah Pegawai"
               value="20"
               icon="mdi:people-group-outline"
               class="text-primary"
            ></StatCard>
         </div>
         <div class="stats shadow">
            <StatCard
               title="Total Pendapatan"
               value="25.6K"
               icon="mdi:currency-usd"
               class="text-success"
               desc="Bulan ini"
            ></StatCard>
         </div>
         <div class="stats shadow">
            <StatCard
               title="Total Obat"
               value="25.6K"
               icon="mdi:box-variant-closed"
               class="text-warning"
            ></StatCard>
         </div>
      </section>
   </main>
</template>
