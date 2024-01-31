<!--
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-10-31 11:13:01
 * @LastEditTime : 2024-01-09 16:22:50
-->
<template>
  <div class="setting-panel-gui">
    <el-tabs
      key="cardleft"
      tab-position="left"
      type="card"
    >
      <el-tab-pane label="标题" tab="title">
        <g-field
          tooltip="支持从数据中获取标题内容，详见数据面板"
          label="标题名"
        >
          <g-input
            v-model="config.title"
            label="标题内容"
          />
          <GChartFontConfig :config="config.textStyle" />
        </g-field>
        <g-field
          label="文字排列方式"
        >
          <g-select
            v-model="config.writingMode"
            :data="writingModes"
          />
        </g-field>
        <g-field
          label="对齐方式"
        >
          <g-select
            v-model="config.textAlign"
            :data="justifyContents"
          />
        </g-field>
      </el-tab-pane>
      <el-tab-pane label="背景" tab="title">
        <g-field label-span="6" label="显示背景">
          <g-switch v-model="config.backgroundStyle.show" />
        </g-field>
        <g-field label-span="6" label="背景色">
          <g-color-picker v-model="config.backgroundStyle.bgColor" />
        </g-field>
        <GBorderConfig :config="config.backgroundStyle.border" />
      </el-tab-pane>
      <el-tab-pane label="超链接" tab="title">
        <g-field
          :level="2"
          label="超链接"
        >
          <g-input
            v-model="config.urlConfig.url"
          />
        </g-field>
        <g-field
          :level="2"
          label="是否新开窗口"
        >
          <n-switch
            v-model:value="config.urlConfig.isBlank"
          />
        </g-field>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang='ts'>
import { defineComponent, PropType, toRef } from 'vue'
import { ElTabs, ElTabPane } from 'element-plus'
import { MainTitle } from './main-title'

export default defineComponent({
  name: 'VMainTitleProp',
  components: {
    ElTabs, ElTabPane,
  },
  props: {
    com: {
      type: Object as PropType<MainTitle>,
      required: true,
    },
  },
  setup(props) {
    const config = toRef(props.com, 'config')
    return {
      config,

      fontFamilys: GlFontFamilys,
      fontWeights: GlFontWeights,
      justifyContents: GlJustifyContents,
      writingModes: GlWritingModes,
      lineStyles: GlLineStyles,
    }
  },
})
</script>
