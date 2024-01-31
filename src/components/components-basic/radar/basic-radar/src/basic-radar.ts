/*
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-10-31 11:13:00
 * @LastEditTime : 2023-12-06 10:42:28
 */
import { DatavEChartsComponent, DatavChartSeries } from '@/components/_models/datav-component'
import {
  ApiConfigMap, ApiDataConfigMap,
  setApiConfig, setApiData,
} from '@/components/_models/data-source'
import { createField } from '@/components/_models/data-field'
import { DataEventConfig } from '@/components/_models/data-event'
import { getStaticData } from '@/api/data'
import { EChartEasing } from '@/components/_models/echarts-animation'
import { _ } from 'iking-utils'
const colorList = glThemeList[0]

const useDefaultConfig = (param = {}) => {
  return {
    ...useSymbolConfigFunc(),
    label: {
      ...useChartBaseLabel(),
    },
    itemStyle: {
      ...chartItemStyle,
      color: useChartColor({ value: colorList[0] }),
    },
    lineStyle: {
      ...chartLineStyle,
      color: useChartColor({ value: colorList[0] }),
    },
    areaStyle: {
      ...chartLineStyle,
      color: useChartColor({ value: 'rgba(0,0,0,0)' }),
    },
    ...param,
  }
}


export class BasicRadarSeries extends DatavChartSeries {
  constructor(name: string) {
    super('radar', name)
  }

  config = {
    customTheme: false,
    ..._.cloneDeep(useDefaultConfig()),
  }
}

/**
 * BasicRadar
 */
export class BasicRadar extends DatavEChartsComponent {
  config = {
    generate: {
      ..._.cloneDeep(useGenerateConfig()),
      sameColor: false,
    },
    quickly: [],
    global: {
      fontFamily: 'Microsoft Yahei',
      center: [50, 50],
      radius: 75,
      startAngle: 90,
      nameGap: 5,
      splitNumber: 5,
      shape: 'polygon', // polygon  circle
      scale: false,
    },
    radar: {
      axisLine: {
        show: true,
        lineStyle: {
          ...chartLineStyle,
          color: useChartColor({ value: 'rgba(45, 45, 45, 0.32)' }),
        },
      },
      axisTick: {
        show: true,
        length: 5,
        lineStyle: {
          ...chartLineStyle,
          color: useChartColor({ value: 'rgba(45, 45, 45, 0.32)' }),
        },
      },
      splitLine: {
        show: true,
        lineStyle: {
          ...chartLineStyle,
          color: [useChartColor({ value: 'rgba(45, 45, 45, 0.32)' }), useChartColor({ value: 'rgba(45, 45, 45, 0.55)' })],
        },
      },
      splitArea: {
        show: true,
        areaStyle: {
          ...chartLineStyle,
          color: [useChartColor({ value: 'rgba(45, 45, 45, 0.32)' }), useChartColor({ value: 'rgba(45, 45, 45, 0.55)' })],
        },
      },
      default: {
        itemStyle: {
          ...chartItemStyle,
          color: useChartColor({ value: colorList[0] }),
        },
        areaStyle: {
          ...chartLineStyle,
          color: useChartColor({ value: '#eee' }),
        },
      },
    },
    label: {
      show: false,
      position: 'top',
      textStyle: {
        fontSize: 12,
        color: 'rgba(255, 255, 255, 0.6)',
        fontWeight: 'normal',
      },
      offsetX: 0,
      offsetY: 0,
    },
    tooltip: _.cloneDeep(tooltipConfig),
    legend: _.cloneDeep(chartLegendConfig),
    series: [new BasicRadarSeries('系列1', {
      itemStyle: {
        ...chartItemStyle,
        color: useChartColor({ value: colorList[0] }),
      },
      lineStyle: {
        ...chartLineStyle,
        color: useChartColor({ value: colorList[0] }),
      },
    }), new BasicRadarSeries('系列2', {
      itemStyle: {
        ...chartItemStyle,
        color: useChartColor({ value: colorList[4] }),
      },
      lineStyle: {
        ...chartLineStyle,
        color: useChartColor({ value: colorList[4] }),
      },
    })],
    animation: _.cloneDeep(useChartAnimationConfig()),
  } as any

  apis: Partial<ApiConfigMap>
  apiData: Partial<ApiDataConfigMap>
  events: Record<string, DataEventConfig>
  actions: Record<string, DataEventConfig>
  disActions?: string[]

  constructor() {
    super('BasicRadar', { w: 500, h: 300 })
    this.initData()
  }

  initData() {
    const fields = [
      createField('x', { description: '类目' }),
      createField('y', { description: '类别' }),
      createField('z', { description: '值' }),
    ]

    setApiConfig(this, {
      fields: Object.assign({}, ...fields),
      description: '基本柱状图接口',
    })

    setApiData(this)

    this.events = {
      click: {
        description: '当点击数据项时',
        fields: Object.assign({}, ...fields),
        events: [],
      },
      dbclick: {
        description: '当双击数据项时',
        fields: Object.assign({}, ...fields),
        events: [],
      },
    }

    this.disActions = [
      EVENT_COM_ACTION.更新数据, EVENT_COM_ACTION.重新请求, EVENT_COM_ACTION.显示, EVENT_COM_ACTION.切换显隐, EVENT_COM_ACTION.隐藏, EVENT_COM_ACTION.更新配置,
    ] as any[]

    this.actions = {
    }

    return this
  }

  async loadData() {
    try {
      const path = 'radar/basic-radar'
      const res = await getStaticData(this.id, path)
      this.apiData.source.config.data = JSON.stringify(res.data)
    } catch (error) {
      throw error
    }
  }
}

export default BasicRadar
