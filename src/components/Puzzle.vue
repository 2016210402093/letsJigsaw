<script setup lang="ts">
  import { ref, toRefs } from 'vue'
  import TouchView from '@/components/TouchView.vue'
  import getResolvableArr from '../apis/getResolvableArr'

  const props = defineProps({
    start: {
      type: Boolean,
      default: false
    },
    level: {
      type: Number,
      default: 1
    },
    img: {
      type: String,
      default: ''
    }
  })

  const { start, level, img } = toRefs(props)

  // 难度级别

  const blankNum = level.value * level.value - 1

  const WH = ref(`${(100 / level.value).toFixed(6)}%`)

  interface PlateConfig {
    x: number
    y: number
    rotate: boolean
    puzzleNum: number
    rotateNum: number
  }

  // 拼图版
  const plates = ref<PlateConfig[]>([])

  const initPlates = () => {
    // 打乱数组 保证有解
    const puzzleArray = getResolvableArr(level.value, level.value)
    plates.value = []
    puzzleArray.forEach((item: number) => {
      plates.value.push({
        x: Math.floor(item / level.value),
        y: item % level.value,
        rotate: false,
        puzzleNum: item,
        rotateNum: Math.floor(Math.random() * 4)
      })
    })
    plates.value[plates.value.length - 1].rotateNum = 0
  }

  const getBackgroundPosition: (x: number) => string = (x: number) => {
    const percent = 100 / (level.value - 1)
    return `${(x * percent).toFixed(6)}%`
  }

  const rotatePlate = (index: number) => {
    const item = plates.value[index]
    item.rotate = true
    console.log(item.rotate)
    item.rotateNum = (item.rotateNum + 1) % 4
    setTimeout(() => {
      item.rotate = false
    }, 50)
  }

  const touchEvent = (action: string, index: number) => {
    if (action === 'click') {
      rotatePlate(index)
      return
    }
    const curX = Math.floor(index / level.value)
    const curY = index % level.value

    let tarX = -1
    let tarY = -1

    if (action === 'right') {
      tarX = curX
      tarY = curY + 1
    } else if (action === 'left') {
      tarX = curX
      tarY = curY - 1
      console.log('left: ', tarX, tarY)
    } else if (action === 'top') {
      tarX = curX - 1
      tarY = curY
    } else if (action === 'bottom') {
      tarX = curX + 1
      tarY = curY
    }
    if (tarX >= level.value || tarX < 0 || tarY >= level.value || tarY < 0) return
    const tarIndex = tarX * level.value + tarY
    if (plates.value[tarIndex].puzzleNum === blankNum) {
      const temp = plates.value[index]
      plates.value[index] = plates.value[tarIndex]
      plates.value[tarIndex] = temp
    }
  }

  const checkPuzzle = () => {
    let isOk = true
    console.log(plates)
    for (let index = 0; index < plates.value.length - 1; index++) {
      if (plates.value[index].puzzleNum !== index || plates.value[index].rotateNum !== 0) {
        isOk = false
        break
      }
    }
    console.log(isOk ? '完成' : '未完成')
    return isOk
  }

  initPlates()

  defineExpose({
    checkPuzzle,
    restart: initPlates
  })
</script>

<template>
  <div class="puzzle">
    <img class="origin_img" v-if="!start" :src="img" alt="第一关" />
    <Transition name="fade" mode="in-out">
      <TouchView v-if="start" class="pannel" @touch-event="touchEvent">
        <div
          class="plate"
          v-for="(item, index) in plates"
          :key="item.puzzleNum"
          :style="{
            width: WH,
            height: WH
          }"
        >
          <div
            v-if="item.puzzleNum !== blankNum"
            :class="[{ rotate: item.rotate }, 'backgrond']"
            :data-index="index"
            :style="{
              transform: `rotate(${item.rotateNum * 90}deg)`,
              backgroundPosition: `${getBackgroundPosition(item.y)} ${getBackgroundPosition(
                item.x
              )}`
            }"
          />
          <div v-else class="empty" :data-index="index" />
        </div>
      </TouchView>
    </Transition>
  </div>
</template>

<style lang="less" scoped>
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 1s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }

  .puzzle {
    width: 360px;
    height: 360px;
    overflow: hidden;
    box-shadow: 0 0 15px #3e3e3e;
  }

  .pannel_box {
    width: 360px;
    height: 360px;
  }
  .origin_img {
    display: block;
    .pannel_box();
  }

  .pannel {
    .pannel_box();
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;

    .plate {
      flex: 0 0 auto;
      box-sizing: border-box;
      border: 1px solid #fff;
      overflow: hidden;

      .empty {
        width: 100%;
        height: 100%;
        background-color: white;
      }

      .backgrond {
        width: 100%;
        height: 100%;
        background: url('@/assets/test.jpg') no-repeat;
        background-size: 360px 360px;
      }
    }

    .rotate {
      -webkit-animation: rotate-90-cw 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
      animation: rotate-90-cw 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
      animation-fill-mode: forwards;
    }

    @-webkit-keyframes rotate-90-cw {
      0% {
        -webkit-transform: rotate(0);
        transform: rotate(0);
      }
      100% {
        -webkit-transform: rotate(90deg);
        transform: rotate(90deg);
      }
    }
    @keyframes rotate-90-cw {
      0% {
        -webkit-transform: rotate(0);
        transform: rotate(0);
      }
      100% {
        -webkit-transform: rotate(90deg);
        transform: rotate(90deg);
      }
    }
  }
</style>
