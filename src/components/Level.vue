<script setup lang="ts">
  import Puzzle from '@/components/Puzzle.vue'
  import Header from '@/components/Header.vue'
  import { reactive, ref, toRefs } from 'vue'
  import unCompletedImg from '@/assets/notok.svg'
  import { useRouter } from 'vue-router'

  const props = defineProps({
    title: {
      type: String,
      default: ''
    },
    content: {
      type: String,
      default: ''
    },
    level: {
      type: Number,
      default: 2
    },
    img: {
      type: String,
      default: ''
    }
  })

  const start = ref(false)
  const puzzle = ref()
  const header = ref()
  const router = useRouter()
  const showHistory = ref(false)

  const { title, content, level, img } = toRefs(props)

  const dialog = reactive({
    show: false,
    text: '',
    imgSrc: unCompletedImg,
    showcancelBtn: false,
    confirmText: '确定',
    cancelText: '取消',
    confirmFn: () => {},
    cancelFn: () => {}
  })

  const closeDialog = () => {
    dialog.show = false
  }

  const restart = () => {
    start.value = false
    dialog.show = false
    header.value.restart()
    puzzle.value.restart()
  }

  const redirectHome = () => {
    dialog.show = false
    const map = [0, 0, -1, -2, 0, 0, -3]
    router.go(map[level.value])
  }

  const goNext = () => {
    showHistory.value = false
    const map = ['', '', 'leveltwo', 'levelthree', '', '', 'success']
    router.push({
      path: map[level.value]
    })
  }

  const onTimeout = () => {
    console.log('in timerout')
    dialog.show = true
    dialog.text = '时间到了！'
    dialog.imgSrc = unCompletedImg
    dialog.showcancelBtn = true
    dialog.confirmText = '再来一次'
    dialog.cancelText = '返回首页'
    dialog.confirmFn = restart
    dialog.cancelFn = redirectHome
  }

  const checkPuzzle = () => {
    const result = puzzle.value.checkPuzzle()

    if (result === false) {
      dialog.show = true
      dialog.showcancelBtn = false
      dialog.confirmFn = closeDialog
      dialog.text = '您还未完成拼图哦！'
      dialog.imgSrc = unCompletedImg
      dialog.confirmText = '确定'
    }
    if (result === true) {
      showHistory.value = true
    }
  }
</script>

<template>
  <div class="level_one">
    <Header ref="header" :start="start" @timeout="onTimeout" />
    <Puzzle ref="puzzle" :level="level" :start="start" :img="img" />
    <img class="btn" v-if="!start" @click="start = true" src="@/assets/begin.jpg" alt="开始" />
    <img class="btn" v-else @click="checkPuzzle" src="@/assets/finish.jpg" alt="完成" />

    <van-overlay :show="dialog.show">
      <div class="wrapper">
        <div class="dialog">
          <p class="title">提示</p>
          <div class="content">
            <img class="img" :src="dialog.imgSrc" alt="未完成" />
            <p class="msg"> {{ dialog.text }} </p>
            <van-button plain class="button" @click="dialog.confirmFn" type="default">
              {{ dialog.confirmText }}
            </van-button>
            <van-button
              plain
              class="button"
              v-if="dialog.showcancelBtn"
              @click="dialog.cancelFn"
              type="default"
            >
              {{ dialog.cancelText }}
            </van-button>
          </div>
        </div>
      </div>
    </van-overlay>

    <van-overlay :show="showHistory">
      <div class="wrapper">
        <div class="history">
          <p class="his_title">{{ title }}</p>
          <div class="img_box">
            <img class="his_img" :src="img" />
          </div>
          <p class="his_content">
            {{ content }}
          </p>

          <van-button plain @click="goNext" class="card_btn" type="default"> 下一关 </van-button>
        </div>
      </div>
    </van-overlay>
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

  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .card_btn {
    border: 3px solid;
    margin: 10px auto;
    display: block;
    width: 150px;
    border-radius: 8px;
    font-size: 18px;
    box-shadow: 0px 1px #3e3e3e, 0px 2px #3e3e3e, 0px 3px #3e3e3e;
  }

  .history {
    width: 300px;
    flex-direction: column;
    background-color: #fff;
    border-radius: 10px;

    p {
      margin: unset;
    }

    .his_title {
      width: 100%;
      font-size: 20px;
      padding: 10px;
      font-weight: bolder;
      text-align: center;
    }

    .img_box {
      width: 300px;
      height: 180px;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      .his_img {
        width: 100%;
      }
    }

    .his_content {
      width: 100%;
      padding: 10px;
      box-sizing: border-box;
      font-size: 14px;
      text-indent: 2em;
    }
  }

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
        .card_btn();
      }
    }
  }
</style>
