<!--
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-11-03 14:08:54
 * @LastEditTime : 2024-01-02 17:01:59
-->
<script lang="ts" setup name="GChartItemConfig">
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
})
</script>

<template>
  <g-field-collapse
    label="图表样式"
  >
    <g-field :leavel="2" label="图形透明度">
      <g-input-number
        v-model="config.opacity"
        suffix="px"
        :min="0"
        :max="1"
        :step="0.1"
      />
    </g-field>
    <g-field :leavel="2" label="自适应颜色">
      <g-switch v-model="config.color.auto" />
    </g-field>
    <g-field v-if="!config.color.auto" :leavel="2" label="选择颜色">
      <g-color-picker v-model="config.color.value" allow-img />
    </g-field>
    <GBorderConfig
      label="图形"
      :span="7"
      split
      :config="config"
    />
  </g-field-collapse>
</template>
