<script setup lang="ts">
  import { reactive, ref } from 'vue'
  import TouchView from '@/components/TouchView.vue'
  import getResolvableArr from '../apis/getResolvableArr'

  // 难度级别
  const level = ref(3)

  const blankNum = level.value * level.value - 1

  const WH = ref(`${(100 / level.value).toFixed(6)}%`)

  // 打乱数组 保证有解
  const puzzleArray = getResolvableArr(level.value, level.value)

  //是否显示dialog
  const showDialog = ref(false)

  interface PlateConfig {
    x: number
    y: number
    rotate: boolean
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
        rotate: false,
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
    if (!isOk) showDialog.value = true
    console.log(isOk ? '完成' : '未完成')
    return isOk
  }

  defineExpose({
    checkPuzzle
  })
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
        :class="[{ rotate: item.rotate }, 'backgrond']"
        :data-index="index"
        :style="{
          transform: `rotate(${item.rotateNum * 90}deg)`,
          backgroundPosition: `${getBackgroundPosition(item.y)} ${getBackgroundPosition(item.x)}`
        }"
      />
      <div v-else class="empty" :data-index="index" />
    </div>
  </TouchView>

  <van-overlay :show="showDialog">
    <div class="wrapper">
      <div class="dialog">
        <p class="title">提示</p>
        <div class="content">
          <img class="img" src="@/assets/notok.svg" alt="未完成" />
          <p class="msg"> 您还未完成拼图哦！ </p>
          <van-button plain class="button" @click="showDialog = false" type="default">
            确定</van-button
          ></div
        >
      </div>
    </div>
  </van-overlay>
</template>

<style lang="less" scoped>
  .pannel {
    width: 360px;
    height: 360px;
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
        background-attachment: fixed;
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

  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;

    .dialog {
      width: 250px;
      border: 6px solid orange;
      min-height: 150px;
      background-color: white;
      border-radius: 15px;
      position: relative;

      .title {
        position: absolute;
        left: 75px;
        top: -20px;
        background-color: orange;
        width: 100px;
        height: 40px;
        font-size: 20px;
        text-align: center;
        margin: unset;
        color: #ebdf87;
        border-radius: 8px;
        line-height: 40px;
        font-weight: bolder;
        box-shadow: 0px 1px #3e3e3e, 0px 2px #3e3e3e, 0px 3px #3e3e3e, 0px 4px #3e3e3e;
      }

      .content {
        padding: 20px 0;
        margin: 5px;
        border: 3px solid gray;
        width: calc(100% - 16px);
        height: calc(100% - 56px);
        border-radius: 10px;

        .img {
          display: block;
          width: 100px;
          margin: 0 auto;
        }

        .msg {
          width: 100%;
          font-size: 18px;
          font-weight: bolder;
          text-align: center;
        }

        .button {
          border: 3px solid;
          margin: 0 auto;
          display: block;
          width: 150px;
          border-radius: 8px;
          font-size: 18px;
          box-shadow: 0px 1px #3e3e3e, 0px 2px #3e3e3e, 0px 3px #3e3e3e;
        }
      }
    }
  }
</style>
