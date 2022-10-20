<script setup lang="ts">
  import { ref, watch } from 'vue'

  const props = defineProps({
    start: {
      type: Boolean,
      value: false
    }
  })

  const currentRate = ref(99)
  const rate = ref<number | string>(100)
  // let timer: any = null
  // const second = ref(0)
  // const minute = ref(5)

  const gradientColor = {
    '0%': '#ff8000',
    '100%': '#ebdf87'
  }

  watch(
    () => props.start,
    () => {
      if (props.start === true) rate.value = 0
    },
    { immediate: true }
  )
</script>

<template>
  <div class="header">
    <van-circle
      v-model:current-rate="currentRate"
      :speed="0.33"
      :rate="rate"
      :color="gradientColor"
    >
      <img class="clock" src="@/assets/clock_1.svg" alt="闹钟" />
    </van-circle>
  </div>
</template>

<style lang="less" scoped>
  .header {
    padding: 20px 0 20px 0;
    display: flex;
    align-items: center;
    justify-content: center;

    .clock {
      color: #ff8000;
      width: 50px;
      height: 50px;
      margin: 25px auto;
    }
  }
</style>
