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
import * as echarts from 'echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart, LineChart, PieChart, ParallelChart, PictorialBarChart } from 'echarts/charts'
import { GridComponent, TooltipComponent, LegendComponent, MarkPointComponent, MarkLineComponent, MarkAreaComponent } from 'echarts/components'
import { useDataCenter, getFieldMap } from '@/components/_mixins/use-data-center'
import { useApiStore } from '@/store/api'
import { useEventStore } from '@/store/event'
import { PowerChart } from './power-chart'

use([
  CanvasRenderer,
  BarChart,
  LineChart,
  PieChart,
  ParallelChart,
  PictorialBarChart,
  GridComponent,
  TooltipComponent,
  LegendComponent,
  MarkPointComponent, MarkLineComponent, MarkAreaComponent,
])

export default defineComponent({
  name: 'VPowerChart',
  components: {
    VChart,
  },
  props: {
    com: {
      type: Object as PropType<PowerChart>,
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


    const getSeries = bar => {
    }

    const option = computed(() => {
      const { generate, xAxis, yAxis, bar, line, tooltip, legend, grid, animation, custom } = config.value

      const itemObj = {
        ...parseBarConfig(bar),
        ...parseBarPubConfig(bar),
        ...parseChartLineConfig(line),
      }
      delete itemObj.type

      const func = new Function('param','echarts', `${custom.code}; ${custom.code ? 'return option || options || {}' : ''}`)
      const opt = func({ data: dv_data.value, color: generate.color, textStyle: generate.textStyle }, echarts) || {}

      const opts = {
        color: generate.color,
        textStyle: {
          ...generate.textStyle,
        },
        // ...itemObj,
        ...opt,
        grid: {
          ...grid,
          left: grid?.isPercentage ? `${grid.left}%` : grid.left,
          right: grid?.isPercentage ? `${grid.right}%` : grid.right,
          top: grid?.isPercentage ? `${grid.top}%` : grid.top,
          bottom: grid?.isPercentage ? `${grid.bottom}%` : grid.bottom,
        },
        // tooltip: {
        //   ...parseTooltipConfig(tooltip),
        // },
        legend: parseLegendConfig(legend),
        xAxis: {
          ...parseXaxisConfig(xAxis, generate),
          ...opt?.xAxis,
        },
        yAxis: {
          ...parseYaxisConfig(yAxis, generate),
          ...opt?.yAxis,
        },
        ...parseAnimation(animation),
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
