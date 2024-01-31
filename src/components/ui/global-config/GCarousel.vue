<!--
 * @Author       : wfl
 * @LastEditors: fj
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-11-03 14:08:54
 * @LastEditTime: 2024-01-09 16:24:01
-->
<script lang="ts" setup name="GCarousel">
import { PropType } from 'vue'
const props = defineProps({
  config: {
    type: Object as PropType<any>,
    default: () => {},
  },
  disableCol: {
    type: Boolean,
    default: false,
  },
})
const waperEffects = GlWaperEffects
</script>

<template>
  <g-field :leavel="2" label="自动轮播">
    <g-switch v-model="config.autoplay" />
  </g-field>
  <g-field :leavel="2" label="是否循环播放">
    <g-switch v-model="config.loop" />
  </g-field>
  <g-field :leavel="2" label="是否拖拽切换轮播图">
    <g-switch v-model="config.draggable" />
  </g-field>
  <g-field :leavel="2" label="轮播动画">
    <g-input-number
      v-model="config.slidesPerView"
      :min="1"
      label="每页显示轮播图数量"
    />
    <g-input-number
      v-model="config.spaceBetween"
      label="轮播项间隔"
      suffix="px"
    />

    <g-input-number
      v-model="config.interval"
      label="轮播速度"
      suffix="ms"
    />
  </g-field>
  <g-field :leavel="2" label="轮播方向">
    <n-radio-group v-model:value="config.direction">
      <n-radio-button key="vertical" value="vertical" label="vertical">
        垂直方向
      </n-radio-button>
      <n-radio-button key="horizontal" value="horizontal" label="horizontal">
        水平方向
      </n-radio-button>
    </n-radio-group>
  </g-field>
  <g-field :leavel="2" label="动画效果">
    <g-select
      v-model="config.effect"
      :data="waperEffects"
    />
  </g-field>
</template>
