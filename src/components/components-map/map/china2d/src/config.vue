<template>
  <el-tabs
    key="cardleft"
    tab-position="left"
    type="card"
  >
    <el-tab-pane label="全局" tab="global">
      <g-field :level="2" label="地图范围">
        <g-select-map v-model="config.map" />
      </g-field>
      <g-field :level="2" label="地图背景">
        <g-color-picker v-model="config.global.bgColor" />
      </g-field>
      <g-field :level="2" label="地图长宽比例" :is-flat="true">
        <g-slider
          v-model="config.global.aspectScale"
          :min="0"
          :max="20"
          :step="0.01"
          inline="inline-single"
        />
      </g-field>
      <g-field label="旋转" :level="2" :is-flat="true">
        <g-slider
          v-model="config.global.rotate.x"
          :step="0.1"
          :min="-180"
          :max="180"
          inline="inline-single"
          label="X轴"
        />
        <g-slider
          v-model="config.global.rotate.y"
          :step="0.1"
          :min="-180"
          :max="180"
          inline="inline-single"
          label="Y轴"
        />
        <g-slider
          v-model="config.global.rotate.z"
          :step="0.1"
          :min="-180"
          :max="180"
          inline="inline-single"
          label="Z轴"
        />
      </g-field>
      <g-field :level="2" label="地图缩放" :is-flat="true">
        <g-slider-range
          v-model="config.global.zoom.range"
          :min="0"
          :max="20"
          :step="0.1"
          inline="inline-single"
          label="缩放范围 [0, 20]"
        />
        <g-slider-range
          v-model="config.global.zoom.range"
          :min="0"
          :max="20"
          :step="0.1"
          inline="inline-single"
          label="缩放范围 [0, 20]"
        />
        <g-slider
          v-model="config.global.zoom.value"
          :min="0"
          :max="20"
          :step="0.1"
          inline="inline-single"
          label="默认级别 [0, 20]"
        />
      </g-field>
      <g-field :level="2" label="地图中心" :is-flat="true">
        <g-slider
          v-model="config.global.center.lng"
          :min="-180"
          :max="180"
          :step="0.1"
          inline="inline-single"
          label="经度"
        />
        <g-slider
          v-model="config.global.center.lat"
          :min="-90"
          :max="90"
          :step="0.1"
          inline="inline-single"
          label="纬度"
        />
      </g-field>
    </el-tab-pane>
    <el-tab-pane label="弹框" tab="tooltip">
      <g-field :level="2" label="文本样式" :is-flat="true">
        <g-select
          v-model="config.tooltip.textStyle.fontFamily"
          :data="fontFamilys"
          inline="inline"
          label="字体"
        />
        <g-select
          v-model="config.tooltip.textStyle.fontWeight"
          :data="fontWeights"
          inline="inline"
          label="文字粗细"
        />
        <g-input-number
          v-model="config.tooltip.textStyle.fontSize"
          :min="0"
          :max="100"
          :step="1"
          suffix="px"
          inline="inline"
          label="字号"
        />
        <g-color-picker v-model="config.tooltip.textStyle.color" inline="inline" label="颜色" />
      </g-field>
      <g-field :level="2" label="行高比例">
        <g-slider
          v-model="config.tooltip.lineHeight"
          :min="0.5"
          :max="5"
          :step="0.1"
        />
      </g-field>
      <g-field :level="2" label="圆角半径">
        <g-slider
          v-model="config.tooltip.borderRadius"
          :min="0"
          :max="20"
          :step="1"
        />
      </g-field>
      <g-field :level="2" label="外边距" :is-flat="true">
        <g-input-number
          v-model="config.tooltip.padding.top"
          :min="0"
          :max="100"
          :step="1"
          inline="inline"
          label="上"
        />
        <g-input-number
          v-model="config.tooltip.padding.bottom"
          :min="0"
          :max="100"
          :step="1"
          inline="inline"
          label="下"
        />
        <g-input-number
          v-model="config.tooltip.padding.left"
          :min="0"
          :max="100"
          :step="1"
          inline="inline"
          label="左"
        />
        <g-input-number
          v-model="config.tooltip.padding.right"
          :min="0"
          :max="100"
          :step="1"
          inline="inline"
          label="右"
        />
      </g-field>
      <g-field :level="2" label="背景色">
        <g-color-picker v-model="config.tooltip.bgColor" />
      </g-field>
    </el-tab-pane>
    <el-tab-pane label="交互" tab="interactive">
      <g-field :level="2" label="开启拖拽">
        <n-switch v-model:value="config.interactive.dragging" />
      </g-field>
      <g-field :level="2" label="开启缩放">
        <n-switch v-model:value="config.interactive.scrollWheelZoom" />
      </g-field>
      <g-field :level="2" label="地图交互">
        <n-switch v-model:value="config.interactive.isInteractive" />
      </g-field>
    </el-tab-pane>
  </el-tabs>
</template>

<script lang='ts' setup name="VChina2dProp">
import { PropType, toRef } from 'vue'
import { ElTabs, ElTabPane } from 'element-plus'
import { China2d } from './china2d'

const props = defineProps({
  com: {
    type: Object as PropType<China2d>,
    required: true,
  },
})
const config = toRef(props.com, 'config')

const fontFamilys = GlFontFamilys
const fontWeights = GlFontWeights

</script>
