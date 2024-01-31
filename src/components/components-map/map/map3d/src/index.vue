<template>
  <datav-wrapper :attr="com.attr">
    <v-chart
      ref="chartRef"
      autoresize
      :option="option"
      :update-options="updateOptions"
      @mousedown="handleMousedown"
      @mouseup="handleMouseup"
      @click="handleClick"
      @mouseover="handleMouseover"
      @mouseout="handleMouseout"
    />

    <div class="subcoms-box">
      <component
        :is="sc.name"
        v-for="sc in subComs"
        :key="sc.id"
        :com="sc"
      />
    </div>
    <div class="map-bg">
      <div class="bg-line1"></div>
      <div class="bg-line2"></div>
    </div>
  </datav-wrapper>
</template>

<script lang='ts' setup>
import { computed, toRef, ref, shallowRef, onBeforeMount, watch, nextTick } from 'vue'
import 'echarts-gl'
import { useDataCenter, getFieldMap } from '@/components/_mixins/use-data-center'
import { useApiStore } from '@/store/api'
import { useComStore } from '@/store/com'
import { useEventStore } from '@/store/event'
import { Map3d } from './map3d'
import { DatavEChartsComponent } from '@/components/_models/datav-component'
// import { Map3dArea } from './china2d-area/index'
// import { Map3dBubbles } from './china2d-bubbles/index'
// import { Map3dFlyingline, flareIcons } from './china2d-flyingline/index'

import VChart from 'vue-echarts'
import { use, graphic } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { GridComponent, TooltipComponent, GeoComponent, VisualMapComponent } from 'echarts/components'
import { MapChart, EffectScatterChart, LinesChart } from 'echarts/charts'
import { registerMapAsync } from '@/components/_utils/echarts-util'
import Map3dBar from './map3d-bar'
import Map3dFlyingline from './map3d-flyingline'

use([
  CanvasRenderer,
  TooltipComponent,
  GeoComponent,
  VisualMapComponent,
  MapChart,
  EffectScatterChart,
  LinesChart,
])

const props = defineProps<{
  com: Map3d
}>()

const apiStore = useApiStore()
const comStore = useComStore()
const eventStore = useEventStore()
useDataCenter(props.com)

const isLoadMap = ref(false)

const updateOptions = {
  replaceMerge: ['series'],
}

const chartRef = shallowRef(null)
const config = toRef(props.com, 'config')

const dv_data = computed(() => {
  return apiStore.dataMap[props.com.id]?.source ?? {}
})

const dv_field = computed(() => {
  return getFieldMap(props.com.apis.source.fields)
})

const subComs = computed<DatavEChartsComponent[]>(() => {
  return comStore.subComs.filter(c => c.parentId === props.com.id && !c.hided)
})

const chartData = computed(() => {
  const { zoom, center } = config.value.global as any
  const data = Array.isArray(dv_data.value) ? dv_data.value[0] : dv_data.value
  if (data) {
    return {
      zoom: data[dv_field.value.zoom] ?? zoom.value,
      lng: data[dv_field.value.lng] ?? center.lat,
      lat: data[dv_field.value.lat] ?? center.lng,
    }
  }

  return {
    zoom: zoom.value,
    lng: center.lng,
    lat: center.lat,
  }
})

const getSubComData = (comId: string) => {
  return apiStore.dataMap[comId]?.source ?? []
}

const getSubComField = (com: DatavEChartsComponent) => {
  return getFieldMap(com.apis.source.fields)
}

const getTooltipConfig = (subCom: Map3dArea) => {
  const tt = subCom.config.tooltip
  if (tt.show) {
    const tooltip = tt.styleType === 'parent'
      ? config.value.tooltip
      : tt
    const fieldMap = getSubComField(subCom)
    return {
      show: true,
      trigger: 'item',
      triggerOn: tt.eventType,
      textStyle: {
        ...tooltip.textStyle,
        lineHeight: tooltip.lineHeight,
      },
      padding: [
        tooltip.padding.top,
        tooltip.padding.right,
        tooltip.padding.bottom,
        tooltip.padding.left,
      ],
      backgroundColor: tooltip.bgColor,
      borderWidth: 0,
      extraCssText: `border-radius: ${tooltip.borderRadius}px;`,
      formatter: (params: any) => {
        if (tt.infoField && params.data) {
          const txt = params.data[fieldMap.info]
          if (txt) {
            return txt
          }
        }
        const param = Array.isArray(params) ? params[0] : params
        return `名称: ${param.name}<br>数值: ${param.value}`
      },
    }
  }

  return {
    show: false,
  }
}

const get3dBarSerie = (subCom: Map3dBar) => {
  let data = getSubComData(subCom.id)
  const fieldMap = getSubComField(subCom)
  if (Array.isArray(data)) {
    data = data.map(da => {
      return {
        ...da,
        name: da[fieldMap.name],
        value: [da[fieldMap.lon], da[fieldMap.lat], Number.parseFloat(da[fieldMap.value]) * (subCom.config?.scale || 1)],
      }
    })
  }
  return {
    ...subCom.config,
    realisticMaterial: {
      ...subCom.config.realisticMaterial,
      detailTexture: setChartColor(subCom.config.realisticMaterial.detailTexture).image || '',
      ormalTexture: setChartColor(subCom.config.realisticMaterial.ormalTexture).image || '',
    },
    colorMaterial: {
      ...subCom.config.colorMaterial,
      detailTexture: setChartColor(subCom.config.colorMaterial.detailTexture)?.image || '',
    },
    lambertMaterial: {
      ...subCom.config.lambertMaterial,
      detailTexture: setChartColor(subCom.config.lambertMaterial.detailTexture)?.image || '',
    },
    itemStyle: {
      ...subCom.config.itemStyle,
      color: setChartColor(subCom.config.itemStyle.color),
    },
    label: {
      ...subCom.config.label,
      textStyle: {
        ...subCom.config.label.font,
      },
      formatter: parseFormatter(subCom.config?.label?.formatter),
    },
    coordinateSystem: 'geo3D',
    type: 'bar3D',
    data,
  }
}

const getFlyinglinSerie = (subCom: Map3dFlyingline) => {
  let data = getSubComData(subCom.id)
  const fieldMap = getSubComField(subCom)
  if (Array.isArray(data)) {
    data = data.map(da => {
      // return [da[fieldMap.from].split(',').map(v => Number.parseFloat(v)), da[fieldMap.to].split(',').map(v => Number.parseFloat(v))]
      return {
        ...da,
        name: da[fieldMap.name],
        coords: [da[fieldMap.from].split(',').map(v => Number.parseFloat(v)), da[fieldMap.to].split(',').map(v => Number.parseFloat(v))],
        value: 100, //Number.parseFloat(da[fieldMap.value]),
      }
    })
  }
  return {
    data,
    blendMode: 'lighter',
    geo3DIndex: 1,
    polyline: true,
    effect: {
      show: true,
      trailWidth: 1,
      trailOpacity: 0.5,
      trailLength: 0.2,
      constantSpeed: 5,
    },
    lineStyle: {
      width: 2,
      opacity: 1,
    },
    zlevel: 10,
    coordinateSystem: 'geo3D',
    type: 'lines3D',
  }
}

enum map3dSubType {
  柱壮图 = 'VMap3dBar',
  飞线图 = 'VMap3dFlyingline'
}
const option = computed(() => {
  if (!isLoadMap.value) {
    return {}
  }
  let tooltip = { show: false }
  let areaStyle: any = {}
  const series = []

  for (let i = 0, len = subComs.value.length; i < len; i++) {
    const subCom = subComs.value[i]
    if (subCom.name === map3dSubType.柱壮图) {
      series.push(get3dBarSerie(subCom as unknown as Map3dBar))
    } else if (subCom.name === map3dSubType.飞线图) {
      series.push(getFlyinglinSerie(subCom as unknown as Map3dFlyingline))
    }
  }

  const { global } = config.value
  for (let i = 0, len = subComs.value.length; i < len; i++) {
    const subCom = subComs.value[i]
  }
  const opt = {
    backgroundColor: '#0000',
    geo3D: {
      ...parse3dMapConfig(global),
      zlevel: -10,
    },
    tooltip,
    series,
  }
  return opt
})

const commonProcess = (eventName: string, params: any) => {
  for (const subCom of subComs.value) {
    if (subCom.events[eventName]) {
      eventStore.handleSubVariablesChange(subCom.id, eventName,
        {
          ...(params.data ? params.data.dataRef : {}),
          name: params.name,
        })
    }
  }
}

const isMove = ref(false)
const handleMousedown = () => {
  chartRef.value.chart.on('mousemove', () => {
    chartRef.value.chart.off('mousemove')
    if (!isMove.value) {
      isMove.value = true
      const geo = chartRef.value.getOption().geo[0]
      eventStore.handleSubVariablesChange(
        props.com.id,
        'map-move',
        {
          lng: geo.center[0],
          lat: geo.center[1],
          zoom: geo.zoom,
        })
    }
  })
}

const handleMouseup = () => {
  chartRef.value.chart.off('mousemove')
  if (isMove.value) {
    isMove.value = false
    const geo = chartRef.value.getOption().geo[0]
    eventStore.handleSubVariablesChange(
      props.com.id,
      'map-moveend',
      {
        lng: geo.center[0],
        lat: geo.center[1],
        zoom: geo.zoom,
      })
  }
}

const handleClick = (params: any) => {
  commonProcess('click', params)
}

const handleMouseover = (params: any) => {
  commonProcess('mouseover', params)
}

const handleMouseout = (params: any) => {
  commonProcess('mouseout', params)
}

onBeforeMount(async () => {
  await registerMapAsync(config.value.global.map)
  isLoadMap.value = true
})
</script>

<style lang="scss" scoped>
.map-bg {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  transform: rotateX(44deg);
  z-index: -1;

  .bg-line1 {
    position: absolute;
    width: 950px;
    height: 950px;
    border-radius: 50%;
    border-right: 7px solid #0270a536;
    z-index: -1;
    border-left: 7px solid #0270a536;
    border-top: 7px solid transparent;
    border-bottom: 7px solid transparent;
    animation: map-bg-line 4.5s infinite linear;
  }

  .bg-line2 {
    width: 700px;
    height: 700px;
    border-radius: 50%;
    border-right: 12px solid #0000003d;
    z-index: -1;
    border-left: 12px solid #0000003d;
    border-top: 12px solid transparent;
    border-bottom: 12px solid transparent;
    animation: map-bg-line-re 3.5s infinite linear;
  }

  @keyframes map-bg-line {
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(360deg);
    }
  }

  @keyframes map-bg-line-re {
    from {
      transform: rotate(360deg);
    }

    to {
      transform: rotate(0deg);
    }
  }
}
</style>
