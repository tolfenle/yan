<!--
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-11-23 18:29:07
 * @LastEditTime : 2024-01-19 10:03:40
-->
<script lang='ts'>
import { defineComponent, PropType, computed, toRef } from 'vue'
import { useDataCenter, getFieldMap } from '@/components/_mixins/use-data-center'
import { useApiStore } from '@/store/api'
import { useEventStore } from '@/store/event'
import { Numerical2 } from './numerical2'
import type { CSSProperties } from 'vue'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart, LineChart, PieChart } from 'echarts/charts'

use([
  CanvasRenderer,
  BarChart,
  LineChart,
  PieChart,
])

export default defineComponent({
  name: 'VNumerical2',
  components: {
    VChart,
  },
  props: {
    com: {
      type: Object as PropType<Numerical2>,
      required: true,
    },
  },
  setup(props) {

    if (!props.com.config.animation) {
      props.com.config.animation = useNumberAnimation()
    }

    const apiStore = useApiStore()
    const eventStore = useEventStore()
    useDataCenter(props.com)

    const dv_data = computed(() => {
      return apiStore.dataMap[props.com.id]?.source ?? []
    })

    const dv_field = computed(() => {
      return getFieldMap(props.com.apis.source.fields)
    })

    const fixData = ref([])
    watch(() => dv_data.value, (newVal, oldVal) => {

      fixData.value = newVal ? newVal.map((da, index) => {
        return {
          ...da,
          title: da[dv_field.value.title],
          oldCount: oldVal?.[index]?.[dv_field.value.count] || 0,
          count: da[dv_field.value.count],
          suffix: da[dv_field.value.suffix],
        }
      }) : []
    })

    const config = toRef(props.com, 'config')
    const attr = toRef(props.com, 'attr')

    const wrapperStyle = computed(() => {
      const { gap, width } = config.value.generate
      return {
        width: `${attr.value.w}px`,
        height: `${attr.value.h}px`,
        display: 'grid',
        gridTemplateColumns: `repeat(auto-fill, ${useNumberToPx(width)})`,
        columnGap: useNumberToPx(gap[0]),
        rowGap: useNumberToPx(gap[1]),
      }
    })

    const option = computed(() => {
      const opts = {
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


    const handComputedEvent = index => {
      const usedEvents = config.value.event.filter(ev => ev.use)
      let __config = null
      usedEvents.forEach(ev => {
        if (checkOperator(dv_data.value[index]?.[ev.key1], ev.operator, ev.static ? ev.value : dv_data.value[index]?.[ev.key2])) {
          __config = ev.config
          return
        }
      })
      return __config
    }

    const len = computed(() => config.value.series.length - 1)

    const getNumericalStyle = index => {
      const __config = handComputedEvent(index)

      const item = config.value.series?.[index] || config.value.series?.[len.value - 1 || 0]
      const mixStyle = { ...config.value.generate, background: __config ? __config.background : item?.config.background || config.value.generate.background }

      const { vAlign, hAlign, padding, radius, background, width, height } = mixStyle
      const chart = { ...config.value.chart, ...item?.config?.chart }
      return {
        alignItems: hAlign,
        justifyContent: vAlign,
        padding: useNumberToPx(padding).join(' '),
        borderRadius: useNumberToPx(radius).join(' '),
        flexDirection: chart.type === 'pie' ? 'row' : 'column',
        width: useNumberToPx(width),
        height: useNumberToPx(height),
        ...setChartColor(background) as any,
        backgroundSize: 'cover',
      } as CSSProperties
    }
    const getItemTitleStyle = index => {
      const __config = handComputedEvent(index)
      const item = config.value.series?.[index] || config.value.series?.[len.value - 1 || 0]
      const mixStyle = __config ? __config.labelFont : { ...config.value.labelFont, ...(item?.config?.labelFont || {}) }
      const { fontSize, fontWeight, fontFamily, fontStyle, color } = mixStyle
      const { labelGap, labelTb, hAlign } = config.value.generate
      return {
        marginTop: labelTb === 'label-top' ? 0 : useNumberToPx(labelGap),
        marginBottom: labelTb === 'label-top' ? useNumberToPx(labelGap) : 0,
        fontSize: useNumberToPx(fontSize),
        fontWeight,
        fontFamily,
        fontStyle,
        textAlign: hAlign,
        ...setChartColor(color) as any,
      } as CSSProperties
    }
    const getItemNumStyle = index => {
      const __config = handComputedEvent(index)
      const item = config.value.series?.[index] || config.value.series?.[len.value - 1 || 0]
      const mixStyle = __config ? __config.numberFont : { ...config.value.numberFont, ...(item?.config?.numberFont || {}) }
      const { fontSize, fontWeight, fontFamily, fontStyle, color } = mixStyle
      const { vAlign } = config.value.generate
      return {
        fontSize: useNumberToPx(fontSize),
        fontWeight,
        fontFamily,
        fontStyle,
        alignItems: vAlign,
        ...setChartColor(color) as any,
      } as CSSProperties
    }
    const contentStyle = computed(() => {
      const { labelTb } = config.value.generate
      return {
        flexDirection: glLabelOpt[labelTb],
      } as CSSProperties
    })
    const getItemSuffixStyle = index => {
      const __config = handComputedEvent(index)
      const item = config.value.series?.[index] || config.value.series?.[len.value - 1 || 0]
      const mixStyle = __config ? __config.suffix.font : { ...config.value.suffix.font, ...item?.config?.suffix?.font }
      const { fontSize, fontWeight, fontFamily, fontStyle, color } = mixStyle

      return {
        fontSize: useNumberToPx(fontSize),
        fontWeight,
        fontFamily,
        fontStyle,
        color: setChartColor(color) as any,
      } as CSSProperties
    }

    const { setUrl } = useEnvUrl()

    const getIcon = index => {
      const __config = handComputedEvent(index)
      const icon = __config ? __config.range.icon : config.value.series?.[index]?.config?.range.icon || config.value.range.icon
      const { url, style } = icon

      const __style: CSSProperties = {
        ...style,
        color: setChartColor(style.color),
        fontSize: useNumberToPx(style.fontSize),
      } as any

      return {
        url,
        style: __style,
      }
    }

    const getOption = (item, index) => {
      const __config = handComputedEvent(index)
      const chart = __config ? __config.chart : config.value.series?.[index]?.config?.chart || config.value.chart

      if (['bar', 'line', 'area', 'pie'].includes(chart.type)) {
        const area = chart.type === 'area' ? {
          areaStyle: {
            opacity: 0.5,
          },
        } : {}
        return {
          grid: {
            left: 0,
            right: 0,
            bottom: 0,
            top: 8,
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            show: false,
          },
          yAxis: {
            show: false,
            type: 'value',
          },
          series: [
            {
              data: item[dv_field.value.data],
              type: chart.type === 'area' ? 'line' :  chart.type,
              barWidth: chart.width,
              itemStyle: {
                color: setChartColor(chart.color),
              },
              labelLine: {
                show: false,
              },
              label: {
                show: false,
              },
              lineStyle: {
                color: setChartColor(chart.color),
                width: chart.width,
              },
              ...area,
            },
          ],
        }
      }
    }

    return {
      config,
      fixData,
      wrapperStyle,
      option,
      dv_data,
      dv_field,
      onClick,
      onDbClick,
      contentStyle,
      getItemNumStyle,
      getItemTitleStyle,
      getItemSuffixStyle,
      getNumericalStyle,
      setUrl,
      getIcon,
      getOption,
    }
  },
})
</script>

<template>
  <div class="datav-wrapper" :style="wrapperStyle">
    <template v-for="(item, index) in fixData" :key="index">
      <div class="numerical2-card" :style="getNumericalStyle(index)">
        <div class="content" :style="contentStyle">
          <p class="title" :style="getItemTitleStyle(index)">
            {{ item.title }}
            <span class="range" :style="getIcon(index).style">
              {{ item[dv_field.range] }}%
              <i :class="`ik-118-datav ik-118-datav-${getIcon(index).url}`"></i>
            </span>
          </p>
          <div class="count" :style="getItemNumStyle(index)">
            <GlNumberAnimation :animation="config.animation" :item="item" />
            <p class="suffix" :style="getItemSuffixStyle(index)">{{ item.suffix }}</p>
          </div>
        </div>
        <div class="chart">
          <v-chart
            :option="getOption(item, index)"
            autoresize
          />
        </div>
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.numerical2-card {
  display: flex;
  overflow: hidden;
  height: 100%;
  width: 100%;

  .chart {
    height: 100%;
    width: 100%;
  }

  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;

    .title {
      display: flex;
      justify-content: space-between;

      .range {
        display: flex;
        align-items: center;

        i {
          margin-left: 6px;
          font-size: 100%;
        }
      }
    }

    .count {
      display: flex;
      align-items: baseline;
    }
  }
}
</style>
