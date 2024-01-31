/*
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-11-23 18:29:01
 * @LastEditTime : 2023-12-13 09:21:34
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

export class DialogSeries {
  public config
  constructor(mame, param = {}) {
    this.name = name
    this.config = {
      ...param,
    }
  }
}
/**
 * Dialog
 */
export class Dialog extends DatavComponent {
  config = {
    generate: {
    },
    global: {
    },
  }

  apis: Partial<ApiConfigMap>
  apiData: Partial<ApiDataConfigMap>

  events: Record<string, DataEventConfig>

  actions: Record<string, DataEventConfig>
  disActions?: string[]

  constructor() {
    super('Dialog', { w: 800, h: 600 })
    this.initData()
  }

  initData() {
    const fields = [
      createField('x', { description: '标题', optional: true }),
      createField('y', { description: '值', optional: true }),
    ]

    setApiConfig(this, {
      fields: Object.assign({}, ...fields),
    })

    setApiData(this)
    this.events = {
      open: {
        description: '当打开弹窗时',
        fields: Object.assign({}, ...fields),
        events: [],
      },
      close: {
        description: '当关闭弹窗时',
        fields: Object.assign({}, ...fields),
        events: [],
      },
      confirm: {
        description: '当点击确认时',
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
    } catch (error) {
      throw error
    }
  }
}

export default Dialog
