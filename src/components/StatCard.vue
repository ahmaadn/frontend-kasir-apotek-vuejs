<script setup>
import { Icon } from '@iconify/vue'

const props = defineProps(['title', 'value', 'icon', 'desc', 'class'])
</script>
<template>
   <div class="stat">
      <div class="stat-figure" :class="props.class">
         <Icon :icon="props.icon" class="inline-block h-8 w-8"></Icon>
      </div>
      <div class="stat-title">{{ props.title }}</div>
      <div class="stat-value">{{ props.value }}</div>
      <div v-if="props.desc" class="stat-desc">{{ props.desc }}</div>
   </div>
</template>
