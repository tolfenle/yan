<!--
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2024-01-12 09:34:46
 * @LastEditTime : 2024-01-29 19:11:54
-->
<template>
  <div class="datav-wrapper" :style="wrapperStyle">
    <HightchartsVue ref="highchartsRef" :options="option" :style="wrapperStyle" />
  </div>
</template>

<script lang='ts' setup>
import { computed, toRef } from 'vue'
import { useDataCenter, getFieldMap } from '@/components/_mixins/use-data-center'
import { useApiStore } from '@/store/api'
import { parseD3PublicConfig } from '../../d3-config'
import { D3Bars } from './d3-bars'

const props = defineProps<{
  com: D3Bars
}>()

const apiStore = useApiStore()
useDataCenter(props.com)

const highchartsRef = ref(null)

const config = toRef(props.com, 'config')
const attr = toRef(props.com, 'attr')

const dv_data = computed(() => {
  return apiStore.dataMap[props.com.id]?.source ?? []
})

const dv_field = computed(() => {
  return getFieldMap(props.com.apis.source.fields)
})

const wrapperStyle = computed(() => {
  return {
    width: `${attr.value.w}px`,
    height: `${attr.value.h}px`,
  }
})

const option = computed(() => {
  const { chart, title, subtitle, legend, tooltip, plotOptions, generate, xAxis, yAxis } = config.value
  const opt = {
    credits: {
      // 版权信息
      enabled: false,
    },
    chart: {
      type: 'column',
      backgroundColor: 'transparent',
      margin: chart.margin,
      shadow: chart.shadow,
      options3d: {
        ...chart.options3d,
      },
    },
    title: title.show ? {
      ...title,
      style: {
        ...title.style,
        color: setChartColor(title.style.color),
      },
    } : { text: '' },
    subtitle: subtitle.show ? {
      ...subtitle,
      style: {
        color: setChartColor(subtitle.style.color),
      },
    } : { text: '' },
    legend: {
      ...legend,
      itemStyle: {
        ...legend.itemStyle,
        color: setChartColor(legend.itemStyle.color),
      },
    },
    tooltip: {
      ...tooltip,
      backgroundColor: tooltip.backgroundColor.custom
        ? setChartColor(tooltip.backgroundColor.value)
        : '#e5e5e5c7',
      borderColor: tooltip.borderColor.custom
        ? setChartColor(tooltip.borderColor.value)
        : undefined,
      style: {
        color: setChartColor(tooltip?.style?.color), // 设置字体颜色为白色
      },
    },
    plotOptions: {
      column: {
        depth: plotOptions.column.depth || null,
        pointWidth: plotOptions.column.pointWidth || null,
      },
      series: {
        dataLabels: {
          ...plotOptions.series.dataLabels,
          formatter: function () {
            const func = new Function('data', plotOptions.series.dataLabels.formatter)
            return func(this)
          },
          style: {
            ...plotOptions.series.dataLabels.style,
            color: setChartColor(plotOptions.series.dataLabels.style.color),
          },
        },
      },
    },
    xAxis: {
      ...parseD3PublicConfig(xAxis),
      categories: dv_data.value?.[dv_field.value.x],
    },
    yAxis: {
      ...parseD3PublicConfig(yAxis),
    },
    series: dv_data.value?.[dv_field.value.y]?.map((item, idx) => {
      return {
        name: dv_data.value?.[dv_field.value.z]?.[idx] || '',
        data: item,
        color: generate.color[idx] || generate.color[generate.color.length - 1],
      }
    }),
  }
  return opt
})

watch(
  () => attr.value,
  val => {
    highchartsRef.value?.chart?.setSize(val.w, val.h)
  },
  { deep: true },
)

onMounted(() => {
  if (highchartsRef.value?.chart?.chartHeight) {
    highchartsRef.value.chart.chartHeight = attr.value.h
  }
  highchartsRef.value?.chart?.setSize(attr.value.w, attr.value.h)
})

</script>
