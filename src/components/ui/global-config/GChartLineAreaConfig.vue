<!--
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-10-26 10:48:18
 * @LastEditTime : 2023-11-22 12:28:56
-->
<script setup lang="ts" name="GChartLineAreaConfig">
defineProps({
  config: {
    type: Object,
    default: () => {},
  },
  label: {
    type: String,
    default: '区域',
  },
  allowImg: {
    type: Boolean,
    default: true,
  },
  allowInherit: {
    type: Boolean,
    default: true,
  },
  allShadow: {
    type: Boolean,
    default: true,
  },
})

const areaOrigin = GlAreaOrigins
</script>

<template>
  <g-field :label="`${label}颜色`">
    <g-color-picker v-model="config.color" :allow-img="allowImg" :allow-inherit="allowInherit" />
  </g-field>
  <g-field label="透明度">
    <g-input-number
      v-model="config.opacity"
      :min="0"
      :step="0.1"
      :max="1"
    />
  </g-field>
  <g-field label="起始位置">
    <g-select v-model="config.origin" :data="areaOrigin" />
  </g-field>
  <g-field v-if="config.origin==='number'" label="指定数值">
    <g-input-number v-model="config.number" />
  </g-field>
  <g-field :label="`${label}设置`">
    <tempalte v-if="allShadow">
      <g-input-number
        v-model="config.shadowBlur"
        inline
        label="阴影范围"
      />
      <g-color-picker v-model="config.shadowColor" inline label="阴影颜色" />
      <g-input-number
        v-model="config.shadowOffsetX"
        inline
        label="阴影水平偏移量"
      />
      <g-input-number
        v-model="config.shadowOffsetY"
        inline
        label="阴影垂直偏移量"
      />
    </tempalte>
  </g-field>
</template>
