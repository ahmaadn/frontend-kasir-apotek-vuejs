<script setup>
import { ErrorMessage, Field } from 'vee-validate'
defineOptions({
   inheritAttrs: false,
})

const props = defineProps({
   name: {
      type: String,
      require: true,
   },
   label: String,
   showError: {
      type: Boolean,
      default: true,
   },
})
</script>

<template>
   <div class="form-control w-full">
      <div class="label text-lg font-semibold" v-if="props.label">
         <span class="label-text">{{ props.label }}</span>
         <span class="label-text-alt text-error" v-if="props.showError">
            <ErrorMessage :name="props.name"></ErrorMessage>
         </span>
      </div>
      <label class="group flex items-center gap-2" v-bind:for="props.name">
         <slot name="icon-left" />
         <Field
            class="mt-1 w-full grow rounded-md border-gray-200 bg-white text-sm"
            v-bind="$attrs"
            :name="props.name"
            :id="props.name"
         ></Field>
         <slot name="icon-right" />
      </label>
   </div>
</template>
