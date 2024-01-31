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
import { BarChart, PictorialBarChart } from 'echarts/charts'
import { GridComponent, TooltipComponent, LegendComponent, MarkPointComponent, MarkLineComponent, MarkAreaComponent } from 'echarts/components'
import { useDataCenter, getFieldMap } from '@/components/_mixins/use-data-center'
import { useApiStore } from '@/store/api'
import { useEventStore } from '@/store/event'
import { SingleBar } from './single-bar'

use([
  CanvasRenderer,
  BarChart,
  PictorialBarChart,
  GridComponent,
])

export default defineComponent({
  name: 'VSingleBar',
  components: {
    VChart,
  },
  props: {
    com: {
      type: Object as PropType<SingleBar>,
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

    const option = computed(() => {
      const { generate, series, grid, animation, bgBar, mainBar, global } = config.value
      const data = dv_data.value[dv_field.value.y] || 0
      let opts = {}
      try {
        opts = {
          grid: {
            ...grid,
            left: grid?.isPercentage ? `${grid.left}%` : grid.left,
            right: grid?.isPercentage ? `${grid.right}%` : grid.right,
            top: grid?.isPercentage ? `${grid.top}%` : grid.top,
            bottom: grid?.isPercentage ? `${grid.bottom}%` : grid.bottom,
          },
          tooltip: {
            trigger: 'none',
          },
          xAxis: {
            data: ['百分比'],
            axisTick: {
              show: false,
            },
            axisLine: {
              show: false,
            },
            axisLabel: {
              show: false,
            },
          },
          yAxis: {
            splitLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLine: {
              show: false,
            },
            axisLabel: {
              show: false,
            },
          },
          ...parseAnimation(animation),
          series: [
            {
              name: '最上层立体圆',
              type: 'pictorialBar',
              symbolSize: [global.barWidth, global.symbolSize],
              symbolOffset: [0, -20],
              z: 12,
              itemStyle: {
                color: setChartColor(bgBar.top),
              },
              data: [{
                value: 100,
                symbolPosition: 'end',
              }],
            }, {
              name: '中间立体圆',
              type: 'pictorialBar',
              symbolSize: [global.barWidth, global.symbolSize],
              symbolOffset: [0, -20],
              z: 12,
              itemStyle: {
                color: setChartColor(mainBar.topColor),
              },
              data: [{
                value: data,
                symbolPosition: 'end',
              }],
            }, {
              name: '最底部立体圆',
              type: 'pictorialBar',
              symbolSize: [global.barWidth, global.symbolSize],
              symbolOffset: [0, 20],
              z: 12,
              itemStyle: {
                color: setChartColor(mainBar.bottomColor),
              },
              data: [100 - data],
            }, {
            //底部立体柱
              stack: '1',
              type: 'bar',
              itemStyle: {
                color: setChartColor(mainBar.color),
              },
              label: {
                show: true,
                position: global.position,
                distance: global.distance,
                ...parseChartRichlText(series.map(se => se.config), dv_data.value),
              },
              silent: true,
              barWidth: global.barWidth,
              barGap: '-100%',
              data: [data],
            }, {
            //上部立体柱
              stack: '1',
              type: 'bar',
              itemStyle: {
                normal: {
                  color: setChartColor(bgBar.color),
                },
              },
              silent: true,
              barWidth: 300,
              barGap: '-100%',
              data: [100 - data],
            }],
        }
      } catch (error) {

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
