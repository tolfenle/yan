<!--
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-11-02 15:24:37
 * @LastEditTime : 2023-11-15 19:05:26
-->
<script lang="ts" name="useChartBarPubConfig" setup>
import { PropType } from 'vue'
import { useChartBarPubConfig } from './config'
import { _ } from 'iking-utils'
const TYPE_BAR = useChartBarPubConfig()

const props = defineProps({
  config: {
    type: Object as PropType<typeof TYPE_BAR>,
    default: () => { },
  },
})
</script>

<template>
  <g-field :level="2" label="间隔">
    <g-input-number
      v-model="config.barGap"
      label="柱间距离"
      inline
      suffix="%"
    />
    <g-input-number
      v-model="config.barCategoryGap"
      label="类目间距"
      inline
      suffix="%"
    />
  </g-field>
  <g-field-collapse
    label="柱体宽度"
  >
    <g-field :level="2" label="柱体宽度">
      <g-switch v-model="config.barWidth.auto" label="自适应" />
    </g-field>
    <g-field v-if="!config.barWidth.auto" :level="2" label="宽度值">
      <g-input-number
        v-model="config.barWidth.value"
        label="宽度"
        :min="0"
        inline
        :suffix="config.barWidth.isPercent ? '%' : 'px'"
      />
      <g-switch v-model="config.barWidth.isPercent" inline label="百分比模式" />
    </g-field>
    <g-field :level="2" label="柱体最大宽度">
      <g-switch v-model="config.barMaxWidth.auto" label="自适应" />
    </g-field>
    <g-field v-if="!config.barMaxWidth.auto" :level="2" label="最大宽度值">
      <g-input-number
        v-model="config.barMaxWidth.value"
        label="宽度"
        :min="0"
        inline
        :suffix="config.barMaxWidth.isPercent ? '%' : 'px'"
      />
      <g-switch v-model="config.barMaxWidth.isPercent" inline label="百分比模式" />
    </g-field>
    <g-field :level="2" label="柱体最小宽度">
      <g-switch v-model="config.barMinWidth.auto" label="自适应" />
    </g-field>
    <g-field v-if="!config.barMinWidth.auto" :level="2" label="最小宽度值">
      <g-input-number
        v-model="config.barMinWidth.value"
        label="宽度"
        :min="0"
        inline
        :suffix="config.barMinWidth.isPercent ? '%' : 'px'"
      />
      <g-switch v-model="config.barMinWidth.isPercent" inline label="百分比模式" />
    </g-field>
  </g-field-collapse>
</template>

<style lang="scss">
.legend-editor {
  width: 100% !important;
  margin-right: 0 !important;
}
</style>
