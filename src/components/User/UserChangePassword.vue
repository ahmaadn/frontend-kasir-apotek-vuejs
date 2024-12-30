<script setup>
import { FormInput } from '@/components/Form'
import { useRouter } from 'vue-router'
import * as z from 'zod'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { updateUser } from '@/lib/api/user'
import { toast } from 'vue-sonner'
import { ref } from 'vue'

const props = defineProps({
   userid: {
      type: String,
      require: true,
   },
})

const router = useRouter()
const disabled = ref(false)

const form = useForm({
   validationSchema: toTypedSchema(
      z
         .object({
            new_password: z.string().min(8),
            confirm_password: z.string().min(8),
         })
         .superRefine(({ confirm_password, new_password }, ctx) => {
            if (confirm_password !== new_password) {
               ctx.addIssue({
                  message: 'The passwords did not match',
                  path: ['confirm_password'],
                  fatal: true,
               })
            }
         }),
   ),
})

const onSumbit = form.handleSubmit(async (values) => {
   disabled.value = true
   await updateUser(props.userid, { password: values.confirm_password })
      .then((res) => {
         toast.success(res.data.message)
         router.push({ name: 'Employee' })
      })
      .catch(() => {})
   disabled.value = true
})
</script>

<template>
   <form @submit="onSumbit">
      <div class="flex flex-col gap-4">
         <FormInput
            name="new_password"
            label="Password Baru"
            type="password"
            placeholder="password baru"
         />
         <FormInput
            name="confirm_password"
            label="Konfirmasi password"
            type="password"
            placeholder="Konfirmasi password"
         />
      </div>
      <button class="btn btn-sm w-full btn-warning shadow text-white mt-6" :disabled="disabled">
         Change Password
      </button>
   </form>
</template>
