<script setup>
import { DialogConfirmation } from '@/components/Dialog'
import { ref } from 'vue'
import { useMedicineStore } from '@/stores/medicine'

const props = defineProps({
   id: String,
})
const medicineStore = useMedicineStore()
const loading = ref(false)

const onConfirm = async (closeModal) => {
   loading.value = true
   await medicineStore.deleteMedicine(props.id)
   closeModal()
   loading.value = false
}
</script>

<template>
   <DialogConfirmation
      v-slot="{ open }"
      @confirm="onConfirm"
      title="Delete Obat"
      desc="Apakah kamu yakin ingin menghapus obat?"
      btn-confirm-class="btn btn-sm btn-error shadow"
      :loading="loading"
   >
      <button @click="open()" class="btn btn-xs btn-error">Delete</button>
   </DialogConfirmation>
</template>
