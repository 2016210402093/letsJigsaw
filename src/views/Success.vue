<script setup lang="ts">
  import { useRouter } from 'vue-router'

  const router = useRouter()

  const redirectHome = () => {
    router.go(-4)
  }
</script>

<template>
  <div class="container">
    <img class="success_img" src="@/assets/success.svg" alt="通关成功" />
    <img class="success_txt" src="@/assets/success_txt.png" alt="通关成功" />
    <img class="success_btn" @click="redirectHome" src="@/assets/success_btn.png" alt="返回首页" />
  </div>
</template>

<style lang="less" scoped>
  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    .success_img {
      display: block;
      width: 200px;
    }

    .success_txt {
      width: 220px;
      position: relative;
      top: -30px;
      display: block;
    }

    .success_btn {
      width: 180px;
      display: block;
      border-radius: 10px;
      box-shadow: 0 0 10px #6b473f;
    }

    .success_btn:active {
      position: relative;
      top: 10px;
    }
  }
</style>
