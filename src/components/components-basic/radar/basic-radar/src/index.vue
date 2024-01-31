<template>
  <div class="datav-wrapper" :style="wrapperStyle">
    <v-chart
      :option="option"
      autoresize
      @click="onClick"
      @dblclick="onDbClick"
    />
  </div>
</template>

<script lang='ts'>
import { defineComponent, PropType, computed, toRef } from 'vue'
import { groupBy } from 'lodash-es'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { RadarChart } from 'echarts/charts'
import { TooltipComponent, LegendComponent } from 'echarts/components'
import { useDataCenter, getFieldMap } from '@/components/_mixins/use-data-center'
import { useApiStore } from '@/store/api'
import { useEventStore } from '@/store/event'
import { BasicRadar } from './basic-radar'

use([
  CanvasRenderer,
  RadarChart,
  TooltipComponent,
  LegendComponent,
])

export default defineComponent({
  name: 'VBasicRadar',
  components: {
    VChart,
  },
  props: {
    com: {
      type: Object as PropType<BasicRadar>,
      required: true,
    },
  },
  setup(props) {
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

    const getSeries = () => {
      const { series, generate, radar } = config.value
      return dv_data.value.map((ite, idx) => {
        let itemObj = {}
        const item = series[idx]?.config || {}

        if (item?.customTheme) {
          itemObj = {
            ...parseItemStyle(item.itemStyle),
            lineStyle: {
              ...parseLineStyle(item.lineStyle),
            },
            areaStyle: {
              ...parseLineStyle(item.areaStyle),
            },
          }
        } else {
          itemObj = {
            ...parseItemStyle(radar.default.itemStyle),
            color: generate.sameColor ? setChartColor(radar.default.itemStyle.color) : generate.color[idx],
          }
        }
        return {
          ...parseSymbolConfig(item),
          ...itemObj,
          label: {
            show: item.label.show,
            ...item.label,
            ...item.label.font,

            formatter: parseFormatter(item?.label?.formatter),
            color: setChartColor(item.label.font.color),
          },
          type: 'radar',
          data: [{
            value: ite?.[dv_field.value.z] || [],
            name: ite?.[dv_field.value.x] || '',
          }],
        }
      })
    }

    const option = computed(() => {
      const { generate, tooltip, global, radar, legend, animation } = config.value
      const opts = {
        color: generate.color,
        textStyle: {
          ...generate.textStyle,
        },
        tooltip: {
          ...parseTooltipConfig(tooltip),
        },
        radar: {
          ...global,
          center: [`${global.center[0]}%`, `${global.center[1]}%`],
          radius: `${global.radius}%`,
          indicator: dv_data.value?.[0]?.[dv_field.value.y].map(v => ({
            name: v,
          })),
          axisLine: {
            ...radar.axisLine,
            lineStyle: parseLineStyle(radar.axisLine.lineStyle),
          },
          axisTick: {
            ...radar.axisTick,
            lineStyle: parseLineStyle(radar.axisTick.lineStyle),
          },
          splitLine: {
            ...radar.splitLine,
            lineStyle: parseLineStyle(radar.splitLine.lineStyle),
          },
          splitArea: {
            ...radar.splitArea,
            areaStyle: parseLineStyle(radar.splitArea.areaStyle),
          },
        },
        legend: parseLegendConfig(legend),
        ...parseAnimation(animation),
        series: getSeries(),
      }
      return opts as any
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

    return {
      wrapperStyle,
      option,
      onClick,
      onDbClick,
    }
  },
})
</script>
