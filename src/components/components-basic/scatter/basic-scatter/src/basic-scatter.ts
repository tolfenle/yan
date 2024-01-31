/*
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-10-31 11:13:00
 * @LastEditTime : 2024-01-02 17:11:08
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
import { cloneDeep } from 'lodash-es'

export class BasicScatterSeries extends DatavChartSeries {
  public config
  constructor(name: string) {
    super('scatter', name)
  }
}

/**
 * BasicScatter
 */
export class BasicScatter extends DatavEChartsComponent {
  config = {
    generate: {
      ...cloneDeep(useGenerateConfig()),
    },
    series: [],
    quickly: [],
    grid: cloneDeep(chartGridConfig),
    xAxis: {
      ...cloneDeep(xAxisConfig),
      show: true,
      type: 'value',
    },
    scatter: useScatterConfig(),
    yAxis: {
      ...cloneDeep(yAxisConfig),
      show: true,
    },
    tooltip: cloneDeep(tooltipConfig),
    legend: cloneDeep(chartLegendConfig),
    animation: cloneDeep(useChartAnimationConfig()),
  }

  apis: Partial<ApiConfigMap>
  apiData: Partial<ApiDataConfigMap>

  events: Record<string, DataEventConfig>

  actions: Record<string, DataEventConfig>
  disActions?: string[]
  constructor() {
    super('BasicScatter', { w: 500, h: 300 })

    this.initData()
  }

  initData() {
    const fields = []

    setApiConfig(this, {
      fields: Object.assign({}, ...fields),
      description: '基本散点图接口',
    })

    setApiData(this)

    this.events = {
      click: {
        description: '当点击数据项时',
        fields: Object.assign({}, ...fields),
      },
    }
    this.actions = {}
    this.config.series.push(new BasicScatterSeries(''))

    return this
  }

  async loadData() {
    try {
      const path = 'scatter/basic-scatter'
      const res = await getStaticData(this.id, path)
      this.apiData.source.config.data = JSON.stringify(res.data)
    } catch (error) {
      throw error
    }
  }
}

export default BasicScatter
