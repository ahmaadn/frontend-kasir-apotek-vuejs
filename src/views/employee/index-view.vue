<script setup>
import 'vue3-easy-data-table/dist/style.css'
import '@/assets/css/table.css'

import { UserDeleteDialog } from '@/components/User'
import { TableFilter, TablePagination } from '@/components/Table'
import { useUserStore } from '@/stores/user'
import { onMounted, ref } from 'vue'
import { getUserList } from '@/lib/api/user'
import { toast } from 'vue-sonner'

const options = {
   checkbox: {
      label: 'Filter Role',
      options: ['Admin', 'Pengelola Gudang', 'Kasir'],
      filtered: function (items, checked) {
         return items.filter((item) => {
            return checked.includes(item.role.rolename)
         })
      },
   },
   search: {
      default: '',
      filtered: function (items, search) {
         return items.filter((item) => {
            return item.fullname.toLowerCase().includes(search.toLowerCase())
         })
      },
   },
}

const headers = [
   { text: 'Nama', value: 'fullname', sortable: true, fixed: false, width: 300 },
   { text: 'Email', value: 'email' },
   { text: 'Userphone', value: 'userphone' },
   { text: 'Role', value: 'role.rolename', sortable: true, width: 200 },
   { text: 'Aksi', value: 'action' },
]

const userStore = useUserStore()
const loading = ref(true)
const dataTable = ref()
const employeeList = ref([])

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
   <main class="bg-base-100 shadow border rounded divide-y">
      <div class="py-4 px-6 flex flex-row justify-between items-center">
         <h1 class="md:text-2xl text-lg font-medium">Daftar Pegawai Saat Ini</h1>
         <router-link :to="{ name: 'AddEmployee' }" class="btn btn-success btn-sm text-white">
            Tambah Pegawai
         </router-link>
      </div>
      <div class="p-6 space-y-6">
         <TableFilter
            :options="options"
            v-model:items="employeeList"
            v-model:dataTable="dataTable"
            v-slot="{ items }"
         >
            <EasyDataTable
               ref="dataTable"
               :headers="headers"
               :items="items"
               :loading="loading"
               hide-footer
               show-index
            >
               <template #loading>
                  <span class="loading loading-infinity loading-lg"></span>
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
               <!-- eslint-disable-next-line vue/valid-v-slot -->
               <template #item-role.rolename="{ role }">
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
                     <UserDeleteDialog
                        :userid="userid"
                        v-if="userid != userStore.getUserId"
                        @on-success="loadEmployeeList"
                     />

                     <router-link
                        :to="{ name: 'UpdateEmployee', params: { id: userid } }"
                        class="btn btn-xs btn-warning"
                        >Update</router-link
                     >
                  </div>
               </template>
               <template #empty-message>
                  <div class="flex flex-col items-center justify-center">
                     <p class="text-base font-semibold">Data Pegawai Kosong</p>
                  </div>
               </template>
            </EasyDataTable>
         </TableFilter>
         <TablePagination v-model:dataTable="dataTable" />
      </div>
   </main>
</template>
