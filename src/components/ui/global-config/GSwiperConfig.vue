<!--
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-11-03 14:08:54
 * @LastEditTime : 2023-11-30 16:56:37
-->
<script lang="ts" setup name="GSwiperConfig">
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
    <g-switch v-model="config.loop" />
  </g-field>
  <g-field :leavel="2" label="轮播动画">
    <g-input-number
      v-model="config.row"
      inline
      :min="1"
      label="每页显示行数"
      uffix="行"
    />
    <g-input-number
      v-model="config.col"
      inline
      :min="1"
      :max="disableCol ? 1 : 99999999"
      :disable="disableCol"
      label="每页显示列数"
      uffix="列"
    />
    <g-input-number
      v-model="config.spaceBetween"
      inline
      label="项间隔"
      suffix="px"
    />
    <g-input-number
      v-model="config.slidesPerGroup"
      inline
      label="每次滚动条数"
      suffix="条"
    />
    <g-input-number
      v-model="config.autoplay.delay"
      inline
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
