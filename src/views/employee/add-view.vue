<script setup>
import BreadcrumbsNav from '@/components/BreadcrumbsNav.vue'
import UserForm from '@/components/User/UserForm.vue'
import { ref } from 'vue'
import { createUser } from '@/lib/api/user'
import { toast } from 'vue-sonner'
import { useRouter } from 'vue-router'

const disabled = ref(false)
const router = useRouter()

const onSumbit = async (values) => {
   disabled.value = true
   await createUser(values).then((res) => {
      toast.success(res.data.message)
      router.push({ name: 'Employee' })
   })
   disabled.value = false
}
</script>

<template>
   <main class="bg-base-100 p-4 shadow border rounded">
      <h1 class="text-lg font-medium">Tambah Pegawai</h1>
      <BreadcrumbsNav />
      <UserForm @on-sumbit="onSumbit">
         <button class="btn btn-sm w-full btn-success shadow mt-3 text-white" :disabled="disabled">
            Tambah Pegawai
         </button>
      </UserForm>
   </main>
</template>
