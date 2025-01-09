<script setup>
import { FormInput, FormSelect } from '../Form'
import SelectCategory from '../SelectCategory.vue'
import { useForm, useFieldArray, ErrorMessage } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { onMounted, ref } from 'vue'
import { watch } from 'vue'
import { useRouter } from 'vue-router'
import { useMedicineStore } from '@/stores/medicine'

const props = defineProps({
   medicineId: {
      type: String,
      require: true,
   },
})

const selected = ref([])
const loading = ref(true)
const router = useRouter()
const medicineData = ref({})
const medicineStore = useMedicineStore()

const form = useForm({
   validationSchema: toTypedSchema(
      z.object({
         medicinename: z.string(),
         brand: z.string(),
         price: z.number().int().positive().min(1),
         unit: z.enum(medicineStore.getUnits),
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
   await medicineStore.updateMedicine(props.medicineId, values)
   router.push({ name: 'Medicine' })
   loading.value = false
})

onMounted(async () => {
   if (!medicineStore.getMediciness.length) {
      await medicineStore.fetchMediciness()
   }
   medicineData.value = medicineStore.getMedicineById(props.medicineId)[0]
   if (!medicineData.value) {
      await router.push({ name: '404' })
   }
   form.setValues({
      medicinename: medicineData.value.medicineName,
      brand: medicineData.value.brand,
      categories: medicineData.value.categories,
      price: medicineData.value.price,
      unit: medicineData.value.unit,
   })
   selected.value = medicineData.value.categories.map((category) => category.categoryID)
   loading.value = false
})
</script>

<template>
   <form @submit="onSubmit" class="space-y-6">
      <div class="flex flex-col gap-4 md:gap-12 md:grid grid-cols-[1fr_35%]">
         <div class="space-y-4">
            <FormInput
               name="medicinename"
               label="Nama"
               type="text"
               placeholder="Nama Obat"
               :disabled="loading"
            />
            <FormInput
               name="brand"
               label="Brand"
               type="text"
               placeholder="Nama Brand"
               :disabled="loading"
            />
            <FormInput
               name="price"
               label="Price"
               type="number"
               placeholder="Harga Obat"
               :disabled="loading"
            />
            <FormSelect
               name="unit"
               label="Unit"
               :options="medicineStore.getUnits"
               placeholder="Satuan Unit"
               :disabled="loading"
            ></FormSelect>
         </div>
         <div class="space-y-4">
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
