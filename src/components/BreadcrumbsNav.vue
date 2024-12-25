<template>
   <div class="breadcrumbs text-sm">
      <ul>
         <li>
            <router-link :to="{ name: 'Home' }">Home</router-link>
         </li>
         <li v-for="(matched, index) in $route.matched" :key="index">
            <router-link v-if="matched.name != $route.name" :to="matched.path">{{
               matched.meta.title
            }}</router-link>
            <span v-else>
               {{ $route.meta.title }}
            </span>
         </li>
      </ul>
   </div>
</template>
