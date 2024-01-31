<!--
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-11-23 12:17:00
 * @LastEditTime : 2024-01-10 18:45:02
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
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart  } from 'echarts/charts'
import { TitleComponent } from 'echarts/components'
import { useDataCenter, getFieldMap } from '@/components/_mixins/use-data-center'
import { useApiStore } from '@/store/api'
import { useEventStore } from '@/store/event'
import { BasicPercent } from './basic-percent'

use([
  CanvasRenderer,
  BarChart,
  TitleComponent,
])

export default defineComponent({
  name: 'VBasicPercent',
  components: {
    VChart,
  },
  props: {
    com: {
      type: Object as PropType<BasicPercent>,
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

    const option = computed(() => {
      const { title, shadow, shadow2, generate, itemStyle, color2 } = config.value
      const { textStyle, textSuffix, textSuffixStyle, subtextStyle, preffix, subtextSuffix } = title

      const position = parseTitlePosition(title)
      return {
        title: {
          text: `{a|${dv_data.value[dv_field.value.y]}} {b|${textSuffix}}`,
          textStyle: {
            rich: {
              a: {
                ...textStyle,
                color: setChartColor(textStyle.color),
              },
              b: {
                ...textSuffixStyle,
                color: setChartColor(textSuffixStyle.color),
              },
            },
          },
          subtext: `{c|${preffix}${dv_data.value[dv_field.value.x]}${subtextSuffix}}`,
          subtextStyle: {
            rich: {
              c: {
                ...subtextStyle,
                color: setChartColor(subtextStyle.color),
              },
            },
          },
          itemGap: title.itemGap, // 主副标题距离
          ...position,
        },
        angleAxis: {
          max: dv_data.value[dv_field.value.z] ?? 100, // 满分
          clockwise: true, // 逆时针
          // 隐藏刻度线
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
          splitLine: {
            show: false,
          },
        },
        radiusAxis: {
          type: 'category',
          // 隐藏刻度线
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
          splitLine: {
            show: false,
          },
        },
        polar: {
          center: [`${generate.center?.[0]}%`, `${generate.center?.[1]}%`],
          radius: `${generate.radius}%`, //图形大小
        },
        series: [{
          type: 'bar',
          data: [{
            name: dv_data.value[dv_field.value.x],
            value: dv_data.value[dv_field.value.y],
            itemStyle: parseItemStyle(itemStyle),
          }],
          coordinateSystem: 'polar',
          roundCap: generate.roundCap,
          barWidth: generate.barWidth,
          barGap: '-100%', // 两环重叠
          z: 2,
        },{ // 灰色环
          type: 'bar',
          data: [{
            value: dv_data.value[dv_field.value.z] ?? 100,
            itemStyle: {
              color: setChartColor(color2),
              ...shadow2,
              shadowColor: setChartColor(shadow2.shadowColor),
            },
          }],
          coordinateSystem: 'polar',
          roundCap: generate.roundCap,
          barWidth: generate.barWidth,
          barGap: '-100%', // 两环重叠
          z: 1,
        }],
      }
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
