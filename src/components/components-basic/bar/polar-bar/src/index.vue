<!--
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-11-16 14:09:00
 * @LastEditTime : 2023-11-21 12:09:02
-->
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
import { use, graphic } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart } from 'echarts/charts'
import { TooltipComponent, LegendComponent, PolarComponent } from 'echarts/components'
import { useDataCenter, getFieldMap } from '@/components/_mixins/use-data-center'
import { useApiStore } from '@/store/api'
import { useEventStore } from '@/store/event'
import { PolarBar } from './polar-bar'

use([
  CanvasRenderer,
  BarChart,
  PolarComponent,
  TooltipComponent,
  LegendComponent,
])

export default defineComponent({
  name: 'VPolarBar',
  components: {
    VChart,
  },
  props: {
    com: {
      type: Object as PropType<PolarBar>,
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
      const { global, generate, bar, radiusAxis, angleAxis, tooltip, grid, animation } = config.value
      const parseGlobal = parsePolarConfig(global)
      const opts = {
        color: generate.color,
        textStyle: {
          ...generate.textStyle,
        },
        polar: {
          radius: parseGlobal.radius,
          center: parseGlobal.center,
        },
        angleAxis: {
          ...parseAngleAxisConfig(angleAxis),
          max: parseGlobal.max,
          startAngle: parseGlobal.startAngle,
          clockwise: parseGlobal.clockwise,
        },
        radiusAxis: {
          ...parseRadisAxisConfig(radiusAxis),
          type: 'category',
          data: dv_data.value.map(dv => dv[dv_field.value.x]),
        },
        tooltip: {
          ...parseTooltipConfig(tooltip),
        },
        ...parseAnimation(animation),
        series: {
          type: 'bar',
          ...parseBarConfig(bar),
          ...parseBarPubConfig(bar),

          data: dv_data.value.map((dv, index) => {
            return {
              value: dv[dv_field.value.y],
              itemStyle: {
                color: generate.sameColor ? setChartColor(config.value.bar.itemStyle.color.value) : generate.color[index],
              },
            }
          }),
          coordinateSystem: 'polar',
        },
      }
      changeBarToLineBar(generate.changeXY, opts.radiusAxis, opts.angleAxis)
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
