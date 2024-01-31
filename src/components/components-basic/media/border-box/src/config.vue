<!--
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-10-31 11:13:01
 * @LastEditTime : 2024-01-19 10:20:16
-->
<template>
  <div class="setting-panel-gui">
    <g-field
      :level="2"
      label="样式"
    >
      <g-select-image
        v-model="config.boxStyle.style"
        :images="presetImages"
      />
    </g-field>
  </div>
</template>

<script lang='ts'>
import { defineComponent, PropType, toRef } from 'vue'
import { BorderBox, presetImages } from './border-box'

export default defineComponent({
  name: 'VBorderBoxProp',
  props: {
    com: {
      type: Object as PropType<BorderBox>,
      required: true,
    },
  },
  setup(props) {
    const config = toRef(props.com, 'config')

    return {
      config,
      presetImages,
    }
  },
})
</script>
