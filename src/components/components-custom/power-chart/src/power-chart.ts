/*
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-12-08 10:39:45
 * @LastEditTime : 2023-12-14 14:01:57
 */
import { DatavEChartsComponent, DatavChartSeries } from '@/components/_models/datav-component'
import {
  ApiConfigMap, ApiDataConfigMap,
  setApiConfig, setApiData,
} from '@/components/_models/data-source'
import { createField } from '@/components/_models/data-field'
import { DataEventConfig } from '@/components/_models/data-event'
import { _ } from 'iking-utils'
export class PowerChartSeries extends DatavChartSeries {
  constructor(name: string) {
    super('bar', name)
  }

  config = {
    customTheme: false,
    ..._.cloneDeep(useChartBarConfig()),
  }
}

/**
 * PowerChart
 */
export class PowerChart extends DatavEChartsComponent {
  config = {
    generate: {
      ..._.cloneDeep(useGenerateConfig({ sameColor: false })),
    },
    quickly: [],
    custom: {
      code: '',
    },
    global: {
      fontFamily: 'Microsoft Yahei',
      margin: {
        top: 40,
        bottom: 50,
        left: 50,
        right: 40,
      },
      innerPadding: 20,
      outerPadding: 30,
      barWidth: 'auto',
      background: {
        show: true,
        color: 'rgba(255, 255, 255, 0.1)',
      },
    },
    bar: _.cloneDeep({
      ...useChartBarPubConfig(),
      ...useChartBarConfig(),
    }),
    line: useChartLineConfig(),
    grid: _.cloneDeep(chartGridConfig),
    xAxis: _.cloneDeep(xAxisConfig),
    yAxis: _.cloneDeep(yAxisConfig),
    tooltip: _.cloneDeep(tooltipConfig),
    legend: _.cloneDeep(chartLegendConfig),
    animation: _.cloneDeep(useChartAnimationConfig()),
    series: [],
  } as any

  apis: Partial<ApiConfigMap>
  apiData: Partial<ApiDataConfigMap>
  events: Record<string, DataEventConfig>
  actions: Record<string, DataEventConfig>
  disActions?: string[]

  constructor() {
    super('PowerChart', { w: 500, h: 300 })

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
    ] as any[]

    this.actions = {
    }

    return this
  }

  async loadData() {
    try {
    } catch (error) {
      throw error
    }
  }
}

export default PowerChart
