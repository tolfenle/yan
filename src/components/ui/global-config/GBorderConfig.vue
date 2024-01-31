<!--
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-11-03 14:08:54
 * @LastEditTime : 2024-01-10 15:32:12
-->
<script lang="ts" setup name="GBorderConfig">
import { PropType } from 'vue'
const props = defineProps({
  config: {
    type: Object as PropType<any>,
    default: () => {},
  },
  label: {
    type: String,
    default: '',
  },
  // 边框和圆角是否分field显示
  split: {
    type: Boolean,
    default: false,
  },
  span: {
    type: Number,
    default: 7,
  },
})

const lineStyles = GlLineStyles
</script>

<template>
  <g-field :leavel="2" :label-span="span" :label="`${label}边框`">
    <g-input-number
      v-model="config.borderWidth"
      label="边框宽度"
      inline
      :min="0"
      suffix="px"
    />
    <g-color-picker v-model="config.borderColor" inline label="边框颜色" />
    <g-select
      v-model="config.borderType"
      :data="lineStyles"
      label="边框类型"
    />
    <template v-if="!split && config.borderRadius">
      <g-input-number
        v-model="config.borderRadius[0]"
        label="左上圆角"
        inline
        :min="0"
        suffix="px"
      />
      <g-input-number
        v-model="config.borderRadius[1]"
        label="右上圆角"
        inline
        :min="0"
        suffix="px"
      />
      <g-input-number
        v-model="config.borderRadius[3]"
        label="左下圆角"
        inline
        :min="0"
        suffix="px"
      />
      <g-input-number
        v-model="config.borderRadius[2]"
        label="右下圆角"
        inline
        :min="0"
        suffix="px"
      />
    </template>
  </g-field>
  <g-field
    v-if="split && config.borderRadius"
    :label-span="span"
    :leavel="2"
    :label="`${label}圆角`"
  >
    <g-input-number
      v-model="config.borderRadius[0]"
      label="左上圆角"
      inline
      :min="0"
      suffix="px"
    />
    <g-input-number
      v-model="config.borderRadius[1]"
      label="右上圆角"
      inline
      :min="0"
      suffix="px"
    />
    <g-input-number
      v-model="config.borderRadius[3]"
      label="左下圆角"
      inline
      :min="0"
      suffix="px"
    />
    <g-input-number
      v-model="config.borderRadius[2]"
      label="右下圆角"
      inline
      :min="0"
      suffix="px"
    />
  </g-field>
</template>
