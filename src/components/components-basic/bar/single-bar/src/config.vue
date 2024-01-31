<!--
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-11-20 11:49:13
 * @LastEditTime : 2023-11-21 10:36:03
-->
<script lang="ts" setup>
import { PropType, toRef } from 'vue'
import { ElTabs, ElTabPane } from 'element-plus'
import { SingleBar } from './single-bar'

const props = defineProps({
  com: {
    type: Object as PropType<SingleBar>,
    required: true,
  },
})

const config = toRef(props.com, 'config')
const echartsLablePositions = GlEchartsLablePositions
const echartIcons = GlEchartIcons
</script>

<template>
  <el-tabs
    key="cardleft"
    tab-position="left"
    type="card"
  >
    <el-tab-pane label="基础" tab="bar">
      <g-field
        :level="2"
        label="文本位置"
      >
        <g-select
          v-model="config.global.position"
          :data="echartsLablePositions"
        />
      </g-field>
      <g-field
        :level="2"
        label="文本图形间隔"
      >
        <g-input-number
          v-model="config.global.distance"
          :step="1"
          suffix="px"
        />
      </g-field>
      <g-field
        :level="2"
        label="柱体宽度"
      >
        <g-input-number
          v-model="config.global.barWidth"
          :step="1"
          suffix="px"
        />
      </g-field>
      <g-field
        :level="2"
        label="图形"
      >
        <g-select-shape
          v-model="config.global.symbol"
          :shapes="echartIcons"
        />
      </g-field>
      <g-field
        :level="2"
        label="图形高度"
      >
        <g-input-number
          v-model="config.global.symbolSize"
          :step="1"
          suffix="px"
        />
      </g-field>
    </el-tab-pane>
    <el-tab-pane label="图形颜色" tab="color">
      <g-field
        :level="2"
        label="顶部图形颜色"
      >
        <g-color-picker v-model="config.bgBar.top" />
      </g-field>
      <g-field
        :level="2"
        label="背景颜色"
      >
        <g-color-picker v-model="config.bgBar.color" />
      </g-field>
      <g-field
        :level="2"
        label="柱体顶部颜色"
      >
        <g-color-picker v-model="config.mainBar.topColor" />
      </g-field>
      <g-field
        :level="2"
        label="柱体颜色"
      >
        <g-color-picker v-model="config.mainBar.color" />
      </g-field>
      <g-field
        :level="2"
        label="柱体底部颜色"
      >
        <g-color-picker v-model="config.mainBar.bottomColor" />
      </g-field>
    </el-tab-pane>
  </el-tabs>
</template>
