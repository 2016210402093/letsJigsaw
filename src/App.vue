<script setup lang="ts">
  // This starter template is using Vue 3 <script setup> SFCs
  // Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
</script>

<template>
  <router-view v-slot="{ Component }">
    <Transition name="slide-fade" mode="out-in">
      <component :is="Component" />
    </Transition>
  </router-view>
</template>

<style lang="less">
  body {
    padding: 0;
    margin: 0;
    background-color: #cc462b;
  }

  .slide-fade-enter-active {
    transition: all 0.3s ease-out;
  }

  .slide-fade-leave-active {
    transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
  }

  .slide-fade-enter-from {
    transform: translateX(-375px);
    opacity: 0;
  }
  .slide-fade-leave-to {
    transform: translateX(375px);
    opacity: 0;
  }
</style>
