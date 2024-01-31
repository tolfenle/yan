<template>
  <g-field-collapse
    label="全局样式"
  >
    <g-field
      :level="2"
      tooltip="请选择您系统有的字体，如果您系统无此字体，标题将会显示默认字体"
      label="字体"
    >
      <g-select
        v-model="config.wordStyle.fontFamily"
        :data="fontFamilys"
      />
    </g-field>
    <g-field
      :level="2"
      label="图形"
    >
      <g-select
        v-model="config.spiral"
        :data="[{id: 'archimedean', value: '椭圆'},{id: 'rectangular', value: '矩形'}]"
      />
    </g-field>
    <g-field
      :level="2"
      label="最小字号"
    >
      <g-slider
        v-model="config.wordStyle.fontSize[0]"
        :min="0"
        :max="100"
        :step="1"
      />
    </g-field>
    <g-field
      :level="2"
      label="最大字号"
    >
      <g-slider
        v-model="config.wordStyle.fontSize[1]"
        :min="0"
        :max="100"
        :step="1"
      />
    </g-field>
    <g-field
      :level="2"
      label="旋转范围"
      :is-flat="true"
    >
      <g-input-number
        v-model="config.wordStyle.rotation[0]"
        :min="-360"
        :max="360"
        :step="1"
        inline="inline"
        label="最小角度"
      />
      <g-input-number
        v-model="config.wordStyle.rotation[1]"
        :min="-360"
        :max="360"
        :step="1"
        inline="inline"
        label="最大角度"
      />
    </g-field>
    <g-field
      :level="2"
      label="间隔"
    >
      <g-slider
        v-model="config.wordStyle.padding"
        :step="1"
      />
    </g-field>
  </g-field-collapse>
</template>

<script lang='ts'>
import { defineComponent, PropType, toRef } from 'vue'
import WordCloudCircle from './word-cloud-circle'
export default defineComponent({
  name: `VWordCloudCircle`,
  props: {
    com: {
      type: Object as PropType<WordCloudCircle>,
      required: true,
    },
  },
  setup(props) {
    const config = toRef(props.com, 'config')

    return {
      config,
      fontFamilys: GlFontFamilys,
      fontWeights: GlFontWeights,
    }
  },
})

</script>
