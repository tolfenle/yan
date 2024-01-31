<!--
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2024-01-12 09:34:46
 * @LastEditTime : 2024-01-26 17:04:58
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
import { D3PieCircle } from './d3-pie-circle'

const props = defineProps<{
  com: D3PieCircle
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
  const { center } = config.value.global
  const { chart, title, subtitle, legend, tooltip, plotOptions, generate } = config.value

  return {
    credits: {
      // 版权信息
      enabled: false,
    },
    chart: {
      type: 'pie',
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
      pie: {
        ...plotOptions.pie,
        innerSize: `${plotOptions.pie.innerSize}%`,
        dataLabels: {
          ...plotOptions.pie.dataLabels,
          color: setChartColor(plotOptions.pie.dataLabels.color),
          style: {
            color: setChartColor(chart.label.color),
            ...chart.label,
          },
        },
        center: [`${center?.x || 50}% ${center?.y || 50}%`],
      },
    },
    series: [
      {
        type: 'pie',
        name: '',
        data: dv_data.value?.map((item, idx) => {
          return {
            name: item[dv_field.value.x] || '',
            y: item[dv_field.value.y],
            color: generate.color[idx] || generate.color[generate.color.length - 1],
          }
        }),
      },
    ],
  }
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
