<template>
   <router-link to="/" class="w-full text-nowrap px-2">
      <slot name="icon" />
      <span class="sidebar-link">
         <slot name="label" />
      </span>
   </router-link>
</template>
<style scoped>
@media screen and (min-width: 768px) {
   .sidebar:not(.active) .sidebar-link {
      @apply invisible absolute left-0 w-0 opacity-0;
   }
   .sidebar:not(.active):hover .sidebar-link {
      @apply visible relative w-full opacity-100;
   }
}
</style>
