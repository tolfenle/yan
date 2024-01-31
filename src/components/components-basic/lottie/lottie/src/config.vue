<!--
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-10-31 11:13:01
 * @LastEditTime : 2024-01-19 11:36:26
-->
<template>
  <div class="setting-panel-gui">
    <g-field label-span="6" label="Lottie文件">
      <g-upload-file v-model="config.assetsPath" />
    </g-field>
    <g-field label-span="6" label="背景色">
      <g-color-picker v-model="config.backgroundColor" />
    </g-field>
    <g-field label-span="6" label="缩放比例">
      <g-input-number v-model="config.scale" :min="0.1" :step="0.1" />
    </g-field>
    <g-field
      label-span="6"
      tooltip="动画速度0-1之间动画减速，大于1动画加速"
      label="播放配置"
    >
      <g-select v-model="config.direction" label="动画方向" :data="directions" />
      <g-switch v-model="config.autoPlay" inline label="自动播放" />
      <g-switch v-model="config.loop" inline label="循环播放" />
      <g-input-number
        v-model="config.delay"
        inline
        label="动画延时"
        suffix="ms"
      />
      <g-input-number
        v-model="config.speed"
        :min="0"
        :step="0.1"
        inline
        label="动画速度"
      />
    </g-field>
    <g-field label-span="6" label="自动边距">
      <g-switch v-model="config.noMargin" />
    </g-field>
  </div>
</template>

<script lang='ts'>
import { defineComponent, PropType, toRef } from 'vue'
import { Lottie } from './lottie'

export default defineComponent({
  name: 'VMainTitleProp',
  components: {
  },
  props: {
    com: {
      type: Object as PropType<Lottie>,
      required: true,
    },
  },
  setup(props) {
    const config = toRef(props.com, 'config')
    return {
      config,
      directions: [{
        id: 'forward',
        value: '默认',
      },{
        id: 'reverse',
        value: '逆向',
      },{
        id: 'alternate',
        value: '交替',
      }],
    }
  },
})
</script>
