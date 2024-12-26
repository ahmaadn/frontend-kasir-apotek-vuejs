<script setup>
import { FormInput, FormSelect } from '../Form'

const props = defineProps({
   hideFullname: {
      type: Boolean,
      default: false,
   },
   hideEmail: {
      type: Boolean,
      default: false,
   },
   hidePassword: {
      type: Boolean,
      default: false,
   },
   hideUserphone: {
      type: Boolean,
      default: false,
   },
   hideRole: {
      type: Boolean,
      default: false,
   },
   optionsRole: Array,
})
</script>

<template>
   <form>
      <div class="flex flex-col gap-4">
         <FormInput
            name="fullname"
            label="Fullname"
            type="text"
            placeholder="Masukkan Nama"
            v-if="!props.hideEmail"
         />
         <FormInput
            name="email"
            label="Email"
            type="email"
            placeholder="Masukkan Email"
            v-if="!props.hideEmail"
         />
         <FormInput
            name="password"
            label="Password"
            type="password"
            placeholder="Masukkan password"
            v-if="!props.hidePassword"
         />
         <FormInput
            name="userphone"
            label="Userphone"
            type="Userphone"
            placeholder="Masukkan Userphone"
            v-if="!props.hideUserphone"
         />
         <FormSelect
            name="roleid"
            label="Role"
            :options="props.optionsRole"
            v-if="!props.hideRole"
         />
      </div>
      <slot></slot>
   </form>
</template>
