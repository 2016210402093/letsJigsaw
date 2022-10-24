<script setup lang="ts">
  import { useRouter } from 'vue-router'

  const router = useRouter()

  const goNext = () => {
    router.push({
      path: '/levelone'
    })
  }
</script>

<template>
  <div class="home">
    <img class="game_title" src="@/assets/game_title.png" alt="拼了个图" />
    <div class="home_bg">
      <img @click="goNext" class="start_btn" src="@/assets/start.png" alt="开始游戏" />
    </div>
  </div>
</template>

<style lang="less" scoped>
  .home {
    width: 100vw;
    height: 100vh;
    background-color: #cc462b;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .game_title {
      display: block;
      width: 300px;
    }

    .home_bg {
      width: 100vw;
      height: 142vw;
      background: url('@/assets/home_bg.jpg') no-repeat;
      background-size: contain;
      position: relative;

      .start_btn {
        width: 200px;
        position: absolute;
        bottom: 95px;
        left: 87px;
        border-radius: 10px;
        box-shadow: 0 0 10px #6b473f;

        -webkit-animation: vibrate-1 0.5s linear infinite both;
        animation: vibrate-1 0.5s linear infinite both;
      }
      .start_btn:active {
        margin-top: 10px;
      }

      @-webkit-keyframes vibrate-1 {
        0% {
          -webkit-transform: translate(0);
          transform: translate(0);
        }
        20% {
          -webkit-transform: translate(-2px, 2px);
          transform: translate(-2px, 2px);
        }
        40% {
          -webkit-transform: translate(-2px, -2px);
          transform: translate(-2px, -2px);
        }
        60% {
          -webkit-transform: translate(2px, 2px);
          transform: translate(2px, 2px);
        }
        80% {
          -webkit-transform: translate(2px, -2px);
          transform: translate(2px, -2px);
        }
        100% {
          -webkit-transform: translate(0);
          transform: translate(0);
        }
      }
      @keyframes vibrate-1 {
        0% {
          -webkit-transform: translate(0);
          transform: translate(0);
        }
        20% {
          -webkit-transform: translate(-2px, 2px);
          transform: translate(-2px, 2px);
        }
        40% {
          -webkit-transform: translate(-2px, -2px);
          transform: translate(-2px, -2px);
        }
        60% {
          -webkit-transform: translate(2px, 2px);
          transform: translate(2px, 2px);
        }
        80% {
          -webkit-transform: translate(2px, -2px);
          transform: translate(2px, -2px);
        }
        100% {
          -webkit-transform: translate(0);
          transform: translate(0);
        }
      }
    }
  }
</style>
