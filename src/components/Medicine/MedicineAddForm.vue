<script setup>
import { FormInput, FormSelect } from '../Form'
import { dateToStr } from '@/lib/utils'
import SelectCategory from '../SelectCategory.vue'
import { useForm, useFieldArray, ErrorMessage } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { ref } from 'vue'
import { watch } from 'vue'
import { useRouter } from 'vue-router'
import { useMedicineStore } from '@/stores/medicine'

const selected = ref([])
const loading = ref(false)
const router = useRouter()
const useMedicine = useMedicineStore()

const form = useForm({
   validationSchema: toTypedSchema(
      z.object({
         medicinename: z.string(),
         brand: z.string(),
         price: z.number().int().positive().min(1),
         unit: z.enum(useMedicine.getUnits),
         stock: z.number().int().positive().min(1),
         expirationdate: z.coerce.date(),
         categories: z.array(z.string()),
      }),
   ),
})
const { replace } = useFieldArray('categories')

watch(selected, () => {
   replace(selected.value)
})

const onSubmit = form.handleSubmit(async (values) => {
   loading.value = true
   values.expirationdate = dateToStr(values.expirationdate)
   const success = await useMedicine.createMediciness(values)
   if (success) {
      await router.push({ name: 'Medicine' })
   }
   loading.value = false
})
</script>

<template>
   <form @submit="onSubmit" class="space-y-6">
      <div class="flex flex-col gap-4 md:gap-12 md:grid grid-cols-[1fr_35%]">
         <div class="space-y-4">
            <FormInput name="medicinename" label="Nama" type="text" placeholder="Nama Obat" />
            <FormInput name="brand" label="Brand" type="text" placeholder="Nama Brand" />
            <FormInput name="price" label="Price" type="number" placeholder="Harga Obat" />
            <FormSelect
               name="unit"
               label="Unit"
               :options="useMedicine.getUnits"
               placeholder="Satuan Unit"
            ></FormSelect>
            <FormInput name="stock" label="Amount" type="number" />
         </div>
         <div class="space-y-4">
            <FormInput
               name="expirationdate"
               label="Expiration date"
               type="date"
               placeholder="Expiration date"
               :min="dateToStr(new Date())"
            />
            <div class="form-control w-full">
               <div class="label text-lg font-semibold">
                  <span class="label-text">Kategori Obat</span>
                  <ErrorMessage class="label-text-alt text-error" name="categories"></ErrorMessage>
               </div>
               <SelectCategory v-model:selected="selected" />
            </div>
         </div>
      </div>
      <button class="btn btn-sm w-full btn-warning shadow text-white mt-6" :disabled="loading">
         Update
      </button>
   </form>
</template>
