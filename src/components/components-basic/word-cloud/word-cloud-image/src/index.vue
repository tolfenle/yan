<!--
 * @Author: fj
 * @LastEditors: fj
 * @description:
 * @updateInfo: 本次更新内容：
 * @Date: 2023-02-13 15:19:50
 * @LastEditTime: 2023-04-27 10:59:26
-->
<template>
  <div class="datav-wrapper" :style="wrapperStyle">
    <div :id="com.id" style="width: 100%; height: 100%;"></div>
  </div>
</template>

<script lang='ts'>
import {
  defineComponent,
  PropType,
  computed,
  toRef,
  onMounted,
  watch,
  toRaw,
} from 'vue'
import {
  useDataCenter,
  getFieldMap,
} from '@/components/_mixins/use-data-center'
import { useApiStore } from '@/store/api'
import { WordCloudImage } from './word-cloud-image'
import { WordCloud, WordCloudOptions } from '@antv/g2plot'

let wordCloudChart

export default defineComponent({
  name: 'VWordCloudImage',
  props: {
    com: {
      type: Object as PropType<WordCloudImage>,
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

    const wrapperStyle = computed(() => {
      return {
        width: `${attr.value.w}px`,
        height: `${attr.value.h}px`,
      }
    })

    const { setUrl } = useEnvUrl()

    const option = computed(() => {
      const { colorBy, wordStyle, color, spiral, imageMask } = config.value
      return {
        data: dv_data.value,
        wordField: dv_field.value.x,
        weightField: dv_field.value.y,
        colorField: colorBy === 'name' ? dv_field.value.x : dv_field.value.y,
        wordStyle: {
          ...wordStyle,
        },
        random: 0.5,
        spiral: spiral,
        imageMask: setUrl(imageMask),
        color: color.length ? color : null,
      }
    })

    onMounted(() => {
      wordCloudChart = new WordCloud(
        props.com.id,
        toRaw(option.value) as WordCloudOptions,
      )
      wordCloudChart.render()
    })

    watch(
      () => option.value,
      val => {
        wordCloudChart.update(val)
      },
      { deep: true },
    )

    return {
      wrapperStyle,
    }
  },
})
</script>
