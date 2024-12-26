<script setup>
import UserForm from '@/components/User/UserForm.vue'
import { ref } from 'vue'
import { createUser } from '@/lib/api/user'
import { toast } from 'vue-sonner'
import { useRouter } from 'vue-router'
import * as z from 'zod'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'

const disabled = ref(false)
const router = useRouter()
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

const onSumbit = form.handleSubmit(async (values) => {
   values.roleid = Object.keys(roles).find((key) => roles[key] === values.roleid)
   disabled.value = true
   await createUser(values).then((res) => {
      toast.success(res.data.message)
      router.push({ name: 'Employee' })
   })
   disabled.value = false
})
</script>

<template>
   <main class="bg-base-100 shadow border rounded divide-y">
      <div class="py-4 px-6">
         <h1 class="md:text-2xl text-lg font-medium">Tambah Pegawai</h1>
      </div>
      <div class="p-6">
         <UserForm @submit="onSumbit" :options-role="options">
            <button
               class="btn btn-sm w-full btn-success shadow mt-3 text-white"
               :disabled="disabled"
            >
               Tambah
            </button>
         </UserForm>
      </div>
   </main>
</template>
