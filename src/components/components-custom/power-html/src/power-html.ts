/*
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2024-01-26 17:08:44
 * @LastEditTime : 2024-02-01 11:36:07
 */
import { DatavComponent } from '@/components/_models/datav-component'
import {
  ApiConfigMap, ApiDataConfigMap,
  setApiConfig, setApiData,
} from '@/components/_models/data-source'
import { createField } from '@/components/_models/data-field'
import { DataEventConfig } from '@/components/_models/data-event'
import { _ } from 'iking-utils'
/**
 * PowerHtml
 */
export class PowerHtml extends DatavComponent {
  config = {
    generate: {
      ..._.cloneDeep(useGenerateConfig({ sameColor: false })),
    },
    html: `const html = '<div style="background: green;width: 100%;height: 100%;font-size: 22px;">自定义HTML，可通过平台方式获取数据、组件实例、通用样式</div>'; return html`,
    global: {
      background: useChartColor({ isCss: true, value: '#000' }),
      border: useCssBorder(),
    },
  }

  apis: Partial<ApiConfigMap>
  apiData: Partial<ApiDataConfigMap>
  events: Record<string, DataEventConfig>
  actions: Record<string, DataEventConfig>

  constructor() {
    super('PowerHtml', { w: 400, h: 400 })
    this.initData()
  }

  initData() {
    const fields = [
      createField('value', { description: '', optional: true }),
    ]

    setApiConfig(this, {
      fields: Object.assign({}, ...fields),
    })

    setApiData(this)

    this.events = {}
    this.actions = {}

    return this
  }

  async loadData() {
    try {
      // 组件静态数据来源，当前项目统一管理目录：public/data/*
      // 如：public/data/demo/data.json 简写为 => demo/data
      // const path = ''
      const res = { data: '' }
      this.apiData.source.config.data = JSON.stringify(res.data)
    } catch (error) {
      throw error
    }
  }
}

export default PowerHtml
