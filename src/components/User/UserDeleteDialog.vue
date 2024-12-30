<script setup>
import { DialogConfirmation } from '@/components/dialog'
import { deleteUser } from '@/lib/api/user'
import { toast } from 'vue-sonner'
import { ref } from 'vue'

const props = defineProps({
   userid: String,
})
const emit = defineEmits(['onSuccess'])

const loading = ref(false)

const onConfirm = async (closeModal) => {
   loading.value = true
   await deleteUser(props.userid).then((res) => {
      toast.success(res.data.message)
      closeModal()
      emit('onSuccess')
   })
   closeModal()
}
</script>

<template>
   <DialogConfirmation
      v-slot="{ open }"
      @confirm="onConfirm"
      title="Delete Pegawai"
      desc="Apakah kamu yakin ingin menghapus user?"
      btn-confirm-class="btn btn-sm btn-error shadow"
      :loading="loading"
   >
      <button @click="open()" class="btn btn-xs btn-error">Delete</button>
   </DialogConfirmation>
</template>
