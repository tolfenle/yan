<!--
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-11-17 15:24:36
 * @LastEditTime : 2023-11-17 15:39:40
-->
<template>
  <div class="setting-panel-gui">
    <g-field
      :level="2"
      label="实时/当日天气"
    >
      <n-switch
        v-model:value="config.api.now"
      />
    </g-field>
    <g-field
      :level="2"
      tooltip="请选择您系统有的字体，如果您系统无此字体，标题将会显示默认字体"
      label="字体"
    >
      <g-select v-model="config.font.fontFamily" :data="fontFamilys" />
    </g-field>
    <g-field
      :level="2"
      label="字号"
    >
      <g-input-number
        v-model="config.font.fontSize"
        :min="12"
        :max="100"
        :step="1"
        suffix="px"
      />
    </g-field>
    <g-field
      :level="2"
      label="字体粗细"
    >
      <g-select
        v-model="config.font.fontWeight"
        :data="fontWeights"
      />
    </g-field>
    <g-field
      :level="2"
      label="字体样式"
    >
      <g-select
        v-model="config.font.fontStyle"
        :data="fontStyles"
      />
    </g-field>
    <g-field
      :level="2"
      label="文字颜色"
    >
      <g-color-picker v-model="config.font.color" label="颜色" />
    </g-field>
    <g-field-collapse v-model="config.icon.show" :toggle="true" label="天气图标">
      <g-field
        :level="2"
        label="图标大小"
      >
        <g-input-number
          v-model="config.icon.size"
          :min="12"
          :max="100"
          :step="1"
          suffix="px"
        />
      </g-field>
      <g-field
        :level="2"
        label="和文字同色"
      >
        <n-switch
          v-model:value="config.icon.colorBy"
        />
        <g-color-picker v-if="!config.icon.colorBy" v-model="config.icon.color" label="图标颜色" />
      </g-field>
    </g-field-collapse>
  </div>
</template>

<script lang='ts'>
import { defineComponent, PropType, toRef } from 'vue'
import WeatherApi from './weather-api'
export default defineComponent({
  name: `VWeatherApi`,
  props: {
    com: {
      type: Object as PropType<WeatherApi>,
      required: true,
    },
  },
  setup(props) {
    const config = toRef(props.com, 'config')

    return {
      config,
      fontFamilys: GlFontFamilys,
      fontWeights: GlFontWeights,
      justifyContents: GlJustifyContents,
      fontStyles: GlFontStyles,
    }
  },
})

</script>
