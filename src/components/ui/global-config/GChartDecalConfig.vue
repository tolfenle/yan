<!--
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-11-03 15:22:30
 * @LastEditTime : 2023-11-03 15:51:55
-->
<script lang="ts" name="GChartDecalConfig" setup>
const props = defineProps({
  config: {
    type: Object as PropType<{
      symbol: {
        type: string
        value: string
        image: string
        svg: string
      }
      symbolSize: number
      symbolKeepAspect: boolean
      color: string
      dashArrayX: number
      dashArrayY: number
      rotation: number
      maxTileWidth: number
      maxTileHeight: number
    }>,
    default: () => { },
  },
})


const code = ref('')
const handChange = val => {
  code.value = val.value
}
const handBlur = val => {
  props.config.symbol.svg = val.value
}

onBeforeUnmount(() => {
  props.config.symbol.svg =code.value
})


const echartIcons = GlEchartIcons
const legendTypes = GlLegendTypes
</script>

<template>
  <g-field :level="2" label="标记类型">
    <n-radio-group
      v-model:value="config.symbol.type"
      size="small"
    >
      <n-radio-button v-for="pair in legendTypes" :key="pair.id" :value="pair.id">
        {{ pair.value }}
      </n-radio-button>
    </n-radio-group>
  </g-field>
  <g-field :level="2" :label-span="config.symbol.type === 'svg' ? 16 : 7" :label="`${config.symbol.type === 'default' ? '选择标记' : config.symbol.type === 'svg' ? '请输入svg代码' : '选择图片' }`">
    <g-select-shape v-if="config.symbol.type === 'default'" v-model="config.symbol.value" :shapes="echartIcons" />
    <g-upload-image v-else-if="config.symbol.type === 'image'" v-model="config.symbol.image" />
  </g-field>
  <g-monaco-editor
    v-if="config.symbol.type === 'svg'"
    :select-on-line-numbers="false"
    language="html"
    :code="config.symbol.svg"
    :height="200"
    :auto-format="true"
    editor-class="config-editor"
    @change="handChange"
    @blur="handBlur"
  />
  <g-field :level="2" label="图案大小">
    <g-input-number
      v-model="config.symbolSize"
      :min="0"
      :max="1"
      :step="0.1"
      suffix="%"
    />
  </g-field>
  <g-field :level="2" label="保持长宽比">
    <g-switch v-model="config.symbolKeepAspect" />
  </g-field>
  <g-field :level="2" label="贴花图案颜色">
    <g-color-picker v-model="config.color" />
  </g-field>
  <g-field :level="2" tooltip="设置为5则为：图案 - 空白 - 图案 - 空白 - 图案 - 空白" label="图案循环">
    <g-input-number
      v-model="config.dashArrayX"
      inline
      label="水平方向"
    />
    <g-input-number
      v-model="config.dashArrayY"
      inline
      label="垂直方向"
    />
  </g-field>
  <g-field :level="2" label="旋转角度">
    <g-input-number
      v-model="config.rotation"
      :min="-3"
      :max="3"
      suffix="弧度"
    />
  </g-field>
  <g-field :level="2" label="上限">
    <g-input-number
      v-model="config.maxTileWidth"
      label="宽度上限"
      suffix="px"
      inline
    />
    <g-input-number
      v-model="config.maxTileHeight"
      label="高度上限"
      suffix="px"
      inline
    />
  </g-field>
</template>

