<!--
 * @Author: wfl
 * @LastEditors: wfl
 * @description:
 * @updateInfo:
 * @Date: 2022-07-19 16:15:20
 * @LastEditTime: 2022-07-20 11:04:14
-->
<template>
  <g-field-collapse label="全局" auto-open :model-value="true">
    <g-field
      :level="2"
      tooltip="当请求或者静态数据存在src时，将忽略配置的iframe地址"
      label="iframe地址"
    >
      <g-input v-model="com.config.src" />
    </g-field>
    <g-field :level="2" label="加载权重">
      <n-radio-group v-model:value="config.importance" size="small">
        <n-radio-button v-for="em in importances" :key="em.id" :value="em.id">
          {{ em.value }}
        </n-radio-button>
      </n-radio-group>
    </g-field>
    <g-field :level="2" label="边框宽度">
      <g-input-number v-model="config.border.width" />
    </g-field>
    <g-field :level="2" label="边框样式">
      <g-select v-model="config.border.style" :data="lineStyles" />
    </g-field>
    <g-field :level="2" label="边框颜色">
      <g-color-picker v-model="config.border.color" />
    </g-field>
    <g-field :level="2" label="边框圆角" :is-flat="true">
      <g-input-number
        v-model="config.border.radius[0]"
        :min="0"
        :max="1000"
        :step="1"
        suffix="px"
        inline="inline"
        label="左上角"
      />
      <g-input-number
        v-model="config.border.radius[1]"
        :min="0"
        :max="1000"
        :step="1"
        suffix="px"
        inline="inline"
        label="右上角"
      />
      <g-input-number
        v-model="config.border.radius[2]"
        :min="0"
        :max="1000"
        :step="1"
        suffix="px"
        inline="inline"
        label="右下角"
      />
      <g-input-number
        v-model="config.border.radius[3]"
        :min="0"
        :max="1000"
        :step="1"
        suffix="px"
        inline="inline"
        label="左下角"
      />
    </g-field>
  </g-field-collapse>
</template>

<script lang="ts">
import { defineComponent, PropType, toRef } from 'vue'
import Frame from './frame'

export default defineComponent({
  name: `VFrame`,
  props: {
    com: {
      type: Object as PropType<Frame>,
      required: true,
    },
  },
  setup(props) {
    const config = toRef(props.com, 'config')

    return {
      config,
      importances: GlImportances,
      lineStyles: GlLineStyles,
    }
  },
})
</script>
