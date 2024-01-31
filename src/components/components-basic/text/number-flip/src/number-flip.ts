/*
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-09-26 13:59:38
 * @LastEditTime : 2023-11-21 12:13:45
 */
import { DatavComponent } from '@/components/_models/datav-component'
import {
  ApiConfigMap, ApiDataConfigMap,
  initApiConfig, initApiData,
} from '@/components/_models/data-source'
import { createField } from '@/components/_models/data-field'
import { DataEventConfig } from '@/components/_models/data-event'
import { getStaticData } from '@/api/data'

/**
 * NumberFlip
 */
export class NumberFlip extends DatavComponent {
  config = {
    // 隔几位添加符号
    split: 3,
    // 符号
    symbol: ',',
    symbolInBg: true,
    // 文字
    font: {
      fontFamily: 'Microsoft Yahei',
      fontSize: 40,
      fontWeight: 600,
      fontStyle: 'inherit',
      color: useChartColor({
        type: COLOR_TYPE.渐变,
        value: '',
        liner: 'linear-gradient(0deg, rgba(255, 255, 255, 1) 0%, rgba(0, 140, 255, 1) 100%)',
        image: {
          value: '',
          repeat: 'repeat', // 是否平铺，可以是 repeat 'repeat-x', 'repeat-y', 'no-repeat'
        },
      }),
    },
    backgroundImage: '/public/com-pickure/number-card.png',
    backgroundSize: [100, 100],
    backgroundPosition: [0, 0],
    padding: [10, 10, 10, 10],
    margin: [0, 0, 0, 0],
    animate: {
      type: '',
      delay: 0, // animate__delay-2s
      repeat: 1, // animate__repeat-2
      direction: 2, // animate__direction-
      timing: 'linear',
    },
  }

  apis: Partial<ApiConfigMap>
  apiData: Partial<ApiDataConfigMap>

  events: Record<string, DataEventConfig>

  actions: Record<string, DataEventConfig>
  disActions?: string[]

  constructor() {
    super('NumberFlip', { w: 800, h: 80 })

    this.initData()
  }

  initData() {
    const fields = [
      createField('value', { description: '', optional: true }),
    ]

    setApiConfig(this, {
      fields: Object.assign({}, ...fields),
      description: '',
    })

    setApiData(this)

    this.events = {}
    this.actions = {
      commapping: {
        description: '字段映射',
        fields: {},
      },
    }

    return this
  }

  async loadData() {
    try {
      // 组件静态数据来源，当前项目统一管理目录：public/data/*
      // 如：public/data/demo/data.json 简写为 => demo/data
      const path = 'text/number-flip'
      const res = await getStaticData(this.id, path)
      this.apiData.source.config.data = JSON.stringify(res.data)
    } catch (error) {
      throw error
    }
  }
}

export default NumberFlip
