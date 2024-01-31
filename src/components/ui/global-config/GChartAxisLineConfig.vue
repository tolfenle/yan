<!--
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-10-26 10:48:18
 * @LastEditTime : 2023-11-16 18:48:01
-->
<script setup lang="ts" name="GChartAxisLineConfig">
import { xAxisConfig } from '@/components/chart-config/xAxis/config'
import { PropType } from 'vue'
defineProps({
  config: {
    type: Object as PropType<typeof xAxisConfig.axisLine>,
    default: () => {},
  },
  label: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <g-field-collapse v-model="config.show" label="轴线" toggle>
    <GChartLineConfig :config="config.lineStyle" :allow-img="false" />
  </g-field-collapse>
</template>
