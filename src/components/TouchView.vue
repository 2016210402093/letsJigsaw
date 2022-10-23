<script setup lang="ts">
  import { ref } from 'vue'

  // 精度
  const accuracy = 15

  const emit = defineEmits(['touchEvent'])

  const touchStartX = ref(0)
  const touchStartY = ref(0)

  const targetIndex = ref(0)

  const touchStart = (e: any) => {
    // console.log(e)
    touchStartX.value = e.touches[0].clientX
    touchStartY.value = e.touches[0].clientY
    targetIndex.value = Number(e.target.dataset.index)
    // console.log(touchStartX.value, touchStartY.value, e.target.dataset.index)
  }

  const touchMove = (e: any) => {
    e.preventDefault()
  }

  const touchEnd = (e: any) => {
    let deltaX = e.changedTouches[0].clientX - touchStartX.value
    let deltaY = e.changedTouches[0].clientY - touchStartY.value

    if (Math.abs(deltaX) > accuracy && Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX >= 0) emit('touchEvent', 'right', targetIndex.value)
      else emit('touchEvent', 'left', targetIndex.value)
    } else if (Math.abs(deltaY) > accuracy && Math.abs(deltaX) < Math.abs(deltaY)) {
      if (deltaY < 0) emit('touchEvent', 'top', targetIndex.value)
      else emit('touchEvent', 'bottom', targetIndex.value)
    } else if (Math.abs(deltaY) <= accuracy && Math.abs(deltaX) <= accuracy) {
      emit('touchEvent', 'click', targetIndex.value)
    }
  }
</script>

<template>
  <div @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
    <slot></slot>
  </div>
</template>

<style lang="less" scoped></style>
