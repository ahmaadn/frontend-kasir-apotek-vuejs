<script setup>
import 'vue3-easy-data-table/dist/style.css'
import '@/assets/css/table.css'

import { TableFilter, TablePagination } from '@/components/Table'
import { FormInput, FormTextarea } from '@/components/Form'
import { DialogForm } from '@/components/Dialog'
import { cretaeCategoryMedicine, getCategoryMedicine } from '@/lib/api/category'
import { onMounted, ref } from 'vue'
import { toast } from 'vue-sonner'
import * as z from 'zod'
import { toTypedSchema } from '@vee-validate/zod'

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
   { text: 'description', value: 'categorydescription' },
]

const categories = ref([])
const loading = ref(true)
const dataTable = ref()

const loadCategory = async () => {
   await getCategoryMedicine()
      .then((res) => {
         const data = res.data
         categories.value = data.data
         toast.success(data.message)
      })
      .catch((err) => {
         console.log(err)
      })
   loading.value = false
}

const validationSchema = toTypedSchema(
   z.object({
      categoryname: z.string().min(3),
      categorydescription: z.string(),
   }),
)

const onSubmit = async (values, closeModal) => {
   loading.value = true
   await cretaeCategoryMedicine(values)
      .then(async (res) => {
         toast.success(res.data.successes[0])
         await loadCategory()
      })
      .catch((error) => {
         console.error(error)
      })
   loading.value = false
   closeModal()
}

onMounted(loadCategory)
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
               <p></p>
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
            v-model:items="categories"
            v-slot="{ items }"
         >
            <EasyDataTable
               ref="dataTable"
               :headers="headers"
               :items="items"
               hide-footer
               show-index
            ></EasyDataTable>
         </TableFilter>
         <TablePagination v-model:dataTable="dataTable" />
      </div>
   </div>
</template>
