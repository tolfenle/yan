<!--
 * @Author       : wfl
 * @LastEditors: fj
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-02-09 17:23:33
 * @LastEditTime: 2023-08-03 17:22:07
-->
<template>
  <div class="datav-wrapper" :style="wrapperStyle">
    <div :id="com.id" style="width: 100%;height: 100%;"></div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, PropType, computed, toRef, onMounted, watch, toRaw } from 'vue'
import { useDataCenter, getFieldMap } from '@/components/_mixins/use-data-center'
import { useApiStore } from '@/store/api'
import { WordCloudCircle } from './word-cloud-circle'
import { WordCloud, WordCloudOptions } from '@antv/g2plot'

let wordCloudChart

export default defineComponent({
  name: 'VWordCloudCircle',
  props: {
    com: {
      type: Object as PropType<WordCloudCircle>,
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

    const option = computed(() => {
      const { colorBy, wordStyle, color, spiral } = config.value
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
        color: color.length ? color : null,
      }
    })

    onMounted(()=>{
      wordCloudChart = new WordCloud(props.com.id, (toRaw(option.value)) as WordCloudOptions)
      wordCloudChart.render()
    })

    watch(()=> option.value, val=>{
      wordCloudChart.update(val)
    },{ deep: true })

    return {
      wrapperStyle,
    }
  },
})
</script>
