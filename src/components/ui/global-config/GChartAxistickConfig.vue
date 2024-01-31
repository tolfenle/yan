<!--
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-10-26 11:00:33
 * @LastEditTime : 2023-11-03 14:22:50
-->
<script setup lang="ts" name="ChartAxisTickConfig">
import { xAxisConfig } from '@/components/chart-config/xAxis/config'
import { PropType } from 'vue'
const props = defineProps({
  config: {
    type: Object as PropType<typeof xAxisConfig.axisTick>,
    default: () => {},
  },
})

</script>

<template>
  <g-field-collapse
    v-model="config.show"
    toggle
    label="坐标轴刻度"
  >
    <g-field label="刻度朝内">
      <n-switch v-model:value="config.inside" />
    </g-field>
    <g-field label="与标签对齐">
      <n-switch v-model:value="config.alignWithLabel" />
    </g-field>
    <g-field label="刻度长度">
      <g-input-number
        v-model="config.length"
        :min="0"
        :max="100"
        :step="1"
        suffix="px"
      />
    </g-field>
    <GChartLineConfig label="刻度" :config="config.lineStyle" />
  </g-field-collapse>
</template>
