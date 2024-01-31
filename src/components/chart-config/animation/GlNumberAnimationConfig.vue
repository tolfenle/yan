<!--
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-10-19 10:40:16
 * @LastEditTime : 2024-01-11 17:52:03
-->
<script lang="ts" name="GlNumberAnimationConfig" setup>
defineProps({
  config: {
    type: Object,
    default: () => { },
  },
})
</script>

<template>
  <g-field-collapse
    v-model="config.active"
    auto-open
    toggle
    label="数值动画"
  >
    <g-field
      :level="2"
      label="持续时间"
    >
      <g-input-number v-model="config.duration" suffix="ms" :step="500" />
    </g-field>
    <g-field
      :level="2"
      label="精确度"
    >
      <g-input-number v-model="config.precision" label="保留小数点位数" />
    </g-field>
    <g-field
      :level="2"
      label="显示分隔符"
    >
      <g-switch v-model="config.showSeparator" />
    </g-field>
    <g-field
      :level="2"
      label="循环播放"
    >
      <g-switch v-model="config.loop" label="开启循环" inline />
      <g-input-number
        v-model="config.loopTime"
        suffix="ms"
        :step="500"
        inline
        label="循环间隔时间"
      />
    </g-field>
  </g-field-collapse>
</template>

<style lang="scss" scoped>

</style>
