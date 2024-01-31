<!--
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-12-28 18:01:49
 * @LastEditTime : 2023-12-28 18:33:50
-->
<template>
  <div
    class="datav-wrapper"
    :style="wrapperStyle"
    @click="handClick"
    v-html="compuHTML"
  ></div>
</template>

<script lang="ts">
import { getFieldMap, useDataCenter } from '@/components/_mixins/use-data-center'
import { useApiStore } from '@/store/api'
import { useEventStore } from '@/store/event'
import { computed, CSSProperties, defineComponent, PropType, toRef } from 'vue'
import { Html } from './html'

export default defineComponent({
  name: 'VHtml',
  props: {
    com: {
      type: Object as PropType<Html>,
      required: true,
    },
  },
  setup(props) {
    const apiStore = useApiStore()
    useDataCenter(props.com)
    const eventStore = useEventStore()

    const dv_data = computed(() => {
      return apiStore.dataMap[props.com.id]?.source ?? []
    })

    const dv_field = computed(() => {
      return getFieldMap(props.com.apis.source.fields)
    })

    const config = toRef(props.com, 'config')
    const attr = toRef(props.com, 'attr')

    const compuHTML = computed(() => {
      return dv_data.value[dv_field.value.html] || config.value.html
    })

    const wrapperStyle = computed(() => {
      const background = config.value.background
      let style: Partial<CSSProperties> = {
        width: useNumberToPx(attr.value.w),
        height: useNumberToPx(attr.value.h),
        ...setChartColor(background),
        ...setDefaultBorder(config.value.border),
      }
      return style
    })

    const handClick = () => {
      eventStore.handleSubVariablesChange(props.com, 'click', {
        config,
        data: dv_data.value,
      })
    }

    return {
      compuHTML,
      wrapperStyle,
      handClick,
    }
  },
})
</script>
