/*
 * @Author: wfl
 * @LastEditors: wfl
 * @description:
 * @updateInfo:
 * @Date: 2022-07-19 16:15:20
 * @LastEditTime: 2022-09-21 20:18:41
 */
import { getStaticData } from '@/api/data'
import { DataEventConfig } from '@/components/_models/data-event'
import { createField } from '@/components/_models/data-field'
import {
  ApiConfigMap, ApiDataConfigMap,
} from '@/components/_models/data-source'
import { DatavComponent } from '@/components/_models/datav-component'
/**
 * Frame
 */
export class Frame extends DatavComponent {
  config = {
    src: 'project',
    importance: 'auto', // auto (default)  high  low
    border: {
      width: 0,
      color: 'transparent',
      style: 'solid', // solid (default) dashed
      radius: [0, 0, 0, 0],
    },
  }

  apis: Partial<ApiConfigMap>
  apiData: Partial<ApiDataConfigMap>
  events: Record<string, DataEventConfig>
  actions: Record<string, DataEventConfig>
  disActions?: string[]

  constructor() {
    super('Frame', { w: 1000, h: 500 })
    this.initData()
  }

  initData() {
    const fields = [
      createField('src', { description: 'iframe地址', optional: true }),
    ]
    setApiConfig(this, {
      fields: Object.assign({}, ...fields),
      description: 'iframe接口',
    })
    setApiData(this)
    this.events = {
      onload: {
        description: '加载完成后',
        fields: Object.assign({}, ...fields),
      },
    }
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
      const path = 'media/frame'
      const res = await getStaticData(this.id, path)
      this.apiData.source.config.data = JSON.stringify(res.data)
    } catch (error) {
      throw error
    }
  }
}

export default Frame
