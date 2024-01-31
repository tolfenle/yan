<!--
 * @Author: wfl
 * @LastEditors: wfl
 * @description:
 * @updateInfo:
 * @Date: 2022-06-24 11:05:00
 * @LastEditTime: 2022-09-16 11:09:02
-->
<template>
  <chartGenerateConfig v-if="config.generate.configType === 'basic'" :config="config" chart-type="none" />
  <el-tabs
    v-else-if="config.generate.configType === 'all'"
    key="cardleft"
    tab-position="left"
    type="card"
  >
    <el-tab-pane label="背景" tab="bg">
      <g-field label="背景颜色" :level="2">
        <g-color-picker v-model="config.bg.color" />
      </g-field>
      <g-field :level="2" label="圆角" :is-flat="true">
        <g-input-number
          v-model="config.bg.radius.t"
          :min="0"
          :max="1000"
          :step="1"
          suffix="px"
          inline="inline"
          label="左上"
        />
        <g-input-number
          v-model="config.bg.radius.r"
          :min="0"
          :max="1000"
          :step="1"
          suffix="px"
          inline="inline"
          label="右上"
        />
        <g-input-number
          v-model="config.bg.radius.b"
          :min="0"
          :max="1000"
          :step="1"
          suffix="px"
          inline="inline"
          label="右下"
        />
        <g-input-number
          v-model="config.bg.radius.l"
          :min="0"
          :max="1000"
          :step="1"
          suffix="px"
          inline="inline"
          label="左下"
        />
      </g-field>
    </el-tab-pane>
    <el-tab-pane label="标题" tab="num">
      <g-field :level="2" label="与左侧间距">
        <g-input-number
          v-model="config.title.left"
          :step="1"
          suffix="px"
        />
      </g-field>
      <g-field :level="2" label="标题字体">
        <GChartFontConfig :config="config.title.font" />
      </g-field>
    </el-tab-pane>
    <el-tab-pane label="数值" tab="num">
      <g-field :level="2" label="数值字体">
        <GChartFontConfig :config="config.num.font" />
      </g-field>
      <g-field :level="2">
        <g-switch v-model="config.num.active" label="开启动画" inline />
        <g-switch v-model="config.num.showSeparator" label="显示1分隔符" inline />
      </g-field>
      <g-field :level="2" label="小数位数">
        <g-input-number
          v-model="config.num.precision"
          :min="0"
          :max="1000"
          :step="1"
          suffix=""
          label="小数位数"
        />
      </g-field>
      <g-field :level="2" label="动画" :is-flat="true">
        <g-input-number
          v-model="config.num.from"
          :min="0"
          :max="1000"
          :step="1"
          suffix=""
          inline="inline"
          label="起始值"
        />
        <g-input-number
          v-model="config.num.duration"
          :min="0"
          :step="1"
          suffix="ms"
          inline="inline"
          label="持续时间"
        />
      </g-field>
    </el-tab-pane>
    <el-tab-pane label="数值后缀" tab="suffix">
      <g-field :level="2" label="后缀">
        <g-input
          v-model="config.suffix.color"
        />
      </g-field>
      <g-field :level="2" label="与数值间距">
        <g-input-number
          v-model="config.suffix.left"
          :step="1"
          suffix="px"
        />
      </g-field>
      <g-field :level="2" label="后缀字体">
        <GChartFontConfig :config="config.suffix.font" />
      </g-field>
    </el-tab-pane>
    <el-tab-pane label="趋势图标" tab="icon">
      <g-field-collapse v-model="config.icon.show" label="显示图标" toggle>
        <g-field :level="2" label="与左侧间距">
          <g-input-number
            v-model="config.icon.left"
            :step="1"
            suffix="px"
          />
        </g-field>
        <g-field :level="2" label="图标大小">
          <g-input-number
            v-model="config.icon.size"
            :step="1"
            suffix="px"
          />
        </g-field>
      </g-field-collapse>
      <g-field-collapse label="条件配置" toggle>
        456
      </g-field-collapse>
    </el-tab-pane>
  </el-tabs>
</template>

<script lang='ts'>
import { defineComponent, PropType, toRef } from 'vue'
import { ElTabs, ElTabPane } from 'element-plus'
import TitleNum from './title-num'

export default defineComponent({
  name: 'TitleConfig',
  components: {
    ElTabs,
    ElTabPane,
  },
  props: {
    com: {
      type: Object as PropType<TitleNum>,
      required: true,
    },
  },
  setup(props) {
    const config = toRef(props.com, 'config')

    return {
      config,
      fontFamilys: GlFontFamilys,
      fontWeights: GlFontWeights,
      lineStyles: GlLineStyles,
      backgroundSies: GlBackgroundSies,
      navplacements: GlNavplacements,
      navdateTypes: GlNavdateTypes,
      fillTypes: GlFillTypes,
      upDownIcons: [],
    }
  },
})
</script>

<style lang="scss" scoped>
.switch-span {
  margin-right: 8px;

  .switch-inline {
    display: inline-block;
    width: 50px;
    margin-left: 8px;
  }
}
</style>
