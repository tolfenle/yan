<!--
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2024-01-12 09:34:46
 * @LastEditTime : 2024-02-02 14:19:53
-->
<template>
  <chartGenerateConfig v-if="config.generate.configType === GenerateType.基础" chart-type="null" :config="config" />
  <el-tabs
    v-else-if="config.generate.configType === GenerateType.全量"
    key="cardleft"
    tab-position="left"
    type="card"
  >
    <el-tab-pane label="图形" tab="pie">
      <g-field-collapse
        v-model="config.chart.options3d.enabled"
        :level="2"
        label="3D模式"
        toggle
      >
        <g-field label="角度距离">
          <g-input-number
            v-model="config.chart.options3d.alpha"
            :step="1"
            suffix=""
            inline="inline"
            label="垂直旋转角"
          />
          <g-input-number
            v-model="config.chart.options3d.beta"
            :step="1"
            suffix=""
            inline="inline"
            label="水平旋转角"
          />
          <g-input-number
            v-model="config.chart.options3d.depth"
            :step="1"
            suffix=""
            inline="inline"
            label="深度"
          />
          <g-input-number
            v-model="config.chart.options3d.viewDistance"
            :step="1"
            suffix=""
            inline="inline"
            label="距离"
          />
        </g-field>
        <g-field label="柱体尺寸" tooltip="设置为0自适应">
          <g-input-number
            v-model="config.plotOptions.column.depth"
            :step="1"
            suffix=""
            inline="inline"
            label="柱体深度"
          />
          <g-input-number
            v-model="config.plotOptions.column.pointWidth"
            :step="1"
            suffix=""
            inline="inline"
            label="柱体宽度"
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
    <el-tab-pane label="X轴" tab="x">
      <g-field-collapse v-model="config.xAxis.visible" label="X轴" toggle>
        <g-field-collapse v-model="config.xAxis.title.enabled" label="轴标题" toggle>
          <g-field :level="2" label="轴标题">
            <g-input v-model="config.xAxis.title.text" />
          </g-field>
          <g-field :level="2" label="标题样式">
            <g-input-number
              v-model="config.xAxis.title.rotation"
              label="旋转角度"
              suffix="°"
              inline
            />
            <g-input-number
              v-model="config.xAxis.title.margin"
              label="与轴线间距"
              suffix="px"
              inline
            />
            <g-input-number
              v-model="config.xAxis.title.style.fontSize"
              label="字体大小"
              suffix="px"
              inline
            />
            <g-color-picker v-model="config.xAxis.title.style.color" label="字体颜色" inline />
          </g-field>
          <g-field :level="2" label="位置">
            <g-select v-model="config.xAxis.title.align" :data="hAligns" />
          </g-field>
        </g-field-collapse>
        <g-field-collapse v-model="config.xAxis.labels.enabled" label="轴标签" toggle>
          <g-field :level="2" label="轴标签">
            <g-input-number
              v-model="config.xAxis.top"
              label="与轴线间距"
              suffix="px"
              inline
            />
            <g-input-number
              v-model="config.xAxis.labels.style.fontSize"
              label="字体大小"
              suffix="px"
              inline
            />
            <g-color-picker v-model="config.xAxis.labels.style.color" label="字体颜色" inline />
          </g-field>
        </g-field-collapse>
        <g-field label="网格线">
          <g-input-number
            v-model="config.xAxis.gridLineWidth"
            label="网格线宽度"
            suffix="px"
            inline
          />
          <g-color-picker v-model="config.xAxis.gridLineColor" label="网格线颜色" inline />
        </g-field>
      </g-field-collapse>
    </el-tab-pane>
    <el-tab-pane label="Y轴" tab="y">
      <g-field-collapse v-model="config.yAxis.visible" label="Y轴" toggle>
        <g-field-collapse v-model="config.yAxis.title.enabled" label="轴标题" toggle>
          <g-field :level="2" label="轴标题">
            <g-input v-model="config.yAxis.title.text" />
          </g-field>
          <g-field :level="2" label="标题样式">
            <g-input-number
              v-model="config.yAxis.title.rotation"
              label="旋转角度"
              suffix="°"
              inline
            />
            <g-input-number
              v-model="config.yAxis.title.margin"
              label="与轴线间距"
              suffix="px"
              inline
            />
            <g-input-number
              v-model="config.yAxis.title.style.fontSize"
              label="字体大小"
              suffix="px"
              inline
            />
            <g-color-picker v-model="config.yAxis.title.style.color" label="字体颜色" inline />
          </g-field>
          <g-field :level="2" label="位置">
            <g-select v-model="config.yAxis.title.align" :data="hAligns" />
          </g-field>
        </g-field-collapse>
        <g-field-collapse v-model="config.yAxis.labels.enabled" label="轴标签" toggle>
          <g-field :level="2" label="轴标签">
            <g-input-number
              v-model="config.yAxis.left"
              label="与轴线间距"
              suffix="px"
              inline
            />
            <g-input-number
              v-model="config.yAxis.labels.style.fontSize"
              label="字体大小"
              suffix="px"
              inline
            />
            <g-color-picker v-model="config.yAxis.labels.style.color" label="字体颜色" inline />
          </g-field>
        </g-field-collapse>
        <g-field label="网格线">
          <g-input-number
            v-model="config.yAxis.gridLineWidth"
            label="网格线宽度"
            suffix="px"
            inline
          />
          <g-color-picker v-model="config.yAxis.gridLineColor" label="网格线颜色" inline />
        </g-field>
      </g-field-collapse>
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
        v-model="config.plotOptions.series.dataLabels.enabled"
        :toggle="true"
        label="标注"
      >
        <g-field :level="2" label="文本">
          <g-color-picker v-model="config.plotOptions.series.dataLabels.style.color" label="颜色" inline />
          <g-input-number
            v-model="config.plotOptions.series.dataLabels.style.fontSize"
            :step="1"
            suffix="px"
            inline="inline"
            label="字体大小"
          />
        </g-field>
        <g-field :level="2" label="阴影">
          <n-switch v-model:value="config.chart.shadow" />
        </g-field>
        <g-field :level="2" label="内容格式化">
          <p title="function formatter(data) {" class="fake-code --start">
            <span class="--keyword">function</span> formatter(data) {
          </p>
          <g-monaco-editor
            language="javascript"
            :code="config.plotOptions.series.dataLabels.formatter"
            :height="180"
            editor-class="formatter-editor"
            @change="handChangeCode"
            @blur="updateCode"
          />
          <p class="fake-code --end">}</p>
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
import { PropType, ref, toRef } from 'vue'
import { D3Bar } from './d3-bar'
import { ElTabs, ElTabPane } from 'element-plus'
import { useFormatterHook } from '../../d3-config'

const props = defineProps({
  com: {
    type: Object as PropType<D3Bar>,
    required: true,
  },
})

const config = toRef(props.com, 'config')

const fontWeights = GlFontWeights
const hAligns = GlHigtAxixAlign
const vAligns = GlVAligns
const highLayouts = GlHighLayouts
const GenerateType = EGenerateType

const { handChangeCode, updateCode } = useFormatterHook(props.com.config)
</script>
