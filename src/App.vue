<script setup lang="ts" >

//import BasicLayout from "./layouts/BasicLayout.vue";
import {useRoute} from "vue-router";
import {computed} from "vue";
import 'vant/es/toast/style';
let route = useRoute();
const default_layout = "default"
const isRouterAlive = true
const layout = computed(() => {
  return (route.meta.layout || default_layout) + '-layout'
})
</script>

<template>
  <div id="app">
    <component :is="layout">
      <router-view v-if="isRouterAlive"/>
    </component>
  </div>
</template>

<style>

</style>
