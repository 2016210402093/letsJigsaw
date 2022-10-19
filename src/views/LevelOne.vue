<script setup lang="ts">
  import Puzzle from '@/components/Puzzle.vue'
</script>

<template>
  <div class="level_one">
    <Puzzle />
  </div>
</template>

<style lang="less" scoped>
  .level_one {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100vw;
    height: 100vh;
    background-color: #cc462b;
  }
</style>
