<template>
  <div class="datav-wrapper" :style="wrapperStyle">
    <v-chart
      :option="option"
      autoresize
      @click="onClick"
    />
  </div>
</template>

<script lang='ts' setup>
import { PropType, computed, toRef } from 'vue'
import { groupBy } from 'lodash-es'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { LineChart } from 'echarts/charts'
import { GridComponent, TooltipComponent, LegendComponent } from 'echarts/components'
import { useDataCenter, getFieldMap } from '@/components/_mixins/use-data-center'
import { useApiStore } from '@/store/api'
import { useEventStore } from '@/store/event'
import { BasicLine } from './basic-line'

use([
  CanvasRenderer,
  LineChart,
  GridComponent,
  TooltipComponent,
  LegendComponent,
])

const props = defineProps({
  com: {
    type: Object as PropType<BasicLine>,
    required: true,
  },
})

const apiStore = useApiStore()
const eventStore = useEventStore()
useDataCenter(props.com)

const dv_data = computed(() => {
  return apiStore.dataMap[props.com.id]?.source ?? {}
})

const dv_field = computed(() => {
  return getFieldMap(props.com.apis.source.fields)
})

const config = toRef(props.com, 'config')
const attr = toRef(props.com, 'attr')

const wrapperStyle = computed(() => {
  return {
    transform: 'translateZ(0)',
    width: `${attr.value.w}px`,
    height: `${attr.value.h}px`,
  }
})

const getSeries = () => {
  const nameData = dv_data.value?.[dv_field.value.x]
  const valueData = dv_data.value?.[dv_field.value.s]
  const { generate, series, line } = config.value
  return nameData?.map((dataName, idx) => {
    const item = series[idx] ?? series[series.length - 1]
    let itemObj: any = {}
    if (item.config.customTheme) {
      itemObj = parseChartLineConfig(item.config)
    } else {
      const parseObj = parseChartLineConfig(line)
      itemObj = {
        ...parseObj,
        step: generate.step,
        smooth: generate.smooth,
        connectNulls: generate.connectNulls,
        lineStyle: {
          ...parseObj.lineStyle,
          color: generate.color[idx],
        },
      }
    }

    return {
      textStyle: generate.textStyle,
      type: item.type,
      name: dataName || item.name,
      ...itemObj,
      data: valueData?.[idx],
    }
  })
}

const option = computed(() => {
  const { generate, xAxis, yAxis, tooltip, legend, grid, line, animation } = config.value

  const opts = {
    color: generate.color,
    textStyle: {
      ...generate.textStyle,
    },
    grid: {
      ...grid,
      left: grid?.isPercentage ? `${grid.left}%` : grid.left,
      right: grid?.isPercentage ? `${grid.right}%` : grid.right,
      top: grid?.isPercentage ? `${grid.top}%` : grid.top,
      bottom: grid?.isPercentage ? `${grid.bottom}%` : grid.bottom,
    },
    tooltip: {
      ...parseTooltipConfig(tooltip),
    },
    legend: parseLegendConfig(legend),
    xAxis: {
      ...parseXaxisConfig(xAxis, generate),
      data: dv_data.value?.[dv_field.value.y],
    },
    yAxis: {
      ...parseYaxisConfig(yAxis as any, generate),
    },
    ...parseAnimation(animation),
    series: getSeries(),
  }
  return opts as any
})

const onClick = (params: any) => {
  eventStore.handleSubVariablesChange(
    props.com.id,
    'click',
    {
      ...params.data.dataRef,
      x: params.name,
      y: params.value,
      s: params.seriesName,
    })
}

</script>
