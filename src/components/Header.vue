<script setup lang="ts">
  import { ref, toRefs } from 'vue'

  const props = defineProps({
    speed: {
      type: Number,
      default: 0
    }
  })

  const { speed } = toRefs(props)

  const currentRate = ref(100)
  const rate = 0
  const gradientColor = {
    '0%': '#3fecff',
    '100%': '#6149f6'
  }
</script>

<template>
  <div class="header">
    {{ speed }}
    {{ currentRate }}
    {{ rate }}
    <van-circle
      v-model:current-rate="currentRate"
      :speed="speed"
      :rate="rate"
      :color="gradientColor"
      text="渐变色"
    >
      <img class="clock" src="@/assets/clock_1.svg" alt="闹钟" />
    </van-circle>
  </div>
</template>

<style lang="less" scoped>
  .header {
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;

    .clock {
      width: 50px;
      height: 50px;
      margin: 25px auto;
    }
  }
</style>
