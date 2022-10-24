<script setup lang="ts">
  import { computed, ref, watch } from 'vue'
  import { ImagePreview } from 'vant'
  import img from '@/assets/test.jpg'

  const props = defineProps({
    start: {
      type: Boolean,
      default: false
    }
  })

  const currentRate = ref(99)
  const rate = ref<number | string>(100)

  const emit = defineEmits(['timeout'])

  const restart = () => {
    currentRate.value = 99
    rate.value = 100
  }

  const wobble = computed(() => {
    if (currentRate.value < 33 && currentRate.value > 0) return true
    else return false
  })

  const showPic = () => {
    ImagePreview({ images: [img], showIndex: false, closeable: true })
  }

  // let timer: any = null
  // const second = ref(0)
  // const minute = ref(5)

  const gradientColor = {
    '0%': '#ff8000',
    '100%': '#ebdf87'
  }

  watch(
    () => currentRate.value,
    () => {
      if (currentRate.value <= 0) {
        console.log('timerout')
        emit('timeout')
      }
    }
  )

  watch(
    () => props.start,
    () => {
      if (props.start === true) rate.value = 0
    },
    { immediate: true }
  )

  defineExpose({
    restart
  })
</script>

<template>
  <div class="header">
    <div class="info">
      <p class="level"><van-icon name="label" /><span>第一关</span></p>
      <p class="pic" @click="showPic"><van-icon name="eye" /><span>原图</span></p>
    </div>

    <van-circle
      class="circle"
      v-model:current-rate="currentRate"
      :speed="0.33"
      :rate="rate"
      :color="gradientColor"
    >
      <img :class="[{ wobble: wobble }, 'clock']" src="@/assets/clock_1.svg" alt="闹钟" />
    </van-circle>
  </div>
</template>

<style lang="less" scoped>
  .header {
    width: 100%;
    padding: 20px 0 20px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    .info {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      padding: 0px 20px;
      box-sizing: border-box;

      .header_text {
        width: 50%;
        color: white;
        align-self: start;
        margin: unset;
        color: #ebdf87;

        span {
          padding-left: 5px;
        }
      }

      .level {
        text-align: left;
        .header_text();
      }

      .pic {
        text-align: right;
        .header_text();
      }
    }

    .circle {
      width: 150px;
    }

    .clock {
      color: #ff8000;
      width: 50px;
      height: 50px;
      margin: 25px auto;
    }

    .wobble {
      -webkit-animation: wobble-hor-bottom 0.8s infinite both;
      animation: wobble-hor-bottom 0.8s infinite both;
    }

    @-webkit-keyframes wobble-hor-bottom {
      0%,
      100% {
        -webkit-transform: translateX(0%);
        transform: translateX(0%);
        -webkit-transform-origin: 50% 50%;
        transform-origin: 50% 50%;
      }
      15% {
        -webkit-transform: translateX(-15px) rotate(-6deg);
        transform: translateX(-15px) rotate(-6deg);
      }
      30% {
        -webkit-transform: translateX(7.5px) rotate(6deg);
        transform: translateX(7.5px) rotate(6deg);
      }
      45% {
        -webkit-transform: translateX(-7.5px) rotate(-3.6deg);
        transform: translateX(-7.5px) rotate(-3.6deg);
      }
      60% {
        -webkit-transform: translateX(4.5px) rotate(2.4deg);
        transform: translateX(4.5px) rotate(2.4deg);
      }
      75% {
        -webkit-transform: translateX(-3px) rotate(-1.2deg);
        transform: translateX(-3px) rotate(-1.2deg);
      }
    }
    @keyframes wobble-hor-bottom {
      0%,
      100% {
        -webkit-transform: translateX(0%);
        transform: translateX(0%);
        -webkit-transform-origin: 50% 50%;
        transform-origin: 50% 50%;
      }
      15% {
        -webkit-transform: translateX(-15px) rotate(-6deg);
        transform: translateX(-15px) rotate(-6deg);
      }
      30% {
        -webkit-transform: translateX(7.5px) rotate(6deg);
        transform: translateX(7.5px) rotate(6deg);
      }
      45% {
        -webkit-transform: translateX(-7.5px) rotate(-3.6deg);
        transform: translateX(-7.5px) rotate(-3.6deg);
      }
      60% {
        -webkit-transform: translateX(4.5px) rotate(2.4deg);
        transform: translateX(4.5px) rotate(2.4deg);
      }
      75% {
        -webkit-transform: translateX(-3px) rotate(-1.2deg);
        transform: translateX(-3px) rotate(-1.2deg);
      }
    }
  }
</style>
