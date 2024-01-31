/*
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-12-13 18:12:22
 * @LastEditTime : 2023-12-19 14:46:21
 */
import { DatavComponent } from '@/components/_models/datav-component'
import {
  ApiConfigMap, ApiDataConfigMap,
  setApiConfig, setApiData,
} from '@/components/_models/data-source'
import { createField } from '@/components/_models/data-field'
import { DataEventConfig } from '@/components/_models/data-event'
import { getStaticData } from '@/api/data'
import { cloneDeep } from 'lodash-es'

export class ModelTitlesSeries {
  public config
  constructor(mame, param = {}) {
    this.name = name
    this.config = {
      ...param,
    }
  }
}
/**
 * ModelTitles
 */
export class ModelTitles extends DatavComponent {
  config = {
    generate: {
      ...useGenerateConfig({}, true),
    },
    pop: {
      img: 'basemaps/textPnl.png',
    },
    global: {
      backgroundImg: '',
      model: {
        url: '//data.mars3d.cn/3dtiles/max-ytlhz/tileset.json',
        position: { lng: 117.094224, lat: 31.815859, alt: 26.4 },
        rotation: { z: 116.2 },
        maximumScreenSpaceError: 1,
        center: { lat: 31.81149, lng: 117.094565, alt: 277.2, heading: 1.5, pitch: -32.7 },
      },
      loop: {
        enable: false,
        speed: 5,
        maxHeight: 200,
        minHeight: 80,
      },

    },
    ...useMarsConfig({}, { lat: 31.81149, lng: 117.094565, alt: 277.2, heading: 1.5, pitch: -32.7 }),
  }

  apis: Partial<ApiConfigMap>
  apiData: Partial<ApiDataConfigMap>

  events: Record<string, DataEventConfig>

  actions: Record<string, DataEventConfig>
  disActions?: string[]

  constructor() {
    super('ModelTitles', { w: 1920, h: 1080 })
    this.initData()
  }

  initData() {
    const fields = [
      createField('x', { description: '名称', optional: true }),
      createField('y', { description: '值', optional: true }),
      createField('z', { description: '位置', optional: true }),
    ]

    setApiConfig(this, {
      fields: Object.assign({}, ...fields),
    })

    setApiData(this)
    this.events = {
      change: {
        description: '当数据变化时',
        fields: Object.assign({}, ...fields),
        events: [],
      },
      click: {
        description: '当点击模型时',
        fields: Object.assign({}, ...fields),
        events: [],
      },
      dbclick: {
        description: '当点击模型时',
        fields: Object.assign({}, ...fields),
        events: [],
      },
      clickPop: {
        description: '当点击模型中的点位时',
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
      const path = 'model/model-titles'
      const res = await getStaticData(this.id, path)
      this.apiData.source.config.data = JSON.stringify(res.data)
    } catch (error) {
      throw error
    }
  }
}

export default ModelTitles
