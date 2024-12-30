<script setup>
import { UserForm, UserChangePassword } from '@/components/User'
import { onMounted, ref } from 'vue'
import { detailUser, updateUser } from '@/lib/api/user'
import { toast } from 'vue-sonner'
import { useRouter, useRoute } from 'vue-router'
import * as z from 'zod'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { useUserStore } from '@/stores/user'

const disabled = ref(false)
const router = useRouter()
const route = useRoute()
const userid = ref(route.params.id)
const userStore = useUserStore()
const userData = ref({})
const roles = {
   ADM: 'Admin',
   CSR: 'Kasir',
   WRH: 'Pengelola Gudang',
}

const options = ['Admin', 'Kasir', 'Pengelola Gudang']

const form = useForm({
   validationSchema: toTypedSchema(
      z.object({
         fullname: z.string(),
         email: z.string().max(100).email('This is not a valid email.'),
         userphone: z.string(),
         roleid: z.enum(options),
      }),
   ),
})

const onSumbit = form.handleSubmit(async (values) => {
   disabled.value = true
   values.roleid = Object.keys(roles).find((key) => roles[key] === values.roleid)

   if (userid.value == userStore.getUserId && values.roleid != userStore.getRole) {
      toast.error('Tidak Bisa mengubah role admin yang sedang dipakai')
      disabled.value = false
      return
   }

   await updateUser(userid.value, values)
      .then(async (res) => {
         if (userid.value == userStore.getUserId && values.email != userData.value.email) {
            userStore.logout()
            toast.success('You Automatic Logout')
            await new Promise((resolve) => setTimeout(resolve, 1000))
            router.push({ name: 'Login' })
         } else {
            toast.success(res.data.message)
            router.push({ name: 'Employee' })
         }
      })
      .catch(() => {
         disabled.value = false
      })
})

const getUserDetail = async () => {
   disabled.value = true
   await detailUser(userid.value)
      .then((res) => {
         const data = res.data
         userData.value = data.data
         form.setValues({
            fullname: userData.value.fullname,
            email: userData.value.email,
            userphone: userData.value.userphone,
            roleid: userData.value.role.rolename,
         })
         disabled.value = false
      })
      .catch(() => {
         toast.error('Failed get detail user')
         router.push({ name: 'Employee' })
      })
}

onMounted(getUserDetail)
</script>

<template>
   <main class="rounded">
      <div class="md:grid grid-cols-[1fr_40%] gap-6 flex flex-col">
         <div class="bg-base-100 shadow border rounded">
            <div class="py-4 px-6 border-b">
               <h1 class="md:text-2xl text-lg font-medium">Update Pegawai</h1>
            </div>
            <div class="p-6">
               <UserForm
                  @submit="onSumbit"
                  :options-role="options"
                  :hide-role="userid == userStore.getUserId"
                  :disabled="disabled"
                  hide-password
               >
                  <button
                     class="btn btn-sm w-full btn-warning shadow text-white mt-6"
                     :disabled="disabled"
                  >
                     Update
                  </button>
               </UserForm>
            </div>
         </div>
         <div class="bg-base-100 shadow border h-fit rounded">
            <div class="py-4 px-6 border-b">
               <h1 class="md:text-2xl text-lg font-medium">Update Password</h1>
            </div>
            <div class="p-6">
               <UserChangePassword :userid="userid" />
            </div>
         </div>
      </div>
   </main>
</template>
