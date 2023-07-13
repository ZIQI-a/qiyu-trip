<template>
  <div class="app">
    <router-view v-slot="props">
      <keep-alive include="home">
        <component :is="props.Component"></component>
      </keep-alive>
    </router-view>
    <div style="height: 4rem;"></div>
    <tab-bar v-show="!route.meta.hideNavBar" />
    <loading />
  </div>
</template>

<script setup>
import tabBar from './components/tab-bar/tab-bar.vue'
import loading from './components/loading/loading.vue';
import { useRoute } from 'vue-router';

const route = useRoute();

</script>

<style lang="less" scoped></style>