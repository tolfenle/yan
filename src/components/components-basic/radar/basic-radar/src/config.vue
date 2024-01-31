<template>
  <chartGenerateConfig v-if="config.generate.configType === 'basic'" :config="config" chart-type="radar" />
  <el-tabs
    v-else-if="config.generate.configType === 'all'"
    key="cardleft"
    tab-position="left"
    type="card"
  >
    <el-tab-pane label="全局" tab="global">
      <g-field
        :leavel="2"
        label="图表类型"
      >
        <n-radio-group v-model:value="config.global.shape" size="small">
          <n-radio-button value="polygon">
            多边形
          </n-radio-button>
          <n-radio-button value="circle">
            园形
          </n-radio-button>
        </n-radio-group>
      </g-field>
      <g-field
        :leavel="2"
        label="图表中心"
      >
        <g-input-number
          v-model="config.global.center[0]"
          inline
          suffix="%"
          label="水平"
        />
        <g-input-number
          v-model="config.global.center[1]"
          inline
          suffix="%"
          label="垂直"
        />
      </g-field>
      <g-field
        :leavel="2"
        label="图表半径"
      >
        <g-input-number
          v-model="config.global.radius"
          suffix="%"
        />
      </g-field>
      <g-field
        :leavel="2"
        label="其它属性"
      >
        <g-input-number
          v-model="config.global.startAngle"
          inline
          suffix="°"
          label="起始角度"
        />
        <g-input-number
          v-model="config.global.splitNumber"
          inline
          suffix=""
          label="分割块数量"
        />
        <g-input-number
          v-model="config.global.nameGap"
          suffix="px"
          label="刻度名称与刻度间隔"
        />
      </g-field>
    </el-tab-pane>
    <el-tab-pane label="坐标轴" tab="radar">
      <g-field-collapse v-model="config.radar.axisLine.show" toggle label="轴线">
        <GChartLineConfig :config="config.radar.axisLine.lineStyle" />
      </g-field-collapse>
      <g-field-collapse v-model="config.radar.axisTick.show" toggle label="轴刻度">
        <GChartLineConfig :config="config.radar.axisTick.lineStyle" />
      </g-field-collapse>
      <g-field-collapse
        v-model="config.radar.splitLine.show"
        toggle
        label="分割线"
        tooltip="分割线可以配置多个显色，在图表中循环显示"
      >
        <GChartLineConfig :allow-img="false" :config="config.radar.splitLine.lineStyle" />
      </g-field-collapse>
      <g-field-collapse
        v-model="config.radar.splitArea.show"
        toggle
        label="分割区域"
        tooltip="分割区域可以配置多个显色，在图表中循环显示"
      >
        <GChartLineConfig :allow-img="false" :config="config.radar.splitArea.areaStyle" />
      </g-field-collapse>
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
      <g-field :leavel="2" label="应用系列样式">
        <g-switch v-model="item.config.customTheme" />
      </g-field>
      <ChartSymbolConfig :config="item.config" />
      <GChartLabelConfig :config="item.config.label" />
      <GChartItemConfig :config="item.config.itemStyle" />
      <g-field-collapse
        label="图表线"
      >
        <GChartLineConfig :config="item.config.lineStyle" />
      </g-field-collapse>
      <g-field-collapse
        label="图表面积区域"
      >
        <GChartLineConfig :config="item.config.areaStyle" />
      </g-field-collapse>
    </el-tab-pane>
    <!-- <IconPlus /> -->
  </el-tabs>
</template>

<script lang='ts'>
import { defineComponent, PropType, ref, toRef } from 'vue'
import { BasicRadar, BasicRadarSeries } from './basic-radar'
import { ElTabs, ElTabPane } from 'element-plus'

export default defineComponent({
  name: 'VBasicRadarProp',
  components: {
    ElTabs,
    ElTabPane,
  },
  props: {
    com: {
      type: Object as PropType<BasicRadar>,
      required: true,
    },
  },
  setup(props) {
    const config = toRef(props.com, 'config')
    const configType = ref('basic')

    const { activeTab, handleAddSeriesItem, handRemoveSeriesItem } = useSeries(config, BasicRadarSeries)

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
