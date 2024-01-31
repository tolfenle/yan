<!--
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-10-19 11:18:43
 * @LastEditTime : 2024-01-02 18:49:54
-->
<script setup lang="ts" name="ChartAxisConfig">
import { PropType } from 'vue'
import { xAxisConfig } from './config'

defineProps({
  config: {
    type: Object as PropType<typeof xAxisConfig>,
    default: () => { },
  },
})

const axisTypes = GlAxisTypes
const axisPosition = GlAxisPosition
const titleLocations = GlTitleLocations
const fontFamilys = GlFontFamilys
const fontStyles = GlFontStyles
const fontWeights = GlFontWeights
const hAligns = GlHAligns
const vAligns = GlVAligns
</script>

<template>
  <g-field-collapse
    v-model="config.show"
    toggle
    label="显示X轴"
    auto-open
  >
    <g-field :level="2" label="位置" label-span="6">
      <n-radio-group v-model:value="config.position" size="small">
        <n-radio-button
          v-for="em in axisPosition"
          :key="em.id"
          :value="em.id"
        >
          {{ em.value }}
        </n-radio-button>
      </n-radio-group>
    </g-field>
    <g-field :level="2" label="类型" label-span="6">
      <n-radio-group v-model:value="config.type" size="small">
        <n-radio-button
          v-for="em in axisTypes"
          :key="em.id"
          :value="em.id"
        >
          {{ em.value }}
        </n-radio-button>
      </n-radio-group>
    </g-field>
    <g-field-collapse
      v-model="config.name.show"
      toggle
      label="显示名称"
    >
      <g-field :level="2" label="名称内容" label-span="6">
        <g-input v-model="config.name.value" placeholder="X轴名称" />
      </g-field>
      <g-field :level="2" label="名称位置" label-span="6">
        <g-select
          v-model="config.nameLocation"
          label="名称位置"
          inline
          :data="titleLocations"
        />
        <g-input-number
          v-model="config.nameGap"
          label="与轴线距离"
          inline
          suffix="px"
        />
        <g-input-number
          v-model="config.nameRotate"
          label="旋转角度"
          inline
          suffix="deg"
        />
      </g-field>
      <g-field :level="2" label="名称字体" label-span="6">
        <g-select
          v-model="config.nameStyle.fontFamily"
          label="字体"
          :data="fontFamilys"
          inline
        />
        <g-select
          v-model="config.nameStyle.fontStyle"
          label="样式"
          :data="fontStyles"
          inline
        />
        <g-select
          v-model="config.nameStyle.fontWeight"
          label="粗细"
          :data="fontWeights"
          inline
          suffix="px"
        />
        <g-input-number
          v-model="config.nameStyle.fontSize"
          inline
          min="1"
          label="大小"
          suffix="px"
        />
        <g-color-picker v-model="config.nameStyle.color" label="颜色" />
      </g-field>
      <g-field :level="2" label="对齐方式" label-span="6">
        <g-select
          v-model="config.nameStyle.align"
          label="水平对齐"
          :data="hAligns"
          inline
        />
        <g-select
          v-model="config.nameStyle.verticalAlign"
          label="垂直对齐"
          :data="vAligns"
          inline
        />
      </g-field>
    </g-field-collapse>
    <GChartAxisLineConfig :config="config.axisLine" />
    <GChartAxislabelConfig :config="config.axisLabel" />
    <GChartAxistickConfig :config="config.axisTick" />
    <GChartSplitlineConfig :config="config.splitLine" />
    <g-field-collapse label="其它">
      <g-field
        :level="2"
        tooltip="例如可以设置成1保证坐标轴分割刻度显示成整数"
        label="最小间隔"
        label-span="6"
      >
        <g-switch v-model="config.axisLabel.interval.auto" label="自动间隔" />
        <g-input-number
          v-if="!config.axisLabel.interval.auto"
          v-model="config.axisLabel.interval.value"
          :min="0"
          label="间隔数"
          inline
          suffix="个"
        />
      </g-field>
      <g-field :level="2" label="反向坐标轴" label-span="6">
        <g-switch v-model="config.inverse" />
      </g-field>
      <g-field :level="2" label="两边留白" label-span="6">
        <g-switch v-model="config.boundaryGap" />
      </g-field>
      <g-field
        :level="2"
        tooltip="坐标轴是否是静态无法交互"
        label="静态无交互"
        label-span="6"
      >
        <g-switch v-model="config.silent" />
      </g-field>
    </g-field-collapse>
  </g-field-collapse>
</template>

<style lang="scss" scoped>

</style>
