<template>
  <chartGenerateConfig v-if="config.generate.configType === GenerateType.基础" :config="config" />
  <el-tabs
    v-else-if="config.generate.configType === GenerateType.全量"
    key="cardleft"
    tab-position="left"
    type="card"
  >
    <el-tab-pane label="柱体" tab="bar">
      <ChartBarPubConfig mutil :config="config.bar" />
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
      <ChartBarConfig :config="item.config" />
    </el-tab-pane>
    <!-- <IconPlus /> -->
  </el-tabs>
</template>

<script lang='ts'>
import { defineComponent, PropType, ref, toRef } from 'vue'
import { BasicBars, BasicBarsSeries } from './basic-bars'
import { ElTabs, ElTabPane } from 'element-plus'

export default defineComponent({
  name: 'VBasicBarsProp',
  components: {
    ElTabs,
    ElTabPane,
  },
  props: {
    com: {
      type: Object as PropType<BasicBars>,
      required: true,
    },
  },
  setup(props) {
    const config = toRef(props.com, 'config')
    const configType = ref('basic')

    const { activeTab, handleAddSeriesItem, handRemoveSeriesItem } = useSeries(config, BasicBarsSeries)

    return {
      config,
      configType,
      activeTab,
      handleAddSeriesItem,
      handRemoveSeriesItem,
      fontFamilys: GlFontFamilys,
      GenerateType: EGenerateType,
    }
  },
})
</script>
