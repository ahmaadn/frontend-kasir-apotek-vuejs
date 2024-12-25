<script setup>
const props = defineProps(['options', 'selected'])

defineOptions({
   inheritAttrs: false,
})
</script>

<template>
   <select
      class="select select-bordered w-full border-base-300 select-sm shadow rounded min-w-24"
      v-bind="$attrs"
   >
      <option
         v-for="(option, index) in props.options"
         v-bind:key="index"
         :value="option"
         :selected="option == props.selected"
      >
         {{ option }}
      </option>
      <option v-if="!props.options" disabled selected>Empty</option>
   </select>
</template>
