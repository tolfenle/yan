<!--
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-12-28 18:01:56
 * @LastEditTime : 2023-12-28 18:25:48
-->
<template>
  <g-field-collapse label="全局" auto-open>
    <g-field
      :level="2"
      label="HTML代码"
      label-span="6"
    >
      <g-monaco-editor
        style="width: 100%;"
        language="html"
        :auto-format="true"
        :code="config.html"
        @blur="updateHtml"
      />
    </g-field>
    <g-field
      :level="2"
      label="背景颜色"
      label-span="6"
    >
      <g-color-picker v-model="config.background" />
    </g-field>
    <g-field
      :level="2"
      label="内边距"
      label-span="6"
    >
      <g-input-number
        v-model="config.padding[0]"
        label="左上"
        inline
        suffix="px"
      />
      <g-input-number
        v-model="config.padding[1]"
        label="右上"
        inline
        suffix="px"
      />
      <g-input-number
        v-model="config.padding[3]"
        label="左下"
        inline
        suffix="px"
      />
      <g-input-number
        v-model="config.padding[2]"
        label="右下"
        inline
        suffix="px"
      />
    </g-field>
    <GBorderConfig :config="config.border" />
  </g-field-collapse>
</template>

<script lang="ts">
import { defineComponent, PropType, toRef } from 'vue'
import Html from './html'
export default defineComponent({
  name: `VHtml`,
  components: {
  },
  props: {
    com: {
      type: Object as PropType<Html>,
      required: true,
    },
  },
  setup(props) {
    const config = toRef(props.com, 'config')
    const updateHtml = code => {
      config.value.html = code.value
    }
    return {
      config,
      updateHtml,
    }
  },
})
</script>
