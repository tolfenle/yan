<!--
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2024-01-02 18:00:09
 * @LastEditTime : 2024-02-02 14:33:24
-->
<!--
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-12-06 10:52:37
 * @LastEditTime : 2024-02-02 14:33:11
-->
<template>
  <chartGenerateConfig v-if="config.generate.configType === GenerateType.基础" chart-type="none" :config="config" />
  <el-tabs
    v-else-if="config.generate.configType === GenerateType.全量"
    key="cardleft"
    tab-position="left"
    type="card"
  >
    <el-tab-pane label="标题" tab="title">
      <g-field label="宽度">
        <g-input-number v-model="config.title.left" suffix="px" />
      </g-field>
      <g-field label="轴间隔系数">
        <g-input-number v-model="config.title.scale" suffix="" />
      </g-field>
      <g-field label="字体">
        <GChartFontConfig :config="config.title.font" />
      </g-field>
    </el-tab-pane>
    <el-tab-pane label="图形" tab="scatter">
      <g-field-collapse :level="2" label="类型">
        <ChartSymbolConfig :config="config.scatter.symbol" />
        <g-field :level="2" label="放大倍数">
          <g-input-number
            v-model="config.scatter.scale"
            :min="0.1"
            :step="0.1"
          />
        </g-field>
        <g-field :level="2" label="图形类型">
          <g-select v-model="config.scatter.type" :data="GlScatters" />
        </g-field>
        <g-field v-if="config.scatter.type === 'effectScatter'" :level="2" label="动态点">
          <g-color-picker v-model="config.scatter.rippleEffect.color" inline label="颜色" />
          <g-select
            v-model="config.scatter.rippleEffect.brushType"
            inline
            label="绘制方式"
            :data="GlScatterFills"
          />
          <g-input-number
            v-model="config.scatter.rippleEffect.number"
            inline
            label="波纹数量"
            suffix="个"
          />
          <g-input-number
            v-model="config.scatter.rippleEffect.period"
            inline
            label="动画周期"
            suffix="秒"
          />
          <g-input-number
            v-model="config.scatter.rippleEffect.scale"
            inline
            label="最大缩放比例"
            suffix=""
          />
        </g-field>
      </g-field-collapse>
      <g-field-collapse :level="2" label="标注">
        <GChartLabelConfig :config="config.scatter.label" />
      </g-field-collapse>
    </el-tab-pane>
    <el-tab-pane label="X轴" tab="xAxis">
      <ChartAxisConfig :config="config.xAxis" />
    </el-tab-pane>
    <el-tab-pane label="提示框" tab="tooltip">
      <ChartTooltipConfig :config="config.tooltip" />
    </el-tab-pane>
    <el-tab-pane label="动画" tab="animation">
      <ChartAnimationConfig :config="config.animation" />
    </el-tab-pane>
  </el-tabs>
  <!-- addable -->
  <el-tabs
    v-else
    key="series"
    v-model="activeTab"
    tab-position="left"
    type="card"
    :closable="config.series.length > 1"
    class="iking-v-custom-series"
    @tab-remove="handRemoveSeriesItem"
    @tab-add="handleAddSeriesItem"
  >
    <el-tab-pane
      v-for="(item, index) in config.series"
      :key="index"
      :label="`系列${index + 1}`"
      :tab="`系列${index}`"
      :name="index"
    >
      <ChartSymbolConfig :config="item.config.symbol" label="图形" />
      <GChartItemConfig :config="item.config.itemStyle" label="图形样式" />
    </el-tab-pane>
  </el-tabs>
</template>

<script lang='ts'>
import { defineComponent, PropType, ref, toRef } from 'vue'
import { BasicScatters, BasicScattersSeries } from './basic-scatters'
import { ElTabs, ElTabPane } from 'element-plus'

export default defineComponent({
  name: 'VBasicScattersProp',
  components: {
    ElTabs,
    ElTabPane,
  },
  props: {
    com: {
      type: Object as PropType<BasicScatters>,
      required: true,
    },
  },
  setup(props) {
    const config = toRef(props.com, 'config')
    const configType = ref('basic')

    const { activeTab, handleAddSeriesItem, handRemoveSeriesItem } = useSeries(config, BasicScattersSeries)

    return {
      config,
      configType,
      activeTab,
      handleAddSeriesItem,
      handRemoveSeriesItem,
      fontFamilys: GlFontFamilys,
      GlScatters,
      GlScatterFills,
      GenerateType: EGenerateType,
    }
  },
})
</script>
