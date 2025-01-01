<script setup>
defineProps({
   label: String,
})
</script>

<template>
   <div class="fixed tooltip tooltip-right z-10" :data-tip="label"></div>
</template>

<style scoped>
.sidebar:not(.hoverable):not(.active) .sidebar-tooltip:hover .tooltip {
   @apply before:md:opacity-100 after:md:opacity-100 before:md:delay-75 after:md:delay-75;
}
</style>
