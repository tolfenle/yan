/*
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-10-31 11:13:00
 * @LastEditTime : 2023-11-21 12:09:49
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
export class SingleBarSeries extends DatavChartSeries {
  public config
  constructor(name: string, __config) {
    super('bar', name)
    this.config = chartRichTextConfig(__config)
  }
}

/**
 * SingleBar
 */
export class SingleBar extends DatavEChartsComponent {
  config = {
    global: {
      distance: 15,
      position: 'top',
      symbol: '',
      symbolSize: 35,
      fontFamily: 'Microsoft Yahei',
      margin: {
        top: 40,
        bottom: 50,
        left: 50,
        right: 40,
      },
      barWidth: 100,
    },
    bgBar: {
      top: useChartColor({ value: '#1f87e833' }),
      color: useChartColor({ value: '#42a5f611' }),
    },
    mainBar: {
      topColor: useChartColor({ value: '#0f4c8a' }),
      color: useChartColor({ value: '#00000058', type: COLOR_TYPE.渐变, liner: 'linear-gradient(0deg, rgba(0, 0, 0, 0.52) 3%, rgba(31, 135, 232, 1) 100%)' }),
      bottomColor: useChartColor({ value: '#030f1c83' }),
    },
    grid: _.cloneDeep(chartGridConfig),
    series: [new SingleBarSeries('', {
      oneLine: true,
      param: {
        key: 'y',
        style: {
          ...chartFont,
          fontSize: 28,
          color: useChartColor({ value: '#fff' }),
        },
      },
      suffix: {
        value: '%',
        style: {
          ...chartFont,
          fontSize: 14,
          color: useChartColor({ value: '#eee' }),
        },
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
    super('SingleBar', { w: 155, h: 300 })

    this.initData()
  }

  initData() {
    const fields = [
      createField('x', { description: '类目' }),
      createField('y', { description: '值' }),
    ]

    setApiConfig(this, {
      fields: Object.assign({}, ...fields),
      description: '单柱图接口',
    })

    setApiData(this)

    this.events = {
      click: {
        description: '当点击柱图时',
        fields: Object.assign({}, ...fields),
        events: [],
      },
      dbclick: {
        description: '当双击柱图时',
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
      const path = 'bar/single-bar'
      const res = await getStaticData(this.id, path)
      this.apiData.source.config.data = JSON.stringify(res.data)
    } catch (error) {
      throw error
    }
  }
}

export default SingleBar
