/*
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-10-31 11:13:00
 * @LastEditTime : 2023-11-10 13:50:24
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
export class WaterfullBarSeries extends DatavChartSeries {
  constructor(name: string) {
    super('bar', name)
  }

  config = {
    customTheme: false,
    ..._.cloneDeep(useChartBarConfig()),
  }
}

/**
 * WaterfullBar
 */
export class WaterfullBar extends DatavEChartsComponent {
  config = {
    generate: {
      ..._.cloneDeep(useGenerateConfig({ sameColor: false })),
    },
    quickly: [],
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
      ...useChartBarPubConfig(),
      ...useChartBarConfig(),
    }),
    grid: _.cloneDeep(chartGridConfig),
    xAxis: _.cloneDeep(xAxisConfig),
    yAxis: _.cloneDeep(yAxisConfig),
    tooltip: _.cloneDeep(tooltipConfig),
    legend: _.cloneDeep(chartLegendConfig),
    series: [new WaterfullBarSeries('系列1')],
    animation: _.cloneDeep(useChartAnimationConfig()),
  } as any

  apis: Partial<ApiConfigMap>
  apiData: Partial<ApiDataConfigMap>

  events: Record<string, DataEventConfig>

  actions: Record<string, DataEventConfig>
  disActions?: string[]

  constructor() {
    super('WaterfullBar', { w: 500, h: 300 })

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

    this.actions = {
    }

    return this
  }

  async loadData() {
    try {
      const path = 'bar/waterfull-bar'
      const res = await getStaticData(this.id, path)
      this.apiData.source.config.data = JSON.stringify(res.data)
    } catch (error) {
      throw error
    }
  }
}

export default WaterfullBar
