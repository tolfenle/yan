/*
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-10-31 11:13:00
 * @LastEditTime : 2023-11-23 17:12:52
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

/**
 * BasicPercent
 */
export class BasicPercent extends DatavEChartsComponent {
  config = {
    title: useTitleConfig(),
    generate: {
      configType: 'basic',
      radius: 150,
      center: [50, 50],
      barWidth: 30,
      roundCap: true,
    },
    quickly: [],
    itemStyle: {
      ...chartItemStyle,
      color: useChartColor({ type: COLOR_TYPE.渐变, liner: 'linear-gradient(0deg, rgba(10, 51, 97, 1) 1%, rgba(32, 151, 243, 1) 100%)' }),
    },
    shadow2: {
      shadowBlur: 5,
      shadowColor: useChartColor({ value: 'rgba(0, 0, 0, 0.2)' }),
      shadowOffsetX: 0,
      shadowOffsetY: 2,
    },
    color2: useChartColor({ value: 'rgba(0, 0, 0, 0.25)' }),
    animation: _.cloneDeep(useChartAnimationConfig()),
  } as any

  apis: Partial<ApiConfigMap>
  apiData: Partial<ApiDataConfigMap>
  events: Record<string, DataEventConfig>
  actions: Record<string, DataEventConfig>
  disActions?: string[]

  constructor() {
    super('BasicPercent', { w: 400, h: 400 })
    this.initData()
  }

  initData() {
    const fields = [
      createField('x', { description: '类目' }),
      createField('y', { description: '值' }),
      createField('z', { description: '总数' }),
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
      const path = 'percent/basic-percent'
      const res = await getStaticData(this.id, path)
      this.apiData.source.config.data = JSON.stringify(res.data)
    } catch (error) {
      throw error
    }
  }
}

export default BasicPercent
