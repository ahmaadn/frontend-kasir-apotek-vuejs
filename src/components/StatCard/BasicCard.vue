<script setup>
import { Icon } from '@iconify/vue'

const props = defineProps({
   title: String,
   value: String || Number,
   icon: String,
   desc: String,
   class: String,
})
</script>
<template>
   <div class="stat">
      <div class="stat-figure" :class="props.class">
         <Icon :icon="props.icon" class="inline-block h-8 w-8" />
      </div>
      <div class="stat-title">{{ props.title }}</div>
      <div class="stat-value">{{ props.value }}</div>
      <div v-if="props.desc" class="stat-desc mt-2">{{ props.desc }}</div>
   </div>
</template>
