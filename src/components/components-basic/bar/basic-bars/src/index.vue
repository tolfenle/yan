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
import { groupBy, cloneDeep } from 'lodash-es'
import VChart from 'vue-echarts'
import { use, graphic } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart } from 'echarts/charts'
import { GridComponent, TooltipComponent, LegendComponent } from 'echarts/components'
import { useDataCenter, getFieldMap } from '@/components/_mixins/use-data-center'
import { useApiStore } from '@/store/api'
import { useEventStore } from '@/store/event'
import { BasicBars } from './basic-bars'

use([
  CanvasRenderer,
  BarChart,
  GridComponent,
  TooltipComponent,
  LegendComponent,
])

export default defineComponent({
  name: 'VBasicBars',
  components: {
    VChart,
  },
  props: {
    com: {
      type: Object as PropType<BasicBars>,
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
      const { series, generate } = config.value
      return (cloneDeep(dv_data.value[0]))?.splice(1).map((dv, index) => {
        const item = series[index] || {}
        let itemObj: any = {}
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
          ...itemObj,
          type: item.type,
          name: dv,
          dataRef: item ?? {},
          itemStyle: {
            ...itemObj.itemStyle,
            color: generate.sameColor ? setChartColor(config.value.bar.itemStyle.color.value) : itemObj.itemStyle.color || generate.color[index],
          },
        }
      })
    }

    const option = computed(() => {
      const { generate, xAxis, yAxis, tooltip, legend, grid, bar, animation } = config.value
      const barConfig = parseBarConfig(bar) as any
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
        },
        yAxis: {
          ...parseYaxisConfig(yAxis, generate),
        },
        ...barConfig,
        barGap: `${barConfig.barGap}%`,
        barCategoryGap: `${barConfig.barCategoryGap}%`,
        ...parseAnimation(animation),
        dataset: {
          source: dv_data.value,
        },
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
