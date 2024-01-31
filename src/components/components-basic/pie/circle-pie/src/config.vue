<!--
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-11-22 14:36:07
 * @LastEditTime : 2023-11-22 18:46:05
-->
<script setup lang="ts">
import { defineComponent, PropType, ref, toRef } from 'vue'
import { CirclePie } from './circle-pie'
import { ElTabs, ElTabPane } from 'element-plus'

const props = defineProps({
  com: {
    type: Object as PropType<CirclePie>,
    required: true,
  },
})
const config = toRef(props.com, 'config')
</script>

<template>
  <template v-if="config.generate.configType === 'basic'">
    <chartGenerateConfig chart-type="pie" :config="config" />
  </template>
  <el-tabs
    v-else-if="config.generate.configType === 'all'"
    key="cardleft"
    tab-position="left"
    type="card"
  >
    <el-tab-pane label="饼图" tab="bar">
      <ChartPieConfig :config="config.pie" />
    </el-tab-pane>
    <el-tab-pane label="网格" tab="grid">
      <GChartGridConfig :config="config.grid" />
    </el-tab-pane>
    <el-tab-pane label="提示框" tab="tooltip">
      <ChartTooltipConfig :config="config.tooltip" />
    </el-tab-pane>
    <el-tab-pane label="图例" tab="legend">
      <ChartLegendConfig :config="config.legend" />
    </el-tab-pane>
    <el-tab-pane label="动画" tab="animation">
      <ChartAnimationConfig :config="config.animation" />
    </el-tab-pane>
  </el-tabs>
</template>
