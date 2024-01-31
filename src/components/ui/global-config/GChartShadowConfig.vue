<!--
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-10-26 10:48:18
 * @LastEditTime : 2023-11-03 16:04:15
-->
<script setup lang="ts" name="GChartShadowConfig">
import { PropType } from 'vue'
const chartColorType = useChartColor()

defineProps({
  config: {
    type: Object as PropType<{
      shadowBlur: number
      shadowColor: typeof chartColorType
      shadowOffsetX: number
      shadowOffsetY: number
    }>,
    default: () => {},
  },
})

</script>

<template>
  <g-field label="阴影颜色">
    <g-color-picker v-model="config.shadowColor" />
  </g-field>
  <g-field label="阴影范围">
    <g-input-number
      v-model="config.shadowBlur"
      inline
      label="模糊范围"
    />
    <g-input-number
      v-model="config.shadowOffsetX"
      inline
      label="水平偏移距离"
    />
    <g-input-number
      v-model="config.shadowOffsetY"
      inline
      label="垂直偏移距离"
    />
  </g-field>
</template>
