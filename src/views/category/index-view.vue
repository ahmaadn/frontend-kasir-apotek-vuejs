<script setup>
import 'vue3-easy-data-table/dist/style.css'
import '@/assets/css/table.css'

import { DialogConfirmation } from '@/components/Dialog'
import { TableFilter, TablePagination } from '@/components/Table'
import { FormInput, FormTextarea } from '@/components/Form'
import { DialogForm } from '@/components/Dialog'
import { onMounted, ref } from 'vue'
import * as z from 'zod'
import { toTypedSchema } from '@vee-validate/zod'
import { useCategoryStore } from '@/stores/category'

const options = {
   checkbox: {
      hide: true,
   },
   search: {
      default: '',
      filtered: function (items, search) {
         return items.filter((item) => {
            return (
               item.categoryname.toLowerCase().includes(search.toLowerCase()) ||
               item.categorydescription.toLowerCase().includes(search.toLowerCase())
            )
         })
      },
   },
}

const headers = [
   { text: 'ID', value: 'categoryid' },
   { text: 'Name', value: 'categoryname', sortable: true, fixed: false, width: 300 },
   { text: 'Description', value: 'categorydescription' },
   { text: 'Aksi', value: 'action' },
]

const loading = ref(true)
const dataTable = ref()
const useCategory = useCategoryStore()

const validationSchema = toTypedSchema(
   z.object({
      categoryname: z.string().min(3),
      categorydescription: z.string(),
   }),
)

const onSubmit = async (values, closeModal) => {
   loading.value = true
   await useCategory.createCategories(values)
   loading.value = false
   closeModal()
}

const onDelete = async (id, closeModal) => {
   loading.value = true
   await useCategory.deleteCategory(id)
   closeModal()
   loading.value = false
}

onMounted(async () => {
   loading.value = true
   await useCategory.fetchCategories()
   loading.value = false
})
</script>
<template>
   <div class="bg-base-100 shadow border rounded">
      <div class="py-4 px-6 flex flex-row justify-between items-center">
         <h1 class="md:text-2xl text-lg font-medium">Daftar Kategori Obat Saat Ini</h1>
         <DialogForm
            title="Tambah Kategori"
            :validation-schema="validationSchema"
            :loading="loading"
            @submit="onSubmit"
         >
            <div class="min-h-80 mt-4">
               <FormInput
                  name="categoryname"
                  label="Nama Kategori"
                  placeholder="Masukkan nama"
               ></FormInput>
               <FormTextarea
                  name="categorydescription"
                  label="Deskripsi"
                  placeholder="Masukkan deskripsi"
               ></FormTextarea>
            </div>
         </DialogForm>
      </div>
      <div class="p-6 space-y-6">
         <TableFilter
            :options="options"
            v-model:dataTable="dataTable"
            v-model:items="useCategory.categories"
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
               <template #item-action="item">
                  <DialogConfirmation
                     v-slot="{ open }"
                     @confirm="(closeModal) => onDelete(item.categoryid, closeModal)"
                     title="Delete Kategori"
                     desc="Apakah kamu ingin menghapus kategori?"
                     btn-confirm-class="btn btn-sm btn-error shadow"
                     :loading="loading"
                  >
                     <button @click="open()" class="btn btn-xs btn-error">Delete</button>
                  </DialogConfirmation>
               </template>
            </EasyDataTable>
         </TableFilter>
         <TablePagination v-model:dataTable="dataTable" />
      </div>
   </div>
</template>
