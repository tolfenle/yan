<!--
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-10-26 10:48:18
 * @LastEditTime : 2023-11-03 14:16:01
-->
<script setup lang="ts" name="ChartGridConfig">
import { PropType } from 'vue'
import { chartGridConfig } from '@/components/chart-config/grid/config'

defineProps({
  config: {
    type: Object as PropType<typeof chartGridConfig>,
    default: () => {},
  },
})

</script>

<template>
  <!-- <g-field label="区域包含坐标轴刻度">
    <g-switch v-model="grid.isPercentage" />
  </g-field> -->
  <g-field label="使用百分比">
    <g-switch v-model="config.isPercentage" />
  </g-field>
  <g-field label="网格间隔">
    <g-input-number
      v-model="config.top"
      :step="1"
      inline
      label="上间隔"
      :suffix="config.isPercentage ? '%' : 'px'"
    />
    <g-input-number
      v-model="config.bottom"
      :step="1"
      label="下间隔"
      inline
      :suffix="config.isPercentage ? '%' : 'px'"
    />
    <g-input-number
      v-model="config.left"
      :step="1"
      inline
      label="左间隔"
      :suffix="config.isPercentage ? '%' : 'px'"
    />
    <g-input-number
      v-model="config.right"
      :step="1"
      inline
      label="右间隔"
      :suffix="config.isPercentage ? '%' : 'px'"
    />
  </g-field>
  <g-field label="左侧自适应">
    <g-switch v-model="config.leftAuto" />
  </g-field>
</template>
