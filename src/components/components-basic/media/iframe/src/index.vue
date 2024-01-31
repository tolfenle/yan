<!--
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-03-09 12:14:21
 * @LastEditTime : 2023-11-20 10:10:37
-->
<template>
  <iframe
    ref="refFrame"
    :src="frameSrc"
    :width="wrapperStyle.width"
    :height="wrapperStyle.height"
    frameborder="0"
    :style="borderStyle"
  ></iframe>
</template>

<script lang="ts">
import { getFieldMap, useDataCenter } from '@/components/_mixins/use-data-center'
import { useApiStore } from '@/store/api'
import { computed, defineComponent, PropType, toRef,watch,ref  } from 'vue'
import { Frame } from './frame'

export default defineComponent({
  name: 'VFrame',
  props: {
    com: {
      type: Object as PropType<Frame>,
      required: true,
    },
  },
  setup(props) {
    const apiStore = useApiStore()
    useDataCenter(props.com)

    const dv_data = computed(() => {
      return apiStore.dataMap[props.com.id]?.source ?? []
    })

    const dv_field = computed(() => {
      return getFieldMap(props.com.apis.source.fields)
    })

    const config = toRef(props.com, 'config')
    const attr = toRef(props.com, 'attr')

    const frameSrc = computed(() => {
      const src = dv_data.value[dv_field.value.src] || config.value.src
      return src?.startsWith('http') ? src : `${location.origin}${location.pathname}/#/${src}`
    })

    const refFrame = ref(null)
    // 防止切换src时iframe不动态更新内容
    watch(frameSrc, ()=>{
      refFrame.value?.contentWindow?.location?.reload(true)
    })

    const wrapperStyle = computed(() => {
      return {
        width: `${attr.value.w}px`,
        height: `${attr.value.h}px`,
      }
    })

    const borderStyle = computed(() => {
      const border = config.value.border
      return {
        border: `${border.width}px ${border.style} ${border.color}`,
        borderRadius: `${border.radius[0]}px ${border.radius[1]}px ${border.radius[2]}px ${border.radius[3]}px`,
      }
    })
    // 防止切换src时iframe不动态更新内容
    watch(frameSrc, src=>{
      refFrame.value && (refFrame.value.src = src)
      refFrame.value?.contentWindow?.location?.reload(true)
    })

    return {
      refFrame,
      frameSrc,
      wrapperStyle,
      borderStyle,
    }
  },
})
</script>
