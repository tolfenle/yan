<!--
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-10-19 10:40:16
 * @LastEditTime : 2023-11-03 14:33:07
-->
<script lang="ts" name="ChartAnimationConfig" setup>
import { PropType } from 'vue'
import { TChartAnimationConfig } from './config'
const props = defineProps({
  config: {
    type: Object as PropType<TChartAnimationConfig >,
    default: () => { },
  },
})
const animates = GlAnimationEasings
</script>

<template>
  <g-field-collapse
    v-model="config.animation"
    auto-open
    toggle
    label="动画"
  >
    <g-field-collapse label="初始动画">
      <g-field :level="2" label="动画时长">
        <g-input-number
          v-model="config.animationDuration.value"
          :min="0"
          :max="999999"
          :step="1000"
          label="初始时长"
          suffix="ms"
        />
      </g-field>
      <g-field
        v-model="config.animationDuration.delary"
        toggle
        :level="2"
        label="渐进动画"
        tooltip="可以设置每个数据返回不同的时间实现更戏剧的初始动画效果"
      >
        <g-input-number
          v-model="config.animationDuration.delaryTime"
          :min="0"
          :max="999999"
          :step="100"
          suffix="ms"
          label="渐进间隔"
        />
      </g-field>
      <g-field :level="2" label="动画效果">
        <g-select v-model="config.animationEasing" :data="animates" />
      </g-field>
    </g-field-collapse>
    <g-field-collapse tooltip="数据更新时的动画效果" label="数据更新动画">
      <g-field :level="2" label="动画时长">
        <g-input-number
          v-model="config.animationDurationUpdate.value"
          :min="0"
          :max="999999"
          :step="1000"
          label="初始时长"
          suffix="ms"
        />
      </g-field>
      <g-field
        v-model="config.animationDurationUpdate.delary"
        toggle
        :level="2"
        label="渐进动画"
      >
        <g-input-number
          v-model="config.animationDurationUpdate.delaryTime"
          :min="0"
          :max="999999"
          :step="100"
          suffix="ms"
          label="渐进间隔"
        />
      </g-field>
      <g-field :level="2" label="动画效果">
        <g-select v-model="config.animationEasingUpdate" :data="animates" />
      </g-field>
    </g-field-collapse>
  </g-field-collapse>
</template>

<style lang="scss" scoped>

</style>
