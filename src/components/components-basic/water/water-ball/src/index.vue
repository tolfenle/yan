<template>
  <div class="datav-wrapper" :style="wrapperStyle">
    <div :id="uid" style="height: 100%; width: 100%;"></div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, PropType, computed, toRef } from 'vue'
import 'echarts-liquidfill'
import * as echarts from 'echarts'
import { useDataCenter, getFieldMap } from '@/components/_mixins/use-data-center'
import { useApiStore } from '@/store/api'
import { useEventStore } from '@/store/event'
import { WaterBall } from './water-ball'
import { buildUUID } from 'iking-utils'

export default defineComponent({
  name: 'VWaterBall',
  props: {
    com: {
      type: Object as PropType<WaterBall>,
      required: true,
    },
  },
  setup(props) {
    const uid = buildUUID()

    const apiStore = useApiStore()
    const eventStore = useEventStore()
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
      try {
        const { animation } = config.value
        const option = config.value
        const data = dv_data.value[dv_field.value.y]
        const values = [data]
        for (let i = 1; i < option.global.count; i++) {
          values.push(Math.random() * data)
        }
        const opts = {
          ...parseAnimation(animation),
          series: [{
            type: 'liquidFill',
            radius: `${option.global.radius}%`,
            shape: option.global.shape,
            decimalPlace: option.global.decimalPlace,
            amplitude: option.global.amplitude,
            color: [setChartColor(option.global.color)],
            data: values, // data个数代表波浪数
            backgroundStyle: {
              ...option.global.backgroundStyle,
              color: setChartColor(option.global.backgroundStyle.color),
            },
            itemStyle: option.itemStyle,
            label: {
              formatter: val => {
                const func = new Function('param', option.label.formatter)
                return func(val)
              },
              textStyle: {
                ...option.label.textStyle,
                color: setChartColor(option.label.textStyle.color),
              },
            },
            outline: {
              show: option.outline.show,
              borderDistance: option.outline.borderDistance,
              itemStyle: {
                ...option.outline.itemStyle,
                ...parseItemStyle(option.outline.itemStyle),
              },
            },
          }],
        }

        return opts as any
      } catch (error) {
        console.info('error: ', error)
      }
      return {}
    })

    const onClick = (params: any) => {
      eventStore.handleSubVariablesChange(
        props.com,
        'click',
        {
          ...params,
          ...params.data.dataRef,
          x: params.name,
          y: params.value,
        })
    }

    const onDbClick = (params: any) => {
      eventStore.handleSubVariablesChange(
        props.com,
        'dbclick',
        {
          ...params,
          ...params.data.dataRef,
          x: params.name,
          y: params.value,
        })
    }

    let chart

    watch(() => option.value, val => {
      if (val && chart) {
        chart.setOption(val)
      }
    }, { deep: true })

    onMounted(() => {
      nextTick(()=>{
        const dom = document.getElementById(uid)
        chart = echarts.init(dom)
        chart.setOption(option.value)
      })
    })

    return {
      uid,
      wrapperStyle,
      option,
      onClick,
      onDbClick,
    }
  },
})
</script>
