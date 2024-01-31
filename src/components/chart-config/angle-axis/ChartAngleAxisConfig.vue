<!--
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-10-19 11:18:43
 * @LastEditTime : 2023-11-16 17:25:41
-->
<script setup lang="ts" name="ChartAngleAxisConfig">
import { PropType } from 'vue'
import { useChartAngleAxisConfig } from './config'
const TChartAngleAxisConfig = useChartAngleAxisConfig()

defineProps({
  config: {
    type: Object as PropType<typeof TChartAngleAxisConfig>,
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
    label="显示角度轴"
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
    <GChartAxislabelConfig :config="config.axisLabel" />
    <!-- <GChartAxistickConfig :config="config.axisTick" /> -->
    <GChartSplitlineConfig :config="config.splitLine" />
    <g-field-collapse label="其它">
      <g-field
        :level="2"
        tooltip="例如可以设置成1保证坐标轴分割刻度显示成整数"
        label="最小间隔"
        label-span="6"
      >
        <n-switch v-model:value="config.minInterval" />
      </g-field>
      <g-field :level="2" label="反向坐标轴" label-span="6">
        <n-switch v-model:value="config.inverse" />
      </g-field>
      <g-field :level="2" label="两边留白" label-span="6">
        <n-switch v-model:value="config.boundaryGap" />
      </g-field>
      <g-field
        :level="2"
        tooltip="坐标轴是否是静态无法交互"
        label="静态无交互"
        label-span="6"
      >
        <n-switch v-model:value="config.silent" />
      </g-field>
    </g-field-collapse>
  </g-field-collapse>
</template>

<style lang="scss" scoped>

</style>
