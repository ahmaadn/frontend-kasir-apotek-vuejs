<script setup>
import { Icon } from '@iconify/vue'
import { watch, ref } from 'vue'

const props = defineProps(['label', 'items'])
const checkedValues = ref([])
const emit = defineEmits(['update:modelValue'])

const onReset = () => {
   checkedValues.value = []
}

watch(checkedValues, (value) => {
   emit('update:modelValue', value)
})
</script>
<template>
   <div class="dropdown group">
      <div
         tabindex="0"
         role="button"
         class="m-1 border-b border-base-content/40 hover:border-base-content flex flex-row gap-x-2 items-center text-nowrap flex-nowrap justify-between"
      >
         <div class="flex flex-row gap-x-2 items-center">
            <span class="text-sm font-medium"> {{ props.label }} </span>
            <span
               v-if="checkedValues.length >= 1"
               class="badge badge-sm badge-success rounded-full text-white"
               >{{ checkedValues.length }}</span
            >
         </div>
         <Icon
            icon="mdi:chevron-down"
            class="group-focus:-rotate-180 transition"
            width="24"
            height="24"
         />
      </div>
      <div tabindex="0" class="dropdown-content bg-base-100 rounded-box z-10 w-52 p-2 shadow">
         <div class="rounded border border-gray-200 bg-white">
            <header class="flex items-center justify-between p-4">
               <span class="text-sm text-gray-700"> {{ checkedValues.length }} Selected </span>

               <button
                  type="button"
                  class="text-sm text-gray-900 underline underline-offset-4"
                  @click="onReset"
               >
                  Reset
               </button>
            </header>
            <ul class="menu">
               <li v-for="(item, index) in props.items" :key="index">
                  <label class="label cursor-pointer gap-x-4 flex-nowrap text-nowrap flex">
                     <input
                        type="checkbox"
                        checked="checked"
                        class="checkbox checkbox-xs"
                        v-model="checkedValues"
                        :id="item"
                        :value="item"
                     />
                     <span class="label-text text-start w-full">{{ item }}</span>
                  </label>
               </li>
            </ul>
         </div>
      </div>
   </div>
</template>
