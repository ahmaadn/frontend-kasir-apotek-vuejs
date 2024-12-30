<script setup>
import { ErrorMessage, Field } from 'vee-validate'
import { Icon } from '@iconify/vue'

defineOptions({
   inheritAttrs: false,
})

const props = defineProps({
   name: {
      type: String,
      require: true,
   },
   label: String,
   showError: { type: Boolean, default: true },
   class: String,
})
</script>

<template>
   <div class="form-control" :class="props.class">
      <div class="label text-lg font-semibold" v-if="props.label">
         <span class="label-text">{{ props.label }}</span>
         <span class="label-text-alt text-error" :class="props.class?.error" v-if="props.showError">
            <ErrorMessage :name="props.name"></ErrorMessage>
         </span>
      </div>
      <Field
         as="textarea"
         class="textarea textarea-bordered h-24 grow shadow rounded-md"
         autocomplete="off"
         v-bind="$attrs"
         :class="props.class?.input"
         :name="props.name"
         :id="props.name"
      ></Field>
   </div>
</template>
