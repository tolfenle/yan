<!--
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2024-01-12 09:34:46
 * @LastEditTime : 2024-01-29 19:15:23
-->
<template>
  <chartGenerateConfig v-if="config.generate.configType === 'basic'" chart-type="null" :config="config">
    <g-field :level="2" label="图形位置" :is-flat="true">
      <g-input-number
        v-model="config.global.center.y"
        :step="1"
        suffix="%"
        inline="inline"
        label="上下"
      />
      <g-input-number
        v-model="config.global.center.x"
        :step="1"
        suffix="%"
        inline="inline"
        label="左右"
      />
    </g-field>
  </chartGenerateConfig>
  <el-tabs
    v-else-if="config.generate.configType === 'all'"
    key="cardleft"
    tab-position="left"
    type="card"
  >
    <el-tab-pane label="图形" tab="pie">
      <g-field-collapse
        v-model="config.chart.options3d.enabled"
        :toggle="true"
        label="启用3D模式"
      >
        <g-field :level="2" label="属性" :is-flat="true">
          <g-input-number
            v-model="config.chart.options3d.alpha"
            :step="1"
            suffix="deg"
            inline="inline"
            label="垂直角度"
          />
          <g-input-number
            v-model="config.chart.options3d.beta"
            :step="1"
            suffix="deg"
            inline="inline"
            label="水平角度"
          />
          <g-input-number
            v-model="config.plotOptions.pie.depth"
            :step="1"
            suffix="px"
            inline="inline"
            label="深度"
          />
        </g-field>
      </g-field-collapse>
      <g-field :level="2" label="边距" :is-flat="true">
        <g-input-number
          v-model="config.chart.margin[0]"
          :step="1"
          suffix="px"
          inline="inline"
          label="顶部"
        />
        <g-input-number
          v-model="config.chart.margin[1]"
          :step="1"
          suffix="px"
          inline="inline"
          label="底部"
        />
        <g-input-number
          v-model="config.chart.margin[2]"
          :step="1"
          suffix="px"
          inline="inline"
          label="左侧"
        />
        <g-input-number
          v-model="config.chart.margin[3]"
          :step="1"
          suffix="px"
          inline="inline"
          label="右侧"
        />
      </g-field>
    </el-tab-pane>
    <el-tab-pane label="标题" tab="title">
      <g-field-collapse
        v-model="config.title.show"
        auto
        :toggle="true"
        label="主标题"
      >
        <g-field :level="2" label="标题内容">
          <g-input v-model="config.title.text" />
        </g-field>
        <g-field :level="2" label="标题颜色">
          <g-color-picker v-model="config.title.style.color" />
        </g-field>
        <g-field :level="2" label="字体大小">
          <g-input-number
            v-model="config.title.style.fontSize"
            :min="0"
            :max="1000"
            :step="1"
            suffix="px"
          />
        </g-field>
        <g-field :level="2" label="标题位置">
          <g-select v-model="config.title.align" :data="hAligns" />
        </g-field>
      </g-field-collapse>
      <g-field-collapse
        v-model="config.subtitle.show"
        :toggle="true"
        label="副标题"
        auto
      >
        <g-field :level="2" label="副标题内容">
          <g-input v-model="config.subtitle.text" />
        </g-field>
        <g-field :level="2" label="副标题颜色">
          <g-color-picker v-model="config.subtitle.style.color" />
        </g-field>
        <g-field :level="2" label="副标题位置">
          <g-select v-model="config.subtitle.align" :data="hAligns" />
        </g-field>
      </g-field-collapse>
    </el-tab-pane>
    <el-tab-pane label="标注" tab="dataLabels">
      <g-field-collapse
        v-model="config.plotOptions.pie.dataLabels.enabled"
        :toggle="true"
        label="标注"
      >
        <g-field :level="2" label="文本">
          <g-color-picker v-model="config.chart.label.color" label="颜色" inline />
          <g-input-number
            v-model="config.chart.label.fontSize"
            :step="1"
            suffix="px"
            inline="inline"
            label="字体大小"
          />
          <g-select
            v-model="config.chart.label.fontWeight"
            :data="fontWeights"
            inline="inline"
            label="字体粗细"
          />
        </g-field>
        <g-field :level="2" label="阴影">
          <n-switch v-model:value="config.plotOptions.pie.dataLabels.shadow" />
        </g-field>
        <g-field :level="2" label="属性" :is-flat="true">
          <g-input-number
            v-model="config.plotOptions.pie.dataLabels.connectorPadding"
            :step="1"
            suffix="px"
            inline="inline"
            label="连接线距离"
          />
          <g-input-number
            v-model="config.plotOptions.pie.dataLabels.connectorWidth"
            :step="1"
            suffix="px"
            inline="inline"
            label="连接线宽度"
          />
          <g-input-number
            v-model="config.plotOptions.pie.dataLabels.distance"
            :min="0"
            :step="1"
            suffix="px"
            inline="inline"
            label="与图形间隔"
          />
        </g-field>
        <g-field :level="2" label="连接线类型">
          <g-select
            v-model="config.plotOptions.pie.dataLabels.connectorShape"
            :data="higtShapeTypes"
          />
        </g-field>
        <g-field :level="2" label="内容格式化">
          <g-input v-model="config.plotOptions.pie.dataLabels.format" />
        </g-field>
      </g-field-collapse>
    </el-tab-pane>
    <el-tab-pane label="图例" tab="legend">
      <g-field-collapse v-model="config.legend.enabled" :toggle="true" label="图例">
        <g-field :level="2" label="文本样式" :is-flat="true">
          <g-input-number
            v-model="config.legend.itemStyle.fontSize"
            :min="12"
            :max="100"
            :step="1"
            suffix="px"
            inline="inline"
            label="字号"
          />
          <g-color-picker
            v-model="config.legend.itemStyle.color"
            inline="inline"
            label="颜色"
          />
          <g-select
            v-model="config.legend.itemStyle.fontWeight"
            :data="fontWeights"
            inline="inline"
            label="字体粗细"
          />
        </g-field>
        <g-field :level="2" label="布局方式">
          <g-select v-model="config.legend.layout" :data="highLayouts" />
        </g-field>
        <g-field :level="2" label="水平位置">
          <g-select v-model="config.legend.align" :data="hAligns" />
        </g-field>
        <g-field :level="2" label="垂直位置">
          <g-select v-model="config.legend.verticalAlign" :data="vAligns" />
        </g-field>
        <g-field :level="2" label="属性" :is-flat="true">
          <g-input-number
            v-model="config.legend.itemDistance"
            :step="1"
            suffix="px"
            inline="inline"
            label="横向间隔"
          />
          <g-input-number
            v-model="config.legend.itemMarginTop"
            :step="1"
            suffix="px"
            inline="inline"
            label="纵向间隔"
          />
          <g-input-number
            v-model="config.legend.symbolRadius"
            :min="0"
            :step="1"
            suffix="px"
            inline="inline"
            label="图例圆角"
          />
        </g-field>
        <g-field :level="2" label="垂直对齐">
          <g-switch v-model="config.legend.alignColumns" />
        </g-field>
        <g-field :level="2" label="方形图例">
          <g-switch v-model="config.legend.squareSymbol" />
        </g-field>
        <g-field :level="2" label="图例格式化">
          <g-input v-model="config.legend.labelFormat" />
        </g-field>
      </g-field-collapse>
    </el-tab-pane>
    <el-tab-pane label="信息框" tab="legend">
      <g-field :level="2" label="字体颜色">
        <g-color-picker v-model="config.tooltip.style.color" />
      </g-field>
      <g-field :level="2" label="自定义背景色">
        <g-switch v-model="config.tooltip.backgroundColor.custom" inline />
        <g-color-picker v-model="config.tooltip.backgroundColor.value" inline />
      </g-field>
      <g-field :level="2" label="自定义边框颜色">
        <g-switch v-model="config.tooltip.borderColor.custom" inline />
        <g-color-picker v-model="config.tooltip.borderColor.value" inline />
      </g-field>
      <g-field :level="2" label="属性" :is-flat="true">
        <g-input-number
          v-model="config.tooltip.hideDelay"
          :min="0"
          :step="100"
          suffix="ms"
          inline="inline"
          label="隐藏延迟"
        />
        <g-input-number
          v-model="config.tooltip.padding"
          suffix="px"
          inline="inline"
          label="内间距"
        />
        <g-input-number
          v-model="config.tooltip.borderWidth"
          :min="0"
          :max="1000"
          :step="1"
          suffix="px"
          inline="inline"
          label="边框宽度"
        />
        <g-input-number
          v-model="config.tooltip.borderRadius"
          :min="0"
          :max="1000"
          :step="1"
          suffix="px"
          inline="inline"
          label="圆角"
        />
        <g-input-number
          v-model="config.tooltip.distance"
          :min="0"
          :max="1000"
          :step="1"
          suffix="px"
          inline="inline"
          label="间隔"
        />
        <g-input-number
          v-model="config.tooltip.valueDecimals"
          :min="0"
          :max="1000"
          :step="1"
          suffix=""
          inline="inline"
          label="小数位数"
        />
      </g-field>
      <g-field :level="2" label="数值前缀">
        <g-input v-model="config.tooltip.valuePrefix" />
      </g-field>
      <g-field :level="2" label="数值后缀">
        <g-input v-model="config.tooltip.valueSuffix" />
      </g-field>
    </el-tab-pane>
  </el-tabs>
</template>
<script lang='ts' setup name="VD3PieProp">
import { defineComponent, PropType, ref, toRef } from 'vue'
import { D3Pie } from './d3-pie'
import { ElTabs, ElTabPane } from 'element-plus'

const props = defineProps({
  com: {
    type: Object as PropType<D3Pie>,
    required: true,
  },
})

const config = toRef(props.com, 'config')

const fontFamilys = GlFontFamilys
const fontWeights = GlFontWeights
const hAligns = GlHAligns
const vAligns = GlVAligns
const highLayouts = GlHighLayouts
const higtShapeTypes = GlHigtShapeTypes

</script>
