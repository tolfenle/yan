<!--
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-12-20 09:16:33
 * @LastEditTime : 2024-01-10 15:24:47
-->
<script setup lang="ts">
import THREE from 'three'
import { Map3d } from './index'
import { buildUUID, ikMitt } from 'iking-utils'
import { PropType } from 'vue'

const props = defineProps({
  config: {
    type: Object,
    default: () => { },
  },
  barData: {
    type: Array as PropType<{
      name?: string
      adcode: number
      value: number
      lonlat?: number[]
    }[]>,
    default:()=> [],
  },
})

const uuid = buildUUID()
let threeMap: typeof Map3d | null = null

onMounted(() => {
  threeMap = new Map3d(`#map${uuid}`, props.config)
})

let handLoad = false
ikMitt.on('city-map-loaded', () => {
  handLoad = true
  threeMap.createBar(props.barData)
})

const emit = defineEmits(['camera'])

watch(() => props.barData, val => {
  handLoad && threeMap && threeMap.createBar(props.barData)
}, { deep: true })

onUnmounted(() => {
  emit('camera', {
    position: threeMap.camera.position,
    rotation: threeMap.camera.rotation,
  })
})


</script>

<template>
  <div class="gl-three-map">
    <div :id="`map${uuid}`" style="height: 100%; width: 100%;"></div>
  </div>
</template>

<style lang="scss">
  .mapLabel {
    font-size: 14px;
    color: #84baf8;
    // text-shadow: 0.5px 0.5px #48c1ff;
  }

  .barLabel {
    font-size: 14px;
    color: #fff;
    // text-shadow: 1px 1px #FFF;
    .sort {
      display: inline-block;
      width: 15px;
      height: 15px;
      border-radius: 50%;
      text-align: center;
      background-color: #fff;
      color: #000;
      text-shadow: none;
    }
  }
</style>

<style lang="scss" scoped>
.gl-three-map {
  width: 100%;
  height: 100%;
  pointer-events: auto !important;

  canvas {
    pointer-events: auto !important;
  }
}
</style>
