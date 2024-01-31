<!--
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-10-26 11:19:11
 * @LastEditTime : 2024-01-09 16:23:44
-->
<script setup lang="ts" name="ChartFontConfig">
import { chartFont } from '@/components/chart-config/public/chartFont'
import { PropType } from 'vue'
const props = defineProps({
  config: {
    type: Object as PropType<typeof chartFont>,
    default: () => {},
  },
  allowInherit: {
    type: Boolean,
    default: false,
  },
  overflow: {
    type: Boolean,
    default: true,
  },
  noLineHeight: {
    type: Boolean,
    default: false,
  },
})
const fontFamilys = GlFontFamilys
const fontStyles = GlFontStyles
const fontWeights = GlFontWeights
const labelOverflow = GlLabelOverflow
</script>

<template>
  <g-color-picker v-model="config.color" :allow-inherit="allowInherit" label="颜色" />
  <g-select
    v-model="config.fontFamily"
    label="字体"
    :data="fontFamilys"
    inline
  />
  <g-select
    v-model="config.fontStyle"
    label="样式"
    :data="fontStyles"
    inline
  />
  <g-select
    v-model="config.fontWeight"
    label="粗细"
    :data="fontWeights"
    inline
  />
  <g-input-number
    v-model="config.fontSize"
    inline
    min="1"
    label="大小"
    suffix="px"
  />
  <g-input-number
    v-if="!noLineHeight"
    v-model="config.lineHeight"
    inline
    min="0"
    label="行高"
    suffix="px"
  />
  <g-input-number
    v-model="config.letterSpacing"
    inline
    min="0"
    label="文本间距"
    suffix="px"
  />
  <template v-if="config.overflow && overflow">
    <g-select
      v-model="config.overflow"
      label="文本溢出方式"
      :data="labelOverflow"
    />
    <g-input
      v-model="config.ellipsis"
      label="溢出显示内容"
    />
  </template>
</template>
