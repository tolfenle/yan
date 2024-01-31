<template>
  <el-tabs
    key="cardleft"
    tab-position="left"
    type="card"
  >
    <el-tab-pane label="全局" tab="bar">
      <g-field
        :level="2"
        tooltip="请选择您系统有的字体，如果您系统无此字体，标题将会显示默认字体"
        label="字体"
      >
        <g-select v-model="config.global.fontFamily" :data="fontFamilys" />
      </g-field>
      <g-field :level="2" label="文本样式" :is-flat="true">
        <g-input-number
          v-model="config.global.fontSize"
          :min="0"
          :max="100"
          :step="1"
          suffix="px"
          inline="inline"
          label="字号"
        />
        <g-select
          v-model="config.global.fontWeight"
          :data="fontWeights"
          inline="inline"
          label="字体粗细"
        />
        <g-input-number
          v-model="config.global.letterSpacing"
          :min="0"
          :max="100"
          :step="1"
          suffix="px"
          inline="inline"
          label="间距"
        />
      </g-field>
      <g-field :level="2" label="按钮宽度">
        <g-input-number
          v-model="config.global.width"
          :min="0"
          :max="1000"
          :step="1"
          suffix="px"
        />
      </g-field>
      <g-field :level="2" label="边框" :is-flat="true">
        <g-input-number
          v-model="config.global.borderWidth"
          :min="0"
          :max="100"
          :step="1"
          suffix="px"
          inline="inline"
          label="边框宽度"
        />
        <g-select
          v-model="config.global.borderType"
          :data="lineStyles"
          inline="inline"
          label="边框样式"
        />
      </g-field>
      <!-- <g-field :level="2" label="容器圆角" :is-flat="true">
        <g-input-number
          v-model="config.global.radius.t"
          :min="0"
          :max="1000"
          :step="1"
          suffix="px"
          inline="inline"
          label="左上"
        />
        <g-input-number
          v-model="config.global.radius.r"
          :min="0"
          :max="1000"
          :step="1"
          suffix="px"
          inline="inline"
          label="右上"
        />
        <g-input-number
          v-model="config.global.radius.b"
          :min="0"
          :max="1000"
          :step="1"
          suffix="px"
          inline="inline"
          label="右下"
        />
        <g-input-number
          v-model="config.global.radius.z"
          :min="0"
          :max="1000"
          :step="1"
          suffix="px"
          inline="inline"
          label="左下"
        />
      </g-field> -->
      <g-field :level="2" label="按钮圆角" :is-flat="true">
        <g-input-number
          v-model="config.global.btn.t"
          :min="0"
          :max="1000"
          :step="1"
          suffix="px"
          inline="inline"
          label="左上"
        />
        <g-input-number
          v-model="config.global.btn.r"
          :min="0"
          :max="1000"
          :step="1"
          suffix="px"
          inline="inline"
          label="右上"
        />
        <g-input-number
          v-model="config.global.btn.b"
          :min="0"
          :max="1000"
          :step="1"
          suffix="px"
          inline="inline"
          label="右下"
        />
        <g-input-number
          v-model="config.global.btn.z"
          :min="0"
          :max="1000"
          :step="1"
          suffix="px"
          inline="inline"
          label="左下"
        />
      </g-field>
      <GChartShadowConfig :config="config.global.shadow" />
      <g-field :level="2" label="外间距" :is-flat="true">
        <g-input-number
          v-model="config.margin.t"
          :min="-1000"
          :max="1000"
          :step="1"
          suffix="px"
          inline="inline"
          label="顶部"
        />
        <g-input-number
          v-model="config.margin.b"
          :min="-1000"
          :max="1000"
          :step="1"
          suffix="px"
          inline="inline"
          label="底部"
        />
        <g-input-number
          v-model="config.margin.z"
          :min="-1000"
          :max="1000"
          :step="1"
          suffix="px"
          inline="inline"
          label="左侧"
        />
        <g-input-number
          v-model="config.margin.r"
          :min="-1000"
          :max="1000"
          :step="1"
          suffix="px"
          inline="inline"
          label="右侧"
        />
      </g-field>
      <g-field :level="2" label="内间距" :is-flat="true">
        <g-input-number
          v-model="config.padding.t"
          :min="-1000"
          :max="1000"
          :step="1"
          suffix="px"
          inline="inline"
          label="顶部"
        />
        <g-input-number
          v-model="config.padding.b"
          :min="-1000"
          :max="1000"
          :step="1"
          suffix="px"
          inline="inline"
          label="底部"
        />
        <g-input-number
          v-model="config.padding.z"
          :min="-1000"
          :max="1000"
          :step="1"
          suffix="px"
          inline="inline"
          label="左侧"
        />
        <g-input-number
          v-model="config.padding.r"
          :min="-1000"
          :max="1000"
          :step="1"
          suffix="px"
          inline="inline"
          label="右侧"
        />
      </g-field>
    </el-tab-pane>
    <el-tab-pane label="默认状态" tab="默认状态">
      <g-field :level="2" label="背景图片">
        <g-upload-image v-model="config.defaul.image" />
      </g-field>
      <g-field :level="2" label="背景大小">
        <g-select v-model="config.defaul.backgroundSize" :data="backgroundSies" />
      </g-field>
      <g-field :level="2" label="文字颜色">
        <g-color-picker v-model="config.defaul.color" />
      </g-field>
      <g-field :level="2" label="背景颜色">
        <g-color-picker v-model="config.defaul.backgroundColor" />
      </g-field>
      <g-field :level="2" label="边框颜色">
        <g-color-picker v-model="config.defaul.borderColor" />
      </g-field>
      <GChartShadowConfig :config="config.defaul.shadow" />
    </el-tab-pane>
    <el-tab-pane label="悬浮状态" tab="悬浮状态">
      <g-field :level="2" label="背景图片">
        <g-upload-image v-model="config.hover.image" />
      </g-field>
      <g-field :level="2" label="背景大小">
        <g-select v-model="config.hover.backgroundSize" :data="backgroundSies" />
      </g-field>
      <g-field :level="2" label="文字颜色">
        <g-color-picker v-model="config.hover.color" />
      </g-field>
      <g-field :level="2" label="背景颜色">
        <g-color-picker v-model="config.hover.backgroundColor" />
      </g-field>
      <g-field :level="2" label="边框颜色">
        <g-color-picker v-model="config.hover.borderColor" />
      </g-field>
      <GChartShadowConfig :config="config.hover.shadow" />
    </el-tab-pane>
    <el-tab-pane label="选中状态" tab="选中状态">
      <g-field :level="2" label="背景图片">
        <g-upload-image v-model="config.active.image" />
      </g-field>
      <g-field :level="2" label="背景大小">
        <g-select v-model="config.active.backgroundSize" :data="backgroundSies" />
      </g-field>
      <g-field :level="2" label="文字颜色">
        <g-color-picker v-model="config.active.color" />
      </g-field>
      <g-field :level="2" label="背景颜色">
        <g-color-picker v-model="config.active.backgroundColor" />
      </g-field>
      <g-field :level="2" label="边框颜色">
        <g-color-picker v-model="config.active.borderColor" />
      </g-field>
      <GChartShadowConfig :config="config.active.shadow" />
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts">
import { defineComponent, PropType, toRef } from 'vue'
import BtnGroup from './btn-group'
import { ElTabs, ElTabPane } from 'element-plus'

export default defineComponent({
  name: 'BarConfig',
  components: {
    ElTabs,
    ElTabPane,
  },
  props: {
    com: {
      type: Object as PropType<BtnGroup>,
      required: true,
    },
  },
  setup(props) {
    const config = toRef(props.com, 'config')
    if (config.value.hover.show === undefined) {
      config.value.hover.show = true
    }
    if (config.value.active.show === undefined) {
      config.value.active.show = true
    }
    return {
      config,
      fontFamilys: GlFontFamilys,
      fontWeights: GlFontWeights,
      lineStyles: GlLineStyles,
      backgroundSies: GlBackgroundSies,
    }
  },
})
</script>
