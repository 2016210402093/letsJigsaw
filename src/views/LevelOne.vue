<script setup lang="ts">
  import Puzzle from '@/components/Puzzle.vue'
  import Header from '@/components/Header.vue'
  import { ref } from 'vue'

  const start = ref(false)
  const puzzle = ref()

  const checkPuzzle = () => {
    puzzle.value.checkPuzzle()
  }
</script>

<template>
  <div class="level_one">
    <Header :start="start" />
    <Puzzle ref="puzzle" />
    <img class="btn" v-if="!start" @click="start = true" src="@/assets/begin.jpg" alt="开始" />
    <img class="btn" v-else @click="checkPuzzle" src="@/assets/finish.jpg" alt="完成" />
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

    .btn {
      display: block;
      width: 120px;
      height: 70px;
      border-radius: 8px;
      box-shadow: 0 0 10px #6b473f;
      margin-top: 50px;
    }

    .btn:active {
      width: 132px;
      height: 77px;
    }
  }
</style>
