<template>
   <div id="notfound relative h-screen">
      <div
         class="notfound absolute -translate-x-2/4 -translate-y-2/4 left-2/4 top-2/4 max-w-[460px] w-full text-center leading-[1.4]"
      >
         <div class="notfound-404 relative w-[180px] h-[180px] mt-0 mb-[50px] mx-auto">
            <div
               class="absolute rotate-45 rounded-[5px] border-[5px] border-dashed border-black inset-0 bg-warning"
            ></div>
            <h1
               class="text-black font-bold text-[90px] absolute -translate-x-2/4 -translate-y-2/4 text-center h-10 leading-10 m-0 left-2/4 top-2/4"
            >
               404
            </h1>
         </div>
         <h2 class="text-3xl font-bold uppercase">Page not found</h2>
         <p class="text-base text-black font-normal">
            The page you are looking for might have been removed had its name changed or is
            temporarily unavailable.
         </p>
         <router-link to="/" class="btn btn-primary max-w-96 btn-sm mt-4">home page</router-link>
      </div>
   </div>
</template>
<style scoped>
* {
   @apply box-border;
}
body {
   @apply m-0 p-0;
}

.notfound-404 > div:first-child:before {
   @apply content-[''] absolute left-[-5px] right-[-5px] bottom-[-5px] top-[-5px] shadow-[0px_0px_0px_5px_rgba(0,0,0,0.1)_inset] rounded-[5px];
}
</style>
