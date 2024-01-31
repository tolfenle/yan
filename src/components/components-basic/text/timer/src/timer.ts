/*
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-10-31 11:13:01
 * @LastEditTime : 2024-01-11 10:30:14
 */
import { DatavComponent } from '@/components/_models/datav-component'
import {
  ApiConfigMap, ApiDataConfigMap,
} from '@/components/_models/data-source'
import { DataEventConfig } from '@/components/_models/data-event'
import { getStaticData } from '@/api/data'

/**
 * Timer
 */
export class Timer extends DatavComponent {
  config = {
    iconStyle: {
      url: 'shijian1',
      show: true,
      size: 1.4,
      marginRight: 6,
      color: useChartColor({ isText: true, value: '#fff' }),
    },
    time: {
      textStyle: {
        ...useFontSimple({
          color: useChartColor({ isText: true, value: '#fff' }),
          fontSize: 20,
        }),
      },
      week: {
        show: true,
        marginLeft: 6,
        suffix: '周',
      },
      format: 'YYYY-MM-DD HH:mm:ss',
      duration: 1000,
      horizontal: 'center',
      vertical: 'center',
    },
  }

  apis: Partial<ApiConfigMap>
  apiData: Partial<ApiDataConfigMap>

  events: Record<string, DataEventConfig>

  actions: Record<string, DataEventConfig>
  disActions?: string[]

  constructor() {
    super('Timer', { w: 300, h: 56 })

    this.initData()
  }

  initData() {
    this.apis = {}
    this.apiData = {}
    this.events = {}
    this.actions = {}

    return this
  }

  async loadData() {
    try {
      // 组件静态数据来源，当前项目统一管理目录：public/data/*
      // 如：public/data/demo/data.json 简写为 => demo/data
      const path = ''
      const res = await getStaticData(this.id, path)
      this.apiData.source.config.data = JSON.stringify(res.data)
    } catch (error) {
      throw error
    }
  }
}

export default Timer
