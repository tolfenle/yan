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
import { PieChart } from 'echarts/charts'
import { GridComponent, TooltipComponent, LegendComponent  } from 'echarts/components'
import { useDataCenter, getFieldMap } from '@/components/_mixins/use-data-center'
import { useApiStore } from '@/store/api'
import { useEventStore } from '@/store/event'
import { CircleRosePie } from './circle-rose-pie'

use([
  PieChart,
  CanvasRenderer,
  GridComponent,
  TooltipComponent,
  LegendComponent,
])

export default defineComponent({
  name: 'VCircleRosePie',
  components: {
    VChart,
  },
  props: {
    com: {
      type: Object as PropType<CircleRosePie>,
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

    const chartData = computed(() => {
      const groups = groupBy(dv_data.value, item => item[dv_field.value.x])
      return {
        keys: Object.keys(groups),
        values: Object.values(groups),
      }
    })

    const checkPersent = val => {
      return val?.isPersent ? [`${val?.value?.[0]}%`, `${val?.value?.[1]}%`] : val?.value
    }

    const option = computed(() => {
      const { generate, tooltip, legend, grid, pie, animation } = config.value
      if((generate.isCircle && !generate.radius?.[0]) || !generate.isCircle)
        changePieToCircle(generate, generate.isCircle)

      const __config = parseChartPie(pie)
      const { label, labelLine } = parseNotnullLabel(__config)
      const opts = {
        color: generate.color,
        textStyle: {
          ...generate.textStyle,
        },
        tooltip: {
          ...parseTooltipConfig(tooltip),
        },
        legend: parseLegendConfig(legend),
        ...parseAnimation(animation),
        series: [{
          ...__config,
          ...label,
          ...labelLine,
          roseType: __config.roseType,
          itemStyle: __config.itemStyle,
          left: grid?.isPercentage ? `${grid.left}%` : grid.left,
          right: grid?.isPercentage ? `${grid.right}%` : grid.right,
          top: grid?.isPercentage ? `${grid.top}%` : grid.top,
          bottom: grid?.isPercentage ? `${grid.bottom}%` : grid.bottom,
          center: checkPersent(generate.center),
          radius: [`${generate.radius?.[0]}%`, `${generate.radius?.[1]}%`],
          data: dv_data.value.map(v => ({
            ...v,
            value: v[dv_field.value.y],
            name: v[dv_field.value.x],
          })),
          type: 'pie',
        }],
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
