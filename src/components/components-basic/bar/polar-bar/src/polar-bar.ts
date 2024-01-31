/*
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-10-31 11:13:00
 * @LastEditTime : 2024-01-24 14:20:55
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
export class PolarBarSeries extends DatavChartSeries {
  constructor(name: string) {
    super('bar', name)
  }

  config = {
    customTheme: false,
    ..._.cloneDeep(useChartBarConfig()),
  }
}

/**
 * PolarBar
 */
export class PolarBar extends DatavEChartsComponent {
  config = {
    generate: {
      ..._.cloneDeep(useGenerateConfig({ sameColor: false })),
    },
    quickly: [],
    global: {
      ...chartPolarConfig(),
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
    bar: _.cloneDeep({
      ...useChartBarPubConfig({
        coordinateSystem: 'polar',
        barGap: 1,
        barCategoryGap: 12,
        barWidth: {
          auto: true,
          value: 12,
          isPercent: false,
        },
        barMaxWidth: {
          auto: true,
          value: '',
          isPercent: false,
        },
        barMinWidth: {
          auto: true,
          value: '',
          isPercent: false,
        },
      }),
      ...useChartBarConfig({
        coordinateSystem: 'polar',
        label: {
          ...useChartBaseLabel(),
          position: 'middle',
        },
      }),
    }),
    radiusAxis: _.cloneDeep(chartRadisAxisConfig({
      axisTick: { show: false },
      axisLine: {
        show: true,
        symbol: ['none', 'none'], // none arrow
        symbolSize: [10, 15],
        lineStyle: {
          ...chartLineStyle,
          color: useChartColor({ value: '#4b4b4b' }),
        },
      },
      splitLine: {
        show: true,
        lineStyle: {
          ...chartLineStyle,
          color: ['#4b4b4b'],
        },
      },
    })),
    angleAxis: _.cloneDeep(useChartAngleAxisConfig({
      type: 'value',
      splitLine: {
        show: true,
        lineStyle: {
          ...chartLineStyle,
          color: ['#4b4b4b'],
        },
      },
      axisTick: {
        show: false,
      },
    })),
    tooltip: _.cloneDeep(tooltipConfig),
    series: [new PolarBarSeries('系列1')],
    animation: _.cloneDeep(useChartAnimationConfig()),
  } as any

  apis: Partial<ApiConfigMap>
  apiData: Partial<ApiDataConfigMap>

  events: Record<string, DataEventConfig>

  actions: Record<string, DataEventConfig>
  disActions?: string[]

  constructor() {
    super('PolarBar', { w: 500, h: 300 })

    this.initData()
  }

  initData() {
    const fields = [
      createField('x', { description: '类目' }),
      createField('y', { description: '值' }),
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
    ]

    this.actions = {
    }

    return this
  }

  async loadData() {
    try {
      const path = 'bar/polar-bar'
      const res = await getStaticData(this.id, path)
      this.apiData.source.config.data = JSON.stringify(res.data)
    } catch (error) {
      throw error
    }
  }
}

export default PolarBar
