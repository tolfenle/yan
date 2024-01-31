<!--
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-12-07 16:47:12
 * @LastEditTime : 2023-12-07 19:02:10
-->
<template>
  <el-tab-pane label="地图" tab="map">
    <g-field :leval="2" label="地图范围">
      456
    </g-field>
    <g-field :leval="2" label="地图标签">
      <GChartLabelConfig :config="config.label" />
    </g-field>
    <g-field :leval="2" label="地图属性">
      <g-color-picker v-model="config.itemStyle.color" inline label="地图颜色" />
      <g-input-number
        v-model="config.itemStyle.opacity"
        :min="0"
        :max="1"
        :step="1"
        inline
        label="透明度"
      />
      <g-input-number
        v-model="config.itemStyle.borderWidth"
        inline
        label="边框宽度"
      />
      <g-color-picker v-model="config.itemStyle.borderColor" inline label="边框颜色" />
    </g-field>
    <g-field-collapse :leval="2" label="地图悬浮样式">
      <g-field :leval="2" label="地图标签">
        <GChartLabelConfig :config="config.emphasis.label" />
      </g-field>
      <g-field :leval="2" label="地图属性">
        <g-color-picker v-model="config.emphasis.itemStyle.color" inline label="地图颜色" />
        <g-input-number
          v-model="config.emphasis.itemStyle.opacity"
          :min="0"
          :max="1"
          :step="1"
          inline
          label="透明度"
        />
        <g-input-number
          v-model="config.emphasis.itemStyle.borderWidth"
          inline
          label="边框宽度"
        />
        <g-color-picker v-model="config.emphasis.itemStyle.borderColor" inline label="边框颜色" />
      </g-field>
    </g-field-collapse>
    <g-field :leval="2" label="尺寸">
      <g-input-number v-model="config.boxWidth" inline label="三维场景中的宽度" />
      <g-input-number v-model="config.boxHeight" inline label="三维场景中的高度" />
    </g-field>
    <g-field :leval="2" label="地图高度">
      <g-input-number v-model="config.regionHeight" />
    </g-field>
    <g-field :leval="2" label="环境贴图">
      <g-color-picker v-model="config.environment" />
    </g-field>
  </el-tab-pane>
  <el-tab-pane label="地面" tab="groundPlane">
    <g-field-collapse
      v-model="config.groundPlane.show"
      toggle
      label="显示地面"
    >
      <g-field :leval="2" label="地面贴图">
        <g-color-picker v-model="config.groundPlane.color" />
      </g-field>
    </g-field-collapse>
  </el-tab-pane>
</template>

<script lang='ts'>
import { defineComponent, PropType, ref, toRef } from 'vue'
import { ElTabPane } from 'element-plus'

export default defineComponent({
  name: 'VMap3dProp',
  components: {
    ElTabPane,
  },
  props: {
    config: {
      type: Object as PropType<any>,
      required: true,
    },
  },
  setup(props) {
    return {
      fontFamilys: GlFontFamilys,
    }
  },
})
</script>
