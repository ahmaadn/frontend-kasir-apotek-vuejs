<script setup>
import InputForm from '@/components/Form/InputForm.vue'
import SelectedCardForm from '@/components/Form/SelectedCardForm.vue'
import { getUserList } from '@/lib/api/user'
import { onMounted, ref } from 'vue'
import { toast } from 'vue-sonner'

const loading = ref(true)
const employeeList = ref([])
const selected = ref(null)

const headers = [
   { text: 'Nama', value: 'fullname', sortable: true, width: 200 },
   { text: 'Email', value: 'email' },
   { text: 'Userphone', value: 'userphone' },
   { text: 'Role', value: 'role.rolename', sortable: true, width: 200 },
   { text: 'Aksi', value: 'action' },
]

const budgeColor = {
   ADM: 'badge-primary bg-primary/20',
   CSR: 'badge-secondary bg-secondary/20',
   WRH: 'badge-accent bg-accent/20',
}

// const onSelected = ()
const onSelected = (item) => {
   selected.value = item
}

const loadEmployeeList = async () => {
   loading.value = true
   await getUserList()
      .then((res) => {
         const data = res.data
         employeeList.value = data.data
         toast.success(data.message)
      })
      .catch((err) => {
         console.log(err)
      })
   loading.value = false
}

onMounted(loadEmployeeList)
</script>
<template>
   <main class="bg-base-100 flex flex-col gap-4 p-4 shadow border rounded">
      <div>
         <button class="btn btn-success btn-sm text-white">Tambah Pegawai</button>
      </div>
      <div class="flex md:flex-row flex-col gap-4">
         <InputForm name="search" placeholder="Cari nama pegawai" class="max-w-sm"></InputForm>
         <SelectedCardForm></SelectedCardForm>
      </div>
      <EasyDataTable
         :headers="headers"
         :items="employeeList"
         :loading="loading"
         :rows-items="[25, 50, 100]"
         buttons-pagination
         show-index
         @click-row="onSelected"
      >
         <template #loading>
            <img
               src="https://i.pinimg.com/originals/94/fd/2b/94fd2bf50097ade743220761f41693d5.gif"
               style="width: 100px; height: 80px"
            />
         </template>
         <template #item-role.rolename="{ role }">
            <span class="badge badge-sm badge-outline" :class="budgeColor[role.roleid]">{{
               role.rolename
            }}</span>
         </template>
         <template #item-action>
            <div class="flex flex-row gap-2">
               <button class="btn btn-xs btn-error">delete</button>
               <button class="btn btn-xs btn-warning">Update</button>
            </div>
         </template>
         <template #empty-message>
            <div class="flex flex-col items-center justify-center">
               <p class="text-base font-semibold">Data Pegawai Kosong</p>
            </div>
         </template>
      </EasyDataTable>
   </main>
</template>
