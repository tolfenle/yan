<!--
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :animate__animated animate__backInLeft
 * @Date         : 2023-10-31 11:13:02
 * @LastEditTime : 2024-01-19 16:57:48
-->
<template>
  <div
    :style="{
      'pointer-events': 'none',
      'z-index': 0,
      left: com.attr.x + 'px',
      top: com.attr.y + 'px',
      width: com.attr.w + 'px',
      height: com.attr.h + 'px',
      opacity: com.attr.opacity,
      transform: `rotate(${com.attr.deg}deg) ${com.attr.filpH ? 'scaleX(-1)' : ''} ${com.attr.filpV ? 'scaleY(-1)' : ''}`,
      filter: styleFilter,
      visibility: com.hided ? 'hidden' : 'visible'
    }"
    class="-datav-com absolute animate__animated"
    :class="`${com.animate.type} animate__duration-${com.animate.direction}s animate__repeat-${com.animate.repeat} animate__delay-${com.animate.delay}`"
  >
    <!-- <Transition name="list"> -->
    <component
      :is="com.name"
      :key="com.id"
      :com="com"
      :style="{
        'pointer-events': 'auto',
      }"
    />
    <!-- </Transition> -->
  </div>
</template>

<script lang="ts" setup>
import { PropType, computed, Transition  } from 'vue'
import { DatavComponent } from '@/components/_models/datav-component'
import { useEditorStore } from '@/store/editor'

defineProps({
  com: {
    type: Object as PropType<DatavComponent>,
    required: true,
  },
})

const editorStore = useEditorStore()
const styleFilter = computed(() => {
  const sf = editorStore.pageConfig.styleFilterParams
  let filter = ''
  if (sf.enable) {
    filter = `hue-rotate(${sf.hue}deg) contrast(${sf.contrast}%) opacity(${sf.opacity}%) saturate(${sf.saturate}%) brightness(${sf.brightness}%)`
  }
  return filter
})
</script>

<style lang="scss" scoped>
// .list-enter-active,
// .list-leave-active {
//   transition: all 1.5s ease;
// }

// .list-enter-from,
// .list-leave-to {
//   opacity: 0;
//   transform: translateX(30px);
// }
</style>
