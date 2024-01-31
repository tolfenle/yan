<!--
 * @Author: wfl
 * @LastEditors: wfl
 * @description:
 * @updateInfo:
 * @Date: 2022-05-05 09:10:59
 * @LastEditTime: 2022-06-15 15:10:35
-->
<script lang='ts' setup name="VWaterSvgProp">
import { defineComponent, onBeforeUnmount, PropType, toRef } from 'vue'
import { ElTabs, ElTabPane } from 'element-plus'
import { WaterSvg } from './water-ball'

const props = defineProps({
  com: {
    type: Object as PropType<WaterSvg>,
    required: true,
  },
})

const config = toRef(props.com, 'config')
const shapeTypes = GlEchartIcons
const animationEasings = GlAnimationEasings

const codeCopy = ref('')
const handChangeCode = val => {
  codeCopy.value = val.value
}
const updateCode = val => {
  props.com.config.label.formatter = val.value
}

const codeSvgCopy = ref('')
const handChangeSvgCode = val => {
  codeSvgCopy.value = val.value
}
const updateSvgCode = val => {
  props.com.config.global.shape = val.value
}

onBeforeUnmount(() => {
  props.com.config.label.formatter = codeCopy.value
  props.com.config.global.shape = codeSvgCopy.value
})

const demoParam = `param={
              borderColor: undefined,
              color: "#85A5FF",
              componentIndex: 0,
              componentSubType: "liquidFill",
              componentType: "series",
              data: 0.5,
              dataIndex: 0,
              dataType: undefined,
              dimensionIndex: undefined,
              dimensionNames: [],
              encode: {value: Array(1)},
              name: "",
              seriesId: "0",
              seriesIndex: 0,
              seriesName: "series\u00000",
              seriesType: "liquidFill",
              status: "normal",
}`
</script>

<template>
  <chartGenerateConfig v-if="config.generate.configType === 'basic'" :config="config" chart-type="none">
    <g-field :level="2" label-span="6" label="SVG代码" />
    <g-monaco-editor
      language="jsvascript"
      :code="config.global.shape"
      :height="200"
      :auto-format="true"
      editor-class="formatter-editor"
      @change="handChangeSvgCode"
      @blur="updateSvgCode"
    />
  </chartGenerateConfig>
  <el-tabs
    v-else-if="config.generate.configType === 'all'"
    key="cardleft"
    tab-position="left"
    type="card"
  >
    <el-tab-pane label="全局" tab="global">
      <g-field label="基础配置">
        <g-input-number
          v-model="config.global.radius"
          inline
          label="大小"
          :min="0"
          :step="1"
          suffix=""
        />
        <g-input-number
          v-model="config.global.count"
          inline
          label="波纹数量"
          :min="0"
          :step="1"
          suffix=""
        />
        <g-input-number
          v-model="config.global.decimalPlace"
          inline
          label="小数点位数"
          :min="0"
          :step="1"
          suffix=""
        />
        <g-input-number
          v-model="config.global.amplitude"
          inline
          label="波纹弯曲度"
          :min="0"
          :step="1"
          suffix=""
        />
      </g-field>
      <g-field :level="2" label="颜色">
        <g-color-picker v-model="config.global.backgroundStyle.color" inline label="背景颜色" />
        <g-color-picker v-model="config.itemStyle.shadowColor" inline label="阴影颜色" />
      </g-field>
      <g-field label="圆角">
        <g-input-number
          v-model="config.global.radius"
          :min="0"
          :step="1"
          suffix="px"
        />
      </g-field>
    </el-tab-pane>
    <el-tab-pane label="内容" tab="num">
      <g-field label-span="0" label="">
        <n-popover trigger="click" placement="left" width="800">
          <template #trigger>
            <n-button quaternary type="primary">
              查看param示例参数
            </n-button>
          </template>
          <g-monaco-editor
            language="javascript"
            :code="demoParam"
            :height="600"
            readonly
            editor-class="formatter-editor"
          />
        </n-popover>
        <p title="function formatter(param) {" class="fake-code --start">
          <span class="--keyword">function</span> formatter(param) {
        </p>
        <g-monaco-editor
          language="jsvascript"
          :code="config.label.formatter"
          :height="200"
          :auto-format="true"
          editor-class="formatter-editor"
          @change="handChangeCode"
          @blur="updateCode"
        />
        <p class="fake-code --end">}</p>
      </g-field>
      <g-field label="文本">
        <GChartFontConfig :config="config.label.textStyle" />
      </g-field>
    </el-tab-pane>
    <el-tab-pane label="外环" tab="outline">
      <g-field label="外环颜色">
        <g-color-picker v-model="config.outline.itemStyle.borderColor" inline label="外环颜色" />
        <g-color-picker v-model="config.outline.itemStyle.color" inline label="边界颜色" />
      </g-field>
      <g-field label="边界">
        <g-input-number
          v-model="config.outline.borderDistance"
          label="边界距离"
          :min="0"
          :step="1"
          suffix="px"
          inline
        />
        <g-input-number
          v-model="config.outline.itemStyle.borderWidth"
          :min="0"
          :step="1"
          suffix="px"
          label="边界宽度"
          inline
        />
      </g-field>
      <g-field label="阴影">
        <g-input-number
          v-model="config.outline.itemStyle.shadowBlur"
          label="阴影宽度"
          :min="0"
          :step="1"
          suffix="px"
          inline
        />
        <g-color-picker v-model="config.outline.itemStyle.shadowColor" inline label="阴影颜色" />
      </g-field>
    </el-tab-pane>
    <el-tab-pane label="波纹" tab="bowen">
      <g-field :level="2" label="颜色">
        <g-color-picker v-model="config.global.color" />
      </g-field>
      <g-field :level="2" label="缓动效果">
        <g-select v-model="config.animation.easing" :data="animationEasings" />
      </g-field>
      <g-field :level="2" label="时间">
        <g-input-number
          v-model="config.animation.duration"
          :min="0"
          :step="100"
          suffix="ms"
          inline
          label="持续时间"
        />
        <g-input-number
          v-model="config.animation.delay"
          :min="0"
          :step="100"
          suffix="ms"
          inline
          label="延迟时间"
        />
      </g-field>
    </el-tab-pane>
  </el-tabs>
</template>

<style lang="scss" scoped>
:deep(.datav-editor) {
  width: 100%;
}
</style>
