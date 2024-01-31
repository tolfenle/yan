/*
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-10-31 11:13:00
 * @LastEditTime : 2024-01-24 14:23:36
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
import ChartTitleConfigVue from '@/components/chart-config/title/ChartTitleConfig.vue'

const COLORS = glThemeList[0]

export class BasicScattersSeries extends DatavChartSeries {
  public config
  constructor(name: string, color: string) {
    super('scatter', name)
    this.config = cloneDeep(chartItemStyle)
  }
}

/**
 * BasicScatters
 */
export class BasicScatters extends DatavEChartsComponent {
  config = {
    generate: {
      ...cloneDeep(useGenerateConfig()),
    },
    title: {
      left: 100,
      scale: 100,
      font: {
        ...useFontSimple({
          fontSize: 16,
          fontWeight: 600,
        }),
      },
    },
    scatter: {
      type: 'scatter',
      symbol: {
        ...useSymbolConfigFunc(),
        symbolSize: 13,
      },
      effectType: 'ripple',
      rippleEffect: {
        color: useChartColor(),
        brushType: 'fill', // 'stroke' 和 'fill'
        period: 4,
        scale: 2.5,
        number: 3,
      },
      maxSize: 100,
      scale: 1,
      large: false,
      largeThreshold: 2000,
      label: {
        ...cloneDeep(useChartBaseLabel()),
        show: false,
      },
    },
    series: [],
    quickly: [],
    xAxis: {
      ...cloneDeep(xAxisConfig),
      show: true,
      type: 'category',
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
    super('BasicScatters', { w: 500, h: 300 })

    this.initData()
  }

  initData() {
    const fields = [
      createField('x', { description: '类目' }),
      createField('y', { description: 'Y轴' }),
      createField('z', { description: '值' }),
    ]

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
    this.config.series.push(
      new BasicScattersSeries('', COLORS[0]),
      new BasicScattersSeries('', COLORS[1]),
      new BasicScattersSeries('', COLORS[2]),
      new BasicScattersSeries('', COLORS[3]),
      new BasicScattersSeries('', COLORS[4]),
      new BasicScattersSeries('', COLORS[5]),
      new BasicScattersSeries('', COLORS[6]))

    return this
  }

  async loadData() {
    try {
      const path = 'scatter/basic-scatters'
      const res = await getStaticData(this.id, path)
      this.apiData.source.config.data = JSON.stringify(res.data)
    } catch (error) {
      throw error
    }
  }
}

export default BasicScatters
