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
import { BarChart } from 'echarts/charts'
import { GridComponent, TooltipComponent, LegendComponent, MarkPointComponent, MarkLineComponent, MarkAreaComponent } from 'echarts/components'
import { useDataCenter, getFieldMap } from '@/components/_mixins/use-data-center'
import { useApiStore } from '@/store/api'
import { useEventStore } from '@/store/event'
import { BasicBar } from './basic-bar'

use([
  CanvasRenderer,
  BarChart,
  GridComponent,
  TooltipComponent,
  LegendComponent,
  MarkPointComponent, MarkLineComponent, MarkAreaComponent,
])

export default defineComponent({
  name: 'VBasicBar',
  components: {
    VChart,
  },
  props: {
    com: {
      type: Object as PropType<BasicBar>,
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

    const getSeries = bar => {
      const { series, generate } = config.value
      const { values } = chartData.value
      return series.map((item, idx) => {

        let itemObj = {}
        if (item.config.customTheme) {
          itemObj = {
            ...parseBarConfig(item.config),
            ...parseBarPubConfig(bar),
          }
        } else {
          itemObj = {
            ...parseBarConfig(bar),
            ...parseBarPubConfig(bar),
          }
        }

        return {
          type: item.type,
          name: item.name,
          ...itemObj,
          data: values.map((v, inde) => {
            const obj = v[idx]
            return {
              value: obj ? obj[dv_field.value.y] : null,
              dataRef: obj ?? {},
              itemStyle: {
                color: generate.sameColor ? setChartColor(config.value.bar.itemStyle.color.value) : generate.color[inde],
              },
            }
          }),
        }
      })
    }

    const option = computed(() => {
      const { generate, xAxis, yAxis, tooltip, legend, grid, bar, animation } = config.value
      const tipConfig = parseTooltipConfig(tooltip)
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
        tooltip: tipConfig,
        legend: parseLegendConfig(legend),
        xAxis: {
          ...parseXaxisConfig(xAxis, generate),
          data: chartData.value.keys,
        },
        yAxis: {
          ...parseYaxisConfig(yAxis, generate),
        },
        ...parseAnimation(animation),
        series: getSeries(bar),
      }
      changeBarToLineBar(generate.changeXY, opts.xAxis, opts.yAxis)
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
