<script setup>
import { FormInput, FormSelect } from '../Form'
import * as z from 'zod'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { onMounted } from 'vue'

const props = defineProps({
   initialValue: { type: Object },
})

const emit = defineEmits(['onSumbit'])

const roles = {
   ADM: 'Admin',
   CSR: 'Kasir',
   WRH: 'Pengelola Gudang',
}

const options = Object.values(roles)

const form = useForm({
   validationSchema: toTypedSchema(
      z.object({
         fullname: z.string(),
         email: z.string().max(100).email('This is not a valid email.'),
         password: z.string().min(8).max(100),
         userphone: z.string(),
         roleid: z.enum(options),
      }),
   ),
})

const onSumbit = form.handleSubmit((values) => {
   values.roleid = Object.keys(roles).find((key) => roles[key] === values.roleid)
   emit('onSumbit', values)
})

onMounted(() => {
   if (props.initialValue) {
      form.setValues(props.initialValue)
   }
})
</script>

<template>
   <form @submit="onSumbit">
      <div class="flex flex-col gap-4">
         <FormInput name="fullname" label="Fullname" type="text" placeholder="Masukkan Nama" />
         <FormInput name="email" label="Email" type="email" placeholder="Masukkan Email" />
         <FormInput
            name="password"
            label="Password"
            type="password"
            placeholder="Masukkan password"
         />
         <FormInput
            name="userphone"
            label="Userphone"
            type="Userphone"
            placeholder="Masukkan Userphone"
         />
         <FormSelect name="roleid" label="Role" :options="options" />
      </div>
      <slot></slot>
   </form>
</template>
