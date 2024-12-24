<script setup>
import SelectedCardForm from '@/components/Form/SelectedCardForm.vue'
import { getUserList } from '@/lib/api/user'
import { useUserStore } from '@/stores/user'
import { onMounted, ref } from 'vue'
import { toast } from 'vue-sonner'

const loading = ref(true)
const employeeList = ref([])
const selected = ref(null)
const search = ref('')
const filterRole = ref([])
const userStore = useUserStore()

const headers = [
   { text: 'Nama', value: 'fullname', sortable: true, fixed: false, width: 300 },
   { text: 'Email', value: 'email' },
   { text: 'Userphone', value: 'userphone' },
   { text: 'Role', value: 'role', sortable: true, width: 200 },
   { text: 'Aksi', value: 'action' },
]

const onSelected = (item) => {
   selected.value = item
}

const updateRole = (role) => {
   filterRole.value = role
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

const filteredEmployeeList = () => {
   let filtered = employeeList.value

   if (search.value) {
      filtered = filtered.filter((item) => {
         return item.fullname.toLowerCase().includes(search.value.toLowerCase())
      })
   }

   if (filterRole.value.length > 0) {
      filtered = filtered.filter((item) => {
         return filterRole.value.includes(item.role.rolename)
      })
   }
   return filtered
}

onMounted(loadEmployeeList)
</script>
<template>
   <main class="bg-base-100 flex flex-col gap-4 p-4 shadow border rounded">
      <div>
         <button class="btn btn-success btn-sm text-white">Tambah Pegawai</button>
      </div>
      <div class="flex md:flex-row gap-4 justify-between flex-col">
         <SelectedCardForm
            label="Filter Role"
            :items="['Admin', 'Pengelola Gudang', 'Kasir']"
            @update:model-value="updateRole"
         />
         <input
            type="text"
            placeholder="Cari nama Pegawai"
            class="input input-sm input-bordered md:max-w-xs w-full grow rounded-md"
            v-model="search"
         />
      </div>
      <EasyDataTable
         :headers="headers"
         :items="filteredEmployeeList()"
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
         <template #item-fullname="{ fullname, userid }">
            <div class="flex flex-row gap-1">
               <p class="font-semibold">{{ fullname }}</p>
               <span
                  v-if="userid == userStore.getUserId"
                  class="badge badge-sm badge-outline badge-primary bg-primary/20"
                  >Current
               </span>
            </div>
         </template>
         <template #item-role="{ role }">
            <span
               class="badge badge-sm badge-outline"
               :class="{
                  'badge-primary bg-primary/20': role.roleid == 'ADM',
                  'badge-secondary bg-secondary/20': role.roleid == 'CSR',
                  'badge-accent bg-accent/20': role.roleid == 'WRH',
               }"
               >{{ role.rolename }}</span
            >
         </template>
         <template #item-action="{ userid }">
            <div class="flex flex-row gap-2">
               <button class="btn btn-xs btn-error" v-if="userid != userStore.getUserId">
                  delete
               </button>
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
