<script setup lang="ts">
  import Puzzle from '@/components/Puzzle.vue'
  import Header from '@/components/Header.vue'
  import { ref } from 'vue'

  const speed = ref(0)

  const test = () => {
    console.log(1111)
    speed.value = 0.3333333
  }
</script>

<template>
  <div class="level_one">
    <button @click="test">test</button>
    <Header :speed="speed" />
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
