/*
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-12-12 18:11:27
 * @LastEditTime : 2023-12-12 18:11:57
 */
import { DatavComponent } from '@/components/_models/datav-component'
import {
  ApiConfigMap, ApiDataConfigMap,
  setApiConfig, setApiData,
} from '@/components/_models/data-source'
import { createField } from '@/components/_models/data-field'
import { DataEventConfig } from '@/components/_models/data-event'
import { getStaticData } from '@/api/data'

const COLOR = glThemeList[0]
/**
 * WordCloudCircle
 */
export class WordCloudCircle extends DatavComponent {
  config = {
    colorBy: 'name', // name or value
    wordStyle: {
      fontFamily: 'Verdana',
      fontWeight: 600,
      fontSize: [8, 32], // 大小区间
      rotation: [0, 90],// 角度
      padding: 1,
    },
    color: [],
    spiral: 'archimedean', // archimedean椭圆  矩形 rectangular
  }

  apis: Partial<ApiConfigMap>
  apiData: Partial<ApiDataConfigMap>

  events: Record<string, DataEventConfig>

  actions: Record<string, DataEventConfig>

  constructor() {
    super('WordCloudCircle', { w: 400, h: 400 })

    this.initData()
  }

  initData() {
    const fields = [
      createField('x', { description: '名称', optional: true }),
      createField('y', { description: '值', optional: true }),
    ]

    setApiConfig(this, {
      fields: Object.assign({}, ...fields),
    })

    setApiData(this)

    this.events = {
      click: {
        description: '当点击数据时',
        fields: Object.assign({}, ...fields),
        events: [],
      },
      dbclick: {
        description: '当双击数据时',
        fields: Object.assign({}, ...fields),
        events: [],
      },
    }

    this.disActions = [
      EVENT_COM_ACTION.更新数据, EVENT_COM_ACTION.重新请求, EVENT_COM_ACTION.显示, EVENT_COM_ACTION.切换显隐, EVENT_COM_ACTION.隐藏, EVENT_COM_ACTION.更新配置,
    ] as any[]

    return this
  }

  async loadData() {
    try {
      const path = 'chart/word-cloud-circle'
      const res = await getStaticData(this.id, path)
      this.apiData.source.config.data = JSON.stringify(res.data)
    } catch (error) {
      throw error
    }
  }
}

export default WordCloudCircle
