/*
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-10-31 11:13:00
 * @LastEditTime : 2024-01-24 14:24:17
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

export class Map3dSeries extends DatavChartSeries {
  public config
  constructor(name: string) {
    super('scatter', name)
  }
}

/**
 * Map3d
 */
export class Map3d extends DatavEChartsComponent {
  config = {
    generate: {
      ...cloneDeep(useGenerateConfig()),
    },
    global: useMap3dConfig(),
    series: [],
    grid: cloneDeep(chartGridConfig),
    xAxis: {
      ...cloneDeep(xAxisConfig),
    },
    tooltip: cloneDeep(tooltipConfig),
    animation: cloneDeep(useChartAnimationConfig()),
  }

  apis: Partial<ApiConfigMap>
  apiData: Partial<ApiDataConfigMap>
  events: Record<string, DataEventConfig>

  actions: Record<string, DataEventConfig>
  disActions?: string[]
  constructor() {
    super('Map3d', { w: 1200, h: 850 })

    this.initData()
  }

  initData() {
    const fields = [
      createField('x', { description: '类目' }),
      createField('y', { description: '值' }),
      createField('s', { description: '系列' }),
    ]

    setApiConfig(this, {
      fields: Object.assign({}, ...fields),
      description: '基本折线图接口',
    })

    setApiData(this)

    this.events = {
      click: {
        description: '当点击数据项时',
        fields: Object.assign({}, ...fields),
      },
    }
    this.actions = {}
    this.config.series.push(new Map3dSeries(''), new Map3dSeries(''), new Map3dSeries(''))

    return this
  }

  async loadData() {
    try {
      // const path = 'scatter/basic-scatter'
      // const res = await getStaticData(this.id, path)
      this.apiData.source.config.data = JSON.stringify({})
    } catch (error) {
      throw error
    }
  }
}

export default Map3d
