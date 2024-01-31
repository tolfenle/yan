<!--
 * @Author       : wfl
 * @LastEditors: fj
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-11-29 17:43:06
 * @LastEditTime: 2024-01-09 15:22:26
-->
<!-- export {default as Virtual} from './virtual.mjs';
export {default as Keyboard} from './keyboard.mjs';
export {default as Mousewheel} from './mousewheel.mjs';
export {default as Navigation} from './navigation.mjs';
export {default as Pagination} from './pagination.mjs';
export {default as Scrollbar} from './scrollbar.mjs';
export {default as Parallax} from './parallax.mjs';
export {default as Zoom} from './zoom.mjs';
export {default as Controller} from './controller.mjs';
export {default as A11y} from './a11y.mjs';
export {default as History} from './history.mjs';
export {default as HashNavigation} from './hash-navigation.mjs';
export {default as Autoplay} from './autoplay.mjs';
export {default as Thumbs} from './thumbs.mjs';
export {default as FreeMode} from './free-mode.mjs';
export {default as Grid} from './grid.mjs';
export {default as Manipulation} from './manipulation.mjs';
export {default as EffectFade} from './effect-fade.mjs';
export {default as EffectCube} from './effect-cube.mjs';
export {default as EffectFlip} from './effect-flip.mjs';
export {default as EffectCoverflow} from './effect-coverflow.mjs';
export {default as EffectCreative} from './effect-creative.mjs';
export {default as EffectCards} from './effect-cards.mjs'; -->
<script setup lang="ts" name="GlSwiper">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, EffectCards, EffectCoverflow, EffectCreative, EffectCube, EffectFade, EffectFlip, Mousewheel, Grid, Virtual, Keyboard, Scrollbar, Parallax, Zoom, Controller, Pagination, HashNavigation, Thumbs, Manipulation } from 'swiper/modules'

const modules = [Autoplay, EffectCards, EffectCoverflow, EffectCreative, EffectCube, EffectFade, EffectFlip, Mousewheel, Grid, Virtual, Keyboard, Scrollbar, Parallax, Zoom, Controller, Pagination, HashNavigation, Thumbs, Manipulation]

const props = defineProps({
  length: {
    type: Number,
    default: 10,
  },
  // 行数
  row: {
    type: Number,
    default: 1,
  },
  // 列数
  col: {
    type: Number,
    default: 4,
  },
  // 循环
  loop: {
    type: Boolean,
    default: true,
  },
  // 间隔
  spaceBetween: {
    type: Number,
    default: 8,
  },
  // 自动轮播
  autoplay: {
    type: Object,
    default: () =>{
      return {
        delay: 3000,
        pauseOnMouseEnter: true,
      }
    },
  },
  effectCards: {

  },
  // 方向
  direction: {
    type: String as PropType<'vertical' | 'horizontal'>,
    default: 'vertical',
  },
  grid: {
    type: Object,
    default: () => {
      return {
        fill: 'column',
        rows: 2,
      }
    },
  },
  effect: {
    type: String as PropType<'slide' | 'fade' | 'cube' | 'coverflow' | 'flip' | 'cards' | 'creative'>,
    default: 'slide',
  },
  grabCursor: {
    type: Boolean,
    default: true,
  },
  // 每次滚动条数
  slidesPerGroup: {
    type: Number,
    default: 1,
  },
})

const onSwiper = swiper => {
}

</script>

<template>
  <swiper
    v-if="length"
    :slides-per-view="row"
    :grid="{
      fill: 'column',
      rows: col,
    }"
    :slides-per-group="slidesPerGroup"
    :grab-cursor="grabCursor"
    :autoplay="autoplay"
    :modules="modules"
    :disable-on-interaction="false"
    :loop="loop"
    :direction="direction"
    :space-between="spaceBetween"
    :effect="effect"
  >
    <template
      v-for="item in length"
      :key="item"
    >
      <swiper-slide>
        <slot :name="item"></slot>
      </swiper-slide>
    </template>
  </swiper>
</template>

<style lang="scss" scoped>
.swiper {
  z-index: 0;

  &.swiper-initialized {
    height: 100%;
  }
}
</style>
