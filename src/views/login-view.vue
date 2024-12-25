<script setup>
import { Icon } from '@iconify/vue'
import { FormInput } from '@/components/Form'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import * as z from 'zod'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { ref } from 'vue'
import { toast } from 'vue-sonner'

const userStore = useUserStore()
const disabled = ref(false)
const router = useRouter()

const { handleSubmit } = useForm({
   validationSchema: toTypedSchema(
      z.object({
         email: z.string().max(100).email('This is not a valid email.'),
         password: z.string().min(8).max(100),
      }),
   ),
})

const onSumbit = handleSubmit((values) => {
   disabled.value = true
   userStore
      .login(values)
      .then(async (res) => {
         const { message } = res.data
         toast.success(message)
         await router.push({ name: 'Home' })
         disabled.value = false
      })
      .catch(async () => {
         await new Promise((resolve) => setTimeout(resolve, 600))
         disabled.value = false
      })
})
</script>
<template>
   <section>
      <div class="lg:grid lg:min-h-screen lg:grid-cols-12">
         <section
            class="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6"
         >
            <img
               alt=""
               src="@/assets/img/home-bg.jpg"
               class="absolute inset-0 h-full w-full object-cover opacity-80"
            />

            <div class="hidden lg:relative lg:block lg:p-12">
               <i class="block text-white">
                  <span class="sr-only">Home</span>
                  <Icon icon="mdi:cart" width="24" height="24" class="w-10 h-10" />
               </i>

               <h2 class="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
                  Welcome to Kasir Apotek💊
               </h2>

               <p class="mt-4 leading-relaxed text-white/90">Login Untuk mendapatkan akses.</p>
            </div>
         </section>

         <main
            class="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
         >
            <div class="w-full">
               <div class="relative -mt-16 block lg:hidden">
                  <i
                     class="inline-flex size-16 items-center justify-center rounded-full bg-white text-primary sm:size-20"
                     href="#"
                  >
                     <span class="sr-only">Home</span>
                     <Icon icon="mdi:cart" width="24" height="24" class="w-10 h-10" />
                  </i>
                  <h1 class="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                     Welcome to Kasir Apotek💊
                  </h1>
                  <p class="mt-4 leading-relaxed text-gray-500">Login Untuk mendapatkan akses.</p>
               </div>

               <form action="#" class="mt-8 grid grid-cols-6 gap-6" @submit="onSumbit">
                  <div class="col-span-6">
                     <FormInput
                        name="email"
                        label="Email"
                        type="email"
                        placeholder="Masukkan Email"
                     />
                  </div>
                  <div class="col-span-6">
                     <FormInput
                        name="password"
                        label="Password"
                        type="password"
                        placeholder="Masukkan Password"
                     />
                  </div>
                  <div class="col-span-6 sm:flex sm:items-center sm:gap-4">
                     <button class="btn btn-primary btn-sm w-full" :disabled="disabled">
                        Login
                     </button>
                  </div>
               </form>
            </div>
         </main>
      </div>
   </section>
</template>
