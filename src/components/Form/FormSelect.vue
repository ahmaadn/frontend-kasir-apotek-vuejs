<script setup>
import { ErrorMessage, Field } from 'vee-validate'

defineOptions({
   inheritAttrs: false,
})

const props = defineProps({
   name: String,
   label: String,
   options: Array,
   selected: String || Number,
   hideLabel: {
      type: Boolean,
      default: false,
   },
   showError: {
      type: Boolean,
      default: true,
   },
})
</script>

<template>
   <label class="form-control">
      <div
         class="label text-lg font-semibold"
         v-if="!props.hideLabel && (props.label || props.showError)"
      >
         <span class="label-text">{{ props.label }}</span>
         <ErrorMessage
            class="label-text-alt text-error"
            v-if="props.showError"
            :name="props.name"
         />
      </div>
      <Field
         as="select"
         class="select select-bordered w-full border-base-300 select-sm shadow rounded min-w-24"
         v-bind="$attrs"
         :name="props.name"
         :value="props.selected"
      >
         <option
            v-for="(option, index) in props.options"
            v-bind:key="index"
            :value="option"
            :selected="option == props.selected"
         >
            {{ option }}
         </option>
      </Field>
   </label>
</template>
