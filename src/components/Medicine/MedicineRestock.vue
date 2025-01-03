<script setup>
import { toTypedSchema } from '@vee-validate/zod'
import { FormInput } from '../Form'
import { DialogForm } from '../Dialog'
import * as z from 'zod'
import { dateToStr } from '@/lib/utils'
import { ref } from 'vue'
import { useMedicineStore } from '@/stores/medicine'

const props = defineProps({
   medicineid: {
      type: String,
      required: true,
   },
   medicinename: {
      type: String,
      required: true,
   },
})

const loading = ref(false)
const medicineStore = useMedicineStore()

const validationSchema = toTypedSchema(
   z.object({
      amount: z.number().int().positive().min(1),
      expirationdate: z.coerce.date().min(new Date()),
   }),
)

const onSubmit = async (values, closeModal) => {
   loading.value = true
   values = {
      ...values,
      expirationdate: dateToStr(values.expirationdate),
      medicineid: props.medicineid,
      medicinename: props.medicinename,
   }
   await medicineStore.restockMediciness(values)
   closeModal()
   await medicineStore.fetchMediciness()
   loading.value = false
}
</script>

<template>
   <DialogForm
      title="Restock medicine"
      :validation-schema="validationSchema"
      :loading="loading"
      @submit="onSubmit"
      btn-label="Restock"
      btn-class="btn btn-xs btn-info"
   >
      <div class="min-h-80 mt-4">
         <FormInput name="amount" label="Jumlah" type="number" placeholder="Jumlah stock" />
         <FormInput
            name="expirationdate"
            label="Tanggal Kadaluarsa"
            type="date"
            :min="dateToStr(new Date())"
         />
      </div>
   </DialogForm>
</template>
