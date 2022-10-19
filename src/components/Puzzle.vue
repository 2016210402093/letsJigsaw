<script setup lang="ts">
  import { reactive, ref } from 'vue'
  import TouchView from '@/components/TouchView.vue'
  import getResolvableArr from '../apis/getResolvableArr'

  // 难度级别
  const level = ref(3)

  const blankNum = level.value * level.value - 1

  const WH = ref(`${(100 / level.value).toFixed(6)}%`)

  // 打乱的数组 后续需要保证有解
  // const puzzleArray = [8, 1, 4, 2, 3, 6, 5, 0, 7]
  const puzzleArray = getResolvableArr(level.value, level.value)
  console.log(puzzleArray)

  interface PlateConfig {
    x: number
    y: number
    puzzleNum: number
    rotateNum: number
  }

  // 拼图版
  const plates: PlateConfig[] = reactive([])

  const initPlates = () => {
    puzzleArray.forEach((item: number) => {
      plates.push({
        x: Math.floor(item / level.value),
        y: item % level.value,
        puzzleNum: item,
        rotateNum: Math.floor(Math.random() * 4)
      })
    })
  }

  const getBackgroundPosition: (x: number) => string = (x: number) => {
    const percent = 100 / (level.value - 1)
    return `${(x * percent).toFixed(6)}%`
  }

  const rotatePlate = (index: number) => {
    const item = plates[index]
    item.rotateNum = (item.rotateNum + 1) % 4
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
    if (plates[tarIndex].puzzleNum === blankNum) {
      const temp = plates[index]
      plates[index] = plates[tarIndex]
      plates[tarIndex] = temp
    }
  }

  initPlates()

  const checkPuzzle = () => {
    let isOk = true
    for (let index = 0; index < plates.length; index++) {
      if (plates[index].puzzleNum !== index || plates[index].rotateNum !== 0) {
        isOk = false
        break
      }
    }
    console.log(isOk ? '完成' : '未完成')
    return isOk
  }
</script>

<template>
  <TouchView class="pannel" @touch-event="touchEvent">
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
        class="backgrond"
        :data-index="index"
        :style="{
          transform: `rotate(${item.rotateNum * 90}deg)`,
          backgroundPosition: `${getBackgroundPosition(item.y)} ${getBackgroundPosition(item.x)}`
        }"
      />
      <div v-else class="empty" :data-index="index" />
    </div>
  </TouchView>

  <button @click="checkPuzzle">完成</button>
</template>

<style lang="less" scoped>
  .pannel {
    width: 360px;
    height: 360px;
    background-color: pink;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;

    .plate {
      flex: 0 0 auto;
      box-sizing: border-box;
      border: 1px solid #fff;

      .empty {
        width: 100%;
        height: 100%;
        background-color: white;
      }

      .backgrond {
        width: 100%;
        height: 100%;
        background: url('@/assets/test.jpg') no-repeat;
        background-attachment: fixed;
        background-size: 360px 360px;
      }
    }
  }
</style>
