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
import { cloneDeep, groupBy } from 'lodash-es'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { ScatterChart } from 'echarts/charts'
import { GridComponent, TooltipComponent, LegendComponent } from 'echarts/components'
import { useDataCenter, getFieldMap } from '@/components/_mixins/use-data-center'
import { useApiStore } from '@/store/api'
import { useEventStore } from '@/store/event'
import { BasicScatters } from './basic-scatters'

use([
  CanvasRenderer,
  ScatterChart,
  GridComponent,
  TooltipComponent,
  LegendComponent,
])

const props = defineProps({
  com: {
    type: Object as PropType<BasicScatters>,
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

const chartData = computed(() => {
  return groupBy(dv_data.value, item => item[dv_field.value.s])
})

const xAxisData = computed(() => {
  return groupBy(dv_data.value, item => item[dv_field.value.x])
})

const getSeries = () => {
  const { scatter, xAxis, generate } = config.value
  const ys = dv_data.value?.[dv_field.value.y]
  const title: any[] = []
  const singleAxis: any[] = []
  const series: any[] = []
  const axConfig = cloneDeep(parseXaxisConfig(xAxis, generate))
  if (!axConfig?.axisLine?.show) {
    axConfig.axisLine = {
      lineStyle: {
        width: 0,
      },
    }
  } else {
    if (!axConfig?.axisLine?.lineStyle?.width) {
      axConfig.axisLine.lineStyle.width = 1
    }
  }

  ys?.forEach((item, index) => {
    title.push({
      textBaseline: 'middle',
      top: `${((index + 0.5) * config.value.title.scale) / 7  }%`,
      text: item,
      textStyle: {
        ...config.value.title.font,
        color: setChartColor(config.value.title.font.color),
      },
    })

    singleAxis.push({
      left: config.value.title.left,
      type: 'category',
      ...axConfig,
      boundaryGap: false,
      data: dv_data.value?.[dv_field.value.x],
      top: `${(index * config.value.title.scale) / 7 + 5  }%`,
      height: `${config.value.title.scale / 7 - 10  }%`,
    })

    series.push({
      singleAxisIndex: index,
      coordinateSystem: 'singleAxis',
      type: scatter.type,
      data: [],
      ...parseScatterConfig(config.value.scatter),
      symbolSize: function (dataItem) {
        return dataItem[1] * scatter.scale
      },
    })
  })

  dv_data.value?.[dv_field.value.z]?.forEach((item, index) => {
    series[index].data = item.map((i, idx) => [idx, i])
  })
  return {
    title,
    singleAxis,
    series,
  }
}

const option = computed(() => {
  const { generate, tooltip, animation } = config.value
  const opts = {
    color: generate.color,
    textStyle: {
      ...generate.textStyle,
    },
    tooltip: {
      ...parseTooltipConfig(tooltip),
    },
    ...parseAnimation(animation),
    ...getSeries(),
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
