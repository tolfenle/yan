<!--
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-11-21 14:26:59
 * @LastEditTime : 2023-11-22 10:36:18
-->
<script setup lang="ts" name="ChartSymbolConfig">
import { PropType } from 'vue'

const SymbolType = useSymbolConfigFunc()
const props = defineProps({
  config: {
    type: Object as PropType<typeof SymbolType>,
    default: () => {},
  },
})

const symbolTypes = Object.keys(ESYMBOL_TYPE).map(sym => ({
  key: ESYMBOL_TYPE[sym],
  value: sym,
}))

const ESymbolType = ESYMBOL_TYPE

const echartIcons = GlEchartIcons

watch(() => props.config, bool => {
  if(!bool) props.config.symbolSize = 0
})
</script>

<template>
  <g-field-collapse v-model="config.show" toggle label="拐点标记">
    <g-field :level="2" label="标记类型">
      <n-radio-group
        v-model:value="config.type"
      >
        <n-radio-button v-for="sym in symbolTypes" :key="sym.key" :value="sym.key">
          {{ sym.value }}
        </n-radio-button>
      </n-radio-group>
    </g-field>
    <g-field v-if="config.type === ESymbolType.默认图形" :level="2" label="默认图形">
      <g-select
        v-model="config.symbol"
        :data="echartIcons"
      />
    </g-field>
    <g-field v-else-if="config.type === ESymbolType.图片" :level="2" label="图片">
      <g-upload-image v-model="config.image" />
    </g-field>
    <g-field :leavel="2" label="标记属性">
      <g-input-number
        v-model="config.symbolSize"
        :min="0"
        :step="1"
        inline
        label="标记大小"
      />
      <g-input-number
        v-model="config.symbolRotate"
        :min="-180"
        :max="180"
        :step="1"
        suffix="deg"
        inline
        label="旋转角度"
      />
      <g-input-number
        v-model="config.symbolOffset[0]"
        :step="1"
        suffix="px"
        inline
        label="水平偏移"
      />
      <g-input-number
        v-model="config.symbolOffset[1]"
        :step="1"
        suffix="px"
        inline
        label="垂直偏移"
      />
    </g-field>
    <g-field :leavel="2" label="保持宽高比">
      <g-switch v-model="config.symbolKeepAspect" />
    </g-field>
  </g-field-collapse>
</template>

<style lang="scss" scoped>

</style>
