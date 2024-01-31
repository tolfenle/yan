<!--
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-11-10 18:32:30
 * @LastEditTime : 2024-01-03 15:20:20
-->
<template>
  <chartGenerateConfig v-if="config.generate.configType === 'basic'" :config="config" />
  <el-tabs
    v-else-if="config.generate.configType === 'all'"
    key="cardleft"
    tab-position="left"
    type="card"
  >
    <el-tab-pane label="柱体" tab="bar">
      <ChartBarPubConfig :config="config.bar" />
      <ChartBarConfig :config="config.bar" />
    </el-tab-pane>
    <el-tab-pane label="网格" tab="grid">
      <GChartGridConfig :config="config.grid" />
    </el-tab-pane>
    <el-tab-pane label="X轴" tab="xAxis">
      <ChartAxisConfig :config="config.xAxis" />
    </el-tab-pane>
    <el-tab-pane label="Y轴" tab="yAxis">
      <ChartYxisConfig :config="config.yAxis" />
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

<script lang='ts'>
import { defineComponent, PropType, ref, toRef } from 'vue'
import { BasicBar, BasicBarSeries } from './basic-bar'
import { ElTabs, ElTabPane } from 'element-plus'

export default defineComponent({
  name: 'VBasicBarProp',
  components: {
    ElTabs,
    ElTabPane,
  },
  props: {
    com: {
      type: Object as PropType<BasicBar>,
      required: true,
    },
  },
  setup(props) {
    const config = toRef(props.com, 'config')
    const configType = ref('basic')

    const { activeTab, handleAddSeriesItem, handRemoveSeriesItem } = useSeries(config, BasicBarSeries)

    return {
      config,
      configType,
      activeTab,
      handleAddSeriesItem,
      handRemoveSeriesItem,
      fontFamilys: GlFontFamilys,
    }
  },
})
</script>
