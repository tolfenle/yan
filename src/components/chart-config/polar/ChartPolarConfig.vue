<!--
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-11-16 16:32:43
 * @LastEditTime : 2023-11-17 11:15:08
-->
<!--
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-11-16 16:32:43
 * @LastEditTime : 2023-11-17 10:48:55
-->
<script lang="ts" name="ChartPolarConfig" setup>
import { PropType } from 'vue'
import { chartPolarConfig } from './config'
import { _ } from 'iking-utils'
const TYPE_POLAR = chartPolarConfig()

const props = defineProps({
  config: {
    type: Object as PropType<typeof TYPE_POLAR>,
    default: () => { },
  },
})
</script>

<template>
  <g-field :level="2" label="间隔">
    <g-input-number
      v-model="config.startAngle"
      label="起始角度"
      suffix="°"
    />
    <g-switch v-model="config.clockwise" label="顺时针" />
  </g-field>
  <g-field :level="2" label="中心坐标">
    <g-input-number
      v-model="config.center.value[0]"
      label="横坐标"
      inline
      :suffix="config.center.isPersent ? '%' : 'px'"
    />
    <g-input-number
      v-model="config.center.value[1]"
      label="纵坐标"
      inline
      :suffix="config.center.isPersent ? '%' : 'px'"
    />
    <g-switch v-model="config.center.isPersent" label="百分比模式" />
  </g-field>
  <g-field :level="2" label="半径">
    <g-input-number
      v-model="config.radius.value[0]"
      label="内半径"
      inline
      :suffix="config.radius.isPersent ? '%' : 'px'"
    />
    <g-input-number
      v-model="config.radius.value[1]"
      label="外半径"
      inline
      :suffix="config.radius.isPersent ? '%' : 'px'"
    />
    <g-switch v-model="config.radius.isPersent" label="百分比模式" />
  </g-field>
  <g-field-collapse v-model="config.max.use" label="最大值" toggle>
    <g-field :level="2" label="数据最大值">
      <g-switch v-model="config.max.useMaxData" label="使用数据中的最大值" />
    </g-field>
    <template v-if="!config.max.useMaxData">
      <g-field :level="2" label="设置最大值">
        <g-input v-model="config.max.value" />
      </g-field>
      <g-field :level="2" label-span="0">
        <n-switch v-model="config.max.add">
          <template #checked>
            在数据最大值基础上【加】设置的最大值
          </template>
          <template #unchecked>
            在数据最大值基础上【减】设置的最大值
          </template>
        </n-switch>
      </g-field>
    </template>
  </g-field-collapse>
</template>

<style lang="scss">
.legend-editor {
  width: 100% !important;
  margin-right: 0 !important;
}
</style>
