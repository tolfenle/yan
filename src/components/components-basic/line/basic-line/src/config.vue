<template>
  <div class="setting-panel-gui">
    <chartGenerateConfig v-if="config.generate.configType === 'basic'" :config="config" chart-type="line" />
    <el-tabs
      v-else-if="config.generate.configType === 'all'"
      key="cardleft"
      tab-position="left"
      type="card"
    >
      <el-tab-pane label="折线" tab="line">
        <ChartBasicLineConfig :config="config.line" />
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
    <el-tabs
      v-else
      key="series"
      v-model="activeTab"
      tab-position="left"
      type="card"
      addable
      :closable="config.series.length > 1"
      class="iking-v-custom-series"
      @tab-remove="handRemoveSeriesItem"
      @tab-add="handleAddSeriesItem"
    >
      <el-tab-pane
        v-for="(item, index) in config.series"
        :key="index"
        :label="`系列${index + 1}`"
        :tab="`系列${index + 1}`"
        :name="index"
      >
        <ChartBasicLineConfig :config="item.config" />
      </el-tab-pane>
    <!-- <IconPlus /> -->
    </el-tabs>
  </div>
</template>

<script lang='ts'>
import { defineComponent, PropType, toRef } from 'vue'
import { ElTabs, ElTabPane } from 'element-plus'
import { BasicLine, BasicLineSeries } from './basic-line'

export default defineComponent({
  name: 'VBasicLineProp',
  components: {
    ElTabs, ElTabPane,
  },
  props: {
    com: {
      type: Object as PropType<BasicLine>,
      required: true,
    },
  },
  setup(props) {
    const config = toRef(props.com, 'config')

    const { activeTab, handleAddSeriesItem, handRemoveSeriesItem } = useSeries(config, BasicLineSeries)

    return {
      config,
      activeTab,
      handleAddSeriesItem,
      handRemoveSeriesItem,
      fontFamilys: GlAxisTypes,
      axisTypes: GlAxisTypes,
      selectSuggests: GlSelectSuggests,
      titleLocations: GlTitleLocations,
      fontWeights: GlFontWeights,
      lineStyles: GlLineStyles,
      valueFormats: GlValueFormats,
      timeFormats: GlTimeFormats,
      hAligns: GlHAligns,
      legendLocations: GlLegendLocations,
      orients: GlOrients,
      echartIcons: GlEchartIcons,
      animationEasings: GlAnimationEasings,
    }
  },
})
</script>
