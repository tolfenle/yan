/*
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-10-31 11:13:00
 * @LastEditTime : 2023-12-12 14:54:24
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

const COLORS = glThemeList[0]
export class WaterBallSeries extends DatavChartSeries {
  constructor(name: string) {
    super('bar', name)
  }
}

/**
 * WaterBall
 */
export class WaterBall extends DatavEChartsComponent {
  config = {
    generate: {
      ..._.cloneDeep(useGenerateConfig({ sameColor: false })),
    },
    quickly: [],
    global: {
      type: 'def',
      shape: 'path://M367.855,428.202c-3.674-1.385-7.452-1.966-11.146-1.794c0.659-2.922,0.844-5.85,0.58-8.719 c-0.937-10.407-7.663-19.864-18.063-23.834c-10.697-4.043-22.298-1.168-29.902,6.403c3.015,0.026,6.074,0.594,9.035,1.728 c13.626,5.151,20.465,20.379,15.32,34.004c-1.905,5.02-5.177,9.115-9.22,12.05c-6.951,4.992-16.19,6.536-24.777,3.271 c-13.625-5.137-20.471-20.371-15.32-34.004c0.673-1.768,1.523-3.423,2.526-4.992h-0.014c0,0,0,0,0,0.014 c4.386-6.853,8.145-14.279,11.146-22.187c23.294-61.505-7.689-130.278-69.215-153.579c-61.532-23.293-130.279,7.69-153.579,69.202 c-6.371,16.785-8.679,34.097-7.426,50.901c0.026,0.554,0.079,1.121,0.132,1.688c4.973,57.107,41.767,109.148,98.945,130.793 c58.162,22.008,121.303,6.529,162.839-34.465c7.103-6.893,17.826-9.444,27.679-5.719c11.858,4.491,18.565,16.6,16.719,28.643 c4.438-3.126,8.033-7.564,10.117-13.045C389.751,449.992,382.411,433.709,367.855,428.202z',
      radius: 80,
      count: 2,
      suffix: '%',
      decimalPlace: 2,
      amplitude: 25,
      color: useChartColor({ type: COLOR_TYPE.渐变, liner: 'linear-gradient(0deg, rgba(5, 160, 69, 1) 0%, rgba(81, 45, 167, 1) 100%)' }),
      backgroundStyle: {
        borderWidth: 1,
        color: useChartColor({ type: COLOR_TYPE.渐变, liner: 'linear-gradient(0deg, rgba(5, 160, 69, 1) 0%, rgba(81, 45, 167, 1) 100%)' }),
      },
    },
    label: {
      formatter: 'return `${param.value * 100}%`',
      align: 'center',
      baseline: 'middle',
      position: 'inside',
      textStyle: {
        ...useFontSimple({
          fontSize: 32,
        }),
      },
    },
    outline: {
      show: true,
      borderDistance: 8,
      itemStyle: {
        color: useChartColor({ type: COLOR_TYPE.渐变, liner: 'linear-gradient(0deg, rgba(5, 160, 69, 1) 0%, rgba(81, 45, 167, 1) 100%)' }),
        shadowBlur: 20,
        shadowColor: useChartColor({ value: 'rgba(0, 0, 0, 0.25)' }),
        borderWidth: 4,
        borderColor: useChartColor({ value: '#000' }),
      },
    },
    itemStyle: {
      opacity: 0.95,
      shadowBlur: 50,
      shadowColor: useChartColor({ type: COLOR_TYPE.渐变, liner: 'linear-gradient(0deg, rgba(5, 160, 69, 1) 0%, rgba(81, 45, 167, 1) 100%)' }),
    },
    emphasis: {
      itemStyle: {
        opacity: 0.8,
      },
    },
    animation: _.cloneDeep(useChartAnimationConfig()),
  } as any

  apis: Partial<ApiConfigMap>
  apiData: Partial<ApiDataConfigMap>
  events: Record<string, DataEventConfig>
  actions: Record<string, DataEventConfig>
  disActions?: string[]

  constructor() {
    super('WaterBall', { w: 500, h: 300 })

    this.initData()
  }

  initData() {
    const fields = [
      createField('x', { description: '类目' }),
      createField('y', { description: '值' }),
    ]

    setApiConfig(this, {
      fields: Object.assign({}, ...fields),
      description: '水球图接口',
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
      const path = 'water/water-ball'
      const res = await getStaticData(this.id, path)
      this.apiData.source.config.data = JSON.stringify(res.data)
    } catch (error) {
      throw error
    }
  }
}

export default WaterBall
