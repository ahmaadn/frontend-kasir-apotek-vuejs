<script setup>
import { Icon } from '@iconify/vue'
import { watch } from 'vue'

const props = defineProps({
   label: String,
   items: Array,
   loading: {
      type: Boolean,
      default: false,
   },
})

const checkedValues = defineModel({ required: true })
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
         class="btn btn-sm w-40 flex-nowrap btn-outline border-base-300 shadow"
         :class="{ 'text-neutral/60 hover:text-base-100': checkedValues.length == 0 }"
      >
         <div class="text-start flex w-full">
            <span v-if="checkedValues.length == 0">
               {{ props.label }}
            </span>
            <span v-else>{{ checkedValues.length }} selected</span>
         </div>
         <Icon icon="mdi:chevron-down" width="24" height="24" />
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
                        :disabled="loading"
                     />
                     <span class="label-text text-start w-full">{{ item }}</span>
                  </label>
               </li>
            </ul>
         </div>
      </div>
   </div>
</template>
