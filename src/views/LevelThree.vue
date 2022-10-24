<script setup lang="ts">
  import Level from '@/components/Level.vue'
  import imgSrc from '@/assets/test.jpg'
  import { ref } from 'vue'

  const title = ref('这是标题')
  const content = ref(
    '这是一个测试图片，这是一个测试图片这是一个测试图片，这是一个测试图片这是一个测试图片这是一个测试图片这是一个测试图片，这是一个测试图片。'
  )
</script>

<template>
  <Level :title="title" :content="content" :level="6" :img="imgSrc" />
</template>

<style lang="less" scoped></style>
