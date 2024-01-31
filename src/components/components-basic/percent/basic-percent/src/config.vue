<!--
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :itemGap
 * @Date         : 2023-11-23 12:17:06
 * @LastEditTime : 2023-11-23 16:56:55
-->
<template>
  <chartGenerateConfig v-if="config.generate.configType === 'basic'" :config="config" chart-type="percent">
    <g-field :level="2" label="圆环尺寸">
      <g-input-number
        v-model="config.generate.radius"
        inline
        label="圆环大小"
        suffix="%"
      />
      <g-input-number
        v-model="config.generate.barWidth"
        inline
        label="圆环宽度"
        suffix="px"
      />
    </g-field>
    <g-field :level="2" label="圆环位置">
      <g-input-number
        v-model="config.generate.center[0]"
        inline
        label="水平方向"
        suffix="%"
      />
      <g-input-number
        v-model="config.generate.center[1]"
        inline
        label="垂直方向"
        suffix="%"
      />
    </g-field>
    <g-field :level="2" label="主副标题距离">
      <g-input-number
        v-model="config.title.itemGap"
        suffix="px"
      />
    </g-field>
  </chartGenerateConfig>
  <el-tabs
    v-else-if="config.generate.configType === 'all'"
    key="cardleft"
    tab-position="left"
    type="card"
  >
    <el-tab-pane label="基础" tab="basic">
      <ChartTitleConfig :config="config.title" />
    </el-tab-pane>
    <el-tab-pane label="圆环" tab="text">
      <g-field :level="2" label="背景颜色">
        <g-color-picker v-model="config.itemStyle.color" />
      </g-field>
      <GBorderConfig label="图形" split :config="config.itemStyle" />
      <GChartShadowConfig :config="config.itemStyle" />
      <g-field-collapse v-model="config.itemStyle.decal.show" toggle label="贴画图案">
        <GChartDecalConfig :config="config.itemStyle.decal" />
      </g-field-collapse>
    </el-tab-pane>
    <el-tab-pane label="背景环" tab="bg">
      <g-field :level="2" label="背景颜色">
        <g-color-picker v-model="config.color2" />
      </g-field>
      <GChartShadowConfig :config="config.itemStyle" />
    </el-tab-pane>
    <el-tab-pane label="主标题" tab="text">
      <g-field :level="2" label="主标题文本">
        <GChartFontConfig :config="config.title.textStyle" />
      </g-field>
      <g-field :level="2" label="后缀内容">
        <g-input v-model="config.title.textSuffix" />
      </g-field>
      <g-field :level="2" label="后缀颜色">
        <g-color-picker v-model="config.title.textSuffixStyle.color" />
      </g-field>
      <g-field :level="2" label="后缀文本大小">
        <g-input-number v-model="config.title.textSuffixStyle.fontSize" />
      </g-field>
    </el-tab-pane>
    <el-tab-pane label="副标题" tab="subtext">
      <g-field :level="2" label="主标题文本">
        <GChartFontConfig :config="config.title.subtextStyle" />
      </g-field>
      <g-field :level="2" label="前缀内容">
        <g-input v-model="config.title.preffix" />
      </g-field>
      <g-field :level="2" label="后缀内容">
        <g-input v-model="config.title.subtextSuffix" />
      </g-field>
    </el-tab-pane>
    <el-tab-pane label="动画" tab="animation">
      <ChartAnimationConfig :config="config.animation" />
    </el-tab-pane>
  </el-tabs>
</template>

<script lang='ts'>
import { defineComponent, PropType, ref, toRef } from 'vue'
import { BasicPercent } from './basic-percent'
import { ElTabs, ElTabPane } from 'element-plus'

export default defineComponent({
  name: 'VBasicPercentProp',
  components: {
    ElTabs,
    ElTabPane,
  },
  props: {
    com: {
      type: Object as PropType<BasicPercent>,
      required: true,
    },
  },
  setup(props) {
    const config = toRef(props.com, 'config')
    const configType = ref('basic')

    const handleAddSeriesItem = () => {
      config.value.series.push(new BasicPercentSeries(`系列${config.value.series.length + 1}`))
    }

    const handRemoveSeriesItem = index => {
      config.value.series.splice(index, 1)
    }

    return {
      config,
      configType,
      handleAddSeriesItem,
      handRemoveSeriesItem,
      fontFamilys: GlFontFamilys,
    }
  },
})
</script>
