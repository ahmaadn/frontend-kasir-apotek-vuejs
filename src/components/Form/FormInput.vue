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
   iconLeft: String,
   iconRight: String,
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
      <label
         class="group input input-bordered flex items-center gap-2 grow rounded-md input-sm shadow"
         v-bind:for="props.name"
      >
         <Icon v-if="props.iconLeft" :icon="props.iconLeft" width="16" height="16" />
         <Field
            class="grow"
            autocomplete="off"
            v-bind="$attrs"
            :class="props.class?.input"
            :name="props.name"
            :id="props.name"
         ></Field>
         <Icon v-if="props.iconRight" :icon="props.iconRight" width="16" height="16"></Icon>
      </label>
   </div>
</template>
