<!--
 * @Author: fj
 * @LastEditors: fj
 * @description:
 * @updateInfo: 本次更新内容：
 * @Date: 2024-01-09 15:15:01
 * @LastEditTime: 2024-01-09 16:10:05
-->
<script setup lang="ts" name="GlCarousel">
import { NCarousel,NCarouselItem } from 'naive-ui'
const props = defineProps({
  length: {
    type: Number,
    default: 10,
  },
  // 每一页显示的轮播图数
  size:{
    type: Number,
    default: 1,
  },
  // 轮播图之间的间距
  spaceBetween:{
    type: Number,
    default: 20,
  },
  // 是否循环播放
  loop:{
    type:Boolean,
    default: true,
  },
  // 是否自动播放
  autoplay:{
    type:Boolean,
    default: true,
  },
  // 是否通过鼠标拖拽切换轮播图
  draggable:{
    type:Boolean,
    default: true,
  },
  // 轮播图显示的方向
  direction: {
    type: String as PropType<'vertical' | 'horizontal'>,
    default: 'vertical',
  },
  // 轮播图切换时的过渡效果
  effect: {
    type: String as PropType<'slide' | 'fade' | 'card' | 'custom'>,
    default: 'slide',
  },
  interval:{
    type: Number,
    default: 2000,
  },
})
</script>
<template>
  <n-carousel
    :slides-per-view="size"
    :space-between="spaceBetween"
    :loop="true"
    :draggable="draggable"
    :autoplay="autoplay"
    :direction="direction"
    :effect="effect"
    :interval="interval"
  >
    <template
      v-for="item in length"
      :key="item"
    >
      <n-carousel-item>
        <slot :name="item"></slot>
      </n-carousel-item>
    </template>
  </n-carousel>
</template>
