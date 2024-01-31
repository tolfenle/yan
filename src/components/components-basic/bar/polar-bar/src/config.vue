<template>
  <chartGenerateConfig v-if="config.generate.configType === 'basic'" :config="config" />
  <el-tabs
    v-else-if="config.generate.configType === 'all'"
    key="cardleft"
    tab-position="left"
    type="card"
  >
    <el-tab-pane label="图形" tab="polar">
      <ChartPolarConfig :config="config.global" />
    </el-tab-pane>
    <el-tab-pane label="柱体" tab="bar">
      <ChartBarPubConfig :config="config.bar" />
      <ChartBarConfig :config="config.bar" />
    </el-tab-pane>
    <el-tab-pane label="径向轴" tab="radiusAxis">
      <ChartRadiusAxisConfig :config="config.radiusAxis" />
      <GChartAxisLineConfig :config="config.radiusAxis.axisLine" />
    </el-tab-pane>
    <el-tab-pane label="角度轴" tab="angleAxis">
      <ChartAngleAxisConfig :config="config.angleAxis" />
      <GChartAxisLineConfig :config="config.angleAxis.axisLine" />
    </el-tab-pane>
    <el-tab-pane label="提示框" tab="tooltip">
      <ChartTooltipConfig :config="config.tooltip" />
    </el-tab-pane>
    <el-tab-pane label="动画" tab="animation">
      <ChartAnimationConfig :config="config.animation" />
    </el-tab-pane>
  </el-tabs>
</template>

<script lang='ts'>
import { defineComponent, PropType, ref, toRef } from 'vue'
import { PolarBar } from './polar-bar'
import { ElTabs, ElTabPane } from 'element-plus'

export default defineComponent({
  name: 'VPolarBarProp',
  components: {
    ElTabs,
    ElTabPane,
  },
  props: {
    com: {
      type: Object as PropType<PolarBar>,
      required: true,
    },
  },
  setup(props) {
    const config = toRef(props.com, 'config')
    const configType = ref('basic')

    return {
      config,
      configType,
      fontFamilys: GlFontFamilys,
      lineStyles: GlLineStyles,
    }
  },
})
</script>
