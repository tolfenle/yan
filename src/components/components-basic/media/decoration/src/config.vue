<!--
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-10-31 11:13:01
 * @LastEditTime : 2024-01-19 10:20:41
-->
<template>
  <div class="setting-panel-gui">
    <g-field
      :level="2"
      label="装饰元素"
    >
      <g-select-image
        v-model="config.global.img"
        :images="images"
      />
    </g-field>
    <g-field
      :level="2"
      label="透明度"
    >
      <g-slider
        v-model="config.global.opacity"
        :min="0"
        :max="1"
        :step="0.1"
      />
    </g-field>
  </div>
</template>

<script lang='ts'>
import { defineComponent, PropType, toRef } from 'vue'
import { Decoration, presetImages } from './decoration'
import { BorderImage } from '@/components/_models/border-image'

export default defineComponent({
  name: 'VDecorationProp',
  props: {
    com: {
      type: Object as PropType<Decoration>,
      required: true,
    },
  },
  setup(props) {
    const config = toRef(props.com, 'config')

    const images: BorderImage[] = []
    for (const key in presetImages) {
      const item = presetImages[key]
      images.push({
        id: key,
        name: key,
        src: item.url,
      })
    }

    return {
      config,
      images,
    }
  },
})
</script>
