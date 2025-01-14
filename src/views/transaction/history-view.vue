<script setup>
import { TableTransaction } from '@/components/Transaction'
import { Icon } from '@iconify/vue'
import { reportSalesExport } from '@/lib/api/report'
import { ref } from 'vue'
import { toast } from 'vue-sonner'

const loading = ref(false)

const onClick = async () => {
   toast('Wait....')
   loading.value = true
   await reportSalesExport()
      .then((response) => {
         toast.success('Download ...')
         const url = window.URL.createObjectURL(new Blob([response.data]))
         const a = document.createElement('a')
         a.href = url
         const filename = 'report sales.xlsx'
         a.setAttribute('download', filename)
         document.body.appendChild(a)
         a.click()
         a.remove()
      })
      .catch((error) => console.error(error))
   loading.value = false
}
</script>
<template>
   <div class="bg-base-100 shadow border rounded">
      <div class="py-4 px-6 flex flex-row justify-between items-center">
         <h1 class="md:text-2xl text-lg font-medium">{{ $route.meta.title }}</h1>
         <button @click="onClick" :disabled="loading" class="btn btn-success text-white btn-sm">
            Export
            <Icon icon="mdi:file-excel-outline" width="24" height="24" />
         </button>
      </div>
      <TableTransaction />
   </div>
</template>
